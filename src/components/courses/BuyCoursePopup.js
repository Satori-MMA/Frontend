import React from "react";
import { Container } from "react-bootstrap";
import { COLORS } from "../utilities/color";
import Logo from "../../Assets/Logo2.png";
import {
  BsWhatsapp,
  BsFillXSquareFill,
} from "react-icons/bs";

export const BuyCursePopup = (props) => {
  const handleClose = () => {
    props.setTrigger(false);
  };
  return props.trigger ? (
    <div className="popup">
      <Container
        fluid
        className="container-popup-schedule text-center mt-2 mb-2 popup-inner-schedule"
      >
        <button onClick={handleClose} className="close-btn-schedule">
          <BsFillXSquareFill color={COLORS.carnelian} />
        </button>
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
          Si es la primera vez que accedes a nuestra aplicación, tenemos muchas
          sorpresas para ti 😃
        </h5>
        <h5 className="text-welcome-messagge">
        Tienes derecho a una lección presencial totalmente gratis para que
          conozcas nuestras instalaciones y la metodología a utilizar, además en
          la aplicación encontraras muchos cursos donde aprenderás cosas
          muy interesantes.

        </h5>
        <h4 className="text-welcome-messagge mb-3">Contáctate con nosotros:</h4>

        <a
          className="m-1"
          h href="https://wa.me/573012524990"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsWhatsapp className="icon-welcome" color={COLORS.carnelian} />
        </a>
       
      </Container>
    </div>
  ) : (
    ""
  );
};

export default BuyCursePopup;
