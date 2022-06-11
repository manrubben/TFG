import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

function EditAuxiliar() {

    let { id } = useParams();
    const [auxiliar, setAuxiliar] = useState({});
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/users/auxiliares/show/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setAuxiliar(response.data)
            });
    }, [])

    const initialValues = {
        nombre: auxiliar.nombre,
        apellidos: auxiliar.apellidos,
        telefono: auxiliar.telefono,
        rol: "AUXILIAR",
        username: auxiliar.username,
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required("Debes introducir un nombre"),
        apellidos: Yup.string().required("Debes introducir los apellidos"),
        telefono: Yup.string().required("Debes introducir un número de teléfono"),
        username: Yup.string().required("Debes introducir un nombre de usuario")
            .min(8, "El nombre de usuario debe tener al menos 8 caracteres")
            .max(16, "El nombre de usuario debe tener como máximo 16 caracteres"),
    });

    const editAuxiliar = (data) => {

        axios.put(`http://localhost:3001/users/auxiliares/edit/${id}`, data,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                    navigate(`/auxiliar/${id}`)
            })
    }

    const deleteAuxiliar = () => {
        axios.delete(`http://localhost:3001/users/auxiliares/delete/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    navigate('/coordinador/auxiliares')
                }
            })
    }

    return(
        <div className="App">
            <h1>EDITAR AUXILIAR</h1>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={editAuxiliar}
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

                    <button type="submit">Actualizar</button>
                    <button type="button" onClick={deleteAuxiliar}>Eliminar</button>
                </Form>
            </Formik>
        </div>
    )
}

export default EditAuxiliar;
