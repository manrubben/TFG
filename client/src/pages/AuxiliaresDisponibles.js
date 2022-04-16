import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";


function AuxiliaresDisponibles() {

    const [listOfAuxiliaresDisponibles, setListOfAuxiliaresDisponibles] = useState([]);
    let { id } = useParams(); //id de la persona dependiente
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/users/personaDependiente/${id}/listAuxiliaresDisponibles`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setListOfAuxiliaresDisponibles(response.data);
            });
    }, [])


    const addAuxiliar = (userId, personaDependienteId) => {
        axios.post("http://localhost:3001/userPersonaDependiente/addTo",
            {userId: userId, personaDependienteId: personaDependienteId},
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then(() => {
                navigate(`/personaDependiente/${id}`)
            })
    }


    return(
        <div className="App">
            <h1>Auxiliares disponibles para añadir</h1>
            <div className="auxiliares-disponibles">
                {listOfAuxiliaresDisponibles.map((value, key) => {
                    return(
                        <div key={key} className="post" onClick={() => {
                            navigate(`/auxiliares/show/${value.id}`);
                        }}>
                            <div className="title">{value.nombre + " " + value.apellidos}</div>
                            <div className="body"><button className="add-auxiliar-button" onClick={() => {
                                addAuxiliar(value.id, id);
                            }}>Añadir</button></div>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default AuxiliaresDisponibles;
