import { useState } from "react";
import { useDatos } from "../hooks";
import { Modal } from "./Modal";
import { Spinner } from "./Spinner";
import { Confirmacion } from "./Confirmacion";


export const Tabla = ({ url, campos }) => {
    const [confirmacion, setConfirmacion] = useState(false);
    const [modal, setModal] = useState(false);
    const [buscando, setBuscando] = useState(false);
    const [opciones, setOpciones] = useState({});

    const { respuesta: registros, Enviar } = useDatos({ url: url, metodo: "GET" });

    const Buscar = () => {
        setBuscando(true);
        setTimeout(() => {
            setModal(false);
            setBuscando(false);
            Enviar();
        }, 500)
    }

    const Boton = ({ options, valores }) => (<>
        <div className="contenedor-acciones">
            {options.map(option => (<>
                {(option === "Editar") &&
                    <span
                        key={`Editar${valores.id}`}
                        className="boton-editar"
                        onClick={() => Editar(valores)}
                        title="Editar">
                        <i className="fa-solid fa-wrench"></i>
                    </span>
                }
                {(option === "Borrar") &&
                    <span
                        type="button"
                        key={`Borrar${valores.id}`}
                        className="boton-borrar"
                        title="Borrar"
                        onClick={() => Borrar(valores)}>
                        <i className="fa-solid fa-trash"></i>
                    </span>
                }
            </>))}
        </div>
    </>)

    const Lista = () => {
        const { Datos } = registros.respuesta;
        return Datos.map((registro, key) =>
            <tr key={`${key}-${registro[0]}`}>
                {campos.map((titulo, key) => {
                    return titulo.type !== "hidden" &&
                        <td key={`${key}-${titulo}-${registro[titulo.name]}`}>
                            {titulo.type !== "options" ?
                                registro[titulo.name] :
                                <Boton key={`Botonoes${key}`} options={titulo.options} valores={registro} />}
                        </td>
                })}
            </tr>
        );
    }

    const Nuevo = () => {
        setOpciones({
            titulo: "Nuevo Registro",
            url: url + "/Registrar",
            metodo: "post",
            campos: campos,
            modal: setModal,
            buscar: Buscar
        });

        setModal(true);
    }

    const Editar = (datos) => {
        setOpciones({
            titulo: "Editar Registro",
            url: url + "/Editar",
            metodo: "post",
            campos: campos,
            valores: datos,
            modal: setModal,
            buscar: Buscar
        });

        setModal(true);
    }

    const Borrar = (datos) => {
        setOpciones({
            titulo: "Borrar Registro",
            url: url + "/Borrar",
            metodo: "post",
            campos: campos,
            valores: datos,
            modal: setConfirmacion,
            buscar: Buscar
        });

        setConfirmacion(true);
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
                    <button type="button" className="boton-azul" onClick={Nuevo}>
                        <i className="fa-regular fa-circle-check"></i> Nuevo
                    </button>
                </div>
            </div>
            <div className="contenedor-tabla">
                <table className="tabla">
                    <thead>
                        <tr>
                            {campos.map((titulo, key) => {
                                return titulo.type !== "hidden" && <th key={`${key}-${titulo.name}`}>{titulo.label}</th>
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
                {modal && <Modal {...opciones} />}
                {confirmacion && <Confirmacion {...opciones} />}
            </div >
        </>
    )
}
