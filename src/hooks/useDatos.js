import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const urlBackend = process.env.REACT_APP_BACKEND;
const tk = process.env.REACT_APP_ACCESS_TOKEN;

export const useDatos = ({ url, metodo, formulario = null }) => {
    const navigate = useNavigate();

    const [respuesta, setRespuesta] = useState({
        cargando: false,
        respuesta: null,
        error: null,
        completado: false
    });

    const Enviar = useCallback(async () => {
        const ruta = `${urlBackend}/${url}`;

        setRespuesta({
            cargando: true,
            respuesta: null,
            error: null
        });

        let nuevoForm;

        if (metodo === "GET") {
            nuevoForm = new FormData();
        } else {
            nuevoForm = formulario;
        }

        nuevoForm.append("tk", tk);

        if (url !== "Sesion") {
            const sesion = JSON.parse(localStorage.getItem("sesion"));
            nuevoForm.append("usuariolog", sesion.usuario);
            nuevoForm.append("tku", sesion.tku);
        }

        const datos = await fetch(ruta, {
            method: "post",
            body: nuevoForm
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

        if (data && data.Error === 2) {
            localStorage.removeItem("sesion");
            navigate("/Sesion");
        }

        setRespuesta({
            cargando: false,
            respuesta: data,
            error: null,
            completado: true
        });

    }, [url, metodo, formulario, navigate]);

    useEffect(() => {
        if (!formulario && metodo === "post") return;
        Enviar();
    }, [formulario, metodo, Enviar])

    return {
        respuesta, Enviar
    }
}
