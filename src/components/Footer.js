import { Container, Row, Col } from "react-bootstrap";
import { BsFacebook, BsInstagram, BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";
import logo from "../Assets/Logo2.png";
import { COLORS } from "./utilities/color";

export const Footer = () => {
  return (
    <div className="bg-ourBlack text-light">
      <Container>
        <Row className="pt-3 text-center ">
          <Col sm className="mb-4">
            <p>
              <b className="text-imperialRed"> CONTACTANOS</b>
              <br /> <br />
              <a
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
                href="https://goo.gl/maps/jUnkBszRMcDTBz3TA"
              >
                Diagonal 16D #6E-80
                <br />
                Villa Olímpica, Pasto
                <br />
                Nariño - Colombia <br />
              </a>
              <a
                className="footer-link"
                href="https://wa.me/573012524990"
                target="_blank"
                rel="noopener noreferrer"
              >
                Celular: (+57) 301 252 4990{" "}
              </a>
              <br />
              <a
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:roninsatorimma@gmail.com"
              >
                roninsatorimma@gmail.com
              </a>
            </p>
          </Col>
          <Col sm className="mb-4">
            <p>
              <b className="text-imperialRed">Satori MMA</b>
            </p>
            <Link to="/">
              <img alt="Logo Satori" src={logo} width="150rm" height="auto" />
            </Link>
          </Col>
          <Col sm>
            <p className="mb-5">
              <b className="text-imperialRed">SIGUENOS EN:</b>
            </p>
            <a
              className="m-1"
              href="https://www.facebook.com/Roninsatorimma/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsFacebook size="25%" color={COLORS.carnelian} />
            </a>
            <a
              className="m-1"
              href="https://www.instagram.com/roninsatorimma/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsInstagram size="25%" color={COLORS.carnelian} />
            </a>
            <a
              className="m-1"
              href="https://www.youtube.com/channel/UCQPDBalc7BAUIfUOKtrh48w"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsYoutube size="25%" color={COLORS.carnelian} />
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
