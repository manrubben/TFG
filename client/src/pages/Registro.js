import axios from "axios";
import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Registros() {

    let { id } = useParams();
    let navigate = useNavigate();

    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        rol: "",
        status: false,
    });

    useEffect(() => {
        axios
            .get("http://localhost:3001/users/auth", {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
            .then((response) => {
                if (response.data.error) {
                    setAuthState({...authState, status: false});
                } else {
                    setAuthState({
                        username: response.data.username,
                        id: response.data.id,
                        rol: response.data.rol,
                        status: true,
                    });
                    console.log(response.data.rol)
                }
            });
    }, []);

    const [desayuno, setDesayuno] = useState("");
    const [almuerzo, setAlmuerzo] = useState("");
    const [merienda, setMerienda] = useState("");
    const [cena, setCena] = useState("");
    const [pasosDiarios, setPasosDiarios] = useState("");
    const [actividadFisica, setActividadFisica] = useState("");
    const [horasSueno, setHorasSueno] = useState("");
    const [tiempoAireLibre, setTiempoAireLibre] = useState("");


    const crearRegistro = async () => {
        const data = {
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
        await axios.post("http://localhost:3001/registrosDiarios/addRegistro", data,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                if(response) {
                    console.log(response);
                }
            })

        const data2 = {
            auxiliarId : authState.id,
        }


        await axios.post(`http://localhost:3001/registrosDiarios/addAuxiliarRegistro/${id}`, data2,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {

                if(response.data.error) {
                    console.log(data.error);
                } else {
                    console.log(data2);
                    navigate(`/personaDependiente/${id}`)
                }
            })
    }



    return(
        <div>
            <h1>Registro Diario</h1>

            <div className="loginContainer">

                <label>Desayuno:</label>
                <input type="text"
                       name="desayuno"
                       onChange={(event) => {
                           setDesayuno(event.target.value);
                       }}
                />

                <label>Almuerzo:</label>
                <input type="text"
                       name="almuerzo"
                       onChange={(event) => {
                           setAlmuerzo(event.target.value);
                       }}
                />

                <label>Merienda:</label>
                <input type="text"
                       name="merienda"
                       onChange={(event) => {
                           setMerienda(event.target.value);
                       }}
                />

                <label>Cena:</label>
                <input type="text"
                       name="cena"
                       onChange={(event) => {
                           setCena(event.target.value);
                       }}
                />

                <label>Pasos Diarios:</label>
                <input type="text"
                       name="pasosDiarios"
                       onChange={(event) => {
                           setPasosDiarios(event.target.value);
                       }}
                />

                <label>Actividad Física:</label>
                <input type="text"
                       name="actividadFisica"
                       onChange={(event) => {
                           setActividadFisica(event.target.value);
                       }}
                />

                <label>Horas de sueño:</label>
                <input type="double"
                       name="horasSueno"
                       onChange={(event) => {
                           setHorasSueno(event.target.value);
                       }}
                />

                <label>Tiempo al aire libre:</label>
                <input type="text"
                       name="tiempoAireLibre"
                       onChange={(event) => {
                           setTiempoAireLibre(event.target.value);
                       }}
                />

                <button onClick={crearRegistro}>Guardar Registro</button>

            </div>
        </div>
    )

}

export default Registros;