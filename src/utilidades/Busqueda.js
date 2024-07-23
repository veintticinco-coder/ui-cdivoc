import React, { useRef } from "react";

export const Busqueda = ({ texto, buscar, nuevo, opciones = [] }) => {
    const urlNuevo = "/" + nuevo;
    const formulario = useRef();

    const onBuscar = () => {
        buscar(formulario.current);
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="contenedor-busqueda">
            <form ref={formulario} onSubmit={onSubmit}>
                <div className="busqueda">
                    <div className="contenedor-boton">
                        <input type="text" className="textos" name="busqueda" />
                        <button type="button" className="boton-gris" onClick={onBuscar}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                    {opciones.length > 0 &&
                        <select name="estatus" className="textos" onChange={onBuscar}>
                            <option value={-1}>TODOS</option>
                            {opciones.map(opcion => (
                                <option key={opcion.nombre} value={opcion.id}>{opcion.nombre}</option>
                            ))}
                        </select>
                    }
                </div>
            </form>
            <a href={urlNuevo} className="boton-azul">
                <i className="fa-regular fa-circle-check"></i> {texto}
            </a>
        </div>
    )
}

export default Busqueda