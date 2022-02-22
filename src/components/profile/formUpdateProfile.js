import { Row, Form, Col, Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import "../register/register.css";
import { ErrorMessage } from "../register/inputDinamicStyle";
import { MdError } from "react-icons/md";
import { useMutation, useQuery } from "@apollo/client";
import UPDATE_USER from "../../graphql/users/UPDATE_USER";
import Input from "../register/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../GlobalState";
import FIND_USER from "../../graphql/users/FIND_USER";
import swal from "sweetalert2";
import { LoadingSpin } from "../utilities/LoadingSpin";

export const ProfileUpdate = () => {
  const [user, updateUser] = useGlobalState("user");
  const navigate = useNavigate();
  console.log(user.email);
  const { data, loading, error } = useQuery(FIND_USER, {
    variables: { email: user.email },
  });
  const [mutateFunction, { data: data1, reset }] = useMutation(UPDATE_USER);

  const [name, changeName] = useState({ field: "", valid: null });
  const [lastName, changeLastName] = useState({ field: "", valid: null });
  const [phone, changePhone] = useState({ field: "", valid: null });
  const [address, changeAddress] = useState({ field: "", valid: null });
  const [validForm, changeValidForm] = useState(null);
  const expressions = {
    addres: /^[a-zA-Z0-9\s_.*+|°,#/-]{4,50}$/, // Letras, números, guion y guion_bajo
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    phone: /^\d{7,14}$/, // 7 a 14 números.
  };
  useEffect(() => {
    if (data !== undefined) {
      changeName({ field: data.users.edges[0].node.firstName, valid: "true" });
      changeLastName({
        field: data.users.edges[0].node.lastName,
        valid: "true",
      });
      changePhone({ field: data.users.edges[0].node.userPhone, valid: "true" });
      changeAddress({
        field: data.users.edges[0].node.userAddress,
        valid: "true",
      });
    }
  }, [data]);

  if (error) return <ErrorMessage></ErrorMessage>;

  if (loading || !data) return <LoadingSpin />;

  if (typeof data1 != "undefined") {
    console.log(data);
    if (data1.updateAccount.success) {
      console.log("Correcto");
      swal.fire({
        icon: "success",
        text: "Actualización de información exitoso",
        color: "#fff",
        background: "#000",
        iconColor: "#BA181B",
        confirmButtonColor: "#BA181B",

        timer: "2000",
      });
      const newUser = {
        ...user,
        firstName: name.field,
        lastName: lastName.field,
        userPhone: phone.field,
        userAddress: address.field,
      };

      updateUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      navigate("/profile");
    } else {
      console.log(data1.updateAccount.errors);
      toast.error(
        "Un error inesperado ha ocurrido: " +
          data1.updateAccount.errors.email[0].message
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
              Ingresa la información que desea actualizar
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
                    errorLabel="El teléfono solo puede contener números y el máximo son 14 dígitos."
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
                <Col className="text-center mb-1 mt-2">
                  <Button
                    className="button-login-r"
                    id="register"
                    type="submit"
                  >
                    Guardar
                  </Button>
                </Col>
                <Col className="text-center mb-1 mt-3">
                  <Button
                    className="button-login"
                    variant="outline-primary"
                    type="submit"
                    as={Link}
                    to="/passwordupdate"
                  >
                    Actualizar Contraseña
                  </Button>
                </Col>
              </Row>
              <Button
                className="button-courses bottom mt-0 "
                as={Link}
                to={"/profile"}
                variant="outline-primary"
              >
                Volver al Perfil
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
