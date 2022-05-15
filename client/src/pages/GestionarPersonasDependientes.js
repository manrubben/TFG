import {useEffect, useState} from "react";
import React from "react";
import axios from "axios";
import '../App.css'
import {useNavigate} from "react-router-dom";


function GestionarPersonasDependientes() {


    const [listOfPersonasDependientes, setListOfPersonasDependientes] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/personasDependientes",
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setListOfPersonasDependientes(response.data);
            });
    }, []);

    return(
        <div className="App">
            <h1>GESTIONAR PERSONAS DEPENDIENTES</h1>
            <button onClick={() => {
                navigate('/coordinador/personasDependientes/add')
            }}>Añadir persona dependiente</button>
            <div>
                {listOfPersonasDependientes.map((value, key) => {
                    return(
                        <div key={key} className="post" onClick={() => {
                            navigate(`/personaDependiente/${value.id}`);
                        }}>
                            <div className="title">{value.nombre + " " + value.apellidos}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default GestionarPersonasDependientes;
