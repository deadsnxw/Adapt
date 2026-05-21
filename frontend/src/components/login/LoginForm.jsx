export default function LoginForm({ formData, onInputChange, onLogin }) {
    return (
        <form className="loginForm" onSubmit={onLogin}>
            <div className="formGroup">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="username"
                    value={formData.username}
                    onChange={onInputChange}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={onInputChange}
                    required
                />

                <button name="login" type="submit">Login</button>
            </div>
        </form>
    )
}