import { FormularioUnidades } from "../formularios";
import { Tabla } from "../utilidades";


export const Unidades = () => {
    const { Formulario } = FormularioUnidades();
    console.log(Formulario);

    return (
        <div className="contenedor-extra">
            <Tabla url={"Unidades"} campos={Formulario} />
        </div>
    )
}
