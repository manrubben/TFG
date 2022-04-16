import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";


function FamiliarAsignado() {
    let { id } = useParams();
    const [listOfFamiliaresAsignados, setListOfFamiliaresAsignados] = useState([])
    let navigate = useNavigate;

    useEffect(() => {
        axios.get(`http://localhost:3001/userPersonaDependiente/familiares/list/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setListOfFamiliaresAsignados(response.data)
            })
    }, [])

    return(
        <div className="App">
            <h1>FAMILIARES ASIGNADOS</h1>
            <div>
                {listOfFamiliaresAsignados.map((value, key) => {
                    return(
                        <div className="familiar-asignado">
                            <div key={key} className="post" onClick={() => {
                                navigate(`/familiar/${value.id}`);
                            }}>
                                <div className="title">{value.nombre + " " + value.apellidos}</div>
                            </div>
                            <button>Eliminar</button>
                        </div>

                    )
                })}
            </div>
        </div>
    )

}


export default FamiliarAsignado;
