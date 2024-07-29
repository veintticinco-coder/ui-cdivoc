import { useDatos } from "../hooks"

export const FormularioUnidades = () => {
    const { respuesta: { respuesta: Marcas } } = useDatos({ url: "Unidades/Marca", method: "GET" });

    const Formulario = [{
        type: "hidden",
        label: "ID",
        name: "id",
        required: true
    },
    {
        type: "select",
        label: "Marca",
        name: "marca",
        value: "id_marca",
        options: Marcas?.Datos,
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
    },
    {
        type: "options",
        label: "Acciones",
        options: ["Editar", "Borrar"]
    }
    ];

    return { Formulario }
}
