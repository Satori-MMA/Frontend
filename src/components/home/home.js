import { Row, Col, Container, Image } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../Assets/LogoPNG.png";
import Carrusel2 from "../../Assets/Foto1.jpg";
import Carrusel3 from "../../Assets/Foto3.jpg";
import Carrusel1 from "../../Assets/Foto4.jpg";
import Carrusel4 from "../../Assets/Foto12.jpg";
import informacion1 from "../../Assets/Foto10.png";
import informacion2 from "../../Assets/Foto5.jpg";
import informacion3 from "../../Assets/Foto6.jpg";
import imgWhatsapp from "../../Assets/whatsapp1.png";
import { ReactComponent as DividerSvg } from "../../Assets/divider.svg";
import Carousel from "react-bootstrap/Carousel";
import { RiHardDrive2Line } from "react-icons/ri";

const Divider = () => {
  return (
    <div className="text-center">
      <DividerSvg fill="gray" width="50%" />
    </div>
  );
};

export const Home = () => {
  return (
    <div>
      {/* Carrusel de imagenes */}
      <Container>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Carrusel1}
              alt="Centro de Entrenamiento Satori - Slide 1"
            />
            <Carousel.Caption>
              <h1>Centro de Entrenamiento</h1>
              <h3>SATORI MMA PASTO</h3>
              <p>Guerreros dentro dentro y fuera del tatami</p>
              <Button as={Link} to="/login" variant="success m-2 mt-3">
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
              <p>Guerreros dentro dentro y fuera del tatami</p>
              <Button as={Link} to="/login" variant="success m-2 mt-3">
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
              <p>Guerreros dentro dentro y fuera del tatami</p>
              <Button as={Link} to="/login" variant="success m-2 mt-3">
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
              <p>Guerreros dentro dentro y fuera del tatami</p>
              <Button as={Link} to="/login" variant="success m-2 mt-3">
                Entrena Con Nosotros
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>

      <Divider />

      {/* Seccion de Informacion */}
      <Row className="m-3" xs={1} sm={2} lg={3}>
        <Col>
          <Divider />
          <h1 className="text-center">BIENVENIDOS</h1>
          <Divider />
          <p className="Justify-Text">
            Somos un centro de entrenamiento y acondicionamiento físico, nos
            enfocamos en disciplinas como: Brazilian Jiu-Jitsu, Grappling, Muay
            Thay, Boxeo y Artes Marciales Mixtas, Con entrenamientos que
            combinan estas diversas disciplinas para un mejor aprendizaje.
            También dictamos cursos de defensa personal.</p>
                   
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
          <h1 className="text-center">¡ PRIMERA CLASE GRATIS !</h1>          
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

          {/* MEJORAR ESTE BOTON */}
          <div className="text-center">
           <Link
            to="/contacto"
            className="bg-black text-white text-decoration-none"
          >            
            ¡¡ ENTRENA CON NOSOTROS !!
          </Link>
          </div>
        </Col>
      </Row>

      <Divider />
    </div>
  );
};

