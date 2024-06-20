export const Formulario = ({ type, name, required, className = null, options = [] }) => {
    return (
        <>
            {(type === "text" ||
                type === "email" ||
                type === "date" ||
                type === "time" ||
                type === "password") &&
                <div className="campos">
                    <label>{name} {required && <span className="requerido">*</span>}</label>
                    <input type={type} name={name} required={required}
                        className={`textos ${className !== null && className}`} />
                </div>}
            {(type === "select") &&
                <div className="campos">
                    <label>{name} {required && <span className="requerido">*</span>}</label>
                    <select name={name} className={`textos ${className !== null && className}`} required={required}>
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
                        className={`textos ${className !== null && className}`}></textarea>
                </div>}
        </>
    )
}
