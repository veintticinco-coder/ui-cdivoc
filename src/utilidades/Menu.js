
export const Menu = ({ menu, VerMenu }) => {
    return (
        <>
            <div className="barra">
                <span className="boton-menu" onClick={() => VerMenu(true)}><i className="fa-solid fa-bars"></i></span>
                <nav id="nav-menu" className={`contenedor navegacion ${menu ? "abierto" : "cerrado"}`}>
                    <li className="barra-izquierda">
                        <h3>Menú</h3>
                        <span className="cerrar-menu" onClick={() => VerMenu(false)}>X</span>
                    </li>
                    <li><a href="/" className="link"><i className="fa-solid fa-house"></i> Inicio</a></li>
                    <li><a href="/Clientes" className="link"><i className="fa-solid fa-users"></i> Clientes</a></li>
                    <li><a href="/Servicios" className="link"><i className="fa-solid fa-taxi"></i> Servicios</a></li>
                    <li><a href="/Conductores" className="link"><i className="fa-solid fa-users-gear"></i> Conductores</a></li>
                    <li><a href="/Unidades" className="link"><i className="fa-solid fa-car"></i> Unidades</a></li>
                </nav>
            </div>
        </>
    )
}
