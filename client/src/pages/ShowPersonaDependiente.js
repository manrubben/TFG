import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ShowPersonaDependiente() {
    let { id } = useParams();
    const [personaDependiente, setPersonaDependiente] = useState({});

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
            </div>
        </div>
    )
}

export default ShowPersonaDependiente;
