import { Route, Routes } from "react-router-dom";
import { Inicio } from './paginas/Inicio';
import { Menu } from "./utilidades";
import { useState } from "react";
import { Clientes } from "./paginas/Clientes";
import { NoEncontrado } from "./paginas/NoEncontrado";

export function App() {
  const [menu, setMenu] = useState(false);
  const VerMenu = (valor) => {
    setMenu(valor);
  }

  return (
    <>
      <div className="encabezado">
        <Menu menu={menu} VerMenu={VerMenu} />
        <div className="contenido-encabezado"></div>
      </div >
      <main className="contenedor contenido-principal">
        <Routes>
          <Route exact path="/" element={<Inicio />} />
          <Route exact path="/Clientes" element={<Clientes />} />
          <Route element={<NoEncontrado />} />
        </Routes>
      </main>
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
    </>
  );
}