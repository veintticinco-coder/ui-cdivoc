import { useRef, useState } from "react";
import { useDatos } from "../hooks";
import { Formulario } from "./Formulario";

export const Modal = ({ url, metodo, campos, modal, recargar }) => {
    const formulario = useRef();

    const [informacion, setInformacion] = useState({
        url: url,
        tipo: metodo,
        formulario: null
    });

    const { respuesta } = useDatos({ ...informacion });

    const Guardar = () => {
        const datos = new FormData(formulario.current);

        setInformacion({
            ...informacion,
            formulario: datos,
            accion: recargar
        });
    }

    return (
        <>
            <div className="bloqueo"></div>
            <div className="contenedor-modal">
                <div className="modal">
                    <div className="modal-encabezado">
                        <h2>Registro Cliente</h2>
                        <span>
                            <i className="fa-solid fa-rectangle-xmark" onClick={() => modal(false)}></i>
                        </span>
                    </div>
                    <div className="modal-cuerpo">
                        <div className="modal-contenido">
                            <label><span className="requerido">*</span> Campos requeridos</label>
                            <form className="formulario" ref={formulario}>
                                {campos && campos.map(campo => <Formulario key={campo.name} {...campo} />)}
                                {respuesta && respuesta.Mensaje}
                            </form>
                        </div>
                    </div>
                    <div className="modal-pie">
                        <div className="alinear-derecha contenedor-boton">
                            <button type="button"
                                className="boton-gris"
                                onClick={() => modal(false)}>Cancelar
                            </button>
                            <button type="button"
                                className="boton-azul"
                                onClick={Guardar}>Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}