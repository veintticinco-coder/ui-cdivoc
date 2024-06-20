import React, { useEffect, useRef, useState } from "react";
import { Formulario } from "../utilidades";
import { FormularioViajes } from "../formularios";
import { APIProvider, AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";

const googleMaps = "https://maps.googleapis.com/maps/apis/getcode/json?latlng=";
const key = "AIzaSyBTEwE0QYkgBW3zSyf_WlciAZueFoclhPs";

export const NuevoViaje = () => {
    const refFormulario = useRef();
    const { Encabezado, Fecha, Rutas } = FormularioViajes();
    const [origen, setOrigen] = useState({ lat: null, lng: null });
    const [destino, setDestino] = useState({ lat: null, lng: null });

    const nuevaCoordenada = (event, valor) => {
        const { lat, lng } = event.latLng;
        const x = lat();
        const y = lng();

        if (valor === "origen") {
            setOrigen({
                lat: x,
                lng: y
            });
        }

        if (valor === "destino") {
            setDestino({
                lat: x,
                lng: y
            });
        }
    }

    useEffect(() => {
        navigator?.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
            const pos = { lat, lng };
            setOrigen({ ...pos });
            setDestino({ ...pos });
        });
    }, []);

    const onHandleClick = (event) => {
        const { lat: latF, lng: lngF } = event.latLng;
        const lat = latF();
        const lng = lngF();

        fetch(`${googleMaps}${lat},${lng}&key=${key}`)
            .then(rest => rest.json())
            .then(adress => console.log(adress));
    }

    const Mapa = () => {
        return (<>
            <div style={{ height: "300px" }}>
                <APIProvider apiKey={key}>
                    {origen.lat ?
                        <Map defaultZoom={15} defaultCenter={{ ...origen }} mapId={"e4cd4b93312db44"}>
                            <AdvancedMarker key="origen" position={{ ...origen }} clickable={true} draggable={true} onDragEnd={(e) => nuevaCoordenada(e, "origen")} title="Origen" onClick={onHandleClick} >
                                <Pin background={'red'} glyphColor={'#000'} borderColor={'#000'} />
                            </AdvancedMarker>
                            {destino.lat &&
                                <AdvancedMarker key="destino" position={{ ...destino }} clickable={true} draggable={true} onDragEnd={(e) => nuevaCoordenada(e, "destino")} title="Destino" >
                                    <Pin background={'green'} glyphColor={'#000'} borderColor={'#000'} />
                                </AdvancedMarker>
                            }
                        </Map>
                        : "Error al cargar el mapa"}
                </APIProvider>
            </div>
        </>)
    }

    return (
        <div className="contenedor-pequenio">
            <form className="formulario" ref={refFormulario}>
                <div className="carta">
                    <h2>Nuevo Viaje</h2>
                    <Formulario {...Encabezado[0]} />
                </div>
                <div className="carta">
                    <h3>Fecha y Hora</h3>
                    <div className="columnas-2">
                        {Fecha.map(campo => <Formulario key={`Fecha ${campo.name}`} {...campo} />)}
                    </div>
                </div>
                <div className="carta">
                    <div className="columnas-2">
                        {Rutas.map(campo => <Formulario key={`Rutas ${campo.name}`} {...campo} />)}
                    </div>
                    <Mapa />
                </div>
                <div className="alinear-derecha">
                    <button className="boton-verde">Guardar</button>
                </div>
            </form>
        </div >
    )
}
