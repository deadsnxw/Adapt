import styles from "../../styles/StepTwo.module.css"

export default function StepTwo({ formData, onInputChange, onBack, onRegister }) {
    return (
        <form className="registerForm" onSubmit={onRegister}>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="age">Age</label>
                <input
                    id="age"
                    className={styles.input}
                    name="age"
                    type="number"
                    placeholder="18"
                    min="1"
                    value={formData.age}
                    onChange={onInputChange}
                    required
                />

                <label className={styles.label} htmlFor="height">Height</label>
                <input
                    id="height"
                    className={styles.input}
                    name="height"
                    type="number"
                    placeholder="175"
                    min="1"
                    value={formData.height}
                    onChange={onInputChange}
                    required
                />

                <label className={styles.label} htmlFor="weight">Weight</label>
                <input
                    id="weight"
                    className={styles.input}
                    name="weight"
                    type="number"
                    placeholder="80"
                    min="1"
                    value={formData.weight}
                    onChange={onInputChange}
                    required
                />

                <label className={styles.label}>Gender</label>
                <div className={styles.radioGroup}>
                <label htmlFor="genderMale">
                    <input
                        id="genderMale"
                        name="gender"
                        type="radio"
                        value="MALE"
                        checked={formData.gender === "MALE"}
                        onChange={onInputChange}
                        required
                    />
                    <span>Male</span>
                </label>
                <label htmlFor="genderFemale">
                    <input
                        id="genderFemale"
                        name="gender"
                        type="radio"
                        value="FEMALE"
                        checked={formData.gender === "FEMALE"}
                        onChange={onInputChange}
                        required
                    />
                    <span>Female</span>
                </label>
                </div>

                <label className={styles.label}>Activity Level</label>
                <div className={styles.radioGroup}>
                <label htmlFor="activitySedentary">
                    <input
                        id="activitySedentary"
                        name="activityLevel"
                        type="radio"
                        value="SEDENTARY"
                        checked={formData.activityLevel === "SEDENTARY"}
                        onChange={onInputChange}
                        required
                    />
                    <span>Sedentary</span>
                </label>
                <label htmlFor="activityLight">
                    <input
                        id="activityLight"
                        name="activityLevel"
                        type="radio"
                        value="LIGHT"
                        checked={formData.activityLevel === "LIGHT"}
                        onChange={onInputChange}
                        required
                    />
                    <span>Light</span>
                </label>
                <label htmlFor="activityModerate">
                    <input
                        id="activityModerate"
                        name="activityLevel"
                        type="radio"
                        value="MODERATE"
                        checked={formData.activityLevel === "MODERATE"}
                        onChange={onInputChange}
                        required
                    />
                    <span>Moderate</span>
                </label>
                <label htmlFor="activityActive">
                    <input
                        id="activityActive"
                        name="activityLevel"
                        type="radio"
                        value="ACTIVE"
                        checked={formData.activityLevel === "ACTIVE"}
                        onChange={onInputChange}
                        required
                    />
                    <span>Active</span>
                </label>
                <label htmlFor="activityVeryActive">
                    <input
                        id="activityVeryActive"
                        name="activityLevel"
                        type="radio"
                        value="VERY_ACTIVE"
                        checked={formData.activityLevel === "VERY_ACTIVE"}
                        onChange={onInputChange}
                        required
                    />
                    <span>Very Active</span>
                </label>
                </div>

                <label className={styles.label}>Goal</label>
                <div className={styles.radioGroup}>
                <label htmlFor="goalLoss">
                    <input
                        id="goalLoss"
                        name="goal"
                        type="radio"
                        value="LOSS"
                        checked={formData.goal === "LOSS"}
                        onChange={onInputChange}
                        required
                    />
                    <span>Loss</span>
                </label>
                <label htmlFor="goalMaintain">
                    <input
                        id="goalMaintain"
                        name="goal"
                        type="radio"
                        value="MAINTAIN"
                        checked={formData.goal === "MAINTAIN"}
                        onChange={onInputChange}
                        required
                    />
                    <span>Maintain</span>
                </label>
                <label htmlFor="goalGain">
                    <input
                        id="goalGain"
                        name="goal"
                        type="radio"
                        value="GAIN"
                        checked={formData.goal === "GAIN"}
                        onChange={onInputChange}
                        required
                    />
                    <span>Gain</span>
                </label>
                </div>

                <button className={styles.button} type="button" onClick={onBack}>Back</button>
                <button className={styles.button} name="register" type="submit">Register</button>
            </div>
        </form>
    );
}