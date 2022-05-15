import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function GestionarAuxiliares() {

    const [listOfAuxiliares, setListOfAuxiliares] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/users/auxiliares/list",
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setListOfAuxiliares(response.data);
            })
    }, [])

    return(
        <div className="App">
            <h1>GESTIONAR AUXILIARES</h1>
            <button onClick={() => {
                navigate('/coordinador/auxiliares/add')
            }}>Añadir auxiliar</button>
            <div>
                {listOfAuxiliares.map((value, key) => {
                    return(
                        <div key={key} className="post" onClick={() => {
                            navigate(`/auxiliar/${value.id}`);
                        }}>
                            <div className="title">{value.nombre + " " + value.apellidos}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default GestionarAuxiliares;
