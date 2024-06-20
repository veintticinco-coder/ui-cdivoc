import { useDatos } from "../hooks/useDatos";

export const FormularioViajes = () => {
    const { respuesta: { respuesta: TipoServicio } } = useDatos({ url: "Viajes/TipoServicio", metodo: "GET" });
    /*const TipoServicio = [
        { id: 1, name: "CRUCE LÍNEA EXPRESS" },
        { id: 2, name: "CRUCE LÍNEA REGULAR" },
        { id: 3, name: "SERVICIO LOCAL EL PASO" },
        { id: 4, name: "SERVICIO LOCAL CD. JUÁREZ" },
        { id: 5, name: "DISPOSICIÓN LOCAL 6 HRS" },
        { id: 6, name: "DISPOSICIÓN LOCAL 8 HRS" },
        { id: 7, name: "DISPOSICIÓN LOCAL 12 HRS" },
        { id: 8, name: "DISPOSICIÓN FORANEA" }
    ];*/

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
        required: true
    },
    {
        type: "text",
        name: "destino",
        required: true
    }];

    return {
        Encabezado,
        Fecha,
        Rutas
    }
}






