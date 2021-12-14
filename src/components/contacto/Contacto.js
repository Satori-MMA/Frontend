import { Col, Container, Row, Image } from "react-bootstrap";
import { FormContacto } from "./FormContacto";
import imgWhatsapp from "../../Assets/whatsapp1.png";
import { BsFacebook, BsInstagram, BsYoutube } from "react-icons/bs";
export const Contacto = () => {
  return (
    <Container fluid>
      <Row className="pt-5 text-center">
        <h1> En Satori MMA nos importa tu opinión</h1>
      </Row>
      <Row xs={1} sm={1} lg={2}>
        <Col>
          <p>
            Nos encanta escuchar tus inquietudes y estamos ansiosos por hablar
            contigo de tus planes y expectativas sobre nuestras diferentes
            disciplinas. Escribenos ahora! y te responderemos lo antes posible.
          </p>
          <FormContacto />
        </Col>
        <Col>
          <p>Estamos ubicados en bla bla bla </p>
          <div class="mapouter">
            <div class="gmap_canvas">
              <iframe
                width="95%"
                height="400"
                id="gmap_canvas"
                src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
              ></iframe>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="text-center">
        <h1>¡Habla con Nosotros!</h1>
        <a
          href="https://google.com.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={imgWhatsapp} fluid />
        </a>
      </Row>

      <Row className="text-center">
        <h1>
          Tambien Nos Pudes contactar por cualquiera de nuestras redes sociales
        </h1>
      </Row>
      <Row className="text-center" xs={1} sm={3} lg={3}>
        <Col>
          <a
            className="m-1"
            href="https://www.facebook.com/Roninsatorimma/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsFacebook size="40%" />
          </a>
          <br></br>
          Satori MMA Pasto
        </Col>
        <Col>
          <a
            className="m-1"
            href="https://www.instagram.com/roninsatorimma/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsInstagram size="40%" />
          </a>
          <br></br>
          @roninsatorimma
        </Col>
        <Col>
          <a
            className="m-1"
            href="https://www.youtube.com/channel/UCQPDBalc7BAUIfUOKtrh48w"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsYoutube size="40%" />
          </a>
          <br></br>
          Satori MMA Pasto
        </Col>
      </Row>
    </Container>
  );
};
