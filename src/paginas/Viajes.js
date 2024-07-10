import { useDatos } from "../hooks"


export const Viajes = () => {
    const { respuesta: { respuesta: Viajes } } = useDatos({ url: "Viajes", metodo: "GET" });

    const Estatus = ({ estatus }) => {
        let Icono = () => {
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
                <Icono /> {estatus}
            </span>
        );
    }

    return (
        <div className="contenedor-extra">
            <div className="columnas-3">
                {Viajes && Viajes.Datos.map(viaje => {
                    return (
                        <div className="carta viajes">
                            <label className="negrita">Tipo Servicio:</label>
                            <span>{viaje.tipo_servicio}</span>
                            <label className="negrita">Cliente:</label>
                            <span>{viaje.nombre_cliente}</span>
                            <label className="negrita">Estatus:</label>
                            <Estatus estatus={viaje.estatus} />
                            {/* <span className={viaje.estatus.toLowerCase().replace(/ /g, "")}>{viaje.estatus}</span> */}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
