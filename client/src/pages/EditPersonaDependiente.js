import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";


function EditPersonaDependiente() {

    let { id } = useParams();
    const [personaDependiente, setPersonaDependiente] = useState({});
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/personasDependientes/show/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setPersonaDependiente(response.data);
            });
    }, [])

    const initialValues = {
        nombre: personaDependiente.nombre,
        apellidos: personaDependiente.apellidos,
        enfermedad: personaDependiente.enfermedad,
        gradoDeDependencia: personaDependiente.gradoDeDependencia,
        pastillasDia: personaDependiente.pastillasDia,
        pastillasTarde: personaDependiente.pastillasTarde,
        pastillasNoche: personaDependiente.pastillasNoche
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required("Debes introducir un nombre"),
        apellidos: Yup.string().required("Debes introducir los apellidos"),
        enfermedad: Yup.string().required("Debes introducir la enfermedad"),
    });

    const editPersonaDependiente = (data) => {
        axios.put(`http://localhost:3001/personasDependientes/edit/${id}`, data,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                    navigate(`/personaDependiente/${id}`)
            })
    }

    const deletePersonaDependiente = () => {
        axios.delete(`http://localhost:3001/personasDependientes/delete/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    navigate('/coordinador/personasDependientes')
                }
            })
    }

    return(
        <div className="App">
            <h1>EDITAR PERSONA DEPENDIENTE</h1>

            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={editPersonaDependiente}
            >
                <Form className="formContainer">
                    <label>Nombre: </label>
                    <ErrorMessage name="nombre" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="nombre"
                        placeholder="(Ej. Juan...)"
                    />

                    <label>Apellidos: </label>
                    <ErrorMessage name="apellidos" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="apellidos"
                        placeholder="(Ej. Rodríguez...)"
                    />

                    <label>Enfermedad: </label>
                    <ErrorMessage name="enfermedad" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="enfermedad"
                        placeholder="(Ej. Parkinson...)"
                    />

                    <label>Grado de dependencia: </label>
                    <ErrorMessage name="gradoDeDependencia" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="gradoDeDependencia"
                        placeholder="(Ej. 32%...)"
                    />

                    <label>Pastillas de dia: </label>
                    <ErrorMessage name="pastillasDia" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="pastillasDia"
                        placeholder="(Ej. Aspirina...)"
                    />

                    <label>Pastillas de tarde: </label>
                    <ErrorMessage name="pastillasTarde" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="pastillasTarde"
                        placeholder="(Ej. Ibuprofeno...)"
                    />

                    <label>Pastillas de noche: </label>
                    <ErrorMessage name="pastillasNoche" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="pastillasNoche"
                        placeholder="(Ej. Dormidina...)"
                    />

                    <button type="submit">Actualizar</button>
                    <button type="button" onClick={deletePersonaDependiente}>Eliminar</button>
                </Form>
            </Formik>
        </div>
    )
}

export default EditPersonaDependiente;
