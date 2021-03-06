import { Row, Form, Col, Container, Button } from "react-bootstrap";
import { useState } from "react";
import "../register/register.css";
import { ErrorMessage } from "../register/inputDinamicStyle";
import { MdError } from "react-icons/md";
import { useMutation } from "@apollo/client";
import Input from "../register/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RESET_PASSWORD from "../../graphql/users/RESET_PASSWORD";
import { useNavigate, useParams } from "react-router-dom";
import  swal  from "sweetalert2";

export const  PasswordReset= () => {
    const params = useParams()
    const [mutateFunction, { data, reset }] = useMutation(RESET_PASSWORD);
    const [password1, changePassword1] = useState({ field: "", valid: null });
    const [password2, changePassword2] = useState({ field: "", valid: null });

    const [validForm, changeValidForm] = useState(null);
    const expressions = {
        password1: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/, // 8 dígitos al menos una letra y un numero
        password2: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/, // 8 dígitos al menos una letra y un numero
    };
    let navigate = useNavigate();
    //if (loading) return "Submitting...";

    //if (error) return `Submission error! ${error.message}`;
    
    if (data !== undefined) {
            
            if (data.passwordReset.success) {
                swal.fire({
                        icon: "success",
                        text: "Se restableció la contraseña de forma exitosa",
                        color: '#fff',
                        background: '#000',
                        iconColor: '#BA181B',
                        confirmButtonColor: '#BA181B',
            
                        timer: "2000",
                })
                toast.success("Se restableció la contraseña de forma exitosa");
                changePassword1({ field: "", valid: null });
                changePassword2({ field: "", valid: null });
                navigate("/login");
            } else {
                toast.error(
                    "Ocurrió un error inesperado, intente nuevamente " 
                );
            }
            reset();
    }
    

    const handleSubmit = (e) => {
        
        e.preventDefault();
        if (
            password1.valid === "true"
            && password2.valid === "true"
            && password1.field === password2.field
            && params.token !== null
        ) {
            mutateFunction({
                variables: {
                    token: params.token,
                    password1: password1.field,
                    password2: password2.field
                },
            });

            changeValidForm(true);
            
        } else if(password1.field !== password2.field){
            toast.error(
                "La contraseña nueva no coincide" 
            );
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
                            Restablecer Contraseña
                        </h3>
        
                        <Form
                            className="bg-ourBlack form-border"
                            action=""
                            onSubmit={handleSubmit}
                        >
                            <Row>
                                <Col>
                                    <Input
                                        state={password1}
                                        changeState={changePassword1}
                                        label="Nueva Contraseña"
                                        placeholder="Ingrese su contraseña"
                                        type="password"
                                        name="password"
                                        errorLabel="La contraseña tiene que ser de mínimo 8 dígitos y contener al menos una letra y  un numero"
                                        regularExpresion={expressions.password1}
                                    />
                                    <Input
                                        state={password2}
                                        changeState={changePassword2}
                                        label="Confirme la nueva Contraseña"
                                        placeholder="Ingrese su contraseña"
                                        type="password"
                                        name="password"
                                        errorLabel="La contraseña tiene que ser de  mínimo 8 dígitos y contener al menos una letra y un número"
                                        regularExpresion={expressions.password2}
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