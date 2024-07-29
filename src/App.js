import { Route, Routes, useLocation } from "react-router-dom";
import { Clientes, Inicio, Viajes, NuevoViaje, Sesion, DetalleViajes, Unidades } from './paginas';
import { Menu } from "./utilidades";
import { useState } from "react";

export function App() {
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  const sesion = JSON.parse(localStorage.getItem("sesion"));

  const VerMenu = (valor) => {
    setMenu(valor);
  }

  return (
    <>
      {pathname !== "/Sesion" &&
        <Menu menu={menu} VerMenu={VerMenu} />
      }
      <div className={`contenido-encabezado ${pathname === "/" ? "inicio" : ""} ${pathname === "/Sesion" ? "sesion" : ""}`}></div>
      <main className={pathname === "/Sesion" ? "sesion" : "contenido-principal"}>
        <Routes>
          {sesion && sesion.role === "ADMINISTRADOR" ? <>
            <Route exact path="/" element={<Inicio />} />
            <Route exact path="/Clientes" element={<Clientes />} />
            <Route exact path="/Viajes" element={<Viajes />} />
            <Route exact path="/Unidades" element={<Unidades />} />
            <Route exact path="/NuevoViaje" element={<NuevoViaje />} />
            <Route exact path="/DetalleViajes/:id_servicio" element={<DetalleViajes />} />
          </> :
            <Route exact path="/" element={<NuevoViaje />} />}
          <Route exact path="/Sesion" element={<Sesion />} />
        </Routes>
      </main>
      {pathname !== "/Sesion" &&
        <footer className="pie">
          <div className="contenedor">
            <nav className="navegacion">
              {sesion && sesion.role === "ADMINISTRADOR" && <>
                <li><a href="/" className="link">
                  <i className="fa-solid fa-house"></i> Inicio</a>
                </li>
                <li><a href="/Clientes" className="link">
                  <i className="fa-solid fa-users"></i> Clientes</a>
                </li>
                <li><a href="/Viajes" className="link">
                  <i className="fa-solid fa-taxi"></i> Viajes</a>
                </li>
                <li><a href="/Conductores" className="link">
                  <i className="fa-solid fa-users-gear"></i> Conductores</a
                ></li>
                <li><a href="/Unidades" className="link">
                  <i className="fa-solid fa-car"></i> Unidades</a>
                </li>
              </>}
            </nav>
            <p>Todos los derechos reservados &copy;</p>
          </div>
        </footer>
      }
    </>
  );
}