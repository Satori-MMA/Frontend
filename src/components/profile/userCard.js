import { Card, Button, Row } from "react-bootstrap";
import { FcBusinessman } from "react-icons/fc";
import { useGlobalState } from "../GlobalState";
import { COLORS } from "../utilities/color";
export const UserCard = ({user}) => {
  return (
    <Card className="no-border-card">
      <Card.Body className="bg-ourBlack form-border m-0">
        <Row>
          <div>
            <FcBusinessman
              className="bg-cultured circle"
              color={COLORS.carnelian}
              size={125}
            />
          </div>

          <Card.Title>
            {user.firstName} {user?.rolUser?.edges[0]?.node.rolName}
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
      </Card.Body>
    </Card>
  );
};
