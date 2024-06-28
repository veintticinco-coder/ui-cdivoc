export const Formulario = ({ type, name, required, className = null, options = [], value }) => {
    return (
        <>
            {(type !== "select" && type !== "textarea") &&
                <div className="campos">
                    <label>{name} {required && <span className="requerido">*</span>}</label>
                    <input type={type} name={name} required={required}
                        className={`textos ${className ? className : ""}`}
                        defaultValue={value !== undefined ? value : ""} />
                </div>}
            {(type === "select") &&
                <div className="campos">
                    <label>{name} {required && <span className="requerido">*</span>}</label>
                    <select name={name} className={`textos ${className ? className : ""}`} required={required}>
                        {required ?
                            <option value={-1}>:: SELECCIONAR ::</option> :
                            <option value={0}>:: NINGUNO ::</option>}
                        {options.map(option =>
                            <option key={option.id} value={option.id}>{option.name}</option>
                        )}
                    </select>
                </div>}
            {(type === "textarea") &&
                <div className="campos">
                    <label>{name} {required && <span className="requerido">*</span>}</label>
                    <textarea name={name} required={required}
                        className={`textos ${className ? className : ""}`}></textarea>
                </div>}
        </>
    )
}
