import { Card, Button, Row } from "react-bootstrap";
import { FcBusinessman } from "react-icons/fc";
import { useGlobalState } from "../GlobalState";
import { Link } from "react-router-dom";
import { COLORS } from "../utilities/color";
import Logo from "../../Assets/Logo2.png";
export const UserCard = ({user}) => {
  return (
    <Card className="no-border-card">
      <Card.Body className="bg-ourBlack form-border m-0">
        <Row>
          <div>
          <img
          className="mt-3 mb-3"
          alt="Centro de entrenamiento Satori - Horario"
          width="40%"
          height="auto"
          src={Logo}
        />
          </div>

          <Card.Title>
            {user?.rolUser?.edges[0]?.node.rolName} {user.firstName}
          </Card.Title>
          <Card.Text className="p-2">
            <p>
              <strong>Nombre completo: </strong> {user.firstName}{" "}
              {user.lastName}
              <br />
              <strong>email: </strong>
              {user.email}
              <br />
              <strong>Número de teléfono: </strong>
              {user.userPhone}
              <br />
              <strong>Dirección: </strong>
              {user.userAddress}
              <br />
            </p>
          </Card.Text>
        </Row>
        <Button
            className="button-login-r bottom mb-1"
            as={Link} to="/profileupdate"
            variant="primary"
          >
            Actualizar Informacion
          </Button>
      </Card.Body>
    </Card>
  );
};
