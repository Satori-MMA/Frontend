import { Card, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { ReactComponent as FightSVG } from "../../Assets/fight.svg";
// import { COLORS } from "../utilities/color";
import swal from "sweetalert2";
import ReactPlayer from "react-player";
import UPDATE_LESSON from "../../graphql/lessons/UPDATE_LESSON";
import { useMutation } from "@apollo/client";
const LessonCard = ({ id, link, lesson }) => {
  const [mutate, { data, loading: m_loading, error: m_error, reset: m_reset }] =
    useMutation(UPDATE_LESSON);
  const changeStatusLesson = (e) => {
    console.log(lesson);
    e.preventDefault();
    const estado = lesson.isActive ? "desactivar" : "activar";
    swal
      .fire({
        title: estado.charAt(0).toUpperCase() + estado.slice(1) + " Lección",
        text: "¿Estas seguro de " + estado + " esta lección?",
        icon: "question",
        color: "#fff",
        background: "#000",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "gray",
        cancelButtonText: "cancelar",
        confirmButtonText: "Aceptar",
      })
      .then((result) => {
        if (result.isConfirmed) {
          console.log("result:" + result);
          return mutate({
            variables: {
              isActive: !lesson.isActive,
              leName: lesson.leName,
              id: lesson.id,
            },
          });
        }
      });
  };
  if (typeof data != "undefined") {
    // const estadoL = lesson.isActive ? "Activada" : "Desactivada";
    console.log(data);
    if (data.lessonUpdate) {
      swal.fire({
        icon: "success",
        // text: "Leccion " + estadoL,
        color: "#fff",
        background: "#000",
        timer: "3000",
      });
    }
  }
  return (
    <Card className="lesson-card" key={id} bg="dark">
      <center></center>
      {/* <Card.Img variant="top" src="" title="imagen" /> */}
      <Card.Body className="card-body">
        <Row className="mb-3">
          <Card.Title>{lesson.leName}</Card.Title>
          <ReactPlayer
            url={lesson.leLinkVideo}
            className="react-player"
            playing
            width="90%"
            height="auto"
            muted="false"
          />
        </Row>
        <Row className="bottom">
          <hr />
          <p>
            Descripción <span className="text-danger"></span>
            {lesson.leDescription}
            <br />
            Evaluación: {lesson.leEvaluation}
          </p>
          <Button
            className="button-login-r bottom mb-2"
            as={Link}
            to={{ pathname: `/lesson-edit/${lesson.leName}` }}            
            variant="primary"
          >
            Editar
          </Button>
          <Button
            className="button-courses"
            variant="outline-primary"
            onClick={changeStatusLesson}
          >
            {lesson.isActive ? "Desactivar Lección" : "Activar Lección"}
          </Button>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default LessonCard;
