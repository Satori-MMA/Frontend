import { Row, Col, Container, Form, Button, InputGroup } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillGoogleCircle } from "react-icons/ai";
export const Login = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col lg={4} md={6} sm={12} className="pt m-auto shadow-sm rounded-lg">
                        <Form className="form-border">
                            <Row className="icon-user">
                                <FaUserCircle color="royalblue" size={150} />
                            </Row>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FaUserCircle color="royalblue" size={30} />
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="email"
                                        placeholder="Ingrese su correo electronico"
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <RiLockPasswordFill color="royalblue" size={30} />
                                    </InputGroup.Text>

                                    <Form.Control
                                        type="password"
                                        placeholder="Ingrese su contraseña"
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Row className="p-2" xs={1} sm={1} lg={2}>
                                <Col className="p-2">
                                    <Button className="button-login" variant="primary" type="submit" >
                                        Iniciar Sesion
                                    </Button>
                                </Col>
                                <Col className="p-2">
                                    <Button className="button-login" variant="success">Registrarse</Button>
                                </Col>
                            </Row>
                            <Button className="button-login" variant="primary" type="submit">
                                
                                <AiFillGoogleCircle size={40} />
                                &ensp;
                                Iniciar Sesion con Google
                            </Button>
                            <Button className="button-login" variant="link">Olvide mi contraseña</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};