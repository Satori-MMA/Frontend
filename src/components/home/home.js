import { Row, Col, Container, Image } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carrusel1 from "../../Assets/Foto4.jpg";
import Carrusel2 from "../../Assets/Foto1.jpg";
import Carrusel3 from "../../Assets/Foto3.jpg";
import Carrusel4 from "../../Assets/Foto12.jpg";
import informacion1 from "../../Assets/Foto10.png";
import informacion2 from "../../Assets/Foto5.jpg";
import informacion3 from "../../Assets/Foto6.jpg";
// import Horarios1 from "../../Assets/P1-Satori.png";
// import Horarios2 from "../../Assets/P2-Satori.png";
// import Horarios3 from "../../Assets/P3-Satori.png";
// import Horarios4 from "../../Assets/P4-Satori.png";
// import Horarios5 from "../../Assets/P5-Satori.png";
import imgWhatsapp from "../../Assets/whatsapp1.png";
import Logo from "../../Assets/Logo2.png";
import { ReactComponent as DividerSvg } from "../../Assets/divider.svg";
import Carousel from "react-bootstrap/Carousel";
import { COLORS } from "../utilities/color";

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
      <Container>
        <Carousel className="mb-2">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Carrusel1}
              alt="Centro de Entrenamiento Satori - Slide 1"
            />
            <Carousel.Caption>
              <h1>Centro de Entrenamiento</h1>
              <h3>SATORI MMA PASTO</h3>
              <p>Guerreros dentro y fuera del tatami</p>
              <Button
                className="button-secondary"
                as={Link}
                to="/login"
                variant="success m-2 mt-3"
              >
                Entrena Con Nosotros
              </Button>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Carrusel2}
              alt="Centro de Entrenamiento Satori - Slide 2"
            />
            <Carousel.Caption>
              <h1>Centro de Entrenamiento</h1>
              <h3>SATORI MMA PASTO</h3>
              <p>Guerreros dentro y fuera del tatami</p>
              <Button
                className="button-secondary"
                as={Link}
                to="/login"
                variant="success m-2 mt-3"
              >
                Entrena Con Nosotros
              </Button>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Carrusel3}
              alt="Centro de Entrenamiento Satori - Slide 3"
            />
            <Carousel.Caption>
              <h1>Centro de Entrenamiento</h1>
              <h3>SATORI MMA PASTO</h3>
              <p>Guerreros dentro y fuera del tatami</p>
              <Button
                className="button-secondary"
                as={Link}
                to="/login"
                variant="success m-2 mt-3"
              >
                Entrena Con Nosotros
              </Button>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Carrusel4}
              alt="Centro de Entrenamiento Satori - Slide 4"
            />
            <Carousel.Caption>
              <h1>Centro de Entrenamiento</h1>
              <h3>SATORI MMA PASTO</h3>
              <p>Guerreros dentro y fuera del tatami</p>
              <Button
                className="button-secondary"
                as={Link}
                to="/login"
                variant="outline-success m-2 mt-3"
              >
                Entrena Con Nosotros
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>

      <Divider/>

      {/* Seccion de Informacion */}
      <Row className="text-white m-3" xs={1} sm={2} lg={3}>
        <Col>
          <Divider/>
          <h1 className="text-center text-imperialRed">BIENVENIDOS</h1>
          <Divider />
          <p className="Justify-Text">
            Somos un centro de entrenamiento y acondicionamiento físico, nos
            enfocamos en disciplinas como: Brazilian Jiu-Jitsu, Grappling, Muay
            Thay, Boxeo y Artes Marciales Mixtas, Con entrenamientos que
            combinan estas diversas disciplinas para un mejor aprendizaje.
            También dictamos cursos de defensa personal.
          </p>

          <p>Si quieres saber mas, escribenos:</p>
          <a
            href="https://google.com.co"
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
              to="/contacto"
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
        <h1 className="text-imperialRed"> Programas de Formacion y Cursos</h1>
        <p>Tenemos muchos cursos para todas las catehorias y niveles</p>
      </Row>
      <Container fluid id="course-container" className="text-center">
        <Button
          className="btn-lg bg-ourBlack button-main button-courses2"
          as={Link}
          to="/cursos"
          variant="outline-success m-2"
        >
          Ver Todos Los Cursos
        </Button>

        <Row className="p-2" xs={1} sm={1} lg={2}>
          <Col className="p-2">
            <Button
              className="btn-lg bg-ourBlack button-main button-courses"
              as={Link}
              to="/contacto"
              variant="outline-success m-2"
            >
              Jiu-Jitsu
            </Button>
          </Col>

          <Col>
            <Button
              className="btn-lg bg-ourBlack button-main button-courses"
              as={Link}
              to="/contacto"
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
              to="/contacto"
              variant="outline-success m-2"
            >
              MMA
            </Button>
          </Col>

          <Col>
            <Button
              className="btn-lg bg-ourBlack button-main button-courses"
              as={Link}
              to="/contacto"
              variant="outline-success m-2"
            >
              Defensa Personal
            </Button>
          </Col>
        </Row>
        <Button
          className="btn-lg bg-ourBlack button-main button-courses"
          as={Link}
          to="/contacto"
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
          <Col>
            <Container
              fluid
              className="container-schedule text-center mt-2 mb-2"
            >
              <h3 className="text-center">LUNES</h3>
              <Divider />
              <img
                className="mt-3 mb-3"
                alt="Centro de entrenamiento Satori - Horario"
                width="40%"
                height="auto"
                src={Logo}
              />
              <p className="text-center">6:00 PM - 8:00 PM</p>
              <Divider />
              <p className="text-center mb-5">
                Brazilian Jiu-Jitsu & Grappling
              </p>
            </Container>
          </Col>
          <Col>
            <Container
              fluid
              className="container-schedule text-center mt-2 mb-2"
            >
              <h3 className="text-center">MIERCOLES</h3>
              <Divider />
              <img
                className="mt-3 mb-3"
                alt="Centro de entrenamiento Satori - Horario"
                width="40%"
                height="auto"
                src={Logo}
              />
              <p className="text-center">6:00 PM - 8:00 PM</p>
              <Divider />
              <p className="text-center mb-5">Muay Thai</p>
            </Container>
          </Col>
          <Col>
            <Container
              fluid
              className="container-schedule text-center mt-2 mb-2"
            >
              <h3 className="text-center">VIERNES</h3>
              <Divider />
              <img
                className="mt-3 mb-3"
                alt="Centro de entrenamiento Satori - Horario"
                width="40%"
                height="auto"
                src={Logo}
              />
              <p className="text-center">6:00 PM - 8:00 PM</p>
              <Divider />
              <p className="text-center mb-5">MMA (Mixed Martial Arts)</p>
            </Container>
          </Col>
          <Col>
            <Container
              fluid
              className="container-schedule text-center mt-2 mb-2"
            >
              <h3 className="text-center">SABADO</h3>
              <Divider />
              <img
                className="mt-3 mb-3"
                alt="Centro de entrenamiento Satori - Horario"
                width="40%"
                height="auto"
                src={Logo}
              />
              <p className="text-center">9:00 AM - 10:00 AM</p>
              <p className="text-center">10:00 AM - 12:00 M</p>
              <Divider />
              <p className="text-center mb-5">
                Variado: Jiu-Jitsu & Grappling, Muay Thai, MMA
              </p>
            </Container>
          </Col>
        </Row>
      </Container>

      {/* Carrusel de imagenes Horarios y Entrenos*/}
      {/* <Container fluid id="schedule-container" className="text-center">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Horarios1}
              alt="Horarios Centro de Entrenamiento Satori - Slide 1"
            />            
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Horarios2}
              alt="Horarios Centro de Entrenamiento Satori - Slide 1"
            />            
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Horarios3}
              alt="Horarios Centro de Entrenamiento Satori - Slide 1"
            />            
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Horarios4}
              alt="Horarios Centro de Entrenamiento Satori - Slide 1"
            />            
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Horarios5}
              alt="Horarios Centro de Entrenamiento Satori - Slide 1"
            />            
          </Carousel.Item>
          
        </Carousel>
      </Container> */}

      <Divider />
    </div>
  );
};
