import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Row, Form, Col, Container, Button } from "react-bootstrap";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { ErrorMessage } from "../register/inputDinamicStyle";
import { MdError } from "react-icons/md";
import swal from "sweetalert2";
import "./lessons.css";
import Input from "../register/input";
import FIND_LESSON from "../../graphql/lessons/FIND_LESSON";
import UPDATE_LESSON from "../../graphql/lessons/UPDATE_LESSON";
import { LoadingSpin } from "../utilities/LoadingSpin";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../GlobalState";

export const LessonEdit = () => {
  const params = useParams();
  const [idCourse, setidCourse] = useState(null);
  const [idLesson, setidLesson] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [findLesson, { data, loading }] = useLazyQuery(FIND_LESSON, {
    fetchPolicy: "network-only",
  });
  const [
    mutateFunction,
    { data: m_data, loading: m_loading, error: m_error, reset: m_reset },
  ] = useMutation(UPDATE_LESSON);

  const [name, changeName] = useState({ field: "", valid: null });
  const [description, changeDescription] = useState({ field: "", valid: null });
  const [linkLesson, changelinkLesson] = useState({ field: "", valid: null });
  const [validForm, changeValidForm] = useState(null);
  const [dificultad, changeDificultad] = useState({ field: "", valid: null });

  const navigate = useNavigate();
  const [user] = useGlobalState("user");
  useEffect(() => {
    if (user?.rolUser?.edges[0]?.node.rolName !== "TEACHER") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    console.log("here");
    console.log(params.id);
    findLesson({ variables: { name: params.id } });
    console.log(data);
  }, []);

  useEffect(() => {
    console.log(m_data);
    if (m_data) {
      swal.fire({
        icon: "success",
        text: "Lección actualizada",
        color: "#fff",
        background: "#000",
        timer: "2000",
      });
      console.log("intenta salir");
      navigate({ pathname: `/crudLesson/${idCourse}` });
    }
  }, [m_data]);

  useEffect(() => {
    if (isLoaded) {
      if (data) {
        console.log("Le llego esto: ", name.field);
        const repeat = data.allLessons.edges.filter(
          (element) => element.node.course.id === idCourse
        );
        console.log(repeat.length);
        if (repeat.length > 0) {
          console.log("Mismo nombre");
          swal.fire({
            icon: "error",
            text: "Ya existe una leección con el mismo nombre",
            color: "#fff",
            background: "#000",
            timer: "2000",
          });
        } else {
          console.log("Todo ok");
          mutateFunction({
            variables: {
              id: idLesson,
              leName: name.field,
              leDescription: description.field,
              leLinkVideo: linkLesson.field,
              leDifficulty: dificultad,
            },
          });
          console.log("m_data" + m_data);
          console.log(m_data);
        }
      }
    } else {
      if (data) {
        const myLesson = data.allLessons.edges.filter(
          (element) =>
            element.node.course.id === window.localStorage.getItem("idCourse")
        )[0];
        console.log(myLesson);
        setidCourse(myLesson.node.course.id);
        setidLesson(myLesson.node.id);
        changeName({
          field: myLesson.node.leName,
          valid: "true",
        });
        changeDescription({
          field: myLesson.node.leDescription,
          valid: "true",
        });
        changelinkLesson({
          field: myLesson.node.leLinkVideo,
          valid: "true",
        });
        changeDificultad(myLesson.node.leDifficulty.split("_")[1])
        setIsLoaded(true);
      }
    }
  }, [data]);

  if (loading || !data) return <LoadingSpin />;

  const onChangeDificultad = (e) => {
    changeDificultad(e.target.value);
  };

  const handleBack = () => {
    // console.log("data back"+data)
    // console.log(data)
    navigate({
      pathname: `/crudLesson/${idCourse}`,
    });
  };

  const expressions = {
    text: /^[a-zA-ZñÑáéíóúÁÉÍÓÚZ0-9\s_.-]{1,30}$/, // Letras, numeros, guion, guion bajo y acentos
    longText: /^[a-zA-ZñÑáéíóúÁÉÍÓÚZ0-9\s_.-./.=.?.&.:]{1,254}$/, // Letras, numeros, guion, guion bajo y acentos    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name.valid === "true" &&
      linkLesson.valid === "true" &&
      description.valid === "true"
    ) {
      if (params.id === name.field) {
        console.log("mismo nombre ok");
        mutateFunction({
          variables: {
            id: idLesson,
            leName: name.field,
            leDescription: description.field,
            leLinkVideo: linkLesson.field,
            leDifficulty: dificultad,
          },
        });
      } else {
        console.log("le voy a mandar: ", name.field);
        findLesson({ variables: { name: name.field } });
      }
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
          <h3 className="mt-3">Actualizar Lección</h3>
          <Col sm={8} className="pt m-auto shadow-sm rounded-lg" id="form">
            <Form
              className="bg-ourBlack form-border"
              action=""
              onSubmit={handleSubmit}
            >
              <Input
                state={name}
                changeState={changeName}
                label="Nombre"
                placeholder="Ingrese el nombre de la lección"
                type="text"
                name="name"
                errorLabel="El nombre no puede contener caracteres especiales ni ser vacío"
                regularExpresion={expressions.name}
              />
              <Input
                state={description}
                changeState={changeDescription}
                label="Descripción"
                placeholder="Ingrese la descripción"
                type="text"
                name="description"
                errorLabel="La descripción no puede contener caracteres especiales ni ser vacío"
                regularExpresion={expressions.longText}
              />
              <Input
                state={linkLesson}
                changeState={changelinkLesson}
                label="Link de la Lección"
                placeholder="Ingrese el link de la lección"
                type="text"
                name="linkLesson"
                errorLabel="El link no puede ser vacío"
                regularExpresion={expressions.longText}
              />     
              <Row className="mt-4">
                <Col>
                  <label>
                    Seleccione la dificultad de la lección:
                    <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col>
                  <Form.Select
                    aria-label="Default select example"
                    value={dificultad}
                    onChange={onChangeDificultad}
                  >                    
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Form.Select>
                </Col>
                </Row>    

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
                <Col className="text-center" mb-4="true">
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
                    Volver a Gestión de Lecciones
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
