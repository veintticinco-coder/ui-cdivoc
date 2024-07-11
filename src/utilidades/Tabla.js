import { useState } from "react";
import { useDatos } from "../hooks";
import { Modal } from "./Modal";
import { Spinner } from "./Spinner";

export const Tabla = ({ url, campos }) => {
    const { respuesta: registros, Enviar } = useDatos({ url: url, tipo: "GET" });
    const [modal, setModal] = useState(false);
    const [buscando, setBuscando] = useState(false);

    const Buscar = () => {
        setBuscando(true);
        setTimeout(() => {
            setModal(false);
            setBuscando(false);
            Enviar();
        }, 500)
    }

    const opciones = {
        url: url,
        metodo: "post",
        campos: campos,
        modal: setModal,
        buscar: Buscar
    };

    const Boton = ({ valor }) => {
        return (
            <button type="button"
                className={`boton-${valor ? "rojo" : "verde"} contorno circulo`}>
                {valor ? "Editar" : "Crear"}
            </button>
        );
    }

    const Lista = () => {
        const { Datos } = registros.respuesta;
        return Datos.map((registro, key) =>
            <tr key={`${key}-${registro[0]}`}>
                {campos.map((titulo, key) => {
                    return <td key={`${key}-${titulo}-${registro[titulo.name]}`}>
                        {titulo.type !== "options" ? registro[titulo.name] : <Boton valor={registro[titulo.name]} />}
                    </td>;
                })}
            </tr>
        );
    }

    return (
        <>
            <div className="tabla-opciones">
                <div className="contenedor-boton alinear-izquierda">
                    <input type="text" className="textos" />
                    <button type="button" className="boton-gris" onClick={Buscar}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
                <div className="contenedor-boton alinear-derecha">
                    <button type="button" className="boton-azul" onClick={() => setModal(true)}>
                        <i className="fa-regular fa-circle-check"></i> Nuevo
                    </button>
                </div>
            </div>
            <div className="contenedor-tabla">
                <table className="tabla">
                    <thead>
                        <tr>
                            {campos.map((titulo, key) => {
                                return <td key={`${key}-${titulo.name}`}>{titulo.label}</td>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {buscando ?
                            <tr>
                                <td style={{ textAlign: "center" }} colSpan={campos.length}><Spinner /></td>
                            </tr> : registros && registros.respuesta && registros.respuesta.Datos.length > 0 ?
                                <Lista /> :
                                <tr>
                                    <td style={{ textAlign: "center" }}
                                        colSpan={campos.length}>
                                        No hay registros
                                    </td>
                                </tr>}
                    </tbody>
                </table>
            </div >
            {modal && <Modal {...opciones} />}
        </>
    )
}
