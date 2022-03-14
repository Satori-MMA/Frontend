import { Card, Button, Row } from "react-bootstrap";
import { FcBusinessman } from "react-icons/fc";
import { useGlobalState } from "../GlobalState";
import { Link } from "react-router-dom";
import { COLORS } from "../utilities/color";
import CoachLogo from "../../Assets/CoachLogo.png";
import StudentLogo from "../../Assets/StudentLogo.png";
export const UserCard = ({ user }) => {
  return (
    <Card className="no-border-card">
      <Card.Body className="bg-ourBlack form-border m-0">
        <Row>
          <div>
            {user?.rolUser?.edges[0]?.node.rolName === "TEACHER" ? (
              <img
                className="mt-3 mb-3"
                alt="Centro de entrenamiento Satori - Horario"
                width="85%"
                height="auto"
                src={CoachLogo}
              />
            ) : (
              <img
                className="mt-3 mb-3"
                alt="Centro de entrenamiento Satori - Horario"
                width="85%"
                height="auto"
                src={StudentLogo}
              />
            )}           
          </div>

          <Card.Title className="text-carnelian">
            {user.firstName}
          </Card.Title>
          <Card.Text className="p-2">
            <p>
              <strong className="text-imperialRed">Nombre completo: </strong> {user.firstName}{" "}
              {user.lastName}
              <br />
              <strong className="text-imperialRed">email: </strong>
              {user.email}
              <br />
              <strong className="text-imperialRed">Número de teléfono: </strong>
              {user.userPhone}
              <br />
              <strong className="text-imperialRed">Dirección: </strong>
              {user.userAddress}
              <br />
            </p>
          </Card.Text>
        </Row>
        <Button
          className="button-login-r bottom mb-1"
          as={Link}
          to="/profileupdate"
          variant="primary"
        >
          Actualizar Informacion
        </Button>
      </Card.Body>
    </Card>
  );
};