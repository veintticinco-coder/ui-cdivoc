import { useDatos } from "../hooks"

export const FormularioUnidades = () => {
    const { respuesta: Marcas } = useDatos("Unidades/Marca", "GET");

    const Formulario = [{
        type: "select",
        label: "Marca",
        name: "marca",
        optios: Marcas?.Datos,
        required: true
    },
    {
        type: "text",
        label: "Modelo",
        name: "modelo",
        required: true
    },
    {
        type: "text",
        label: "Placa",
        name: "placa",
        required: true
    },
    {
        type: "text",
        label: "Color",
        name: "color",
        required: true
    }, {
        type: "number",
        label: "# Pasajeros",
        name: "pasajeros",
        required: true
    }];

    return { Formulario }
}
