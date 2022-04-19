import {DatePicker} from "@material-ui/pickers";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";

function ShowRegistro() {

    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
    const [registro, setRegistro] = useState([]);
    let { id } = useParams();

    const fechaString = fechaSeleccionada.toLocaleDateString();
    console.log(fechaString);

    const showRegistro = async () => {
       await axios.get(`http://localhost:3001/registrosDiarios/showRegistro/${id}?fecha=${fechaString}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setRegistro(response.data);

            });
    }

    return(
        <div>
            <h1>Selecciona la fecha</h1>
            <div >
               <DatePicker value={fechaSeleccionada} onChange={setFechaSeleccionada} onClick={showRegistro()}/>
            </div>

            <div className="loginContainer">
                <label>Desayuno: {registro.desayuno}</label>
                <label>Almuerzo: {registro.almuerzo}</label>
                <label>Merienda: {registro.merienda}</label>
                <label>Cena: {registro.cena}</label>
                <label>Pasos diarios: {registro.pasosDiarios}</label>
                <label>Actividad física: {registro.actividadFisica}</label>
            </div>
        </div>
    )
}

export default ShowRegistro;