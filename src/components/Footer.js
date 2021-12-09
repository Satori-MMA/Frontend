import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { BsFacebook, BsInstagram, BsYoutube } from "react-icons/bs";

export const Footer = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">Carrera 25 # 10-72 Barrio Obrero - Pasto</Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <a href="https://www.facebook.com/Roninsatorimma/">
            <BsFacebook />
          </a>
        </Col>
        <Col md="auto">
          <a href="https://www.instagram.com/roninsatorimma/">
            <BsInstagram />
          </a>
        </Col>
        <Col md="auto">
          <a href="https://www.youtube.com/channel/UCQPDBalc7BAUIfUOKtrh48w">
            <BsYoutube />
          </a>
        </Col>
      </Row>
    </Container>
  );
};
