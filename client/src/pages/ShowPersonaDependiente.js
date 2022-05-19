import React, {useContext, useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import AuxiliaresAsignados from "./AuxiliaresAsignados"
import {AuthContext} from "../helpers/AuthContext";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import FamiliaresAsignados from "./FamiliaresAsignados";
import Swal from "sweetalert2";

function ShowPersonaDependiente() {


    const fechaActual = new Date(Date.now());
    const horaActual = fechaActual.getHours();
    const { authState } = useContext(AuthContext);
    const fechaString = fechaActual.toLocaleDateString();

    let { id } = useParams();
    const [personaDependiente, setPersonaDependiente] = useState({});
    const [registro, setRegistro] = useState({});
    const [notificacion, setNotificacion] = useState({});
    let navigate = useNavigate();



    useEffect(  () => {


        axios.get(`http://localhost:3001/observaciones/notificacion/${id}`,
                {headers: {accessToken: localStorage.getItem("accessToken"),}})
                .then((response) => {
                    setNotificacion(response.data);

                });

         axios.get(`http://localhost:3001/personasDependientes/show/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
            setPersonaDependiente(response.data);
        });

        console.log(Object.entries(registro))

         axios.get(`http://localhost:3001/registrosDiarios/showRegistro/${id}?fecha=${fechaString}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setRegistro(response.data);

            });

    }, [])

    if(Object.values(notificacion).at(1) && authState.rol === "FAMILIAR"){
        Swal.fire({icon: "info", title: "AVISO",
            text:"Hay nuevas observaciones"})
    }

    const initialValues = {
        titulo: "",
        descripcion: "",
        username: authState.username,
        PersonasDependienteId: id,
        UserId: authState.id

    };


    const validationSchema = Yup.object().shape({
        titulo: Yup.string().required("Debes introducir un título"),
        descripcion: Yup.string().required("Debes introducir una descripción"),
    });



    const addObservacion = (data) => {
        axios.post("http://localhost:3001/observaciones/createObservacion", data,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                navigate(`/personaDependiente/${id}/observaciones`)
            })
    }

    return(
        <div className="App">
            <h1>Detalles de {personaDependiente.nombre} {personaDependiente.apellidos}</h1>
            <div className="datos-persona-dependiente">
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

                    <div>
                        <FamiliaresAsignados/>
                    </div>
                    <button className="add-familiar-button" onClick={() => {
                        navigate(`/personaDependiente/${personaDependiente.id}/addFamiliar`)
                    }}>Añadir familiar</button>
                </>
            }

            {authState.rol === "AUXILIAR" &&
                <>
                    <button className="add-familiar-button" onClick={() => {
                        navigate(`/personaDependiente/${personaDependiente.id}/familiares`)
                    }}>Ver familiares asignados</button>
                </>
            }
            <h1>REGISTROS DIARIOS</h1>
            {authState.rol === "AUXILIAR" && Object.entries(registro).length === 0 &&
                <>
                    <button className="init-registro-diario" onClick={() => {
                        navigate(`/personaDependiente/${personaDependiente.id}/registro`)
                    }}>Iniciar Registro diario</button>
                </>
            }

            {authState.rol === "AUXILIAR" && Object.entries(registro).length !== 0 &&
                <>
                    <button className="edit-registro-diario" onClick={() => {
                        navigate(`/personaDependiente/${personaDependiente.id}/registro/edit`)
                    }}>Modificar Registro diario</button>
                </>
            }

            <button className="show-registros" onClick={() => {
                navigate(`/personaDependiente/${personaDependiente.id}/showRegistro`)
            }}>Ver registros</button>

            <h1>OBSERVACIONES</h1>
            {authState.rol === "AUXILIAR" &&
                <>

                    <Formik
                        initialValues={initialValues}
                        onSubmit={addObservacion}
                        validationSchema={validationSchema}
                    >
                        <Form className="formContainer">
                            <label>Título: </label>
                            <ErrorMessage name="titulo" component="span" />
                            <Field
                                autoComplete="off"
                                id="inputCreatePost"
                                name="titulo"
                            />

                            <label>Descripción: </label>
                            <ErrorMessage name="descripcion" component="span" />
                            <Field
                                autoComplete="off"
                                id="inputCreatePost"
                                name="descripcion"
                            />

                            <button type="submit">Añadir Observacion</button>
                        </Form>
                    </Formik>
                </>



            }

            <button className="list-observaciones-button" onClick={() => {
                navigate(`/personaDependiente/${personaDependiente.id}/observaciones`)
            }}>Observaciones</button>
        </div>
    )
}

export default ShowPersonaDependiente;
