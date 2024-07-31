import { type } from "@testing-library/user-event/dist/type";
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
        required: true,
        etiqueta: "fa-solid fa-car"
    },
    {
        type: "text",
        label: "Modelo",
        name: "modelo",
        required: true,
        etiqueta: "fa-regular fa-calendar"
    },
    {
        type: "text",
        label: "Placa",
        name: "placa",
        required: true,
        etiqueta: "fa-regular fa-id-card"
    },
    {
        type: "text",
        label: "Color",
        name: "color",
        required: true,
        etiqueta: "fa-solid fa-palette"
    },
    {
        type: "number",
        label: "# Pasajeros",
        name: "pasajeros",
        required: true,
        etiqueta: "fa-solid fa-hashtag"
    },
    {
        type: "checkbox",
        label: "Es de Lujo",
        name: "delujo",
        require: true,
        etiqueta: ["fa-solid fa-toggle-off", "fa-solid fa-toggle-on"]
    },
    {
        type: "options",
        label: "Acciones",
        options: ["Editar", "Borrar"]
    }
    ];

    return { Formulario }
}
