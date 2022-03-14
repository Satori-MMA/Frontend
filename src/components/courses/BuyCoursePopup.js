import React from "react";
import { Container, Image } from "react-bootstrap";
import { COLORS } from "../utilities/color";
import Nequi from "../../Assets/Nequi.png";
import imgWhatsapp from "../../Assets/whatsapp1.png";
import {
  BsWhatsapp,
  BsFillXSquareFill,
  BsFacebook,
  BsInstagram,
} from "react-icons/bs";

export const BuyCursePopup = (props) => {
  const handleClose = () => {
    props.setTrigger(false);
  };
  return props.trigger ? (
    <div className="popup">
      <Container
        fluid
        className="container-popup text-center mt-2 mb-2 popup-inner"
      >

        <button onClick={handleClose} className="close-btn"><BsFillXSquareFill color={COLORS.carnelian} /></button>
        {props.children}
        <h1 className="text-center text-white mt-4">¿Quieres comprar nuestro curso?</h1>
        <h5 className="text-welcome-messagge text-justify">
          En este momento nuestra plataforma de pago no esta en funcionamiento, pero tenemos algunas opciones para ti:
        </h5>
        <img
          className="mt-3 mb-3"
          alt="Centro de entrenamiento Satori - Horario"
          width="20%"
          height="auto"
          src={Nequi}
        />        
        <h5 className="text-welcome-messagge text-justify">
        Si quieres comprar alguno de nuestros cursos, puedes realizar la consignacion del curso a nuestro   <span className="text-danger">Nequi: 301 252 4990</span>.
        Despues nos envias un mensaje de whatsapp con la foto de la consignacion, el nombre del curso, tu nombre y el correo con el que te registraste en nuestra aplicacion.
        Una vez realices esto, nosotros activaremos el curso para ti y estará listo en tu perfil para que lo puedas toomar en cualquier momento.           
        </h5>
        
        <a
            href="https://wa.me/573012524990"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image width="30%" src={imgWhatsapp} fluid />
          </a>

        <h5 className="text-welcome-messagge mt-3">Tambien puedes contactarte con nosotros si tienes alguna duda o para buscar otros metods de pago:</h5>

        <a
          className="m-1"
          h href="https://wa.me/573012524990"
          target="_blank"
          rel="noopener noreferrer"          
        >
          <BsWhatsapp className="icon-welcome"  color={COLORS.carnelian} />
        </a>
        <a
          className="m-1"
          href="https://www.facebook.com/Roninsatorimma/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsFacebook  className="icon-welcome" color={COLORS.carnelian} />
        </a>
        <a
          className="m-1"
          href="https://www.instagram.com/roninsatorimma/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsInstagram className="icon-welcome"  color={COLORS.carnelian} />
        </a>
        
        
      </Container>
    </div>
  ) : (
    ""
  );
};

export default BuyCursePopup;
