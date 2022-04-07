import {useEffect, useState} from "react";
import React from "react";
import axios from "axios";
import '../App.css'
import {BrowserRouter as Router, Routes, Route, useNavigate, Link} from "react-router-dom";
import {AuthContext} from "../helpers/AuthContext";
import UserLogged from "./UserLogged";

function PersonasDependientesAsignadas() {


    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        rol: "",
        status: false,
    });

    const [listOfPersonasDependientes, setListOfPersonasDependientes] = useState([]);
    let navigate = useNavigate();


    useEffect(() => {
        axios.get("http://localhost:3001/users/auth", {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
            .then((response) => {
                if (response.data.error) {
                    setAuthState({...authState, status: false});
                } else {
                    setAuthState({
                        username: response.data.username,
                        id: response.data.id,
                        rol: response.data.rol,
                        status: true,
                    });
                    console.log(response.data.rol)
                }
            });

        console.log(authState.id);

        axios.get(`http://localhost:3001/personasDependientes/personasAsignadas/${authState.id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setListOfPersonasDependientes(response.data);
                //console.log(listOfPersonasDependientes);
            });
    }, []);

    return(
        <div>
            <h1>PERSONAS ASIGNADAS</h1>
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

export default PersonasDependientesAsignadas;
