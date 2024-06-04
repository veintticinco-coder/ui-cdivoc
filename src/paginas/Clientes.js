import { FormularioClientes } from "../formularios";
import { Tabla } from "../utilidades";


export const Clientes = () => {
    const campos = FormularioClientes;

    return (
        <>
            <Tabla url={"Clientes"} campos={campos} />
        </>
    )
}
