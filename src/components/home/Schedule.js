import {Col, Container, Button } from "react-bootstrap";
import { ReactComponent as DividerSvg } from "../../Assets/divider.svg";
import { COLORS } from "../utilities/color";
import {MIERCOLES} from "../../Assets/Foto1.jpg";
import { SchedulePopup } from "./schedulePopup";
import { useState } from "react";
import Logo from "../../Assets/Logo2.png";
const Divider = () => {
  return (
    <div className="text-center">
      <DividerSvg fill={COLORS.silverChalice} width="50%" />
    </div>
  );
};

export const Schedule = ({ dia, horario, clase }) => {
  const [btnPopup, setbtnPopup] = useState(false);
  const handleOpen = () => {
    setbtnPopup(true);    
  };
  
  return (
    <Col>
      <Container fluid className="container-schedule text-center mt-2 mb-2">
        <h3 className="text-center">{dia}</h3>
        <Divider />
        <img
          className="mt-3 mb-3"
          alt="Centro de entrenamiento Satori - Horario"
          width="40%"
          height="auto"
          src={Logo}
        />
        {
        dia==="MIERCOLES"?
        <div>
        <p className="text-center mb-4">{horario}</p>        
        <p className="text-center mb-4">{clase}</p>                
        </div>         :

        <div>
        <p className="text-center">{horario}</p>        
        <p className="text-center mb-2">{clase}</p> 
        </div>         
        }

        <Button
            className="button-secondary"
            variant="success m-2 mt-3 mb-4"
            onClick={handleOpen}
          >
            Mas Informacion
          </Button>
          <SchedulePopup dia={dia} trigger={btnPopup} setTrigger={setbtnPopup}></SchedulePopup>
      </Container>
    </Col>
  );
};
