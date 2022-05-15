import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function CreateAuxiliar() {

    const [auxiliarNombre, setAuxiliarNombre] = useState("");
    const [auxiliarApellidos, setAuxiliarApellidos] = useState("");
    const [auxiliarTelefono, setAuxiliarTelefono] = useState("");
    const [auxiliarUsername, setAuxiliarUsername] = useState("");
    const [auxiliarPassword, setAuxiliarPassword] = useState("");

    const [auxiliaresList, setAuxiliaresList] = useState("")
    let navigate = useNavigate();

    const initialValues = {
        nombre: "",
        apellidos: "",
        telefono: "",
        rol: "AUXILIAR",
        username: "",
        password: ""
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required("Debes introducir un nombre"),
        apellidos: Yup.string().required("Debes introducir los apellidos"),
        telefono: Yup.string().required("Debes introducir un número de teléfono"),
        username: Yup.string().required("Debes introducir un nombre de usuario")
            .min(8, "El nombre de usuario debe tener al menos 8 caracteres")
            .max(16, "El nombre de usuario debe tener como máximo 16 caracteres"),
        password: Yup.string().required("Debes introducir una contraseña")
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .max(16, "La contraseña debe tener como máximo 16 caracteres"),
    });

    const addAuxiliar = (data) => {
        axios.post("http://localhost:3001/users/create", data,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                    navigate('/coordinador/auxiliares')
            })
    }

    return(
        <div className="App">
            <h1>Añadir auxiliar</h1>

            <Formik
                initialValues={initialValues}
                onSubmit={addAuxiliar}
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

                    <label>Teléfono: </label>
                    <ErrorMessage name="telefono" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="telefono"
                        placeholder="(Ej. 622172737...)"
                    />

                    <label>Username: </label>
                    <ErrorMessage name="username" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="username"
                        placeholder="(Ej. javier97...)"
                    />

                    <label>Password: </label>
                    <ErrorMessage name="password" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="password"
                        type="password"
                    />

                    <button type="submit">Añadir</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreateAuxiliar;
