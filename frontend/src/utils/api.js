const RETRYABLE_STATUSES = new Set([429, 502, 503, 504]);
const RETRYABLE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchApi = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');

    const isFormData = options.body instanceof FormData;
    const method = (options.method || 'GET').toUpperCase();
    const retryCount = options.retryCount ?? 3;
    const retryBaseDelayMs = options.retryBaseDelayMs ?? 350;
    const retryUnsafeMethods = options.retryUnsafeMethods ?? false;
    const canRetryMethod = retryUnsafeMethods || RETRYABLE_METHODS.has(method);

    const config = {
        ...options,
        headers: {
            ...(!isFormData && { 'Content-Type': 'application/json' }),
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
    };

    if (config.body && typeof config.body === 'object' && !isFormData) {
        config.body = JSON.stringify(config.body);
    }

    try {
        let response = null;
        let attempt = 0;

        while (attempt <= retryCount) {
            try {
                response = await fetch(endpoint, config);
            } catch (networkError) {
                const isLastAttempt = attempt === retryCount;
                if (!canRetryMethod || isLastAttempt) throw networkError;

                const jitterMs = Math.floor(Math.random() * 120);
                const delayMs = retryBaseDelayMs * (2 ** attempt) + jitterMs;
                await sleep(delayMs);
                attempt += 1;
                continue;
            }

            const shouldRetryStatus =
                canRetryMethod &&
                RETRYABLE_STATUSES.has(response.status) &&
                attempt < retryCount;

            if (!shouldRetryStatus) break;

            const jitterMs = Math.floor(Math.random() * 120);
            const delayMs = retryBaseDelayMs * (2 ** attempt) + jitterMs;
            await sleep(delayMs);
            attempt += 1;
        }

        const contentType = response.headers.get('content-type') || '';
        const rawText = await response.text();

        let data = null;
        if (rawText.length > 0) {
            if (contentType.includes('application/json')) {
                try {
                    data = JSON.parse(rawText);
                } catch {
                    data = rawText;
                }
            } else {
                data = rawText;
            }
        }

        if (!response.ok) {
            let msg = 'Request failed';
            if (data && typeof data === 'object') {
                if ('message' in data) msg = data.message;
                else if ('error' in data) msg = data.error;
                else msg = JSON.stringify(data);
            } else if (data != null) {
                msg = data;
            }

            const shouldClearAuth =
                response.status === 401 ||
                (response.status === 403 && (
                    String(msg).includes("Invalid token") ||
                    String(msg).includes("Token expired") ||
                    String(msg).includes("Access token required")
                ));

            if (shouldClearAuth) {
                localStorage.removeItem('token');
                window.dispatchEvent(new Event('unauthorized'));
            }
            
            const message =
                String(msg || '') ||
                (typeof data === 'string' && data) ||
                `Request failed with status ${response.status}`;

            const error = new Error(message);
            error.status = response.status;
            throw error;
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

export const setToken = (token) => localStorage.setItem('token', token);

export const removeToken = () => localStorage.removeItem('token');