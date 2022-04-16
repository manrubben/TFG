import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

function ShowAuxiliar() {
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

    return(
        <div className="App">
            <h1>Detalles de {auxiliar.nombre} {auxiliar.apellidos}</h1>
            <div className="datos-auxiliar">
                <div>Nombre: {auxiliar.nombre}</div>
                <div>Apellidos: {auxiliar.apellidos}</div>
                <div>Teléfono: {auxiliar.telefono}</div>
                <div>Username: {auxiliar.username}</div>
            </div>
            <button onClick={() => {
                navigate(`/auxiliar/${auxiliar.id}/edit`)
            }}>Editar</button>
        </div>
    )
}

export default ShowAuxiliar;
