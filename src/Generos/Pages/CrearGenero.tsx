//UseNavigate me permite redireccionar la pagina despues de darle click a un boton
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { urlGeneros } from "../../Utils/endpoints"
import MostrarErrores from "../../Utils/MostrarErrores"

import '../css/formularioGenero.css'
import FormularioGenero from "../FomularioGenero"
import { generoCreacionDTO } from "../generos.model"

export default function CrearGenero() {
    //useNavigate: cuando precione el boton me redirecciona a otra parte
    const navigate = useNavigate()
    const [errores, setErrores] = useState<string[]>([])

    async function crear(genero: generoCreacionDTO) {
        try {
            await axios.post(urlGeneros, genero);
            navigate('/generos')
        }
        catch (error) {
            setErrores(error.response.data)
        }
    }

    return (
        <>
            <h3>Crear Genero</h3>
            <MostrarErrores errores={errores} />
            <FormularioGenero modelo={{
                nombre: ''
            }}
                onSubmit={async valores => {
                    await crear(valores)
                }}

            />

        </>
    )
}