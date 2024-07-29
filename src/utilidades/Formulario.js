export const Formulario = ({ type, label, name, required, className = null, options = [], value, etiqueta = null }) => {

    const Normal = () => (
        <div className="campos">
            <label>{label} {required && <span className="requerido">*</span>}</label>
            <Campo />
        </div>
    )

    const Oculto = () => (
        <div className="campos oculto">
            <label>{label} {required && <span className="requerido">*</span>}</label>
            <Campo />
        </div>
    )

    const Etiqueta = () => (
        <div className="campos">
            <label>{label} {required && <span className="requerido">*</span>}</label>
            <div className="etiqueta">
                <span className={etiqueta}></span>
                <Campo />
            </div>
        </div>
    )

    const Campo = () => (
        <>
            {(type !== "select" && type !== "textarea" && type !== "options" && type !== "hidden") &&
                <input type={type} name={name} required={required ? true : false}
                    className={`textos ${className ? className : ""}`}
                    defaultValue={value !== undefined ? value : ""} />}
            {(type === "select") &&
                <select
                    name={name}
                    className={`textos ${className ? className : ""}`}
                    required={required ? true : false}
                    defaultValue={value}>
                    {required ?
                        <option value="-1" disabled>:: SELECCIONAR ::</option> :
                        <option value={0}>:: NINGUNO(A) ::</option>}
                    {options.map(option =>
                        <option key={option.id} value={option.id}>{option.name}</option>
                    )}
                </select>
            }
            {(type === "textarea") &&
                <textarea name={name.replace(/ /g, "")} required={required ? true : false}
                    className={`textos ${className ? className : ""}`}></textarea>}
            {(type === "hidden") &&
                <input type={type} name={name} required={required ? true : false}
                    className={`textos ${className ? className : ""}`}
                    defaultValue={value !== undefined ? value : ""} />
            }
        </>
    )

    return (
        <>
            {type !== "hidden" && !etiqueta && type !== "options" && <Normal />}
            {type === "hidden" && !etiqueta && <Oculto />}
            {etiqueta && <Etiqueta />}
        </>
    )
}
