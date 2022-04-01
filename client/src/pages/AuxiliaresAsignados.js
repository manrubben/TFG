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

    const deleteUserPersonaDependiente = (auxiliarId, id) => {
        axios.delete("http://localhost:3001/userPersonaDependiente/delete",
            {headers: {accessToken: localStorage.getItem("accessToken")},
            data: {
                userId: auxiliarId,
                personaDependienteId: id
            }})
            .then(() => {
                setListOfAuxiliaresAsignados(
                    listOfAuxiliaresAsignados.filter((auxiliar) => {
                        return auxiliar.id != auxiliarId;
                    })
                )
            })

    }

    return(
        <div>
            <h1>AUXILIARES ASIGNADOS</h1>
            <div>
                {listOfAuxiliaresAsignados.map((value, key) => {
                    return(
                        <div>
                            <div key={key} className="post" onClick={() => {
                                navigate(`/auxiliares/show/${value.id}`);
                            }}>
                                <div className="title">{value.nombre + " " + value.apellidos}</div>
                            </div>
                            <button onClick={() => {
                                deleteUserPersonaDependiente(value.id, id);
                            }}>Eliminar</button>
                        </div>

                    )
                })}
            </div>
        </div>
    )
}

export default AuxiliaresAsignados;
