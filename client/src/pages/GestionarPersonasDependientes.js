import {useEffect, useState} from "react";
import React from "react";
import axios from "axios";
import '../App.css'

function GestionarPersonasDependientes() {
    const [listOfPersonasDependientes, setListOfPersonasDependientes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/personasDependientes/list",
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
            setListOfPersonasDependientes(response.data);
        });
    }, []);

    return(
        <div>
            <h1>GESTIONAR PERSONAS DEPENDIENTES</h1>
            <div>
                {listOfPersonasDependientes.map((value, key) => {
                    return(
                        <div key={key} className="post">
                            <div className="title">{value.nombre + " " + value.apellidos}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default GestionarPersonasDependientes;
