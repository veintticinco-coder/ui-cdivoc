export const FormularioClientes = [
    {
        type: "hidden",
        label: "ID",
        name: "id",
        required: true
    },
    {
        type: "text",
        label: "Nombre",
        name: "nombre",
        max: 50,
        required: true,
        etiqueta: "fa-regular fa-user"
    },
    {
        type: "text",
        label: "Paterno",
        name: "paterno",
        max: 50,
        required: true,
        etiqueta: "fa-regular fa-user"
    },
    {
        type: "text",
        label: "Materno",
        name: "materno",
        max: 50,
        required: false,
        etiqueta: "fa-regular fa-user"
    },
    {
        type: "email",
        label: "Correo",
        name: "correo",
        max: 50,
        required: true,
        etiqueta: "fa-solid fa-at"
    },
    {
        type: "text",
        label: "Teléfono",
        name: "telefono",
        max: 15,
        required: true,
        etiqueta: "fa-solid fa-phone"
    },
    {
        type: "text",
        label: "Empresa",
        name: "empresa",
        max: 50,
        required: true,
        etiqueta: "fa-solid fa-user-tie"
    },
    {
        type: "text",
        label: "RFC",
        name: "rfc",
        max: 18,
        required: true,
        className: "mayuscula",
        etiqueta: "fa-solid fa-file"
    },
    {
        type: "select",
        label: "Estatus",
        name: "estatus",
        required: true,
        options: [
            { id: "A", name: "ACTIVO" },
            { id: "I", name: "INACTIVO" }
        ],
        etiqueta: "fa-solid fa-repeat"
    },
    {
        type: "options",
        label: "Acciones",
        options: ["Editar", "Borrar"]
    }];


// {
//     type: "options",
//     label: "Usuario",
//     name: "usuario"
// }