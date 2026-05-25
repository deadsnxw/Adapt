import styles from "../../styles/StepOne.module.css"

export default function StepOne({ formData, onInputChange, onNext }) {
    return (
        <form className="registerForm" onSubmit={onNext}>
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

                <label className={styles.label} htmlFor="passwordConfirm">Confirm Password</label>
                <input
                    id="passwordConfirm"
                    className={styles.input}
                    name="passwordConfirm"
                    type="password"
                    placeholder="password"
                    value={formData.passwordConfirm}
                    onChange={onInputChange}
                    required
                />

                <button className={styles.button} name="next" type="submit">Next</button>
            </div>
        </form>
    );
}