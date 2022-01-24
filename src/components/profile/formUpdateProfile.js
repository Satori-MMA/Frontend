import { Row, Form, Col, Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import "../register/register.css";
import { ErrorMessage } from "../register/inputDinamicStyle";
import { MdError } from "react-icons/md";
import { useMutation } from "@apollo/client";
import UPDATE_USER from "../../graphql/users/UPDATE_USER";
import Input from "../register/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../GlobalState";



export const ProfileUpdate = () => {
  const [user, updateUser] = useGlobalState("user");
  const [mutateFunction, { data, reset }] = useMutation(UPDATE_USER); //TODO Cambiar mutation por update

  const [name, changeName] = useState({ field: user.firstName, valid: null });
  const [lastName, changeLastName] = useState({ field: user.lastName, valid: null });
  const [phone, changePhone] = useState({ field: user.userPhone, valid: null });
  const [address, changeAddress] = useState({ field: user.userAddress, valid: null });
  const [validForm, changeValidForm] = useState(null);
  const expressions = {
    addres: /^[a-zA-Z0-9\s_.*+|°,#/-]{4,50}$/, // Letras, numeros, guion y guion_bajo
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    phone: /^\d{7,14}$/, // 7 a 14 numeros.
  };
  useEffect(() => {
    if (user) {
      //navigate("/");
    }
  }, []);

  //if (loading) return "Submitting...";

  //if (error) return `Submission error! ${error.message}`;

  if (typeof data != "undefined") {
    console.log(data);
    if (data.updateAccount.success) {
      console.log("Correcto");
      toast.success("Informacion actualizada exitosamente");
    } else {
      console.log(data.updateAccount.errors);
      toast.error(
        "Un error inesperado ha ocurrido: " +
          data.updateAccount.errors.email[0].message
      );
    }
    reset();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name.valid === "true" &&
      lastName.valid === "true" &&
      phone.valid === "true" &&
      address.valid === "true"
    ) {
      mutateFunction({
        variables: {
          userPhone: phone.field,
          userAddress: address.field,
          firstName: name.field,
          email: user.email,
          lastName: lastName.field,
        },
      });

      changeValidForm(true);
      changeName({ field: "", valid: null });
      changeLastName({ field: "", valid: null });
      changePhone({ field: "", valid: null });
      changeAddress({ field: "", valid: null });
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
              Actualizacion de perfil
            </h3>
            <p className="text-white mb-2">
              Ingresa la informacion que desea actualizar
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
                <Col className="text-center" mb-4="true">
                  <Button
                    className="button-login"
                    id="register"
                    type=""
                    as={Link}
                    to="/passwordupdate"
                  >
                    Actualizar Contraseña
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