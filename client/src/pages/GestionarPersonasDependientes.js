import {useEffect, useState} from "react";
import React from "react";
import axios from "axios";
import '../App.css'
import {BrowserRouter as Router, Routes, Route, useNavigate, Link} from "react-router-dom";
import Home from "./Home";
import ShowPersonaDependiente from "./ShowPersonaDependiente";
import {AuthContext} from "../helpers/AuthContext";
import Login from "./Login";
import Auxiliar from "./Auxiliar";

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
        <div>
            <h1>GESTIONAR PERSONAS DEPENDIENTES</h1>
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
