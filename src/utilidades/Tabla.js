import { useState } from "react";
import { useDatos } from "../hooks";
import { Modal } from "./Modal";

export const Tabla = ({ url, campos }) => {
    const { respuesta: registros, Enviar } = useDatos({ url: url, tipo: "GET" });
    const [modal, setModal] = useState(false);

    const opciones = {
        url: url,
        tipo: "post",
        campos: campos,
        modal: setModal,
        recargar: Enviar
    };

    let encabezados = [];

    if (campos) {
        encabezados = campos.map(campo => campo.name);
    }

    return (
        <>
            <div className="contenedor-boton alinear-derecha">
                <button type="button" className="boton-azul" title="Recargar">
                    <i className="fa-solid fa-arrows-rotate" onClick={Enviar}></i>
                </button>
                <button type="button" className="boton-azul" onClick={() => setModal(true)}>
                    <i className="fa-regular fa-circle-check"></i> Nuevo
                </button>
            </div>
            <div className="contenedor-tabla">
                <table className="tabla">
                    <thead>
                        <tr>
                            {encabezados.map((titulo, key) => <th key={key}>{titulo}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {registros
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
