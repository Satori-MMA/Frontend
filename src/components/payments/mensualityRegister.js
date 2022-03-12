import { useState, useEffect } from "react";

import { Row, Form, Col, Container, Button, Dropdown } from "react-bootstrap";
import { useMutation, useLazyQuery } from "@apollo/client";
import { ErrorMessage } from "../register/inputDinamicStyle";
import { MdError } from "react-icons/md";
import swal from "sweetalert2";
import FIND_USER from "../../graphql/users/FIND_USER";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../GlobalState";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { LoadingSpin } from "../utilities/LoadingSpin";
import REGISTER_MENSUALITY from "../../graphql/mensuality/REGISTER_MENSUALITY";

export const MensualityRegister = () => {
  const [findUser, { data, loading }] = useLazyQuery(FIND_USER, {
    fetchPolicy: "network-only",
  });
  const [mutateFunction, { data: data_m }] = useMutation(REGISTER_MENSUALITY);

  const [rangeDate, changeDate] = useState([new Date(), new Date()]);
  const [usuario, changeUsuario] = useState("");
  const [tipo, changeTipo] = useState("");
  const [valor, changeValor] = useState(0);

  const navigate = useNavigate();
  const [user] = useGlobalState("user");
  useEffect(() => {
    if (user?.rolUser?.edges[0]?.node.rolName !== "TEACHER") {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    if (data) {
      console.log(data);
      if (data?.users?.edges.length > 0) {
        console.log("Fueeeee");
        mutateFunction({
          variables: {
            moStartDate: rangeDate[0].toISOString().split("T")[0],
            moFinishDate: rangeDate[1].toISOString().split("T")[0],
            moType: tipo,
            moPrice: parseFloat(valor),
            userId: data.users.edges[0].node.id,
          },
        });
      } else {
        swal.fire({
          icon: "error",
          text: "No se ha encontrado el usuario",
          color: "#fff",
          background: "#000",
          timer: "2000",
        });
      }
    }
  }, [data]);
  useEffect(() => {
    if (data_m) {
      console.log(data_m);
      navigate({
        pathname: `/mensuality`,
      });
    }
  }, [data_m]);

  const handleBack = () => {
    navigate({
      pathname: `/mensuality`,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!valor || !usuario || !tipo) {
      swal.fire({
        icon: "error",
        text: "Debe llenar los campos",
        color: "#fff",
        background: "#000",
        timer: "2000",
      });
    } else {
      if (valor > 0) {
        findUser({ variables: { email: usuario } });
      } else {
        swal.fire({
          icon: "error",
          text: "El valor del pago debe ser un número mayor a cero",
          color: "#fff",
          background: "#000",
          timer: "2000",
        });
      }
    }
  };
  return (
    <div>
      {loading ? (
        <LoadingSpin />
      ) : (
        <Container>
          <Row>
            <h3>Agregar mensualidad</h3>
            <Col sm={8} className="pt m-auto shadow-sm rounded-lg" id="form">
              <Form
                className="bg-ourBlack form-border"
                action=""
                onSubmit={handleSubmit}
              >
                <label className="mt-3">Fecha inicio y fecha fin:</label>
                <DateRangePicker
                  className="bg-cultured text-carnelian"
                  onChange={changeDate}
                  value={rangeDate}
                />
                <br />

                <label className="mt-3">Email del usuario:</label>
                <Form.Control
                  label="Link de video"
                  className="bg-backBlack border-carnelian text-white"
                  placeholder="Ingrese el correo electronico registrado del usuario"
                  type="text"
                  name="link"
                  value={usuario}
                  onChange={(e) => {
                    changeUsuario(e.target.value);
                  }}
                />

                <label className="mt-3">Valor del pago:</label>
                <Form.Control
                  label="Link de video"
                  className="bg-backBlack border-carnelian text-white"
                  placeholder="Ingrese el valor del pago a realiza"
                  type="number"
                  name="link"
                  value={valor}
                  onChange={(e) => {
                    changeValor(e.target.value);
                  }}
                />
                <Dropdown className="mt-4">
                  <Dropdown.Toggle variant="danger" className="bg-carnelian">
                    Seleccione el tipo de mensualidad
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => changeTipo("semanal")}>
                      Semanal
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => changeTipo("quincenal")}>
                      Quincenal
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => changeTipo("Mensual")}>
                      Mensual
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <hr></hr>
                <Row>
                  <Col className="text-center" mb-2="true">
                    <Button
                      className="button-login-r"
                      id="register"
                      type="submit"
                    >
                      Guardar
                    </Button>
                  </Col>
                  <Col className="text-center" mb-2="true">
                    <Button
                      className="button-courses bottom mt-2 "
                      variant="outline-primary"
                      onClick={handleBack}
                    >
                      Volver a Gestión de mensualidades
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};
