export const formatNumber = (value, options = {}) => {
    const {
        maxDecimals = 1,
        minDecimals = 0,
        fallback = "0",
    } = options;

    const number = Number(value);
    if (!Number.isFinite(number)) return fallback;

    const factor = 10 ** maxDecimals;
    const rounded = Math.round((number + Number.EPSILON) * factor) / factor;

    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: minDecimals,
        maximumFractionDigits: maxDecimals,
        useGrouping: false,
    }).format(rounded);
};