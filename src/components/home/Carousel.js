import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Carrusel1 from "../../Assets/Foto4.jpg";
import Carrusel2 from "../../Assets/Foto1.jpg";
import Carrusel3 from "../../Assets/Foto3.jpg";
import Carrusel4 from "../../Assets/Foto12.jpg";;

export const CarouselI = () => {
  return (
    <Carousel className="mb-2" >
    
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
            Únete a Nosotros
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
            Únete a Nosotros
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
            Únete a Nosotros
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
            Únete a Nosotros
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};
