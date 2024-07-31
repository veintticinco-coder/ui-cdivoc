// import { Places } from "../utilidades";
import { APIProvider, AdvancedMarker, Map, Pin, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef } from "react";

const key = process.env.REACT_APP_API_KEY;
const mapID = process.env.REACT_APP_MAP_ID;

export const Mapa = ({ origen, destino, nuevaCoordenada }) => {

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
                <input type="text" placeholder="Destino" ref={inputRef} className="textos" />
            </div>
        );
    }

    return (<>
        <div className="mapa">
            <APIProvider apiKey={key}>
                <Map
                    defaultZoom={15}
                    defaultCenter={{ ...origen }}
                    mapId={mapID}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}>
                    {origen.lat != null &&
                        <AdvancedMarker
                            key="origen"
                            position={{ ...origen }}
                            clickable={true}
                            draggable={true}
                            onDragEnd={(e) =>
                                nuevaCoordenada({ lat: e.latLng.lat(), lng: e.latLng.lng() }, "origen")
                            }
                            title="Origen" >
                            <Pin background={'red'} glyphColor={'#000'} borderColor={'#000'} />
                        </AdvancedMarker>
                    }
                    {destino.lat &&
                        <AdvancedMarker
                            key="destino"
                            position={{ ...destino }}
                            clickable={true}
                            draggable={true}
                            onDragEnd={(e) =>
                                nuevaCoordenada({ lat: e.latLng.lat(), lng: e.latLng.lng() }, "destino")
                            } title="Destino" >
                            <Pin background={'green'} glyphColor={'#000'} borderColor={'#000'} />
                        </AdvancedMarker>
                    }
                </Map>
                <Places nuevaCoordenada={nuevaCoordenada} />
            </APIProvider>
        </div>
    </>)
}