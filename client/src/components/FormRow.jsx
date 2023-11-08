const FormRow = ({ id, label, defaultValue, type, name, classname, onChange, ...tao }) => {
    return (
        <div className="form-row">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <input
                id={id}
                defaultValue={defaultValue || ''}
                type={type}
                name={name}
                className={`form-input + ${classname}`}
                onChange={onChange}
                {...tao}
            />
        </div>
    );
};
export default FormRow;
