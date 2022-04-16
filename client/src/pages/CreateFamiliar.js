import axios from "axios";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

function CreateFamiliar() {

    let { id } = useParams();

    const [familiarNombre, setFamiliarNombre] = useState("");
    const [familiarApellidos, setFamiliarApellidos] = useState("");
    const [familiarTelefono, setFamiliarTelefono] = useState("");
    const [familiarUsername, setFamiliarUsername] = useState("");
    const [familiarPassword, setFamiliarPassword] = useState("");

    let navigate = useNavigate();

    const addFamiliar = async () => {
        const data = {
            nombre: familiarNombre,
            apellidos: familiarApellidos,
            telefono: familiarTelefono,
            rol: "FAMILIAR",
            username: familiarUsername,
            password: familiarPassword
        }

        await axios.post(`http://localhost:3001/users/create`, data,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                if(response.data.error) {
                    console.log(response.data.error);
                }
            })

        await axios.post(`http://localhost:3001/userPersonaDependiente/personaDependiente/${id}/addFamiliar`, data,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                if(response.data.error) {
                    console.log(response.data.error);
                } else {
                    navigate(`/personaDependiente/${id}`)
                }
            })
    }

    return(
        <div className="App">
            <h1>Añadir familiar</h1>

            <div className="loginContainer">
                <label>Nombre:</label>
                <input type="text"
                       name="nombre"
                       onChange={(event) => {
                           setFamiliarNombre(event.target.value);
                       }}
                />

                <label>Apellidos:</label>
                <input type="text"
                       name="apellidos"
                       onChange={(event) => {
                           setFamiliarApellidos(event.target.value);
                       }}
                />

                <label>Teléfono:</label>
                <input type="text"
                       name="telefono"
                       onChange={(event) => {
                           setFamiliarTelefono(event.target.value);
                       }}
                />

                <label>Username:</label>
                <input type="text"
                       name="username"
                       onChange={(event) => {
                           setFamiliarUsername(event.target.value);
                       }}
                />

                <label>Password:</label>
                <input type="password"
                       name="password"
                       onChange={(event) => {
                           setFamiliarPassword(event.target.value);
                       }}
                />

                <button onClick={addFamiliar}>Submit</button>

            </div>
        </div>
    )
}

export default CreateFamiliar;
