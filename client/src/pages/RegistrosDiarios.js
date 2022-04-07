import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function RegistrosDiarios() {

    const [listOfRegistrosDiarios, setListOfRegistrosDiarios] = useState([])
    let navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/registrosDiarios/list",
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setListOfRegistrosDiarios(response.data)
            })
    }, [])

    return(
        <div>
            <h1>Registros diarios de la persona dependiente</h1>
            <div>
                {listOfRegistrosDiarios.map((value, key) => {
                    return(
                        <div key={key} className="post" onClick={() => {
                            navigate(`/registroDiario/${value.id}`)
                        }}>
                            <div className="title">{value.fecha}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    )

}

export default RegistrosDiarios;
