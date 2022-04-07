import React, { useEffect, useState } from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import axios from "axios";
import AuxiliaresAsignados from "./AuxiliaresAsignados"

function ShowPersonaDependiente() {
    let { id } = useParams();
    const [personaDependiente, setPersonaDependiente] = useState({});
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/personasDependientes/show/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
            setPersonaDependiente(response.data);
        });
    })

    return(
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div>Nombre: {personaDependiente.nombre}</div>
                    <div>Apellidos: {personaDependiente.apellidos}</div>
                    <div>Enfermedad: {personaDependiente.enfermedad}</div>
                    <div>Grado de dependencia: {personaDependiente.gradoDeDependencia}</div>
                    <div>Pastillas de dia: {personaDependiente.pastillasDia}</div>
                    <div>Pastillas de tarde: {personaDependiente.pastillasTarde}</div>
                    <div>Pastillas de noche: {personaDependiente.pastillasNoche}</div>
                </div>
                <button onClick={() => {
                    navigate(`/personaDependiente/${personaDependiente.id}/registrosDiarios`)
                }}>RegistrosDiarios</button>

                <button onClick={() => {
                    navigate(`/personaDependiente/${personaDependiente.id}/edit`)
                }}>Editar</button>
                <div>
                    <AuxiliaresAsignados/>
                </div>
                <button onClick={() => {
                    navigate(`/personaDependiente/${personaDependiente.id}/auxiliaresDisponibles`)
                }}>Añadir auxiliar</button>
            </div>
        </div>
    )
}

export default ShowPersonaDependiente;
