import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";


function ShowFamiliar() {
    let { id } = useParams();
    const [familiar, setFamiliar] = useState({});
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/users/familiares/show/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setFamiliar(response.data)
            });
    }, [])

    return(
        <div>
            <h1>Show familiar</h1>
            <div className="post" id="individual">
                <div>Nombre: {familiar.nombre}</div>
                <div>Apellidos: {familiar.apellidos}</div>
                <div>Teléfono: {familiar.telefono}</div>
                <div>Username: {familiar.username}</div>
            </div>
            <button onClick={() => {
                navigate(`/familiar/${familiar.id}/edit`)
            }}>Editar</button>
        </div>
    )
}

export default ShowFamiliar;
