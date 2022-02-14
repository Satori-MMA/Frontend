import { Row, Form, Col, Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import "../register/register.css";
import { ErrorMessage } from "../register/inputDinamicStyle";
import { MdError } from "react-icons/md";

import Input from "../register/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Link, useNavigate } from "react-router-dom";

// import swal from "sweetalert2";
// import { LoadingSpin } from "../utilities/LoadingSpin";

export const LessonRegister = () => {
    const [name, changeName] = useState({ field: "", valid: null });
    const [link, changeLink] = useState({ field: "", valid: null });
    const [description, changeDescription] = useState({ field: "", valid: null });
    const [code, changeCode] = useState({ field: "", valid: null });
    const [validForm, changeValidForm] = useState(null);
    const expressions = {
        name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    }
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
                            state={code}
                            changeState={changeCode}
                            label="Código"
                            placeholder="Ingrese el codigo de la Lección"
                            type="text"
                            name="code"
                            errorLabel="El codigo no puede contener caracteres especiales ni ser vacío"
                            regularExpresion={expressions.name}
                        />

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
                            state={description}
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