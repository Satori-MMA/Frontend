import { Row, Form, Col, Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import "../register/register.css";
import RESET_PASSWORD from "../../graphql/users/RESET_PASSWORD";
import { ErrorMessage } from "../register/inputDinamicStyle";
import { MdError } from "react-icons/md";
import { useMutation } from "@apollo/client";
import REGISTER from "../../graphql/users/REGISTER";
import Input from "../register/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../GlobalState";

export const PasswordUpdate = () => {
    const [mutateFunction, { data, reset }] = useMutation(RESET_PASSWORD);

    const [password, changePassword] = useState({ field: "", valid: null });
    const [password1, changePassword1] = useState({ field: "", valid: null });
    const [validForm, changeValidForm] = useState(null);
    const expressions = {
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // 8 digitos al menos una letra y un numero
    };

    //if (loading) return "Submitting...";

    //if (error) return `Submission error! ${error.message}`;

    if (typeof data != "undefined") {
        console.log(data);
        if (data.userRegister.success) {
            console.log("Correcto");
            toast.success("Revisa tu correo para continuar con el registro");
        } else {
            console.log(data.userRegister.errors);
            toast.error(
                "Un error inesperado ha ocurrido: " +
                data.userRegister.errors.email[0].message
            );
        }
        reset();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            password.valid === "true"
        ) {
            mutateFunction({
                variables: {
                    password1: password.field,
                    password2: password1.field,
                },
            });

            changeValidForm(true);
            changePassword({ field: "", valid: null });
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
                    <Col sm={8} className="pt m-auto shadow-sm rounded-lg" id="form">
                        <h3 className="text-center text-imperialRed">
                            Actualizar Contraseña
                        </h3>
        
                        <Form
                            className="bg-ourBlack form-border"
                            action=""
                            onSubmit={handleSubmit}
                        >

                            <Row>
                                <Col>
                                    
                                    <Input
                                        state={password}
                                        changeState={changePassword}
                                        label="Nueva Contraseña"
                                        placeholder="Ingrese su contraseña"
                                        type="password"
                                        name="password"
                                        errorLabel="La contraseña tiene que ser de minimo 8 digitos y contener al menos una letra y  un numero"
                                        regularExpresion={expressions.password}
                                    />
                                    <Input
                                        state={password1}
                                        changeState={changePassword1}
                                        label="Confirme la nueva Contraseña"
                                        placeholder="Ingrese su contraseña"
                                        type="password"
                                        name="password"
                                        errorLabel="La contraseña tiene que ser de minimo 8 digitos y contener al menos una letra y  un numero"
                                        regularExpresion={expressions.password}
                                    />
                                </Col>
                            </Row>
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
    );

}