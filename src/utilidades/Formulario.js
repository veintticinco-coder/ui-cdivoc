export const Formulario = ({ type, name, required, className = null, options = [] }) => {
    return (
        <>
            {(type === "text" || type === "email") &&
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
                            <option value={-1}>:: Selecccionar ::</option> :
                            <option value={0}>:: Ninguno ::</option>}
                        {options.map(option =>
                            <option key={option.value} value={option.value}>{option.name}</option>
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
