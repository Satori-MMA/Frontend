import { Col, Container } from "react-bootstrap";
import { ReactComponent as DividerSvg } from "../../Assets/divider.svg";
import { COLORS } from "../utilities/color";
import Logo from "../../Assets/Logo2.png";
const Divider = () => {
  return (
    <div className="text-center">
      <DividerSvg fill={COLORS.silverChalice} width="50%" />
    </div>
  );
};

export const Schedule = ({ dia, horario, clase }) => {
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
        <p className="text-center">{horario}</p>
        <Divider />
        <p className="text-center mb-5">{clase}</p>
      </Container>
    </Col>
  );
};
