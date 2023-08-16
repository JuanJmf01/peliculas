export default function MostrarErrores(props: mostrarErroresProps) {
    const style = {color: 'red'}
    return (
        <div>
            {props.errores ? <ul style={style}>
                {props.errores.map((error, indice) => <li key={indice}>{error}</li>)}
            </ul> : null}
        </div>
    )
}


interface mostrarErroresProps {
    errores?: string[]
}