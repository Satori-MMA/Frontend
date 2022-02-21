import { Card, Button, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ReactComponent as FightSVG } from "../../Assets/fight.svg";
import { COLORS } from "../utilities/color";
import swal from "sweetalert2";
import UPDATE_COURSE from "../../graphql/courses/UPDATE_COURSE";
import { useMutation } from "@apollo/client";
import { useGlobalState } from "../GlobalState";
const CourseCard = ({ course, link, name }) => {
const [mutate, { data, loading: m_loading, error: m_error, reset: m_reset }] =
    useMutation(UPDATE_COURSE);
  const [user, updateUser] = useGlobalState("user");
  const rol = user?.rolUser?.edges[0]?.node.rolName;
  const changeStatusCourse = (e) => {
    e.preventDefault();
    const estado = course.isActive ? "desactivar" : "activar";
    swal
      .fire({
        title: estado.charAt(0).toUpperCase() + estado.slice(1) + " curso",
        text: "¿Estas seguro de " + estado + " este curso?",
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
          console.log(result);
          return mutate({
            variables: {
              isActive: !course.isActive,
              coTitle: course.coTitle,
              id: course.id,
            },
          });
        }
      });
  };
  if (typeof data != "undefined") {
    console.log(data);
    // const estadoC = course.isActive ? "Activado" : "Desactivado";
    if (data.courseUpdate) {
      console.log("Correcto");      
      swal.fire({
        icon: "success",
        // text: "Curso " + estadoC,
        color: "#fff",
        background: "#000",
        timer: "3000",
      });
    }
  }
  return (
    <Card className="course-card" key={course.id} bg="dark">
      <center>
        {course.coImage !== "TODO" ? (
          <Image width="100%" src={course.coImage}></Image>
        ) : (
          <FightSVG fill={COLORS.rubyRed} width="70%" height="auto" />
        )}
      </center>
      {/* <Card.Img variant="top" src="" title="imagen" /> */}
      <Card.Body className="card-body">
        <Row className="mb-3">
          <Card.Title>{course.coTitle}</Card.Title>
          <Card.Text>{course.coDescription}</Card.Text>
        </Row>
        <Row className="bottom">
          <hr />
          <p>
            Precio <span className="text-danger">$</span>
            {course.coPrice}
            <br />
            Categoría: {course.category.catName}
          </p>

          <Button
            className="button-login-r bottom mb-1"
            as={Link}
            to={{ pathname: `/${link}/${course.coTitle}` }}
            variant="primary"
          >
            {name}
          </Button>
          {rol === "STUDENT" ? (
            <></>
          ) : rol === "TEACHER" ? (
            <>
              <Button
                className="button-login-r bottom mb-2"
                as={Link}
                to={{ pathname: `/crudLesson/${course.id}` }}
                variant="primary"
              >
                Gestionar Lecciones
              </Button>
              <Button
                className="button-courses"
                variant="outline-primary"
                onClick={changeStatusCourse}
              >
                {course.isActive ? "Desactivar curso" : "Activar curso"}
              </Button>
            </>
          ) : (
            <></>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
