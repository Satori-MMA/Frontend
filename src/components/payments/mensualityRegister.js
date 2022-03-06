import { useState, useEffect } from "react";

import { Row, Form, Col, Container, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ErrorMessage } from "../register/inputDinamicStyle";
import { MdError } from "react-icons/md";
import swal from "sweetalert2";
import Input from "../register/input";
import CREATE_LESSON from "../../graphql/lessons/REGISTER_LESSON";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../GlobalState";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

export const MensualityRegister = () => {
  const [
    mutateFunction,
    { data: data, loading: loading, error: error, reset: m_reset },
  ] = useMutation(CREATE_LESSON);
  const [rangeDate, changeDate] = useState([new Date(), new Date()]);
  const [usuario, changeUsuario] = useState({ field: "", valid: null });
  const [validForm, changeValidForm] = useState(null);

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
      navigate({
        pathname: `/mensuality`,
      });
    }
  }, [data]);

  const expressions = {
    text: /^[a-zA-Z0-9\s_.-]{2,200}$/, // Letras, numeros, guion y guion_bajo
  };

  const handleBack = () => {
    navigate({
      pathname: `/mensuality`,
    });
  };

  const handleInputChange = (e) => {
    //changelinkLesson({ ...linkLesson, field: e.target.value, valid: "true" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.valid === "true") {
      console.log("le voy a mandar: ", user.field);
    } else {
      swal.fire({
        icon: "error",
        text: "Llena correctamente el formulario por favor",
        color: "#fff",
        background: "#000",
        timer: "2000",
      });
    }
  };
  return (
    <div>
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

              <label className="mt-3">Usuario:</label>
              <Form.Control
                label="Link de video"
                placeholder="Ingrese el nombre del usuario"
                type="text"
                name="link"
                value={user.field}
                onChange={handleInputChange}
              />

              <hr></hr>
              <Row>
                {validForm === false && (
                  <ErrorMessage>
                    <p>
                      <MdError color="red" />
                      <b>Error:</b> Por favor rellena el formulario
                      correctamente.
                    </p>
                  </ErrorMessage>
                )}
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
    </div>
  );
};
