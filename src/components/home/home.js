import { Row, Col, Container, Image } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import informacion1 from "../../Assets/Foto10.png";
import informacion2 from "../../Assets/Foto5.jpg";
import informacion3 from "../../Assets/Foto6.jpg";
import imgWhatsapp from "../../Assets/whatsapp1.png";
import { ReactComponent as DividerSvg } from "../../Assets/divider.svg";
import { COLORS } from "../utilities/color";
import { CarouselI } from "./Carousel";
import { Schedule } from "./Schedule";

const Divider = () => {
  return (
    <div className="text-center">
      <DividerSvg fill={COLORS.silverChalice} width="50%" />
    </div>
  );
};

export const Home = () => {
  return (
    <div>
      {/* Carrusel de imagenes */}

        <CarouselI />


      <Divider />

      {/* Seccion de Informacion */}
      <Row className="text-white m-3" xs={1} sm={2} lg={3}>
        <Col>
          <Divider />
          <h1 className="text-center text-imperialRed">BIENVENIDOS</h1>
          <Divider />
          <p className="Justify-Text">
            Somos un centro de entrenamiento y acondicionamiento físico, nos
            enfocamos en disciplinas como: Brazilian Jiu-Jitsu, Grappling, Muay
            Thay, Boxeo y Artes Marciales Mixtas, Con entrenamientos que
            combinan estas diversas disciplinas para un mejor aprendizaje.
            También dictamos cursos de defensa personal.
          </p>

          <p>Si quieres saber más, escríbenos:</p>
          <a
            href="https://wa.me/573012524990"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={imgWhatsapp} fluid />
          </a>
          <Divider />
          <h4 className="text-center">
            "IT'S NOT WHETHER YOU GET KNOCKED DOWN, IT'S WHETHER YOU GET UP"
          </h4>
          <p>Vince Lombardi</p>
        </Col>

        <Col>
          <Divider />
          <h3 className="text-center">
            No Sólo Sueñes Con Tu Meta, Entrena Para Alcanzarla.
          </h3>
          <img
            className="mt-3"
            alt="Centro de entrenamiento Satori - Informacion 1"
            width="100%"
            height="auto"
            src={informacion1}
          />
        </Col>

        <Col>
          <Divider />
          <h1 className="text-center text-imperialRed">
            ¡ PRIMERA CLASE GRATIS !
          </h1>
          <img
            className="mt-3 mb-3"
            alt="Centro de entrenamiento Satori - Informacion 2"
            width="100%"
            height="auto"
            src={informacion2}
          />
          <Divider />
          <img
            className="mt-3 mb-3"
            alt="Centro de entrenamiento Satori - Informacion 3"
            width="100%"
            height="auto"
            src={informacion3}
          />
          <div className="text-center">
            <Button
              className="btn-lg bg-ourBlack button-main button-courses2"
              as={Link}
              to="/contact"
              variant="outline-success m-2"
            >
              ¡ ENTRENA CON NOSOTROS !
            </Button>
          </div>
        </Col>
      </Row>
      <Divider />

      {/* Seccion de Informacion Cursos */}
      <Row className="pt-2 text-center">
        <h1 className="text-imperialRed"> Programas de Formación y Cursos</h1>
        <p>Tenemos muchos cursos para todas las categorías y niveles</p>
      </Row>
      <Container fluid id="course-container" className="text-center">
        <Button
          className="btn-lg bg-ourBlack button-main button-courses2"
          as={Link}
          to="/courses"
          variant="outline-success m-2"
        >
          Ver Todos Los Cursos
        </Button>

        <Row className="p-2" xs={1} sm={1} lg={2}>
          <Col className="p-2">
            <Button
              className="btn-lg bg-ourBlack button-main button-courses"
              as={Link}
              to={{ pathname: `/courses/Brazilian Jiu-Jitsu` }}
              variant="outline-success m-2"
            >
              Jiu-Jitsu
            </Button>
          </Col>

          <Col>
            <Button
              className="btn-lg bg-ourBlack button-main button-courses"
              as={Link}
              to={{ pathname: `/courses/Muay Thai` }}
              variant="outline-success m-2"
            >
              Muay Thai
            </Button>
          </Col>
        </Row>
        <Row className="p-2" xs={1} sm={1} lg={2}>
          <Col className="p-2">
            <Button
              className="btn-lg bg-ourBlack button-main button-courses"
              as={Link}
              to={{ pathname: `/courses/MMA` }}
              variant="outline-success m-2"
            >
              MMA
            </Button>
          </Col>

          <Col>
            <Button
              className="btn-lg bg-ourBlack button-main button-courses"
              as={Link}
              to={{ pathname: `/courses/Defensa Personal` }}
              variant="outline-success m-2"
            >
              Defensa Personal
            </Button>
          </Col>
        </Row>
        <Button
          className="btn-lg bg-ourBlack button-main button-courses"
          as={Link}
          to={{ pathname: `/courses/Acondicionamiento Fisico` }}
          variant="outline-success m-2"
        >
          Acondicionamiento Fisico
        </Button>
      </Container>
      <Divider />

      {/* Seccion horarios de entreno */}
      <Row className="pt-2 text-center">
        <h1 className="text-imperialRed"> Horarios de Entreno</h1>
      </Row>
      <Container fluid className="text-white">
        <Row xs={1} sm={2} lg={4} className="mt-3 mb-3">
          <Schedule
            dia="LUNES"
            horario="6:00 PM - 8:00 PM"
            clase="Brazilian Jiu-Jitsu y Grappling"
          />
          <Schedule
            dia="MIERCOLES"
            horario="6:00 PM - 8:00 PM"
            clase="Muay Thai"
          />
          <Schedule
            dia="VIERNES"
            horario="6:00 PM - 8:00 PM"
            clase="MMA (Mixed Martial Arts)"
          />
          <Schedule
            dia="SABADO"
            horario="10:00 AM - 12:00 M"
            clase="Jiu-Jitsu, Muay Thai, MMA"
          />
        </Row>
      </Container>

      <Divider />
    </div>
  );
};
