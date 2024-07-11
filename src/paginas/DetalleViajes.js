import { useLocation } from "react-router-dom";


export const DetalleViajes = () => {
    const location = useLocation();
    return (
        <>
            <div className="contenedor-extra columnas-3">
                <div className="carta">
                    <div className="carta-encabezado"><h2></h2></div>
                </div>
                <div className="carta">x</div>
                <div className="carta">x</div>
            </div>
        </>
    )
}
