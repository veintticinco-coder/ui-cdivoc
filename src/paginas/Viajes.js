import { useNavigate } from "react-router-dom";
import { useDatos } from "../hooks"


export const Viajes = () => {
    const { respuesta: { respuesta: Viajes } } = useDatos({ url: "Viajes", metodo: "GET" });
    const navigate = useNavigate();

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

    const navegar = (datos) => {
        navigate(`/DetalleViajes/${datos.id_servicio}`, { state: datos });
    }

    return (
        <div className="contenedor-extra">
            <div className="columnas-3">
                {Viajes && Viajes.Datos.map(viaje => {
                    return (
                        <div className="carta viajes" key={`Viaje${viaje.id_servicio}`}>
                            <div className="campos">
                                <label className="negrita">Tipo Servicio:</label>
                                <span>{viaje.tipo_servicio}</span>
                            </div>
                            <div className="campos">
                                <label className="negrita">Cliente:</label>
                                <span>{viaje.nombre_cliente}</span>
                            </div>
                            <div className="campos">
                                <label className="negrita">Estatus:</label>
                                <Estatus estatus={viaje.estatus} />
                            </div>
                            <div className="campos alinear-derecha">
                                <button type="button" className="boton-azul" onClick={() => navegar(viaje)}>Ver Detalle</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
