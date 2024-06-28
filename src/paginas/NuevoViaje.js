import React, { useEffect, useRef, useState } from "react";
import { Formulario } from "../utilidades";
import { FormularioViajes } from "../formularios";
import { APIProvider, AdvancedMarker, Map, Pin, useMapsLibrary } from "@vis.gl/react-google-maps";

const key = process.env.REACT_APP_API_KEY;
const mapID = process.env.REACT_APP_MAP_ID;
const googleMaps = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";

const Mapa = ({ origen, destino, nuevaCoordenada }) => {
    return (<>
        <div className="mapa">
            <APIProvider apiKey={key}>
                <Map
                    id="mapa"
                    defaultZoom={15}
                    defaultCenter={{ ...origen }}
                    mapId={mapID}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}>
                    {origen.lat != null &&
                        <AdvancedMarker key="origen"
                            position={{ ...origen }}
                            clickable={true}
                            draggable={true}
                            onDragEnd={(e) => nuevaCoordenada({ lat: e.latLng.lat(), lng: e.latLng.lng() }, "origen")}
                            title="Origen" >
                            <Pin background={'red'} glyphColor={'#000'} borderColor={'#000'} />
                        </AdvancedMarker>
                    }
                    {destino.lat &&
                        <AdvancedMarker key="destino" position={{ ...destino }} clickable={true} draggable={true} onDragEnd={(e) => nuevaCoordenada({ lat: e.latLng.lat(), lng: e.latLng.lng() }, "destino")} title="Destino" >
                            <Pin background={'green'} glyphColor={'#000'} borderColor={'#000'} />
                        </AdvancedMarker>
                    }
                </Map>
                <Places nuevaCoordenada={nuevaCoordenada} />
            </APIProvider>
        </div>
    </>)
}

const Places = ({ nuevaCoordenada }) => {
    const places = useMapsLibrary("places");
    const inputRef = useRef();

    useEffect(() => {
        if (!places || !inputRef.current) return;

        const options = {
            fields: ["geometry", "name", "formatted_address"]
        };

        inputRef.current = new places.Autocomplete(inputRef.current, options);

        inputRef.current.addListener("place_changed", async () => {
            const location = inputRef.current.getPlace().geometry.location;
            const position = { lat: location.lat(), lng: location.lng() };

            nuevaCoordenada({ ...position }, "destino");
        });
    }, [places, nuevaCoordenada]);

    return (
        <div className="autocomplete">
            <input type="text" ref={inputRef} className="textos" />
        </div>
    );
}

export const NuevoViaje = () => {
    const refFormulario = useRef();

    const [origen, setOrigen] = useState({ lat: null, lng: null, descripcion: "" });
    const [destino, setDestino] = useState({ lat: null, lng: null, descripcion: "" });

    const { Encabezado, Fecha, Rutas } = FormularioViajes({
        origen: origen.descripcion, destino: destino.descripcion
    });

    const nuevaCoordenada = async (location, valor) => {
        const { lat, lng } = location;

        const { results } = await fetch(`${googleMaps}${lat},${lng}&key=${key}`)
            .then(rest => rest.json())
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
                    <Mapa origen={origen} destino={destino} nuevaCoordenada={nuevaCoordenada} />
                </div>
                <div className="alinear-derecha">
                    <button className="boton-verde">Guardar</button>
                </div>
            </form>
        </div >
    )
}
