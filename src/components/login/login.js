import { Row, Col, Container, Form, Button, InputGroup } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

export const Login = () => {
    return (
        <>
            <Container>
                <Row className="pt-5 text-center">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form>
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
                                <Col className="mb-4 p-2">
                                    <Button variant="primary" type="submit" class="btn">
                                        Iniciar Sesion
                                    </Button>
                                </Col>
                                <Col className="mb-4 p-2">
                                    <Button variant="success">Registrarse</Button>
                                </Col>
                            </Row>
                            <Button variant="primary" type="submit">
                                Iniciar Sesion con Google
                            </Button>
                            <Button variant="link">Olvide mi contraseña</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
