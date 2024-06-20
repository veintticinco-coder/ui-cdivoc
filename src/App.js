import { Route, Routes, useLocation } from "react-router-dom";
import { Clientes, Inicio, NuevoViaje } from './paginas';
import { Menu } from "./utilidades";
import { useState } from "react";
import { Sesion } from "./paginas/Sesion";

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
      <div className={`contenido-encabezado ${pathname === "/Sesion" && "sesion"}`}></div>
      <main className={pathname === "/Sesion" && "sesion"}>
        <Routes>
          {sesion && sesion.perfil === "ADMIN" ? <>
            <Route exact path="/" element={<Inicio />} />
            <Route exact path="/Clientes" element={<Clientes />} />
          </> :
            <Route exact path="/" element={<NuevoViaje />} />}
          <Route exact path="/Sesion" element={<Sesion />} />
        </Routes>
      </main>
      {pathname !== "/Sesion" &&
        <footer className="pie">
          <div className="contenedor">
            <nav className="navegacion">
              <li><a href="/" className="link">Inicio</a></li>
              <li><a href="/Clientes" className="link">Clientes</a></li>
              <li><a href="/Servicios" className="link">Servicios</a></li>
              <li><a href="/Conductores" className="link">Conductores</a></li>
              <li><a href="/Unidades" className="link">Unidades</a></li>
            </nav>

            <p>Todos los derechos reservados &copy;</p>
          </div>
        </footer>
      }
    </>
  );
}