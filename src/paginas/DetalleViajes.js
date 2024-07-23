import { useLocation } from "react-router-dom";
import { EstatusViaje } from "../utilidades";

export const DetalleViajes = () => {
    const { state } = useLocation();

    return (
        <>
            <div className="contenedor columnas-2">
                <div className="carta">
                    <div className="carta-encabezado">
                        <h2>Información del Viaje</h2>
                    </div>
                    <div className="carta-cuerpo">
                        <h4 className="texto-verde">{state && state.tipo_servicio}</h4>
                        <p>{state && state.fecha_inicio}</p>
                        <p className="origen">{state && state.origen}</p>
                        <span className="direccion texto-verde">
                            <i className="fa-solid fa-arrow-right"></i>
                            <i className="fa-solid fa-arrow-right"></i>
                            <i className="fa-solid fa-arrow-right"></i>
                            <i className="fa-solid fa-arrow-right"></i>
                            <i className="fa-solid fa-arrow-right"></i>
                        </span>
                        <p className="destino">{state && state.destino}</p>
                        <div className="costo-pasajeros">
                            <p><i className="fa-solid fa-money-check-dollar"></i> ${state && state.costo}</p>
                            <p><i className="fa-solid fa-people-group"></i> {state && state.pasajeros} Pasajeros</p>
                        </div>
                        <EstatusViaje estatus={state && state.estatus} />
                        <div className="alinear-derecha" style={{ marginTop: "10px" }}>
                            <button type="button" className="boton-verde contorno circulo">Validar Viaje</button>
                        </div>
                    </div>
                </div>
                <div className="carta">
                    <div className="carta-encabezado">
                        <h2>Información del Cliente</h2>
                    </div>
                    <div className="carta-cuerpo">
                        <p>{state && state.nombre_cliente}</p>
                        <p>{state && state.telefono}</p>
                        <p>{state && state.correo}</p>
                        <p>{state && state.empresa}</p>
                        <p>{state && state.rfc}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
