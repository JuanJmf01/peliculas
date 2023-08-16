import axios, { AxiosResponse, AxiosResponseHeaders } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../Utils/Button";
import { urlGeneros } from "../../Utils/endpoints";
import Paginacion from "../../Utils/Paginacion";
import { generoDTO } from "../generos.model";

export default function IndiceGeneros() {

    const [mostrargeneros, setMostrarGeneros] = useState<generoDTO[]>()
    const [totalPaginas, setTotalPaginas] = useState(0)
    const [recordsPorPagina, setRecordsPorPagina] = useState(5)
    const [pagina, setPagina] = useState(1)

    useEffect(() => {
        axios.get(urlGeneros, {
            params: { pagina, recordsPorPagina }
        })
            .then((respuesta: AxiosResponse<generoDTO[]>) => {
                const totalRegistros =
                    parseInt(respuesta.headers['cantidadtotalregistros'], 10)
                setTotalPaginas(Math.ceil(totalRegistros / recordsPorPagina))
                console.log(respuesta.data)
                setMostrarGeneros(respuesta.data)
            })
    }, [pagina, recordsPorPagina])

    return (
        <div>
            <h3>Indice Generos</h3>
            <Link to='/generos/crear'>Crear genero</Link>
            <Link to='/generos/editar'>Editar genero</Link>

            <div className='form-group' style={{ width: '150px' }}>
                <label>Registros por pagina: </label>
                <select className='form-control'
                    defaultValue={10}
                    onChange={e => {
                        setPagina(1)
                        setRecordsPorPagina(parseInt(e.currentTarget.value, 10))
                    }}>
                    <option value={5}>5</option>
                    <option value={10} >10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>

            <Paginacion cantidadTotalPaginas={totalPaginas}
                paginaActual={pagina}
                onChange={nuevaPagina => setPagina(nuevaPagina)}
            />

            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {mostrargeneros?.map(genero =>
                        <tr key={genero.id}>
                            <td>
                                <Link className='btn btn-primary' to={`/generos/${genero.id}`}>Mody</Link>
                                <Button className='btn btn-danger'>Delete</Button>
                            </td>
                            <td>{genero.nombre}</td>

                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    )
}