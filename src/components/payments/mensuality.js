import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import ALL_MONTHLY from "../../graphql/mensuality/ALL_MONTHLY";
import { Link, useNavigate } from "react-router-dom";
import { ListGroup, Badge, Button } from "react-bootstrap";
import { useGlobalState } from "../GlobalState";
import { LoadingMessage } from "../utilities/LoadingMessage";

export const Mensuality = () => {
  const [user] = useGlobalState("user");
  let navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(ALL_MONTHLY, {
    fetchPolicy: "network-only",
  });
  const expressions = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phone: /^\d$/, // 7 a 14 números.
  };

  useEffect(() => {
    if (user?.rolUser?.edges[0]?.node.rolName !== "TEACHER") {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <h1 className="text-white text-center"> Gestión de Mensualidades </h1>
      <Button
        className="button-login-r"
        variant="success"
        as={Link}
        to="/registerMonthly"
      >
        Agregar mensualidad
      </Button>
      <ListGroup as="ol" numbered>
        {data?.allMonthlypayments?.edges.map((element) => (
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
            key={element.node.id}
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">
                Pago realizado por: {element.node.user.firstName}{" "}
                {element.node.user.lastName} ( {element.node.user.email})
              </div>
              Fecha de inicio: {element.node.moStartDate} | Fecha de
              finalización: {element.node.moFinishDate}
              <br />
              Tipo de mensualidad: {element.node.moType}
            </div>
            <Badge bg="primary" pill>
              ${element.node.moPrice}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};
