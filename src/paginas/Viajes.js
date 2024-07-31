import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDatos } from "../hooks"
import { Busqueda, EstatusViaje, Spinner } from "../utilidades";
import Calendar from "@ericz1803/react-google-calendar";

const key = process.env.REACT_APP_API_KEY;
// const clienteID = process.env.REACT_APP_CLIENTID;
const calendarID = process.env.REACT_APP_CALENDARID;

export const Viajes = () => {
    const navigate = useNavigate();
    // const [events, setEvents] = useState();
    const [estatus, setEstatus] = useState();
    const [formulario, setFormulario] = useState(() => {
        const datos = new FormData();
        datos.append("busqueda", "");
        datos.append("estatus", "-1");
        return datos;
    });

    const { respuesta: { respuesta: Viajes }, respuesta } = useDatos(
        { url: "Viajes", metodo: "POST", formulario: formulario });
    const { respuesta: { respuesta: EstatusServicio } } = useDatos(
        { url: "Viajes/EstatusServicio", metodo: "GET" });

    const navegar = (datos) => {
        navigate(`/DetalleViajes/${datos.id_servicio}`, { state: datos });
    }

    const calendars = [{ calendarId: calendarID, color: "#1288df" }];

    useEffect(() => {
        if (EstatusServicio === null) return;
        setEstatus(EstatusServicio.Datos);
    }, [EstatusServicio]);

    const Buscar = (valores) => {
        const datos = new FormData(valores);
        setFormulario(datos);
    }

    return <>
        <div className="contenedor-extra">
            <Busqueda texto="Nuevo Viaje" buscar={Buscar} nuevo="NuevoViaje" opciones={estatus} />
            <div className="contenedor-viajes columnas-3">
                {respuesta.cargando && <div className="carta"><Spinner /></div>}
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
        <div className="carta contenedor-pequenio">
            <h1 className="">Viajes</h1>
            <Calendar apiKey={key} calendars={calendars} />
        </div>
    </>
}
