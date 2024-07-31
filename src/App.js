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
      <div className={`contenido-encabezado ${pathname === "/" ? "inicio" : ""} ${pathname === "/Sesion" ? "sesion inicio" : ""}`}></div>
      <main className={pathname === "/Sesion" ? "sesion" : "contenido-principal"}>
        <Routes>
          {sesion && sesion.idrole === 1 && <Route exact path="/" element={<Inicio />} />}
          {sesion && (sesion.idrole === 1 || sesion.idrole === 5) && <Route exact path="/Clientes" element={<Clientes />} />}
          {sesion && sesion.idrole === 1 && <Route exact path="/Viajes" element={<Viajes />} />}
          {sesion && (sesion.idrole === 1 || sesion.idrole === 5) && <Route exact path="/Unidades" element={<Unidades />} />}
          {sesion && sesion.idrole === 1 && <Route exact path="/NuevoViaje" element={<NuevoViaje />} />}
          {sesion && sesion.idrole === 1 && <Route exact path="/DetalleViajes/:id_servicio" element={<DetalleViajes />} />}
          <Route exact path="/Sesion" element={<Sesion />} />
        </Routes>
      </main>
      {pathname !== "/Sesion" &&
        <footer className="pie">
          <div className="contenedor">
            <nav className="navegacion">
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
            </nav>
            <p>Todos los derechos reservados &copy;</p>
          </div>
        </footer>
      }
    </>
  );
}