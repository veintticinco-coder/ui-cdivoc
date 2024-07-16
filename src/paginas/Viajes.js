import { useNavigate } from "react-router-dom";
import { useDatos } from "../hooks"
import { EstatusViaje } from "../utilidades";


export const Viajes = () => {
    const { respuesta: { respuesta: Viajes } } = useDatos({ url: "Viajes", metodo: "GET" });
    const navigate = useNavigate();

    const navegar = (datos) => {
        navigate(`/DetalleViajes/${datos.id_servicio}`, { state: datos });
    }

    return (
        <div className="contenedor-extra">
            <div className="columnas-3">
                {Viajes && Viajes.Datos.map(viaje => {
                    return (
                        <div className="carta viajes" key={`Viaje${viaje.id_servicio}`}>
                            <div className="campos flex">
                                <label className="negrita">Tipo Servicio:</label>
                                <span>{viaje.tipo_servicio}</span>
                            </div>
                            <div className="campos">
                                <label className="negrita">Cliente:</label>
                                <span>{viaje.nombre_cliente}</span>
                            </div>
                            <div className="campos">
                                <label className="negrita">Estatus:</label>
                                <EstatusViaje estatus={viaje.estatus} />
                            </div>
                            <button
                                type="button"
                                className="boton-azul"
                                style={{ width: "100%" }}
                                onClick={() => navegar(viaje)}>
                                Ver Detalle
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
