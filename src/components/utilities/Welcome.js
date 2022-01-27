import React from "react";
import { Container, Modal } from "react-bootstrap";
import { useState } from "react";
import { COLORS } from "../utilities/color";
import Logo from "../../Assets/Logo2.png";
import {
  BsFacebook,
  BsInstagram,
  BsYoutube,
  BsWhatsapp,
  BsFillXSquareFill,
} from "react-icons/bs";

export const Welcome = (props) => {
  const [buttonPopup, setButtonPopup] = useState(true);

  const handleClose = () => {
    setButtonPopup(false);
    window.localStorage.setItem("alreadyLoad", 1);
  };

  return (
    <Modal show={buttonPopup} onHide={handleClose}>
    <div className="popup">
      <Container
        fluid
        className="container-popup text-center mt-2 mb-2 popup-inner"
      >

        <button onClick={handleClose} className="close-btn"><BsFillXSquareFill color={COLORS.carnelian} /></button>
        {props.children}
        <h1 className="text-center text-white mt-4">Bienvenido a SATORI MMA</h1>
        <img
          className="mt-3 mb-3"
          alt="Centro de entrenamiento Satori - Horario"
          width="30%"
          height="auto"
          src={Logo}
        />
        <h5 className="text-welcome-messagge">
          Si es la primera vez que accedes a nuestra aplicacion, tenemos muchas
          sorpresas para ti 😃
        </h5>
        <h5 className="text-welcome-messagge">
          Tienes derecho a una leccion presencial totalmente gratis para que
          conozcas nuestras instalaciones y la metodologia a utilizar, ademas en
          la aplicacion encontraras muchos cursos donde aprenderas cosas
          muy interesantes.
        </h5>
        <h4 className="text-welcome-messagge">Contactate con nosotros:</h4>

        <a
          className="m-1"
          h href="https://wa.me/573012524990"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsWhatsapp size="5%" color={COLORS.carnelian} />
        </a>
        <a
          className="m-1"
          href="https://www.facebook.com/Roninsatorimma/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsFacebook size="5%" color={COLORS.carnelian} />
        </a>
        <a
          className="m-1"
          href="https://www.instagram.com/roninsatorimma/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsInstagram size="5%" color={COLORS.carnelian} />
        </a>
        <a
          className="m-1"
          href="https://www.youtube.com/channel/UCQPDBalc7BAUIfUOKtrh48w"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsYoutube size="5%" color={COLORS.carnelian} />
        </a>
      </Container>
    </div>
    </Modal>
  );
};

export default Welcome;
