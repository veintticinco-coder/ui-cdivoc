import React, { useEffect, useRef, useState } from "react";
import { Formulario, Mapa } from "../utilidades";
import { FormularioViajes } from "../formularios";
import { useDatos } from "../hooks";
import { gapi } from "gapi-script";

const key = process.env.REACT_APP_API_KEY;
// const clienteID = process.env.REACT_APP_CLIENTID;
const googleMaps = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
const token = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;
const calendarID = process.env.REACT_APP_CALENDARID;

export const NuevoViaje = () => {
    const refFormulario = useRef();
    const [formulario, setFormulario] = useState(null);
    const { respuesta } = useDatos({ url: "Viajes/Registrar", metodo: "post", formulario: formulario });
    const [origen, setOrigen] = useState({ lat: null, lng: null, descripcion: "" });
    const [destino, setDestino] = useState({ lat: null, lng: null, descripcion: "" });
    const [estatus, setEstatus] = useState({ error: -1, mensaje: "", valor: -1 });

    const { Encabezado, Fecha, Rutas } = FormularioViajes({
        origen: origen.descripcion, destino: destino.descripcion
    });

    const nuevaCoordenada = async (location, valor) => {
        const { lat, lng } = location;

        const { results } = await fetch(`${googleMaps}${lat},${lng}&key=${key}`)
            .then(resp => resp.json())
            .then(address => address);

        if (valor === "origen") {
            setOrigen({
                lat: lat,
                lng: lng,
                descripcion: results[0].formatted_address
            });
        }

        if (valor === "destino") {
            setDestino({
                lat: lat,
                lng: lng,
                descripcion: results[0].formatted_address
            });
        }
    }

    useEffect(() => {
        navigator?.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
            const position = { lat, lng };
            setOrigen({ ...position });
            nuevaCoordenada({ ...position }, "origen");
        });
    }, []);

    const nuevoEvento = (calendarID, event) => {
        function initiate() {
            gapi.client
                .request({
                    path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
                    method: 'POST',
                    body: event,
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(
                    (response) => {
                        return [true, response]
                    },
                    function (err) {
                        console.log(err)
                        return [false, err]
                    }
                )
        }
        gapi.load('client', initiate)
    }

    const onEnviar = async (e) => {
        e.preventDefault();

        const cuerpo = new FormData(refFormulario.current);

        //const sesion = JSON.parse(localStorage.getItem("sesion"));
        //cuerpo.append("idcliente", sesion.idcliente);

        setFormulario(cuerpo);
    }

    useEffect(() => {
        respuesta && respuesta.respuesta && setEstatus({ ...respuesta.respuesta.Datos });

        if (formulario) {
            const eventCal = {
                summary: "Nuevo evento",
                location: formulario.get("destino"),
                start: {
                    dateTime: new Date(formulario.get("fecha")).toISOString(),
                    timeZone: "America/Chihuahua"
                },
                end: {
                    dateTime: new Date(formulario.get("fecha")).toISOString(),
                    timeZone: "America/Chihuahua"
                }
            }

            nuevoEvento(calendarID, eventCal);
        }

        setTimeout(() => {
            setEstatus({ error: -1, mensaje: "", valor: -1 });
        }, 3000);
    }, [respuesta]);

    return (
        <div className="contenedor-pequenio">
            <form className="formulario" ref={refFormulario} onSubmit={onEnviar}>
                <div className="cartas-columnas">
                    <div className="carta">
                        <h2>Nuevo Viaje</h2>
                        {Encabezado.map(campo => <Formulario key={`Fecha${campo.name}`} {...campo} />)}
                    </div>
                    <div className="carta">
                        <h3>Fecha y Hora</h3>
                        <div className="columnas-2">
                            {Fecha.map(campo => <Formulario key={`Fecha${campo.name}`} {...campo} />)}
                        </div>
                    </div>
                    <div className="carta">
                        <div className="columnas-2">
                            {Rutas.map(campo => <Formulario key={`Rutas${campo.name}`} {...campo} />)}
                        </div>
                        <Mapa origen={origen} destino={destino} nuevaCoordenada={nuevaCoordenada} />
                    </div>
                    <div className="alinear-derecha">
                        {estatus.error >= 0 &&
                            <span className={estatus.error === 0 ? "correcto" : "error"}>
                                {estatus.mensaje}
                            </span>
                        }
                        <button className="boton-verde">Guardar</button>
                    </div>
                </div>
            </form>
        </div >
    )
}
