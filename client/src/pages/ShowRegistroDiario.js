import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";


function ShowRegistroDiario() {
    let { id } = useParams();
    const [registroDiario, setRegistroDiario] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/registrosDiarios/show/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setRegistroDiario(response.data)
            })
    })


    return(
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div>Fecha: {registroDiario.fecha}</div>
                    <div>Desayuno: {registroDiario.desayuno}</div>
                    <div>Almuerzo: {registroDiario.almuerzo}</div>
                    <div>Merienda: {registroDiario.merienda}</div>
                    <div>Cena: {registroDiario.cena}</div>
                    <div>Pasos diarios: {registroDiario.pasosDiarios}</div>
                    <div>Actividad física: {registroDiario.actividadFisica}</div>
                    <div>Horas de sueño: {registroDiario.horasSueno}</div>
                    <div>Tiempo al aire libre: {registroDiario.tiempoAireLibre}</div>
                </div>
            </div>
        </div>
    )
}


export default ShowRegistroDiario
