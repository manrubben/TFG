import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import {AuthContext} from "../helpers/AuthContext";


function AuxiliaresAsignados() {
    let { id } = useParams();
    const [listOfAuxiliaresAsignados, setListOfAuxiliaresAsignados] = useState([]);
    let navigate = useNavigate();
    const { authState } = useContext(AuthContext);

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
        <div className="App">
            <h1>AUXILIARES ASIGNADOS</h1>
            <div>
                {listOfAuxiliaresAsignados.map((value, key) => {
                    return(
                        <div className="auxiliar-asignado">
                            <div key={key} className="post" onClick={() => {
                                navigate(`/auxiliar/${value.id}`);
                            }}>
                                <div className="title">{value.nombre + " " + value.apellidos}</div>
                            </div>

                            {authState.rol === "COORDINADOR" &&
                                <>
                                    <button className="delete-user-personaDependiente" onClick={() => {
                                        deleteUserPersonaDependiente(value.id, id);
                                    }}>Eliminar</button>
                                </>
                            }

                        </div>

                    )
                })}
            </div>
        </div>
    )
}

export default AuxiliaresAsignados;
