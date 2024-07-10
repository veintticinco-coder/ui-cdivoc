import React, { useEffect, useRef, useState } from "react";
import { Formulario, Mapa } from "../utilidades";
import { FormularioViajes } from "../formularios";
import { useDatos } from "../hooks";

const key = process.env.REACT_APP_API_KEY;
const googleMaps = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";

export const NuevoViaje = () => {
    const refFormulario = useRef();
    const [formulario, setFormulario] = useState(null);
    const { respuesta } = useDatos({ url: "Viajes", metodo: "post", formulario: formulario });
    const [origen, setOrigen] = useState({ lat: null, lng: null, descripcion: "" });
    const [destino, setDestino] = useState({ lat: null, lng: null, descripcion: "" });
    const [estatus, setEstatus] = useState({ error: -1, mensaje: "", valor: -1 });

    const { Encabezado, Fecha, Rutas, Extras } = FormularioViajes({
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

    const onEnviar = async (e) => {
        e.preventDefault();

        const cuerpo = new FormData(refFormulario.current);
        //const sesion = JSON.parse(localStorage.getItem("sesion"));
        //cuerpo.append("idcliente", sesion.idcliente);

        setFormulario(cuerpo);
    }

    useEffect(() => {
        respuesta && respuesta.respuesta && setEstatus({ ...respuesta.respuesta.Datos[0] });

        setTimeout(() => {
            setEstatus({ error: -1, mensaje: "", valor: -1 });
        }, 3000);
    }, [respuesta]);

    return (
        <div className="contenedor-pequenio">
            <form className="formulario" ref={refFormulario} onSubmit={onEnviar}>
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
                <div className="carta">
                    <div className="columnas-2">
                        {Extras.map(campo => <Formulario key={`Extras${campo.name}`} {...campo} />)}
                    </div>
                </div>
                <div className="alinear-derecha">
                    {estatus.error >= 0 &&
                        <span className={estatus.error === "0" ? "correcto" : "error"}>
                            {estatus.mensaje}
                        </span>
                    }
                    <button className="boton-verde">Guardar</button>
                </div>
            </form>
        </div >
    )
}
