import { useState, useEffect, useCallback } from "react";

const ruta = process.env.RUTA;

export const useDatos = ({ url, metodo, formulario = null }) => {
    const [respuesta, setRespuesta] = useState({
        cargando: false,
        respuesta: null,
        error: null,
        completdo: false
    });

    const ruta = `${ruta}${url}`;

    const Enviar = useCallback(async () => {
        setRespuesta({
            cargando: true,
            respuesta: null,
            error: null
        });

        const datos = await fetch(ruta, {
            method: metodo,
            body: formulario
        });

        if (!datos.ok) {
            setRespuesta({
                cargando: false,
                respuesta: null,
                error: "Hubo un error"
            });
            return;
        }

        const data = await datos.json();

        setRespuesta({
            cargando: false,
            respuesta: data,
            error: null
        });
    }, [ruta, metodo, formulario]);

    useEffect(() => {
        if (!formulario && metodo === "post") return;
        Enviar();
    }, [formulario, metodo, Enviar])

    return {
        respuesta, Enviar
    }
}
