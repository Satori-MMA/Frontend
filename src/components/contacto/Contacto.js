import { Col, Container, Row, Image } from "react-bootstrap";
import { FormContacto } from "./FormContacto";
import imgWhatsapp from "../../Assets/whatsapp1.png";
import { BsFacebook, BsInstagram, BsYoutube } from "react-icons/bs";
import { COLORS } from "../utilities/color";
import { ReactComponent as DividerSvg } from "../../Assets/divider.svg";

const Divider = () => {
  return (
    <div className="text-center">
      <DividerSvg fill={COLORS.silverChalice} width="50%" />
    </div>
  );
};

export const Contacto = () => {
  return (
    <Container fluid>
      <Row className="pt-5 text-center">
        <h1> En Satori MMA nos importa tu opinión</h1>
      </Row>
      <Row className="text-center mb-4" xs={1} sm={1} lg={2}>
        <Col>
          <p className="Justify-Text m-3">
            Nos encanta escuchar tus inquietudes y estamos ansiosos por hablar
            contigo de tus planes y expectativas sobre nuestras diferentes
            disciplinas. Escribenos ahora! y te responderemos lo antes posible.
          </p>
          <FormContacto />
        </Col>
        <Col>
        <p></p>
          <p>Estamos ubicados en Diagonal 16D #6E-80 Villa Olímpica, Pasto </p>
          <div className={"mapouter"}>
            <div className={"gmap_canvas text-center"}>
              <iframe
                title="mapToSatori"
                width="95%"
                height="450"
                id="gmap_canvas"
                src="https://maps.google.com/maps?q=1.194294813130785,%20-77.26438277486805&t=&z=19&ie=UTF8&iwloc=&output=embed"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
              ></iframe>
            </div>
          </div>
        </Col>
      </Row>

      <Divider />

      <Row className="text-center mt-4">
        <h1>¡Habla con Nosotros!</h1>
        <a
          href="https://wa.me/573012524990"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={imgWhatsapp} fluid />
        </a>
      </Row>

      <Row className="text-center">
        <h1>
          Tambien nos puedes contactar por cualquiera de nuestras redes sociales
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
            <BsFacebook size="40%" color={COLORS.carnelian} />
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
            <BsInstagram size="40%" color={COLORS.carnelian} />
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
            <BsYoutube size="40%" color={COLORS.carnelian} />
          </a>
          <br></br>
          Satori MMA Pasto
        </Col>
      </Row>
    </Container>
  );
};
