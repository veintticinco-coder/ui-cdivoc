import { useDatos } from "../hooks/useDatos";

export const FormularioViajes = ({ origen, destino }) => {
    const { respuesta: { respuesta: TipoServicio } } = useDatos({ url: "Viajes/TipoServicio", metodo: "GET" });

    const Encabezado = [
        {
            type: "select",
            name: "Tipo Servicio",
            required: true,
            options: TipoServicio?.Datos
        }];

    const Fecha = [{
        type: "date",
        name: "fecha",
        required: true
    },
    {
        type: "time",
        name: "hora",
        required: true
    }];

    const Rutas = [{
        type: "text",
        name: "origen",
        value: origen,
        required: true
    },
    {
        type: "text",
        name: "destino",
        value: destino,
        required: true
    }];

    return {
        Encabezado,
        Fecha,
        Rutas
    }
}






