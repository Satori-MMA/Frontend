import { Row, Form, Col, Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import "../register/register.css";
import { ErrorMessage } from "../register/inputDinamicStyle";
import { MdError } from "react-icons/md";

import Input from "../register/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ALL_LESSONS from "../../graphql/lessons/ALL_LESSONS";
import { useMutation, useQuery } from "@apollo/client";
import CREATE_LESSON from "../../graphql/lessons/REGISTER_LESSON";
import swal from "sweetalert2";
import { Navigate, useNavigate, useParams } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";

// import swal from "sweetalert2";
// import { LoadingSpin } from "../utilities/LoadingSpin";

export const LessonRegister = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {data: c_data, error: c_error,loading: c_loading,} = useQuery(ALL_LESSONS);
    const [mutateFunction,{ data: m_data, loading: m_loading, error: m_error, reset: m_reset },] = useMutation(CREATE_LESSON);
    const [name, changeName] = useState({ field: "", valid: null });
    const [link, changeLink] = useState({ field: "", valid: null });
    const [description, changeDescription] = useState({ field: "", valid: null });
    const [code, changeCode] = useState({ field: "", valid: null });
    const [validForm, changeValidForm] = useState(null);
    const expressions = {
        name:  /^[a-zA-Z0-9\s_.*+|°,#/-]{4,50}$/, // Letras, números, guion y guion_bajo
    };
    // useEffect(() => {
    //     if (c_data) {
    //       console.log(name);
    //       console.log(c_data);
    //       if (c_data.allLessons.edges.length > 0) {
    //         console.log("Mismo nombre");
    //         swal.fire({
    //           icon: "error",
    //           text: "Ya existe un curso con el mismo nombre",
    //           color: "#fff",
    //           background: "#000",
    //           timer: "2000",
    //         });
    //       } else {
    //         console.log("Todo ok");
            
    //         swal.fire({
    //           icon: "success",
    //           text: "Curso creado",
    //           color: "#fff",
    //           background: "#000",
    //           timer: "2000",
    //         });
    
    //         Navigate("/crudLesson");
    //       }
    //     }
    //   }, [c_data]);
      const handleSubmit = (e) => {
        e.preventDefault();
        changeName(name.field);
        if (
          name.valid === "true"
        ) {
            mutateFunction({
                variables: {
                leName: name.field, 
                leDescription: description.field,
                leEvaluation: 0.0, 
                leLinkVideo: link.field, 
                courseId: params.id
                },
              });
              swal.fire({
                icon: "success",
                text: "Leccion creada",
                color: "#fff",
                background: "#000",
                timer: "2000",
                });
                navigate(`/crudLesson/${params.id}`);
               
        } else {
          swal.fire({
            icon: "error",
            text: "Llena el formulario correctamente por favor",
            color: "#fff",
            background: "#000",
            timer: "2000",
          });
        }
      };
    return <div id="content">
        <Container fluid id="container">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Row id="data" className="justify-content-md-center">
                <Col sm={6} className="pt m-auto shadow-sm rounded-lg" id="form">
                    <h3 className="text-center text-imperialRed">
                        Crear Lección
                    </h3>
                    <p className="text-white mb-2">
                        Ingresa la información de la Lección
                    </p>
                    <Form
                        className="bg-ourBlack form-border"
                        action=""
                        onSubmit={handleSubmit}
                    >

                        <Input
                            state={name}
                            changeState={changeName}
                            label="Nombre"
                            placeholder="Ingrese el nombre de la lección"
                            type="text"
                            name="name"
                            errorLabel="El nombre no puede contener caracteres especiales ni ser vacío"
                            regularExpresion={expressions.name}
                        />
                        <Input
                            state={description}
                            changeState={changeDescription}
                            label="Descripción"
                            placeholder="Ingrese la descripción"
                            type="text"
                            name="description"
                            errorLabel="La descripción no puede contener caracteres especiales ni ser vacío"
                            regularExpresion={expressions.name}
                        />
                        <Input
                            state={link}
                            changeState={changeLink}
                            label="Link de video"
                            placeholder="Ingrese el link del video"
                            type="text"
                            name="link"

                        />


                        <hr></hr>
                        <Row>
                            {validForm === false && (
                                <ErrorMessage>
                                    <p>
                                        <MdError color="red" />
                                        <b>Error:</b> Por favor rellena el formulario
                                        correctamente.
                                    </p>
                                </ErrorMessage>
                            )}
                            <Col className="text-center" mb-4="true">
                                <Button
                                    className="button-login-r"
                                    id="register"
                                    type="submit"
                                >
                                    Guardar
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    </div>
};