import styles from "../../styles/LoginForm.module.css"

export default function LoginForm({ formData, onInputChange, onLogin }) {
    return (
        <form className="loginForm" onSubmit={onLogin}>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="username">Username</label>
                <input
                    id="username"
                    className={styles.input}
                    name="username"
                    type="text"
                    placeholder="username"
                    value={formData.username}
                    onChange={onInputChange}
                    required
                />

                <label className={styles.label} htmlFor="password">Password</label>
                <input
                    id="password"
                    className={styles.input}
                    name="password"
                    type="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={onInputChange}
                    required
                />

                <button className={styles.button} name="login" type="submit">Login</button>
            </div>
        </form>
    )
}