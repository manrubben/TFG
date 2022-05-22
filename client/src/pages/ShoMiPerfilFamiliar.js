import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../helpers/AuthContext";


function ShowMiPerfilFamiliar() {

    const { authState } = useContext(AuthContext);
    const [familiar, setFamiliar] = useState({});
    const id = authState.id;

    useEffect(() => {
        axios.get(`http://localhost:3001/users/familiares/show/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setFamiliar(response.data)
            });
    }, [])

    return(
        <div className="App">
            <h1>Detalles de {familiar.nombre} {familiar.apellidos}</h1>
            <div className="datos-familiar">
                <div>Nombre: {familiar.nombre}</div>
                <div>Apellidos: {familiar.apellidos}</div>
                <div>Teléfono: {familiar.telefono}</div>
                <div>Username: {familiar.username}</div>
            </div>
        </div>
    )
}

export default ShowMiPerfilFamiliar;
