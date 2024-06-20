import { FormularioClientes } from "../formularios";
import { Tabla } from "../utilidades";


export const Clientes = () => {
    const campos = FormularioClientes;

    return (
        <>
            <div className="contenedor">
                <Tabla url={"Clientes"} campos={campos} />
            </div>
        </>
    )
}
