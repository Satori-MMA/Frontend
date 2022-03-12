import { Row, Form, Col, Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./register.css";
import { ErrorMessage } from "./inputDinamicStyle";
import { MdError } from "react-icons/md";
import { useMutation } from "@apollo/client";
import REGISTER from "../../graphql/users/REGISTER";
import Input from "./input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../GlobalState";

export const Register = () => {
  const [mutateFunction, { data, loading, error, reset }] = useMutation(REGISTER);

  const [name, changeName] = useState({ field: "", valid: null });
  const [lastName, changeLastName] = useState({ field: "", valid: null });
  const [email, changeEmail] = useState({ field: "", valid: null });
  const [phone, changePhone] = useState({ field: "", valid: null });
  const [address, changeAddress] = useState({ field: "", valid: null });
  const [password, changePassword] = useState({ field: "", valid: null });
  const [validForm, changeValidForm] = useState(null);
  const expressions = {
    longText: /^[a-zA-ZñÑáéíóúÁÉÍÓÚZ0-9\s_.-./.=.?.&.:]{1,254}$/, // Letras, numeros, guion, guion bajo y acentos    
    addres: /^[a-zA-ZñÑáéíóúÁÉÍÓÚZ0-9\s_.*+|°,#/-]{4,50}$/, // Letras, números, guion y guion_bajo
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/, // 8 dígitos al menos una letra y un numero
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phone: /^\d{7,14}$/, // 7 a 14 números.
  };



  const [user] = useGlobalState("user");
  let navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  if (loading) {
    
  };

  if (error) return `Submission error! ${error.message}`;
  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  if (typeof data != "undefined") {
    console.log(data);
    if (data.userRegister.success) {
      console.log("Correcto");
      toast.success("Revisa tu correo para continuar con el registro")
      delay(3000).then(() => navigate("/login"));

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
    if (password.field.includes(name.field)) {
      changeValidForm(false);
    } else {
      if (
        name.valid === "true" &&
        lastName.valid === "true" &&
        email.valid === "true" &&
        phone.valid === "true" &&
        address.valid === "true" &&
        password.valid === "true"
      ) {
        mutateFunction({
          variables: {
            userPhone: phone.field,
            userAddress: address.field,
            firstName: name.field,
            lastName: lastName.field,
            email: email.field,
            password1: password.field,
            password2: password.field,
          },
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
              Crea tu cuenta gratis
            </h3>
            <p className="text-white mb-2">
              Ingresa la siguiente información para registrarte
            </p>
            <Form
              className="bg-ourBlack form-border"
              action=""
              onSubmit={handleSubmit}
            >
              <Row className="form-row mb-2">
                <Input
                  state={name}
                  changeState={changeName}
                  label="Nombre"
                  placeholder="Ingrese su nombre"
                  type="text"
                  name="name"
                  errorLabel="El nombre no puede contener caracteres especiales ni ser vacío"
                  regularExpresion={expressions.name}
                />
                <Input
                  state={lastName}
                  changeState={changeLastName}
                  label="Apellido"
                  placeholder="Ingrese su apellido"
                  type="text"
                  name="lastName"
                  errorLabel="El apellido no puede contener caracteres especiales ni ser vacío"
                  regularExpresion={expressions.name}
                />
              </Row>
              <Row>
                <Col>
                  <Input
                    state={address}
                    changeState={changeAddress}
                    label="Dirección"
                    placeholder="Ingrese su dirección"
                    type="text"
                    name="address"
                    errorLabel="La dirección tiene que ser de 4 a 16 dígitos y solo puede contener números, letras y guion bajo"
                    regularExpresion={expressions.addres}
                  />
                  <Input
                    state={phone}
                    changeState={changePhone}
                    label="Teléfono"
                    placeholder="Ingrese su teléfono"
                    type="text"
                    name="phone"
                    errorLabel="El teléfono no puede ser vacío, solo puede contener números y el máximo son 14 dígitos."
                    regularExpresion={expressions.phone}
                  />
                  <Input
                    state={email}
                    changeState={changeEmail}
                    label="Correo"
                    placeholder="Ingrese su correo"
                    type="email"
                    name="email"
                    errorLabel="El correo solo puede contener letras, números, puntos, guiones y guion bajo."
                    regularExpresion={expressions.email}
                  />
                  <Input
                    state={password}
                    changeState={changePassword}
                    label="Contraseña"
                    placeholder="Ingrese su contraseña"
                    type="password"
                    name="password"
                    errorLabel="La contraseña tiene que ser de minimo 8 dígitos y contener al menos una letra, un numero, una mayúscula y un carácter especial"
                    regularExpresion={expressions.password}
                  />
                </Col>
              </Row>
              <hr></hr>
              <Row>
                {validForm === false && (
                  <ErrorMessage>
                    <p className="mb-2">
                      <MdError color="red" />
                      <b>Error:</b> Por favor rellena el formulario correctamente, recuerda que tú nombre y contraseña deben ser diferentes!
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
