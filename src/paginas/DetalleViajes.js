import { Navigate, useLocation } from "react-router-dom";
import { EstatusViaje, Spinner } from "../utilidades";
import { useEffect, useState } from "react";
// import ApiCalendar from "react-google-calendar-api";
// import Calendar from "@ericz1803/react-google-calendar";
import { gapi } from "gapi-script";

const key = process.env.REACT_APP_API_KEY;
// const clienteID = process.env.REACT_APP_CLIENTID;
const calendarID = process.env.REACT_APP_CALENDARID;

export const DetalleViajes = () => {
    const { state } = useLocation();
    const [spiner, setSpiner] = useState(false);
    const [events, setEvents] = useState();

    useEffect(() => {
        setSpiner(true);

        setTimeout(() => {
            setSpiner(false);
        }, 1000);
    }, []);

    // let calendars = [{ calendarId: clienteID, color: "#B241D1" }];

    const getEvents = (calendarID, apiKey) => {
        function initiate() {
            gapi.client
                .init({
                    apiKey: apiKey,
                })

                .then(function () {
                    return gapi.client.request({
                        path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
                    })
                })

                .then(
                    (response) => {
                        let events = response.result.items

                        let evento = events[0];
                        console.log(new Date(evento.end.dateTime));
                        console.log(new Date());
                        console.log(new Date(evento.end.dateTime) < new Date());


                        setEvents(events);
                        //return events
                    },
                    function (err) {
                        return [false, err]
                    }
                )
        }
        gapi.load('client', initiate);
    }

    useEffect(() => {
        getEvents(calendarID, key);
        // const events = getEvents(calendarID, key);
        // console.log(events);
        // setEvents(events);
    }, []);

    function Event({ description }) {
        return (
            <p className="eventos" href="#">{description}</p>
        )
    }

    return (
        <>
            <div className="contenedor carta">
                <div className="App flex flex-col justify-center py-8">
                    <h1 className="mb-4 text-2xl font-bold">
                        React App with Google Calendar API!
                        <ul>
                            {events?.map((event) => (
                                event.status != "cancelled"  &&
                                <li key={event.id}>
                                    <Event description={event.summary ? event.summary : event.location} />
                                </li>
                            ))}
                        </ul>
                    </h1>
                </div>
            </div>
            {state && state === null && <Navigate to="/" />}
            {spiner ? <div className="contenedor carta"><Spinner /></div> :
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
            }
        </>
    )
}
