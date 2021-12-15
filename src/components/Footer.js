import { Container, Row, Col } from "react-bootstrap";
import { BsFacebook, BsInstagram, BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";
import logo from "../Assets/Logo2.png";

export const Footer = () => {
  return (
    <div className="bg-dark text-light">
      <Container>
        <Row className="pt-3 text-center ">
          <Col sm className="mb-4">
            <p>
              <b> CONTACTANOS</b>
              <br /> <br />
              Diagonal 16D #6E-80 <br />
              Villa Olímpica, Pasto <br />
              Nariño - Colombia <br />
              Celular: (+57) 301 252 4990 <br />
              Correo: ...
            </p>
          </Col>
          <Col sm className="mb-4">
            <p>
              <b>Satori MMA</b>
            </p>
            <Link to="/">
              <img alt="Logo Satori" src={logo} width="150rm" height="auto" />
            </Link>
          </Col>
          <Col sm>
            <p className="mb-5">
              <b>SIGUENOS EN:</b>
            </p>
            <a className="m-1" href="https://www.facebook.com/Roninsatorimma/" target="_blank" rel="noopener noreferrer">
              <BsFacebook size="25%" />
            </a>
            <a className="m-1" href="https://www.instagram.com/roninsatorimma/" target="_blank" rel="noopener noreferrer">
              <BsInstagram size="25%" />
            </a>
            <a
              className="m-1"
              href="https://www.youtube.com/channel/UCQPDBalc7BAUIfUOKtrh48w" target="_blank" rel="noopener noreferrer">
              <BsYoutube size="25%" />
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
