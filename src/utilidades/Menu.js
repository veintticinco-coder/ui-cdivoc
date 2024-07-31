import { useState } from "react";
import Logo from "../imagenes/Logo_Divoc.png";
import { Navigate } from "react-router-dom";


export const Menu = ({ menu, VerMenu }) => {
    const [sesion, setSesion] = useState(() => {
        return JSON.parse(localStorage.getItem("sesion")) || null;
    });
    // const [nombre, setNombre] = useState(null);

    const CerrarSesion = () => {
        localStorage.removeItem("sesion");
        setSesion();
    }

    /*useEffect(() => {
        if (!sesion) return;

        let iniciales;

        if (sesion.idrole == 4) {
            iniciales = sesion.cliente.split(" ").map((n) => n.substring(0, 1).toUpperCase());
            setNombre(iniciales);
        }
    }, []);*/

    return (
        <>
            {!sesion ? <Navigate to="/Sesion" /> :
                <div className="barra">
                    <span className="boton-menu" onClick={() => VerMenu(true)}><i className="fa-solid fa-bars"></i></span>
                    <div className="contenedor-extra contenedor-navegacion">
                        <a href="/"><img src={Logo} alt="Logo" /></a>
                        <nav id="nav-menu" className={`navegacion ${menu ? "abierto" : "cerrado"}`}>
                            <li className="barra-izquierda">
                                <h3>Menú</h3>
                                <span className="cerrar-menu" onClick={() => VerMenu(false)}>X</span>
                            </li>
                            <li><a href="/" className="link">
                                <i className="fa-solid fa-house"></i> Inicio</a>
                            </li>
                            {sesion && (sesion.idrole === 1 || sesion.idrole === 5) &&
                                <li><a href="/Clientes" className="link">
                                    <i className="fa-solid fa-users"></i> Clientes</a>
                                </li>}
                            {sesion && sesion.idrole === 1 &&
                                <li><a href="/Viajes" className="link">
                                    <i className="fa-solid fa-taxi"></i> Viajes</a>
                                </li>}
                            {sesion && sesion.idrole === 1 &&
                                <li><a href="/Conductores" className="link">
                                    <i className="fa-solid fa-users-gear"></i> Conductores</a
                                ></li>}
                            {sesion && (sesion.idrole === 1 || sesion.idrole === 5) &&
                                <li><a href="/Unidades" className="link">
                                    <i className="fa-solid fa-car"></i> Unidades</a>
                                </li>}
                            <li>
                                <button type="button" className="boton-gris" onClick={CerrarSesion}>
                                    <i className="fa-solid fa-right-from-bracket"></i>Salir</button>
                            </li>
                        </nav>
                    </div>
                </div >
            }
        </>
    )
}
