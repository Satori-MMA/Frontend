import { Row, Col, Container, Form, Button, InputGroup } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { COLORS } from "../utilities/color";
import logo from "../../Assets/Logo2.png";
import LOGIN from "../../graphql/users/LOGIN";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useGlobalState } from "../GlobalState";
import "react-toastify/dist/ReactToastify.css";
import { LoadingSpin } from "../utilities/LoadingSpin";

export const Login = () => {
  const [tokenAuth, { data, loading, error, reset }] = useMutation(LOGIN);
  const [datalogin, setDatalogin] = useState({ email: "", password: "" });
  const [user, updateUser] = useGlobalState("user");
  let navigate = useNavigate();
  useEffect(() => {
    if (user) {
      console.log(user);
      navigate("/profile");
    }
  }, []);

  if (loading) return <LoadingSpin />;

  if (typeof data != "undefined") {
    if (data.tokenAuth.success) {
      toast.success("Inicio de sesión exitoso !", { theme: "dark" });
      localStorage.setItem("user", JSON.stringify(data.tokenAuth.user));
      localStorage.setItem("token", data.tokenAuth.token);
      updateUser(data.tokenAuth.user);
      console.log(user);
      navigate("/");
    } else {
      // console.log("error");
      toast.error("Credenciales invalidas", { theme: "dark" });
    }
    reset();
  }

  const handleSummit = (e) => {
    e.preventDefault();
    if (datalogin.email === "") {
      toast.error("Ingrese el correo electrónico", { theme: "dark" });
    } else if (!datalogin.email.includes("@")) {
      toast.error("Correo electrónico invalido", { theme: "dark" });
    } else if (datalogin.password === "") {
      toast.error("Ingrese la contraseña", { theme: "dark" });
    } else {
      tokenAuth({
        variables: { email: datalogin.email, password: datalogin.password },
      });
    }
    reset();
  };

  return (
    <>
      <Container className="pt-4">
        <ToastContainer autoClose={4000} />
        <Row className="justify-content-md-center">
          <Col lg={4} md={6} sm={12} className="m-auto shadow-sm rounded-lg">
            <Form className="bg-ourBlack form-border pt-1">
              <Row className="icon-user">
                <img
                  alt="Logo Satori"
                  src={logo}
                  className="d-inline-block align-top"
                />{" "}
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
                    placeholder="Ingrese su correo electrónico"
                    width="1px"
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <InputGroup>
                  <InputGroup.Text className="border-carnelian icon-login">
                    <RiLockPasswordFill color="black" size={30} />
                  </InputGroup.Text>

                  <Form.Control
                    onChange={(e) => {
                      e.preventDefault();
                      setDatalogin({
                        ...datalogin,
                        password: e.target.value,
                      });
                    }}
                    type="password"
                    className="border-line-carnelian bg-cultured"
                    placeholder="Ingrese su contraseña"
                  />
                </InputGroup>
              </Form.Group>

              <Button
                className="button-login-r mb-2"
                id="login"
                variant="success"
                type="submit"
                onClick={handleSummit}
              >
                Iniciar Sesión
              </Button>
              <Button
                className="button-login"
                variant="outline-primary"
                as={Link}
                to="/register"
              >
                Registrarse
              </Button>
              <Button
                className="button-forgot-password"
                variant="link"
                as={Link}
                to="/sendEmailForget"
              >
                Olvidé mi contraseña
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
