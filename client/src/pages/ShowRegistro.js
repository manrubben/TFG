import {DatePicker} from "@material-ui/pickers";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

function ShowRegistro() {

    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
    const [registro, setRegistro] = useState([]);
    let { id } = useParams();

    const fechaString = fechaSeleccionada.toLocaleDateString();
    console.log(fechaString);

    useEffect(() => {
        axios.get(`http://localhost:3001/registrosDiarios/showRegistro/${id}?fecha=${fechaString}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setRegistro(response.data);
            });
    }, [])

    const showRegistro = async () => {
        await axios.get(`http://localhost:3001/registrosDiarios/showRegistro/${id}?fecha=${fechaString}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setRegistro(response.data);
            });
    }

    console.log(registro);

    return(
        <div>
            <h1>Selecciona la fecha</h1>
            <div >
                <DatePicker value={fechaSeleccionada} onChange={setFechaSeleccionada}/>

                <button onClick={() => {
                    showRegistro();
                }}>Buscar</button>
            </div>

            {registro && Object.entries(registro).length !== 0 &&

            <div className="loginContainer">
                <label>Desayuno: {registro.desayuno}</label>
                <label>Almuerzo: {registro.almuerzo}</label>
                <label>Merienda: {registro.merienda}</label>
                <label>Cena: {registro.cena}</label>
                <label>Pasos diarios: {registro.pasosDiarios}</label>
                <label>Actividad física: {registro.actividadFisica}</label>
            </div>
            }

            {Object.entries(registro).length === 0 &&

            <div>
                NO HAY NINGUN REGISTRO
            </div>

            }

        </div>
    )
}

export default ShowRegistro;