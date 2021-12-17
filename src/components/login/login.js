import { Row, Col, Container, Form, Button, InputGroup } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillGoogleCircle } from "react-icons/ai";
import { COLORS } from "../utilities/color";
import LOGIN from "../../graphql/users/LOGIN";
import { useMutation } from "@apollo/client";
import { useState } from "react";

export const Login = () => {
  const [tokenAuth, { data, loading, error }] = useMutation(LOGIN);
  const [datalogin, setDatalogin] = useState({ email: "", password: "" });

  if (loading) return "Submitting...";

  if (error) return `Submission error! ${error.message}`;

  if (typeof data != "undefined") {
    if (data.tokenAuth.success) {
      console.log("Login Correcto");
    } else {
      console.log("Credenciales invalidas");
    }
  }
  const handleSummit = async (e) => {
    e.preventDefault();
    await tokenAuth({
      variables: { email: datalogin.email, password: datalogin.password },
    });
    setDatalogin({ email: "", password: "" });
  };

  return (
    <>
      <Container>
        <Row>
          <Col lg={4} md={6} sm={12} className="pt m-auto shadow-sm rounded-lg">
            <Form className="bg-ourBlack form-border">
              <Row className="icon-user">
                <FaUserCircle color={COLORS.carnelian} size={150} />
              </Row>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <InputGroup>
                  <InputGroup.Text className="border-carnelian icon-login">
                    <FaUserCircle color="black" size={30} />
                  </InputGroup.Text>
                  <Form.Control
                    onChange={(e) => {
                      e.preventDefault();
                      setDatalogin({
                        ...datalogin,
                        email: e.target.value,
                      });
                    }}
                    type="email"
                    className="border-line-carnelian bg-cultured"
                    placeholder="Ingrese su correo electronico"
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <InputGroup>
                  <InputGroup.Text className="border-carnelian icon-login">
                    <RiLockPasswordFill color="black" size={30} />
                  </InputGroup.Text>

                  <Form.Control
                    onChange={(e) =>
                      setDatalogin({
                        ...datalogin,
                        password: e.target.value,
                      })
                    }
                    type="password"
                    className="border-line-carnelian bg-cultured"
                    placeholder="Ingrese su contraseña"
                  />
                </InputGroup>
              </Form.Group>

              <Row className="p-2" xs={1} sm={1} lg={2}>
                <Col className="p-2">
                  <Button
                    className="button-login"
                    id="login"
                    variant="outline-primary"
                    type="submit"
                    onChange={handleSummit}
                  >
                    Iniciar Sesion
                  </Button>
                </Col>
                <Col className="p-2">
                  <Button className="button-login-r" variant="success">
                    Registrarse
                  </Button>
                </Col>
              </Row>
              <Button
                className="button-login-google"
                variant={COLORS.lightGray}
                type="submit"
              >
                <AiFillGoogleCircle size={40} />
                &ensp; Iniciar Sesion con Google
              </Button>
              <Button className="button-forgot-password" variant="link">
                Olvide mi contraseña
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
