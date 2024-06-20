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
        tipo: "post",
        campos: campos,
        modal: setModal,
        recargar: Buscar
    };

    let encabezados = [];

    if (campos) {
        encabezados = campos.map(campo => campo.name);
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
                            {encabezados.map((titulo, key) => <th key={key}>{titulo}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buscando ? <tr>
                                <td style={{ textAlign: "center" }}
                                    colSpan={encabezados.length}>
                                    <Spinner />
                                </td>
                            </tr> :
                                registros
                                    && registros.Datos
                                    && registros.Datos.length > 0 ? registros.Datos.map((registro, key) =>
                                        <tr key={`${key}-${registro[0]}`}>
                                            {encabezados.map((titulo, key) =>
                                                <td key={`${key}-${titulo}-${registro[0]}`}>{registro[titulo]}</td>
                                            )}
                                        </tr>
                                    ) :
                                    <tr>
                                        <td style={{ textAlign: "center" }}
                                            colSpan={encabezados.length}>
                                            No hay registros
                                        </td>
                                    </tr>}
                    </tbody>
                </table>
            </div>
            {modal && <Modal {...opciones} />}
        </>
    )
}
