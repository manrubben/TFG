import axios from "axios";
import {useState} from "react";

function Coordinador() {

    const [personaNombre, setPersonaNombre] = useState("");
    const [personaApellidos, setPersonaApellidos] = useState("");
    const [personaEnfermedad, setPersonaEnfermedad] = useState("");
    const [personaGradoDeDependencia, setPersonaGradoDeDependencia] = useState("");
    const [personaPastillasDia, setPersonaPastillasDia] = useState("");
    const [personaPastillasTarde, setPersonaPastillasTarde] = useState("");
    const [personaPastillasNoche, setPersonaPastillasNoche] = useState("");

    const [personasDependientesList, setPersonasDependientesList] = useState("")

    const addPersonaDependiente = () => {
        const data = {
            nombre: personaNombre,
            apellidos: personaApellidos,
            enfermedad: personaEnfermedad,
            gradoDeDependencia: personaGradoDeDependencia,
            pastillasDia: personaPastillasDia,
            pastillasTarde: personaPastillasTarde,
            pastillasNoche: personaPastillasNoche,
        }
        axios.post("http://localhost:3001/personasDependientes/create", data,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
            if (response.data.error) {
                console.log(response.data.error);
            } else {
                setPersonasDependientesList([...personasDependientesList, {
                    nombre: personaNombre,
                    apellidos: personaApellidos,
                    enfermedad: personaEnfermedad,
                    gradoDeDependencia: personaGradoDeDependencia,
                    pastillasDia: personaPastillasDia,
                    pastillasTarde: personaPastillasTarde,
                    pastillasNoche: personaPastillasNoche,
                }])
            }
        })
    }

    return(
        <div>
            <h1>Añadir persona dependiente</h1>

            <div className="loginContainer">
                <label>Nombre:</label>
                <input type="text"
                       name="nombre"
                       onChange={(event) => {
                           setPersonaNombre(event.target.value);
                       }}
                />

                <label>Apellidos:</label>
                <input type="text"
                       name="apellidos"
                       onChange={(event) => {
                           setPersonaApellidos(event.target.value);
                       }}
                />

                <label>Enfermedad:</label>
                <input type="text"
                       name="enfermedad"
                       onChange={(event) => {
                           setPersonaEnfermedad(event.target.value);
                       }}
                />

                <label>Grado de dependencia:</label>
                <input type="text"
                       name="gradoDeDependencia"
                       onChange={(event) => {
                           setPersonaGradoDeDependencia(event.target.value);
                       }}
                />

                <label>Pastillas de dia:</label>
                <input type="text"
                       name="pastillasDia"
                       onChange={(event) => {
                           setPersonaPastillasDia(event.target.value);
                       }}
                />

                <label>Pastillas de tarde:</label>
                <input type="text"
                       name="pastillasTarde"
                       onChange={(event) => {
                           setPersonaPastillasTarde(event.target.value);
                       }}
                />

                <label>Pastillas de noche:</label>
                <input type="text"
                       name="pastillasNoche"
                       onChange={(event) => {
                           setPersonaPastillasNoche(event.target.value);
                       }}
                />

                <button onClick={addPersonaDependiente}>Submit</button>
            </div>
        </div>
    )


}

export default Coordinador;
