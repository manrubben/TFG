import {useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../helpers/AuthContext";



function Avisos() {

    let { id } = useParams();

    const [avisos, setAvisos] = useState([]);
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:3001/avisos/showAvisos/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
            setAvisos(response.data);
        });
    }, []);

    const deleteAviso = (id) => {
        axios.delete(`http://localhost:3001/avisos/deleteAviso/${id}`, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then(() => {
                setAvisos(
                    avisos.filter((val) => {
                        return val.id != id;
                    })
                );
            });
    };

    return(
        <div className="App">
            <h1>Avisos</h1>
            <div>
                {avisos.map((value, key) => {
                    return (
                        <div key={key}>
                            <div className="datos-observacion">
                                <label> {value.titulo}</label>
                                <label> Creado: {value.createdAt}</label>
                                <label> Aviso: {value.aviso}</label>
                            </div>

                            {authState.rol === "FAMILIAR" && (
                                <button  onClick={() => {
                                    deleteAviso(value.id);
                                }}>Eliminar</button>
                            )}

                        </div>
                    );
                })}
            </div>


        </div>
    )

}


export default Avisos;
