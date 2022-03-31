import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

function EditAuxiliar() {

    let { id } = useParams();
    const [auxiliar, setAuxiliar] = useState({});
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/users/auxiliares/show/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setAuxiliar(response.data)
            });
    })

    const [auxiliarNombre, setAuxiliarNombre] = useState(auxiliar.nombre);
    const [auxiliarApellidos, setAuxiliarApellidos] = useState(auxiliar.apellidos);
    const [auxiliarTelefono, setAuxiliarTelefono] = useState(auxiliar.telefono);
    const [auxiliarUsername, setAuxiliarUsername] = useState(auxiliar.username);



    const editAuxiliar = () => {
        const data = {
            nombre: auxiliarNombre,
            apellidos: auxiliarApellidos,
            telefono: auxiliarTelefono,
            username: auxiliarUsername,
        }

        axios.put(`http://localhost:3001/users/auxiliares/edit/${id}`, data,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    navigate(`/auxiliar/${id}`)
                }
            })
    }

    return(
        <div>
            <h1>Editar auxiliar</h1>
            <div className="loginContainer">

                <label>Nombre:</label>
                <input type="text"
                       name="nombre"
                       defaultValue={auxiliar.nombre}
                       onChange={(event) => {
                           setAuxiliarNombre(event.target.value);
                       }}
                />

                <label>Apellidos:</label>
                <input type="text"
                       name="apellidos"
                       defaultValue={auxiliar.apellidos}
                       onChange={(event) => {
                           setAuxiliarApellidos(event.target.value);
                       }}
                />

                <label>Teléfono:</label>
                <input type="text"
                       name="telefono"
                       defaultValue={auxiliar.telefono}
                       onChange={(event) => {
                           setAuxiliarTelefono(event.target.value);
                       }}
                />

                <label>Username:</label>
                <input type="text"
                       name="username"
                       defaultValue={auxiliar.username}
                       onChange={(event) => {
                           setAuxiliarUsername(event.target.value);
                       }}
                />

                <button onClick={editAuxiliar}>Actualizar</button>

            </div>
        </div>
    )
}

export default EditAuxiliar;
