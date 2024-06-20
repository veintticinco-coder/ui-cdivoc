import { useState } from "react";
import Logo from "../imagenes/Logo_Divoc.png";
import { Navigate } from "react-router-dom";


export const Menu = ({ menu, VerMenu }) => {
    const [sesion, setSesion] = useState(() => {
        const data = JSON.parse(localStorage.getItem("sesion"));
        return data || null;
    });

    const CerrarSesion = () => {
        localStorage.removeItem("sesion");
        setSesion();
    }

    return (
        <>
            {!sesion && <Navigate to="/Sesion" />}
            <div className="barra">
                <span className="boton-menu" onClick={() => VerMenu(true)}><i className="fa-solid fa-bars"></i></span>
                <div className="contenedor-extra contenedor-navegacion">
                    <a href="/"><img src={Logo} alt="Logo" /></a>
                    {/* <div className="contenedor-busqueda">
                        <input type="text" className="textos" />
                        <button type="button" className="boton-gris">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div> */}
                    <nav id="nav-menu" className={`navegacion ${menu ? "abierto" : "cerrado"}`}>
                        <li className="barra-izquierda">
                            <h3>Menú</h3>
                            <span className="cerrar-menu" onClick={() => VerMenu(false)}>X</span>
                        </li>
                        {sesion && sesion.perfil === "ADMIN" && <>
                            <li><a href="/" className="link">
                                <i className="fa-solid fa-house"></i> Inicio</a>
                            </li>
                            <li><a href="/Clientes" className="link">
                                <i className="fa-solid fa-users"></i> Clientes</a>
                            </li>
                            <li><a href="/Servicios" className="link">
                                <i className="fa-solid fa-taxi"></i> Servicios</a>
                            </li>
                            <li><a href="/Conductores" className="link">
                                <i className="fa-solid fa-users-gear"></i> Conductores</a
                            ></li>
                            <li><a href="/Unidades" className="link">
                                <i className="fa-solid fa-car"></i> Unidades</a>
                            </li>
                        </>}
                        <li>
                            <button type="button" className="boton-gris" onClick={CerrarSesion}>
                                <i className="fa-solid fa-right-from-bracket"></i> Salir
                            </button>
                        </li>
                    </nav>
                </div>
            </div>
        </>
    )
}
