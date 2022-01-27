import React from "react";
import Lunes from "../../Assets/P2-Satori.png";
import Miercoles from "../../Assets/P3-Satori.png";
import Viernes from "../../Assets/P4-Satori.png";
import Sabado from "../../Assets/P5-Satori.png";
import { Container } from "react-bootstrap";
import { COLORS } from "../utilities/color";
import { BsFillXSquareFill } from "react-icons/bs";

export const SchedulePopup = (props) => {
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
        {props.dia === "LUNES" ? (
          <img
          className="imgSchedule"
            src={Lunes}
            alt="Centro de Entrenamiento Satori - Slide 2"
          />
        ) : <></>}
        {props.dia === "MIERCOLES" ? (
          <img 
          className="imgSchedule"           
            src={Miercoles}
            alt="Centro de Entrenamiento Satori - Slide 2"
          />
        ) : <></>}
        {props.dia === "VIERNES" ? (
          <img 
          className="imgSchedule"           
            src={Viernes}
            alt="Centro de Entrenamiento Satori - Slide 2"
          />
        ) : <></>}
        {props.dia === "SABADO" ? (
          <img        
          className="imgSchedule"    
            src={Sabado}
            alt="Centro de Entrenamiento Satori - Slide 2"
          />
        ) : <></>}

       
      </Container>
    </div>
  ) : (
    ""
  );
};

export default SchedulePopup;
