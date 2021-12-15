import { Row, Form, Col, Container, Button, Image } from "react-bootstrap";
import photo from "../../Assets/Foto1.jpg";
import { useState } from "react";
import "./register.css"
import { validate } from "graphql";
import Input from "./input";


export const Register = () => {
  const [name, changeName] = useState({ field: '', valid: null });
  const [lastName, changeLastName] = useState({ field: '', valid: null });
  const [email, changeEmail] = useState({ field: '', valid: null });
  const [phone, changePhone] = useState({ field: '', valid: null });
  const [address, changeAddress] = useState({ field: '', valid: null });
  const [password, changePassword] = useState({ field: '', valid: null });

  const expressions = {
    addres: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phone: /^\d{7,14}$/ // 7 a 14 numeros.
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div id="content">
      <Container fluid id="container">
        <Row id="data">
          <Col sm={7} id="image">
            <h3>Inserte lema aqui</h3>
          </Col>

          <Col sm={5} id="form">
                <h3>Crea tu cuenta gratis</h3>
                <p className="text-muted mb-2"> Ingresa la siguiente información para registrarte</p>
                <Form action="" onSubmit={handleSubmit}>
                  <Row className="form-row mb-2">
                    <Input
                      state={name}
                      changeState={changeName}
                      label="Nombre"
                      placeholder="Ingrese su nombre"
                      type="text"
                      name="name"
                      errorLabel="El nombre no puede contener caracteres especiales"
                      regularExpresion={expressions.name}
                    />
                    <Input
                      state={lastName}
                      changeState={changeLastName}
                      label="Apellido"
                      placeholder="Ingrese su apellido"
                      type="text"
                      name="lastName"
                      errorLabel="El apellido no puede contener caracteres especiales"
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
                        errorLabel="La contraseña tiene que ser de 4 a 12 dígitos."
                        regularExpresion={expressions.password}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col mb-4="true">
                      <Button className="btn btn-primary width-100" id="register" type="submit">Registrarse</Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
      </Container>
    </div>
  );
};