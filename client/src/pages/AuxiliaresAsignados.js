import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";


function AuxiliaresAsignados() {
    let { id } = useParams();
    const [listOfAuxiliaresAsignados, setListOfAuxiliaresAsignados] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/userPersonaDependiente/list/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setListOfAuxiliaresAsignados(response.data)
            });


    }, []);

    return(
        <div>
            <h1>AUXILIARES ASIGNADOS</h1>
            <div>
                {listOfAuxiliaresAsignados.map((value, key) => {
                    return(
                        <div key={key} className="post">
                            <div className="title">{value.nombre + " " + value.apellidos}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AuxiliaresAsignados;
