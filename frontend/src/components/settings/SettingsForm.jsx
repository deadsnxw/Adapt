export default function SettingsForm({ formData, onInputChange, onUpdate }) {
    return (
        <form className="settingsForm" onSubmit={onUpdate}>
            <div className="formGroup">
                <label htmlFor="age">Age</label>
                <input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="18"
                    min="1"
                    value={formData.age}
                    onChange={onInputChange}
                    required
                />

                <label htmlFor="height">Height</label>
                <input
                    id="height"
                    name="height"
                    type="number"
                    placeholder="175"
                    min="1"
                    value={formData.height}
                    onChange={onInputChange}
                    required
                />

                <label htmlFor="weight">Weight</label>
                <input
                    id="weight"
                    name="weight"
                    type="number"
                    placeholder="80"
                    min="1"
                    value={formData.weight}
                    onChange={onInputChange}
                    required
                />

                <label>Gender</label>
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
                    Male
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
                    Female
                </label>

                <label>Activity Level</label>
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
                    Sedentary
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
                    Light
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
                    Moderate
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
                    Active
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
                    Very Active
                </label>

                <label>Goal</label>
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
                    Loss
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
                    Maintain
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
                    Gain
                </label>

                <button name="update" type="submit">Update</button>
            </div>
        </form>
    )
}