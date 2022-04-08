import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


function GestionarFamiliares() {
    const [listOfFamiliares, setListOfFamiliares] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3001/users/familiares/list",
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setListOfFamiliares(response.data)
            })
    }, [])

    return(
        <div>
            <h1>Gestionar familiares</h1>
            <button onClick={() => {
                navigate('/coordinador/familiares/add')
            }}>Añadir familiar</button>
            <div>
                {listOfFamiliares.map((value, key) => {
                    return(
                        <div key={key} className="post">
                            <div className="title">{value.nombre + " " + value.apellidos}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default GestionarFamiliares;
