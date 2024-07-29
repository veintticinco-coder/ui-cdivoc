import { useEffect, useState } from "react";
import { useDatos } from "../hooks";

export const Confirmacion = ({ url, metodo, campos, valores = [], modal, buscar }) => {
    const [mensaje, setMensaje] = useState();

    const [informacion, setInformacion] = useState({
        url: url,
        metodo: metodo,
        formulario: null
    });

    const { respuesta } = useDatos({ ...informacion });

    const Guardar = () => {
        const datos = new FormData();
        datos.append("id", valores["id"])

        setInformacion({
            ...informacion,
            formulario: datos
        });
    }

    useEffect(() => {
        if (!respuesta.respuesta && !respuesta.completado) return;

        if (respuesta.respuesta.Error === 1) {
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
                        <h2>Borrar Registro</h2>
                        <span>
                            <i className="fa-solid fa-rectangle-xmark" onClick={() => modal(false)}></i>
                        </span>
                    </div>
                    <div className="modal-cuerpo">
                        <div className="modal-contenido contenedor-datos">
                            <span className="requerido">¿Deseas eliminiar este registro?</span>
                            {campos && campos.map(campo => (campo.name !== "id" && campo.type !== "options" &&
                                <span key={`Eliminar${campo.name}`}>
                                    <label className="negrita">{campo.name}</label> : {valores[campo.name]}
                                </span>))}
                        </div>
                    </div>
                    <div className="modal-pie">
                        {mensaje && mensaje}
                        <div className="alinear-derecha contenedor-boton">
                            <button type="button"
                                className="boton-gris contorno"
                                onClick={() => modal(false)}>Cancelar
                            </button>
                            <button type="button"
                                className="boton-rojo"
                                onClick={Guardar}>Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}