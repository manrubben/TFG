import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


function EditFamiliar() {

    let { id } = useParams();
    const [familiar, setFamiliar] = useState({});
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/users/familiares/show/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setFamiliar(response.data)
            });
    })

    const [familiarNombre, setFamiliarNombre] = useState(familiar.nombre);
    const [familiarApellidos, setFamiliarApellidos] = useState(familiar.apellidos);
    const [familiarTelefono, setFamiliarTelefono] = useState(familiar.telefono);
    const [familiarUsername, setFamiliarUsername] = useState(familiar.username);

    const editFamiliar = () => {
        const data = {
            nombre: familiarNombre,
            apellidos: familiarApellidos,
            telefono: familiarTelefono,
            username: familiarUsername
        }

        axios.put(`http://localhost:3001/users/familiares/edit/${id}`, data,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    navigate(`/familiar/${id}`)
                }
            })
    }


    const deleteFamiliar = () => {
        axios.delete(`http://localhost:3001/users/familiares/delete/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    navigate('/coordinador/familiares')
                }
            })
    }


    return(
        <div className="App">
            <h1>EDITAR FAMILIAR</h1>
            <div className="loginContainer">

                <label>Nombre:</label>
                <input type="text"
                       name="nombre"
                       defaultValue={familiar.nombre}
                       onChange={(event) => {
                           setFamiliarNombre(event.target.value);
                       }}
                />

                <label>Apellidos:</label>
                <input type="text"
                       name="apellidos"
                       defaultValue={familiar.apellidos}
                       onChange={(event) => {
                           setFamiliarApellidos(event.target.value);
                       }}
                />

                <label>Teléfono:</label>
                <input type="text"
                       name="telefono"
                       defaultValue={familiar.telefono}
                       onChange={(event) => {
                           setFamiliarTelefono(event.target.value);
                       }}
                />

                <label>Username:</label>
                <input type="text"
                       name="username"
                       defaultValue={familiar.username}
                       onChange={(event) => {
                           setFamiliarUsername(event.target.value);
                       }}
                />

                <button onClick={editFamiliar}>Actualizar</button>
                <button onClick={deleteFamiliar}>Eliminar</button>
            </div>
        </div>
    )
}

export default EditFamiliar;
