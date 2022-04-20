import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function CreateAuxiliar() {

    const [auxiliarNombre, setAuxiliarNombre] = useState("");
    const [auxiliarApellidos, setAuxiliarApellidos] = useState("");
    const [auxiliarTelefono, setAuxiliarTelefono] = useState("");
    const [auxiliarUsername, setAuxiliarUsername] = useState("");
    const [auxiliarPassword, setAuxiliarPassword] = useState("");

    const [auxiliaresList, setAuxiliaresList] = useState("")
    let navigate = useNavigate();

    const addAuxiliar = () => {
        const data = {
            nombre: auxiliarNombre,
            apellidos: auxiliarApellidos,
            telefono: auxiliarTelefono,
            rol: "AUXILIAR",
            username: auxiliarUsername,
            password: auxiliarPassword,
        }
        axios.post("http://localhost:3001/users/create", data,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                if(response.data.error) {
                    console.log(response.data.error);
                } else {
                    setAuxiliaresList([...auxiliaresList, {
                        nombre: auxiliarNombre,
                        apellidos: auxiliarApellidos,
                        telefono: auxiliarTelefono,
                        rol: "AUXILIAR",
                        username: auxiliarUsername,
                        password: auxiliarPassword,
                    }])
                    navigate('/coordinador/auxiliares')
                }
            })
    }

    return(
        <div>
            <h1>Añadir auxiliar</h1>

            <div className="loginContainer">

                <label>Nombre:</label>
                <input type="text"
                       name="nombre"
                       onChange={(event) => {
                           setAuxiliarNombre(event.target.value);
                       }}
                />

                <label>Apellidos:</label>
                <input type="text"
                       name="apellidos"
                       onChange={(event) => {
                           setAuxiliarApellidos(event.target.value);
                       }}
                />

                <label>Teléfono:</label>
                <input type="text"
                       name="telefono"
                       onChange={(event) => {
                           setAuxiliarTelefono(event.target.value);
                       }}
                />

                <label>Username:</label>
                <input type="text"
                       name="username"
                       onChange={(event) => {
                           setAuxiliarUsername(event.target.value);
                       }}
                />

                <label>Password:</label>
                <input type="password"
                       name="password"
                       onChange={(event) => {
                           setAuxiliarPassword(event.target.value);
                       }}
                />

                <button onClick={addAuxiliar}>Añadir</button>
            </div>
        </div>
    )
}

export default CreateAuxiliar;
