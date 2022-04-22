import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";

function CreatePersonaDependiente() {

    const [personaNombre, setPersonaNombre] = useState("");
    const [personaApellidos, setPersonaApellidos] = useState("");
    const [personaEnfermedad, setPersonaEnfermedad] = useState("");
    const [personaGradoDeDependencia, setPersonaGradoDeDependencia] = useState("");
    const [personaPastillasDia, setPersonaPastillasDia] = useState("");
    const [personaPastillasTarde, setPersonaPastillasTarde] = useState("");
    const [personaPastillasNoche, setPersonaPastillasNoche] = useState("");

    const [personasDependientesList, setPersonasDependientesList] = useState("")
    let navigate = useNavigate();

    const initialValues = {
        nombre: "",
        apellidos: "",
        enfermedad: "",
        gradoDeDependencia: "",
        pastillasDia: "",
        pastillasTarde: "",
        pastillasNoche: ""
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required("Debes introducir un nombre"),
        apellidos: Yup.string().required("Debes introducir los apellidos"),
        enfermedad: Yup.string().required("Debes introducir la enfermedad"),
    });

    const addPersonaDependiente = (data) => {
        axios.post("http://localhost:3001/personasDependientes/create", data,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                navigate('/coordinador/personasDependientes')
        })
    }

    return(
        <div>
            <h1>Añadir persona dependiente</h1>

            <Formik
                initialValues={initialValues}
                onSubmit={addPersonaDependiente}
                validationSchema={validationSchema}
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

                    <button type="submit">Añadir</button>
                </Form>
            </Formik>

        </div>
    )


}

export default CreatePersonaDependiente;
