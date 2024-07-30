import { useEffect, useRef, useState } from "react";
import { useDatos } from "../hooks";
import { Formulario } from "./Formulario";

export const Modal = ({ titulo, url, metodo, campos, valores = [], modal, buscar }) => {
    const formulario = useRef();
    const [mensaje, setMensaje] = useState();

    const [informacion, setInformacion] = useState({
        url: url,
        metodo: metodo,
        formulario: null
    });

    const { respuesta } = useDatos({ ...informacion });

    const Guardar = () => {
        const datos = new FormData(formulario.current);

        setInformacion({
            ...informacion,
            formulario: datos
        });
    }

    useEffect(() => {
        if (!respuesta.respuesta && !respuesta.completado) return;

        if (respuesta.respuesta && respuesta.respuesta.Error > 0) {
            setMensaje(respuesta.respuesta.Mensaje);
            return;
        }

        modal(false);
        buscar();
    }, [respuesta, modal, buscar]);

    return (
        <>
            <div className="bloqueo"></div>
            <div className="contenedor-modal">
                <div className="modal">
                    <div className="modal-encabezado">
                        <h2>{titulo}</h2>
                        <span>
                            <i className="fa-solid fa-rectangle-xmark" onClick={() => modal(false)}></i>
                        </span>
                    </div>
                    <div className="modal-cuerpo">
                        <div className="modal-contenido">
                            <label><span className="requerido">*</span> Campos requeridos</label>
                            <form className="formulario" ref={formulario}>
                                {campos && campos.map(campo =>
                                    <Formulario
                                        key={campo.name}
                                        {...campo}
                                        value={
                                            valores["id_" + campo.name] ? valores["id_" + campo.name] :
                                                valores[campo.name] && valores[campo.name]
                                        } />
                                )}
                                {respuesta && respuesta.Mensaje}
                            </form>
                        </div>
                    </div>
                    <div className="modal-pie">
                        <div className="alinear-derecha contenedor-boton">
                            {mensaje && <span className="error">{mensaje}</span>}
                            <button type="button"
                                className="boton-gris contorno"
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