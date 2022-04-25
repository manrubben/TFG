import React, {useContext, useEffect, useState} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import axios from "axios";
import AuxiliaresAsignados from "./AuxiliaresAsignados"
import {AuthContext} from "../helpers/AuthContext";

function ShowPersonaDependiente() {

    const fechaActual = new Date(Date.now());
    const horaActual = fechaActual.getHours();
    const { authState } = useContext(AuthContext);
    const fechaString = fechaActual.toLocaleDateString();

    let { id } = useParams();
    const [personaDependiente, setPersonaDependiente] = useState({});
    const [registro, setRegistro] = useState({});
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/personasDependientes/show/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
            setPersonaDependiente(response.data);
        });

        axios.get(`http://localhost:3001/registrosDiarios/showRegistro/${id}?fecha=${fechaString}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setRegistro(response.data);

            });

    }, [])

    return(
        <div className="postPage">

                <div className="leftSide">
                    <div className="post" id="individual">
                        <div>Nombre: {personaDependiente.nombre}</div>
                        <div>Apellidos: {personaDependiente.apellidos}</div>
                        <div>Enfermedad: {personaDependiente.enfermedad}</div>
                        <div>Grado de dependencia: {personaDependiente.gradoDeDependencia}</div>
                        {authState.rol === "COORDINADOR" &&
                        <>
                        <div>Pastillas de dia: {personaDependiente.pastillasDia}</div>
                        <div>Pastillas de tarde: {personaDependiente.pastillasTarde}</div>
                        <div>Pastillas de noche: {personaDependiente.pastillasNoche}</div>
                        </>
                        }
                        {authState.rol === "AUXILIAR" && horaActual >= 6 && horaActual < 13 &&
                            <>
                                <div>La persona debe tomar la siguiente medicación: {personaDependiente.pastillasDia}</div>
                            </>
                        }
                        {authState.rol === "AUXILIAR" && horaActual >= 13 && horaActual < 21 &&
                        <>
                            <div>La persona debe tomar la siguiente medicación: {personaDependiente.pastillasTarde}</div>
                        </>
                        }
                        {authState.rol === "AUXILIAR" && (horaActual >= 21 || horaActual < 5) &&
                        <>
                            <div>La persona debe tomar la siguiente medicación: {personaDependiente.pastillasNoche}</div>
                        </>
                        }
                    </div>
                    {authState.rol === "COORDINADOR" &&
                    <>
                        <button onClick={() => {
                            navigate(`/personaDependiente/${personaDependiente.id}/edit`)
                        }}>Editar</button>
                        <div>
                            <AuxiliaresAsignados/>
                        </div>
                        <button onClick={() => {
                            navigate(`/personaDependiente/${personaDependiente.id}/auxiliaresDisponibles`)
                        }}>Añadir auxiliar</button>
                    </>
                    }
                    {authState.rol === "AUXILIAR" && Object.entries(registro).length === 0 &&
                    <>
                        <button onClick={() => {
                            navigate(`/personaDependiente/${personaDependiente.id}/registro`)
                        }}>Iniciar Registro diario</button>
                    </>
                    }

                    {authState.rol === "AUXILIAR" && Object.entries(registro).length !== 0 &&
                    <>
                        <button onClick={() => {
                            navigate(`/personaDependiente/${personaDependiente.id}/registro/edit`)
                        }}>Modificar Registro diario</button>
                    </>
                    }
                    <button onClick={() => {
                        navigate(`/personaDependiente/${personaDependiente.id}/showRegistro`)
                    }}>Ver registros</button>

                </div>
        </div>
    )
}

export default ShowPersonaDependiente;
