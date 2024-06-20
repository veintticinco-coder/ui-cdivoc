import { useEffect, useRef, useState } from "react";
import { FormularioSesion } from "../formularios/Sesion"
import { Formulario } from "../utilidades";
import { Navigate } from "react-router-dom";


export const Sesion = () => {
    const campos = FormularioSesion;
    const formulario = useRef();
    const [error, setError] = useState();
    const [sesion, setSesion] = useState(() => {
        const data = JSON.parse(localStorage.getItem("sesion"));
        return data || null;
    });

    const IniciarSesion = (event) => {
        event.preventDefault();
        let data = new FormData(formulario.current);

        const usuario = data.get("Usuario");
        const password = data.get("Contraseña");

        if (usuario === "admin" && password === "admin") {
            const sesion = {
                usuario: usuario,
                perfil: "ADMIN"
            }

            setSesion({ ...sesion });
        } else if (usuario === "cliente" && password === "cliente") {
            const sesion = {
                usuario: usuario,
                perfil: "CLIENTE"
            }

            setSesion({ ...sesion });
        } else {
            setError("Usuario o contraseña incorrecta");

            setTimeout(() => {
                setError();
            }, 3000);
        }
    }

    useEffect(() => {
        localStorage.setItem("sesion", JSON.stringify(sesion));
    }, [sesion]);

    return (
        <div className="contenedor-sesion">
            {sesion && <Navigate to="/" />}
            <div className="carta">
                <form method="post" ref={formulario} onSubmit={IniciarSesion}>
                    {campos.map(campo => <Formulario key={campo.name} {...campo} />)}
                    {error && <span className="error">{error}</span>}
                    <button type="submit" className="boton-verde" onClick={IniciarSesion}>Ingresar</button>
                </form>
            </div>
        </div>
    )
}
