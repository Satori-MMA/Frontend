import { Row, Form, Col, Container, Button } from "react-bootstrap";
import { ReactComponent as DividerSvg } from "../../Assets/divider.svg";
import { useState } from "react";
import "./register.css"
import { validate } from "graphql";
import Input from "./input";
const Divider = () => {
  return (
    <div className="text-center">
      <DividerSvg fill="gray" width="20%" />
    </div>
  );
};

export const Register = () => {
  const [data, setData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <Container fluid="md" id="container">
        <Row className="text-center">
          <h3>Crea tu cuenta gratis</h3>
          <Divider />
        </Row>
        <Row>
          <Col id="data">
            <p className="text-muted mb-5"> Ingresa la siguiente información para registrarte</p>
            <Form action="" onSubmit={handleSubmit}>
              <Row className="form-row mb-2">
                <Input
                  label="Nombre"
                  placeholder="Ingrese su nombre"
                  type="text"
                  name="name"
                />
                <Input
                  label="Apellido"
                  placeholder="Ingrese su apellido"
                  type="text"
                  name="lastName"
                />
              </Row>
              <Row>

                <Col>
                  <Input
                    label="Direccion"
                    placeholder="Ingrese su direccion"
                    type="text"
                    name="address"
                  />
                  <Input
                    label="Telefono"
                    placeholder="Ingrese su telefono"
                    type="number"
                    name="phone"
                  />
                  <Input
                    label="Correo"
                    placeholder="Ingrese su correo"
                    type="email"
                    name="email"
                  />
                  <Input
                    label="Contraseña"
                    placeholder="Ingrese su contraseña"
                    type="password"
                    name="password"
                  />
                </Col>
              </Row>
              <Row>
                <Col align="center" mb-4="true">
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