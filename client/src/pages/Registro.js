import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {AuthContext} from "../helpers/AuthContext";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

function Registros() {

    let { id } = useParams();
    let navigate = useNavigate();
    const { authState } = useContext(AuthContext);

    const initialValues = {
        desayuno: "",
        almuerzo: "",
        merienda: "",
        cena: "",
        pasosDiarios: 0,
        actividadFisica: "",
        horasSueno: 0.0,
        tiempoAireLibre:"",
        relacionSocial: "",
        PersonasDependienteId: id
    };

    const validationSchema = Yup.object().shape({
        pasosDiarios: Yup.number().typeError("Debe ser un número").min(0, "Debe ser un número").required("Debe introducir un número de pasos"),
        horasSueno: Yup.number().typeError("Debe ser un número").min(0, "Debe ser un número").required("Debe introducir un número de horas"),
    });

/*
    const [desayuno, setDesayuno] = useState("");
    const [almuerzo, setAlmuerzo] = useState("");
    const [merienda, setMerienda] = useState("");
    const [cena, setCena] = useState("");
    const [pasosDiarios, setPasosDiarios] = useState("");
    const [actividadFisica, setActividadFisica] = useState("");
    const [horasSueno, setHorasSueno] = useState("");
    const [tiempoAireLibre, setTiempoAireLibre] = useState("");


   /* const data = {
        desayuno: desayuno,
        almuerzo: almuerzo,
        merienda: merienda,
        cena: cena,
        pasosDiarios: pasosDiarios,
        actividadFisica: actividadFisica,
        horasSueno: horasSueno,
        tiempoAireLibre: tiempoAireLibre,
        PersonasDependienteId: id,


    }

    */
    const data2 = {
        auxiliarId : authState.id,
    }

    const crearRegistro = async (data) => {

        await axios.post("http://localhost:3001/registrosDiarios/addRegistro", data,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                if(response.data.error) {
                    console.log(data.error);
                }
            })

         axios.post(`http://localhost:3001/registrosDiarios/addAuxiliarRegistro/${id}`, data2,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {

                if(response.data.error) {
                    console.log(data.error);
                } else {
                    console.log(data2);
                    navigate(`/personaDependiente/${id}`)
                }
            })


    }

    return(
        <div className="App">
            <h1>Registro Diario</h1>

            <Formik
                initialValues={initialValues}
                onSubmit={crearRegistro}
                validationSchema={validationSchema}
            >
                <Form className="formContainer">

                <label>Desayuno:</label>
                <Field
                    autoComplete="off"
                    id="inputCreatePost"
                    name="desayuno"
                />

                <label>Almuerzo:</label>
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="almuerzo"
                    />

                <label>Merienda:</label>
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="merienda"
                    />

                <label>Cena:</label>
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="cena"
                    />

                <label>Pasos Diarios:</label>
                    <ErrorMessage name="pasosDiarios" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="pasosDiarios"
                        placeholder="(Ej. 2000)"
                    />

                <label>Actividad Física:</label>
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="actividadFisica"
                        placeholder="(Ej. Andar, ejercio de fuerza...)"
                    />

                <label>Horas de sueño:</label>
                    <ErrorMessage name="horasSueno" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="horasSueno"
                        placeholder="(Ej. 7.5)"
                    />

                <label>Tiempo al aire libre:</label>
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="tiempoAireLibre"
                        placeholder="(Ej. 30 minutos...)"
                    />

                    <label>Relaciones sociales:</label>
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="relacionSocial"
                    />

                    <button type="submit">Guardar registro</button>

            </Form>
            </Formik>
        </div>
    )

}

export default Registros;
