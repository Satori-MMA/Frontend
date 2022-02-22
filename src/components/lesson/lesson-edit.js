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
  const [id, setId] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [findLesson, { data, loading }] = useLazyQuery(FIND_LESSON, {
    fetchPolicy: "network-only",
  });
  const [mutateFunction,{ data: m_data, loading: m_loading, error: m_error, reset: m_reset },
  ] = useMutation(UPDATE_LESSON);

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
    if (m_data){
    console.log(m_data.lessonUpdate.lesson.course.id)
    navigate({ pathname: `/crudLesson/${m_data.lessonUpdate.lesson.course.id}` });
  }  
  }, [m_data]);

  useEffect(() => {
    if (isLoaded) {
      if (data) {
        console.log("Le llego esto: ", name.field);
        if (data.allLessons.edges.length > 0) {
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
              id: id,
              leName: name.field,
              leDescription: description.field,
              leLinkVideo: linkLesson.field,
            },
          });
          swal.fire({
            icon: "success",
            text: "Lección actualizada",
            color: "#fff",
            background: "#000",
            timer: "2000",
          });          
          console.log(m_data);                    
        }
      }
    } else {
      if (data) {
        setId(data.allLessons.edges[0].node.id);
        changeName({
          field: data.allLessons.edges[0].node.leName,
          valid: "true",
        });
        changeDescription({
          field: data.allLessons.edges[0].node.leDescription,
          valid: "true",
        });
        changelinkLesson({
          field: data.allLessons.edges[0].node.leLinkVideo,
          valid: "true",
        });
        setIsLoaded(true);
      }
    }
  }, [data]);

  if (loading || !data) return <LoadingSpin />;

  const handleBack = ()=>{           
    console.log(data) 
    navigate({
        pathname: `/crudLesson/${data.allLessons.edges[0].node.course.id}`,
    });
  }

  const expressions = {
    text: /^[a-zA-Z0-9\s_.-]{4,30}$/, // Letras, numeros, guion y guion_bajo
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name.valid === "true" &&
      linkLesson.valid === "true" &&
      description.valid === "true"
    ) {
      if (params.id === name.field) {
        mutateFunction({
          variables: {           
            leName: name.field,
            leDescription: description.field,
            leLinkVideo: linkLesson.field,
          },
        });
        swal.fire({
          icon: "success",
          text: "Lección actualizada",
          color: "#fff",
          background: "#000",
          timer: "2000",
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
          <h3>Actualizar Lección</h3>
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
                regularExpresion={expressions.name}
              />
              <Input
                state={linkLesson}
                changeState={changelinkLesson}
                label="Link de video"
                placeholder="Ingrese el link del video"
                type="text"
                name="link"
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
