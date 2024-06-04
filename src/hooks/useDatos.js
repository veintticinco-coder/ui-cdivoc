import { useState, useEffect, useCallback } from "react";

export const useDatos = ({ url, tipo, formulario = null }) => {
    const [respuesta, setRespuesta] = useState();
    const ruta = `http://localhost:3002/${url}`

    const Enviar = useCallback(async () => {
        const datos = await fetch(ruta, {
            method: tipo,
            body: formulario
        }).then((data) => data.json());

        setRespuesta(datos);
    }, [ruta, tipo, formulario]);

    useEffect(() => {
        if (!formulario && tipo === "post") return;
        Enviar();
    }, [formulario, tipo, Enviar])

    return {
        respuesta, Enviar
    }
}
