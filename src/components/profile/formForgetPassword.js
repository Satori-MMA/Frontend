import { Row, Form, Col, Container, Button } from "react-bootstrap";
import { useState } from "react";
import "../register/register.css";
import { ErrorMessage } from "../register/inputDinamicStyle";
import { MdError } from "react-icons/md";
import { useMutation } from "@apollo/client";
import Input from "../register/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import EMAIL_RESET_PASSWORD from "../../graphql/users/EMAIL_RESET_PASSWORD";

export const PasswordForget = () => {
    const [mutateFunction, { data, reset }] = useMutation(EMAIL_RESET_PASSWORD);
    const [email, changeEmail] = useState({ field: "", valid: null });
    const [validForm, changeValidForm] = useState(null);
    let navigate = useNavigate();
    const expressions = {
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    };
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
      }


    //if (loading) return "Submitting...";

    //if (error) return `Submission error! ${error.message}`;

    if (data !== undefined) {
        console.log(data);
        if (data.sendPasswordReset.success) {
            toast.success("Revisa tu correo para restablecer la contraseña")
            delay(3000).then(() => navigate("/login"));
        } else {
            toast.error(
                "Un error inesperado ha ocurrido: " +
                data.sendPasswordReset.errors.email[0].message
            );
        }
        reset();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            email.valid === "true"
        ) {
            mutateFunction({
                variables: {
                    email: email.field,
                },
            });

            changeValidForm(true);
        } else {
            changeValidForm(false);
        }
    };

    return (
        <div id="content">
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
                    <Col sm={5} className="pt m-auto shadow-sm rounded-lg" id="form">
                        <h3 className="text-center text-imperialRed">
                            ¿Olvidaste tu contraseña?
                        </h3>
                        <p className="text-white mb-2">
                            Ingresa tu correo para restablecerla
                        </p>
                        <Form
                            className="bg-ourBlack form-border"
                            action=""
                            onSubmit={handleSubmit}
                        >
                            <Col>
                                <Input
                                    state={email}
                                    changeState={changeEmail}
                                    label="Correo"
                                    placeholder="Ingrese su correo"
                                    type="email"
                                    name="email"
                                    errorLabel="El correo solo puede contener letras, numeros, puntos, guiones y guion bajo."
                                    regularExpresion={expressions.email}
                                />

                            </Col>
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
                                        Enviar
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
