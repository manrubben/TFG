import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";


function EditPersonaDependiente() {

    let { id } = useParams();
    const [personaDependiente, setPersonaDependiente] = useState({});
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/personasDependientes/show/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setPersonaDependiente(response.data);
            });
    }, [])

    const [personaNombre, setPersonaNombre] = useState(personaDependiente.nombre);
    const [personaApellidos, setPersonaApellidos] = useState(personaDependiente.apellidos);
    const [personaEnfermedad, setPersonaEnfermedad] = useState(personaDependiente.enfermedad);
    const [personaGradoDeDependencia, setPersonaGradoDeDependencia] = useState(personaDependiente.gradoDeDependencia);
    const [personaPastillasDia, setPersonaPastillasDia] = useState(personaDependiente.pastillasDia);
    const [personaPastillasTarde, setPersonaPastillasTarde] = useState(personaDependiente.pastillasTarde);
    const [personaPastillasNoche, setPersonaPastillasNoche] = useState(personaDependiente.pastillasNoche);

    const editPersonaDependiente = () => {
        const data = {
            nombre: personaNombre,
            apellidos: personaApellidos,
            enfermedad: personaEnfermedad,
            gradoDeDependencia: personaGradoDeDependencia,
            pastillasDia: personaPastillasDia,
            pastillasTarde: personaPastillasTarde,
            pastillasNoche: personaPastillasNoche,
        }

        axios.put(`http://localhost:3001/personasDependientes/edit/${id}`, data,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    navigate(`/personaDependiente/${id}`)
                }
            })
    }

    const deletePersonaDependiente = () => {
        axios.delete(`http://localhost:3001/personasDependientes/delete/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    navigate('/coordinador/personasDependientes')
                }
            })
    }

    return(
        <div>
            <h1>Editar persona dependiente</h1>

            <div className="loginContainer">
                <label>Nombre:</label>
                <input type="text"
                       name="nombre"
                       defaultValue={personaDependiente.nombre}
                       onChange={(event) => {
                           setPersonaNombre(event.target.value);
                       }}
                />

                <label>Apellidos:</label>
                <input type="text"
                       name="apellidos"
                       defaultValue={personaDependiente.apellidos}
                       onChange={(event) => {
                           setPersonaApellidos(event.target.value);
                       }}
                />

                <label>Enfermedad:</label>
                <input type="text"
                       name="enfermedad"
                       defaultValue={personaDependiente.enfermedad}
                       onChange={(event) => {
                           setPersonaEnfermedad(event.target.value);
                       }}
                />

                <label>Grado de dependencia:</label>
                <input type="text"
                       name="gradoDeDependencia"
                       defaultValue={personaDependiente.gradoDeDependencia}
                       onChange={(event) => {
                           setPersonaGradoDeDependencia(event.target.value);
                       }}
                />

                <label>Pastillas de dia:</label>
                <input type="text"
                       name="pastillasDia"
                       defaultValue={personaDependiente.pastillasDia}
                       onChange={(event) => {
                           setPersonaPastillasDia(event.target.value);
                       }}
                />

                <label>Pastillas de tarde:</label>
                <input type="text"
                       name="pastillasTarde"
                       defaultValue={personaDependiente.pastillasTarde}
                       onChange={(event) => {
                           setPersonaPastillasTarde(event.target.value);
                       }}
                />

                <label>Pastillas de noche:</label>
                <input type="text"
                       name="pastillasNoche"
                       defaultValue={personaDependiente.pastillasNoche}
                       onChange={(event) => {
                           setPersonaPastillasNoche(event.target.value);
                       }}
                />

                <button onClick={editPersonaDependiente}>Actualizar</button>
                <button onClick={deletePersonaDependiente}>Eliminar</button>
            </div>
        </div>
    )
}

export default EditPersonaDependiente;
