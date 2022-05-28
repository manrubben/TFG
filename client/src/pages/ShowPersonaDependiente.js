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
    const {authState} = useContext(AuthContext);
    const fechaString = fechaActual.toLocaleDateString();


    let {id} = useParams();
    const [personaDependiente, setPersonaDependiente] = useState({});
    const [registro, setRegistro] = useState({});
    const [notificacion, setNotificacion] = useState({});
    const [notificacionAviso, setNotificacionAviso] = useState({});
    const [notificacionMedicacion, setNotificacionMedicacion] = useState({});
    let navigate = useNavigate();



    useEffect(() => {


        axios.get(`http://localhost:3001/observaciones/notificacion/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setNotificacion(response.data);

            });

        axios.get(`http://localhost:3001/avisos/notificacion/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setNotificacionAviso(response.data);

            });

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

        axios.get(`http://localhost:3001/notificaciones/createNotificacionMedicacion/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                console.log(response.data);
        });

        axios.get(`http://localhost:3001/notificaciones/notificacionMedicacion/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setNotificacionMedicacion(response.data);
            });


    }, [])

    //Mostrar notificación de una nueva observación al familiar
    if (Object.values(notificacion).at(1) && authState.rol === "FAMILIAR") {
        Swal.fire({
            position: 'top-start',
            icon: "info", title: "INFORMACIÓN",
            text: "Hay nuevas observaciones"
        })
    }

    //Mostrar notificación de un nuevo aviso al auxiliar
    if (Object.values(notificacionAviso).at(1) && authState.rol === "AUXILIAR") {
        Swal.fire({
            position: 'top-start',
            icon: "info", title: "INFORMACIÓN",
            text: "Hay un nuevo aviso"
        })
    }

    // MOSTRAR AL AUXILIAR LA MEDICACION QUE TIENE QUE TOMAR EN FORMA DE NOTIFICACION
    if(authState.rol === "AUXILIAR") {
        const med = personaDependiente.pastillasDia;
        if(Object.values(notificacionMedicacion).at(2) === false && horaActual >= 6 && horaActual < 13) {

            //console.log(personaDependiente.pastillasDia);
            Swal.fire({
                position: 'top-end',
                icon: "info",
                title: "AVISO",
                text: `Tiene que tomar la siguiente medicacion: ${med}`,
                showCancelButton: true,
                confirmButtonText: "Listo",
                cancelButtonText: "Cancelar",
            }) .then(resultado => {
                if (resultado.value) {

                    axios.get(`http://localhost:3001/notificaciones/updateDia/${id}`,
                        {headers: {accessToken: localStorage.getItem("accessToken"),}})
                        .then((response) => {
                            console.log(response.data);
                        });

                    window.location.reload();
                }
            });

        } else if(Object.values(notificacionMedicacion).at(3) === false && horaActual >= 13 && horaActual < 21){

            Swal.fire({
                position: 'top-end',
                icon: "info",
                title: "AVISO",
                text: `Tiene que tomar la siguiente medicacion: ${personaDependiente.pastillasTarde}`,
                showCancelButton: true,
                confirmButtonText: "Listo",
                cancelButtonText: "Cancelar",
            }) .then(resultado => {
                if (resultado.value) {

                    axios.get(`http://localhost:3001/notificaciones/updateTarde/${id}`,
                        {headers: {accessToken: localStorage.getItem("accessToken"),}})
                        .then((response) => {
                            console.log(response.data);
                        });

                    window.location.reload();
                }
            });

        } else if(Object.values(notificacionMedicacion).at(4) === false && (horaActual >= 21 || horaActual < 5)) {

            Swal.fire({
                position: 'top-end',
                icon: "info",
                title: "AVISO",
                text: `Tiene que tomar la siguiente medicacion: ${personaDependiente.pastillasNoche}`,
                showCancelButton: true,
                confirmButtonText: "Listo",
                cancelButtonText: "Cancelar",

            })  .then(resultado => {
                if (resultado.value) {

                    axios.get(`http://localhost:3001/notificaciones/updateNoche/${id}`,
                        {headers: {accessToken: localStorage.getItem("accessToken"),}})
                        .then((response) => {
                            console.log(response.data);
                        });

                    window.location.reload();
                }
            });

        }
    }

    // Valores y metodo para crear una observacion
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


    // Valores y metodo para crear un aviso
    const initialValuesAv = {
        titulo: "",
        descripcion: "",
        username: authState.username,
        PersonasDependienteId: id,
        UserId: authState.id

    };


    const validationSchemaAv = Yup.object().shape({
        aviso: Yup.string().required("Debes introducir un aviso"),
    });



    const addAviso = (data) => {
        axios.post("http://localhost:3001/avisos/createAviso", data,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                navigate(`/personaDependiente/${id}/avisos`)
            })
    }

    return (
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
                }}>Editar
                </button>
                <div>
                    <AuxiliaresAsignados/>
                </div>
                <button onClick={() => {
                    navigate(`/personaDependiente/${personaDependiente.id}/auxiliaresDisponibles`)
                }}>Añadir auxiliar
                </button>

                <div>
                    <FamiliaresAsignados/>
                </div>
                <button className="add-familiar-button" onClick={() => {
                    navigate(`/personaDependiente/${personaDependiente.id}/addFamiliar`)
                }}>Añadir familiar
                </button>
            </>
            }

            {authState.rol === "AUXILIAR" &&
            <>
                <button className="add-familiar-button" onClick={() => {
                    navigate(`/personaDependiente/${personaDependiente.id}/familiares`)
                }}>Ver familiares asignados
                </button>
            </>
            }

            {authState.rol === "FAMILIAR" &&
            <>
                <button className="add-familiar-button" onClick={() => {
                    navigate(`/personaDependiente/${personaDependiente.id}/auxiliares`)
                }}>Ver auxiliares asignados
                </button>
            </>

            }
            <h1>REGISTROS DIARIOS</h1>
            {authState.rol === "AUXILIAR" && Object.entries(registro).length === 0 &&
            <>
                <button className="init-registro-diario" onClick={() => {
                    navigate(`/personaDependiente/${personaDependiente.id}/registro`)
                }}>Iniciar Registro diario
                </button>
            </>
            }

            {authState.rol === "AUXILIAR" && Object.entries(registro).length !== 0 &&
            <>
                <button className="edit-registro-diario" onClick={() => {
                    navigate(`/personaDependiente/${personaDependiente.id}/registro/edit`)
                }}>Modificar Registro diario
                </button>
            </>
            }

            <button className="show-registros" onClick={() => {
                navigate(`/personaDependiente/${personaDependiente.id}/showRegistro`)
            }}>Ver registros
            </button>

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
                        <ErrorMessage name="titulo" component="span"/>
                        <Field
                            autoComplete="off"
                            id="inputCreatePost"
                            name="titulo"
                        />

                        <label>Descripción: </label>
                        <ErrorMessage name="descripcion" component="span"/>
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
            }}>Observaciones
            </button>


            <h1>AVISOS</h1>
            {authState.rol === "FAMILIAR" &&
            <>

                <Formik
                    initialValues={initialValuesAv}
                    onSubmit={addAviso}
                    validationSchema={validationSchemaAv}
                >
                    <Form className="formContainer">
                        <label>Aviso: </label>
                        <ErrorMessage name="aviso" component="span"/>
                        <Field
                            autoComplete="off"
                            id="inputCreatePost"
                            name="aviso"
                        />

                        <button type="submit">Añadir Aviso</button>
                    </Form>
                </Formik>
            </>
            }

            <button className="list-observaciones-button" onClick={() => {
                navigate(`/personaDependiente/${personaDependiente.id}/avisos`)
            }}>Avisos
            </button>

        </div>
    )

}

export default ShowPersonaDependiente;
