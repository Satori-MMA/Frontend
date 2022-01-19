import { Row, Form, Col, Container, Button } from "react-bootstrap";
import { useState } from "react";
import "./register.css";
import { ErrorMessage } from "./inputDinamicStyle";
import {MdError} from 'react-icons/md'
import { useMutation } from "@apollo/client";
import REGISTER from "../../graphql/users/REGISTER";
import Input from "./input";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Register = () => {
  const [mutateFunction,{ data,reset}] = useMutation(REGISTER);
  

  const [name, changeName] = useState({ field: "", valid: null });
  const [lastName, changeLastName] = useState({ field: "", valid: null });
  const [email, changeEmail] = useState({ field: "", valid: null });
  const [phone, changePhone] = useState({ field: "", valid: null });
  const [address, changeAddress] = useState({ field: "", valid: null });
  const [password, changePassword] = useState({ field: "", valid: null });
  const [validForm, changeValidForm] = useState(null);
  const expressions = {
    addres: /^[a-zA-Z0-9\s_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // 8 digitos al menos una letra y un numero
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phone: /^\d{7,14}$/, // 7 a 14 numeros.
  };
  

  //if (loading) return "Submitting...";

  //if (error) return `Submission error! ${error.message}`;

  if (typeof data != "undefined") {
    console.log(data);
    if (data.userRegister.success) {
      console.log("Correcto");
      toast.success("Revisa tu correo para continuar con el registro");
    } else {
      console.log(data.userRegister.errors)
      toast.error("Un error inesperado ha ocurrido: "+data.userRegister.errors.email[0].message);
      
    }
    reset();
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name.valid === "true" &&
      lastName.valid === "true" &&
      email.valid === "true" &&
      phone.valid === "true" &&
      address.valid === "true" &&
      password.valid === "true"
    ) {
      mutateFunction({
        variables: {userPhone:phone.field,userAddress:address.field,firstName:name.field,lastName:lastName.field,email:email.field,password1:password.field,password2:password.field},
      });
      
  
      changeValidForm(true);
      changeName({ field: "", valid: null });
      changeLastName({ field: "", valid: null });
      changeEmail({ field: "", valid: null });
      changePhone({ field: "", valid: null });
      changeAddress({ field: "", valid: null });
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
          <Col  sm={8} className="pt m-auto shadow-sm rounded-lg" id="form">
            <h3 className="text-center text-imperialRed">Crea tu cuenta gratis</h3>
            <p className="text-white mb-2">              
              Ingresa la siguiente información para registrarte
            </p>
            <Form className="bg-ourBlack form-border"  action="" onSubmit={handleSubmit}>
              <Row className="form-row mb-2">
                <Input
                  state={name}
                  changeState={changeName}
                  label="Nombre"
                  placeholder="Ingrese su nombre"
                  type="text"
                  name="name"
                  errorLabel="El nombre no puede contener caracteres especiales ni ser vacio"
                  regularExpresion={expressions.name}
                />
                <Input
                  state={lastName}
                  changeState={changeLastName}
                  label="Apellido"
                  placeholder="Ingrese su apellido"
                  type="text"
                  name="lastName"
                  errorLabel="El apellido no puede contener caracteres especiales ni ser vacio"
                  regularExpresion={expressions.name}
                />
              </Row>
              <Row>
                <Col>
                  <Input
                    state={address}
                    changeState={changeAddress}
                    label="Direccion"
                    placeholder="Ingrese su direccion"
                    type="text"
                    name="address"
                    errorLabel="La direccion tiene que ser de 4 a 16 dígitos y solo puede contener numeros, letras y guion bajo"
                    regularExpresion={expressions.addres}
                  />
                  <Input
                    state={phone}
                    changeState={changePhone}
                    label="Telefono"
                    placeholder="Ingrese su telefono"
                    type="text"
                    name="phone"
                    errorLabel="El telefono solo puede contener numeros y el maximo son 14 dígitos."
                    regularExpresion={expressions.phone}
                  />
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
                  <Input
                    state={password}
                    changeState={changePassword}
                    label="Contraseña"
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
                      <MdError color="red"/>
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
                    Registrarse
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
