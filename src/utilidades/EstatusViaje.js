export const EstatusViaje = ({ estatus }) => {
    const Icono = () => {
        switch (estatus) {
            case "TERMINADO":
                return <i className="fa-solid fa-circle-check"></i>;
            case "PENDIENTE":
                return <i className="fa-solid fa-triangle-exclamation"></i>;
            case "EN CURSO":
                return <i className="fa-solid fa-car"></i>;
            case "CANCELADO":
                return <i className="fa-solid fa-circle-xmark"></i>;
            default: return "";
        }
    }

    return (
        <span className={`viajes ${estatus.toLowerCase().replace(/ /g, "")}`}>
            <Icono /> <span>{estatus}</span>
        </span>
    );
}

