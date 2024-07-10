import { useEffect, useRef, useState } from "react";
import { FormularioSesion } from "../formularios/Sesion"
import { Formulario } from "../utilidades";
import { Navigate } from "react-router-dom";
import { useDatos } from "../hooks";


export const Sesion = () => {
    const campos = FormularioSesion;
    const formularioRef = useRef();

    const [formulario, setFormulario] = useState();
    const { respuesta } = useDatos({ url: "Sesion", metodo: "post", formulario: formulario });
    const [error, setError] = useState();

    const [sesion, setSesion] = useState(() => {
        return JSON.parse(localStorage.getItem("sesion")) || null;
    });

    const IniciarSesion = (event) => {
        event.preventDefault();
        let datos = new FormData(formularioRef.current);

        datos && setFormulario(datos);
    }

    useEffect(() => {
        localStorage.setItem("sesion", JSON.stringify(sesion));
    }, [sesion]);

    useEffect(() => {
        if (!respuesta || !respuesta.respuesta) return;

        const datosResp = respuesta.respuesta.Datos;

        if (!datosResp || datosResp.length <= 0) {
            setError("Usuario o contraseña incorrecta");

            setTimeout(() => {
                setError();
            }, 3000);

            return;
        }

        setSesion({ ...datosResp });
    }, [respuesta]);

    return (
        <div className="contenedor-sesion">
            {sesion && <Navigate to="/" />}
            <div className="carta">
                <form method="post" ref={formularioRef} onSubmit={IniciarSesion}>
                    {campos.map(campo => <Formulario key={campo.name} {...campo} />)}
                    {error && <span className="error">{error}</span>}
                    <button type="submit" className="boton-verde" onClick={IniciarSesion}>Ingresar</button>
                </form>
            </div>
        </div>
    )
}
