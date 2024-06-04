import { useState } from "react";


export const useFormulario = ({ valoresIniciales }) => {
    const [formulario, setFormulario] = useState({ ...valoresIniciales });

    const Asignar = (event) => {
        const nombre = event.target.name;
        const valor = event.target.value;

        setFormulario({
            ...formulario,
            [nombre]: valor
        });
    }

    return {
        formulario,
        Asignar
    }
}
