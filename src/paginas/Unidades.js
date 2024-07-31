import { FormularioUnidades } from "../formularios";
import { Tabla } from "../utilidades";


export const Unidades = () => {
    const { Formulario } = FormularioUnidades();

    return (
        <div className="contenedor-extra">
            <Tabla url={"Unidades"} campos={Formulario} />
        </div>
    )
}
