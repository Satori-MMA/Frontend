import { Row, Col, Container, Form, Button, InputGroup } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { COLORS } from "../utilities/color";
import LOGIN from "../../graphql/users/LOGIN";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useGlobalState } from "../GlobalState";
import "react-toastify/dist/ReactToastify.css";

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
  // if (loading) return "Submitting...";

  // if (error) return `Submission error! ${error.message}`;

  if (typeof data != "undefined") {
    if (data.tokenAuth.success) {
      toast.success("Inicio de sesion exitoso !", { theme: "dark" });
      localStorage.setItem("user", JSON.stringify(data.tokenAuth.user));
      localStorage.setItem("token", data.tokenAuth.token);
      
      updateUser(data.tokenAuth.user);
      console.log(user);
      navigate("/");
    } else {
      toast.error("Credenciales invalidas", { theme: "dark" });
    }
    reset();
  }

  const handleSummit = (e) => {
    e.preventDefault();
    tokenAuth({
      variables: { email: datalogin.email, password: datalogin.password },
    });
  };

  return (
    <>
      <Container>
        <ToastContainer autoClose={4000} />
        <Row className="justify-content-md-center">
          <Col lg={4} md={6} sm={12} className="pt m-auto shadow-sm rounded-lg">
            <Form className="bg-ourBlack form-border">
              <Row className="icon-user">
                <FaUserCircle color={COLORS.carnelian} size={125} />
              </Row>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <InputGroup>
                  <InputGroup.Text className="border-carnelian icon-login">
                    <FaUserCircle color="black" size={30}/>
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
                    width= "1px"
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
                className="button-login-r"
                id="login"
                variant="success"
                type="submit"
                onClick={handleSummit}
              >
                Iniciar Sesion
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
                      Olvide mi contraseña
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
