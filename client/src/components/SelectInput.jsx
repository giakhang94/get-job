const SelectInput = ({ ENUM, classname, name, id, defaultValue, label, onChange }) => {
    return (
        <div className="form-row">
            <label htmlFor="" className="form-label">
                {label}
            </label>
            <select
                className={`form-select + ${classname ? classname : ''}`}
                name={name}
                id={id}
                defaultValue={defaultValue}
                onChange={onChange}
            >
                {Object.keys(ENUM).map((keyword, index) => {
                    return (
                        <option key={index + ' jobType'} value={ENUM[keyword]}>
                            {ENUM[keyword]}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};
export default SelectInput;
