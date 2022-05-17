import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import {AuthContext} from "../helpers/AuthContext";

function FamiliaresAsignados() {
    let { id } = useParams();
    const [listOfFamiliaresAsignados, setListOfFamiliaresAsignados] = useState([])
    let navigate = useNavigate;
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:3001/userPersonaDependiente/familiares/list/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setListOfFamiliaresAsignados(response.data)
            })
    }, [])


    const deleteUserPersonaDependiente = (familiarId, id) => {
        axios.delete("http://localhost:3001/userPersonaDependiente/delete",
            {headers: {accessToken: localStorage.getItem("accessToken")},
                data: {
                    userId: familiarId,
                    personaDependienteId: id
                }})
            .then(() => {
                setListOfFamiliaresAsignados(
                    listOfFamiliaresAsignados.filter((familiar) => {
                        return familiar.id != familiarId;
                    })
                )
            })

    }

    return(
        <div className="App">
            <h1>FAMILIARES ASIGNADOS</h1>
            <div>
                {listOfFamiliaresAsignados.map((value, key) => {
                    return(
                        <div className="familiar-asignado">
                            <div key={key} className="post" onClick={() => {
                                console.log(value.id)
                                navigate(`/familiar/${value.id}`);
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


export default FamiliaresAsignados;
