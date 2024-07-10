import { useDatos } from "../hooks/useDatos";

export const FormularioViajes = ({ origen, destino }) => {
    const { respuesta: { respuesta: TipoServicio } } = useDatos({ url: "Viajes/TipoServicio", metodo: "GET" });
    const { respuesta: { respuesta: Clientes } } = useDatos({ url: "Clientes/Lista", metodo: "GET" });

    const Encabezado = [{
        type: "select",
        label: "Tipo Servicio",
        name: "tiposervicio",
        required: true,
        options: TipoServicio?.Datos
    },
    {
        type: "select",
        label: "Cliente",
        name: "idcliente",
        required: true,
        options: Clientes?.Datos
    }];

    const Fecha = [{
        type: "datetime-local",
        label: "Fecha",
        name: "fecha",
        required: true
    },
    {
        type: "time",
        label: "Hora",
        name: "hora",
        required: true
    }];

    const Rutas = [{
        type: "text",
        label: "Origen",
        name: "origen",
        value: origen,
        required: true
    },
    {
        type: "text",
        label: "Destino",
        name: "destino",
        value: destino,
        required: true
    }];

    const Extras = [{
        type: "number",
        label: "# de Pasajeros",
        name: "pasajeros",
        required: "true"
    }]

    return {
        Encabezado,
        Fecha,
        Rutas,
        Extras
    }
}






