import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function EditRegistros(){

    let { id } = useParams();
    let navigate = useNavigate();
    const [registro, setRegistro] = useState({});
    const hoy = new Date(Date.now());
    const fechaString = hoy.toLocaleDateString()

    useEffect(() => {
        axios.get(`http://localhost:3001/registrosDiarios/showRegistro/${id}?fecha=${fechaString}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setRegistro(response.data);
            });
    }, [])

    const registroId = registro.id;
    const [desayuno, setDesayuno] = useState(registro.desayuno);
    const [almuerzo, setAlmuerzo] = useState(registro.almuerzo);
    const [merienda, setMerienda] = useState(registro.merienda);
    const [cena, setCena] = useState(registro.cena);
    const [pasosDiarios, setPasosDiarios] = useState(registro.pasosDiarios);
    const [actividadFisica, setActividadFisica] = useState(registro.actividadFisica);
    const [horasSueno, setHorasSueno] = useState(registro.horasSueno);
    const [tiempoAireLibre, setTiempoAireLibre] = useState(registro.tiempoAireLibre);




    const editRegistro = () => {
        const data = {
            fecha: fechaString,
            desayuno: desayuno,
            almuerzo: almuerzo,
            merienda: merienda,
            cena: cena,
            pasosDiarios: pasosDiarios,
            actividadFisica: actividadFisica,
            horasSueno: horasSueno,
            tiempoAireLibre: tiempoAireLibre,
            PersonasDependienteId: id,
        }

        axios.put(`http://localhost:3001/registrosDiarios/registro/edit/${registroId}`, data,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    navigate(`/personaDependiente/${id}`);
                }
            })
    }

    return(
        <div className="App">
            <h1>Completar registro</h1>
            <div className="loginContainer">

                <label>Desayuno:</label>
                <input type="text"
                       name="desayuno"
                       defaultValue={registro.desayuno}
                       onChange={(event) => {
                           setDesayuno(event.target.value);
                       }}
                />

                <label>Almuerzo:</label>
                <input type="text"
                       name="almuerzo"
                       defaultValue={registro.almuerzo}
                       onChange={(event) => {
                           setAlmuerzo(event.target.value);
                       }}
                />

                <label>Merienda:</label>
                <input type="text"
                       name="merienda"
                       defaultValue={registro.merienda}
                       onChange={(event) => {
                           setMerienda(event.target.value);
                       }}
                />

                <label>Cena:</label>
                <input type="text"
                       name="cena"
                       defaultValue={registro.cena}
                       onChange={(event) => {
                           setCena(event.target.value);
                       }}
                />

                <label>Pasos Diarios:</label>
                <input type="text"
                       name="pasosDiarios"
                       defaultValue={registro.pasosDiarios}
                       onChange={(event) => {
                           setPasosDiarios(event.target.value);
                       }}
                />

                <label>Actividad física:</label>
                <input type="text"
                       name="actividadFisica"
                       defaultValue={registro.actividadFisica}
                       onChange={(event) => {
                           setActividadFisica(event.target.value);
                       }}
                />

                <label>Horas sueño:</label>
                <input type="double"
                       name="horasSueno"
                       defaultValue={registro.horasSueno}
                       onChange={(event) => {
                           setHorasSueno(event.target.value);
                       }}
                />

                <label>Tiempo aire libre:</label>
                <input type="text"
                       name="tiempoAireLibre"
                       defaultValue={registro.tiempoAireLibre}
                       onChange={(event) => {
                           setTiempoAireLibre(event.target.value);
                       }}
                />

                <button onClick={editRegistro}>Modificar</button>
            </div>
        </div>
    )
}

export default EditRegistros;
