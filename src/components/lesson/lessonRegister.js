import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Row, Form, Col, Container, Button } from "react-bootstrap";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ErrorMessage } from "../register/inputDinamicStyle";
import { MdError } from "react-icons/md";
import swal from "sweetalert2";
import "./lessons.css";
import Input from "../register/input";
import FIND_LESSON from "../../graphql/lessons/FIND_LESSON";
import CREATE_LESSON from "../../graphql/lessons/REGISTER_LESSON";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../GlobalState";

export const LessonRegister = () => {
  const params = useParams(); 
  const [findLesson, { data, loading }] = useLazyQuery(FIND_LESSON, {
    fetchPolicy: "network-only",
  });
  const [
    mutateFunction,
    { data: m_data, loading: m_loading, error: m_error, reset: m_reset },
  ] = useMutation(CREATE_LESSON);

  const [name, changeName] = useState({ field: "", valid: null });
  const [description, changeDescription] = useState({ field: "", valid: null });
  const [linkLesson, changelinkLesson] = useState({ field: "", valid: null });
  const [validForm, changeValidForm] = useState(null);

  const navigate = useNavigate();
  const [user] = useGlobalState("user");
  useEffect(() => {
    if (user?.rolUser?.edges[0]?.node.rolName !== "TEACHER") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    findLesson({ variables: { name: params.id } });
  }, []);

  useEffect(() => {
    if (m_data) {
      console.log(m_data);
      navigate({
        pathname: `/crudLesson/${m_data.lessonRegister.lesson.course.id}`,
      });
    }
  }, [m_data]);

  useEffect(() => {
    if (data) {
      console.log("Le llego esto: ", name.field);
      console.log(data);
      const repeat = data.allLessons.edges
      .filter(
        (element) =>             
            element.node.course.id === params.id,          
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
        if (
          name.valid === "true" &&
          linkLesson.valid === "true" &&
          description.valid === "true"
        ) {
          console.log("Todo ok");
          mutateFunction({
            variables: {
              leName: name.field,
              leDescription: description.field,
              leEvaluation: 0.0,
              leLinkVideo: linkLesson.field,
              courseId: params.id,
            },
          });
          swal.fire({
            icon: "success",
            text: "Lección Creada",
            color: "#fff",
            background: "#000",
            timer: "2000",
          });
          console.log(m_data);
        }
      }
    }
  }, [data]);

  const expressions = {
    text: /^[a-zA-ZñÑáéíóúÁÉÍÓÚZ0-9\s_.-]{1,30}$/, // Letras, numeros, guion, guion bajo y acentos
    longText: /^[a-zA-ZñÑáéíóúÁÉÍÓÚZ0-9\s_.-./.=.?.&.:]{1,200}$/, // Letras, numeros, guion, guion bajo y acentos    
  };

  const handleBack = ()=>{       
    console.log(params) 
    navigate({
       pathname: `/crudLesson/${params.id}`,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name.valid === "true" &&
      linkLesson.valid === "true" &&
      description.valid === "true"
    ) {
      console.log("le voy a mandar: ", name.field);
      findLesson({ variables: { name: name.field } });
    } else {
      console.log("mal");
      console.log(name);
      console.log(linkLesson);
      console.log(description);
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
          <h3 className="mt-3">Crear Lección</h3>
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
                regularExpresion={expressions.text}
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
                <Col className="text-center">
                  <Button
                    className="button-login-r"
                    id="register"
                    type="submit"
                  >
                    Guardar
                  </Button>
                </Col>
                <Col className="text-center">
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
