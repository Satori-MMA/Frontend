import { Card, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ReactComponent as FightSVG } from "../../Assets/fight.svg";
import { COLORS } from "../utilities/color";
import swal from "sweetalert2";
import UPDATE_COURSE from "../../graphql/courses/UPDATE_COURSE";
import { useMutation } from "@apollo/client";
const CourseCard = ({ course, link, name }) => {
  const [mutate, { data, loading: m_loading, error: m_error, reset: m_reset }] =
    useMutation(UPDATE_COURSE);
  const desactivateCourse = (e) => {
    e.preventDefault();
    swal
      .fire({
        title: "Desactivar curso",
        text: "¿Estas seguro de desactivar este curso?",
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
              isActive: false,
              coTitle: course.coTitle,
              id: course.id,

            },
          });
        }
      });
  };
  if (typeof data != "undefined") {
    console.log(data);
    if (data.courseUpdate.success) {
      console.log("Correcto");
      swal.fire({
        icon: "success",
        text: "El usuario ha sido dado de baja",
        color: "#fff",
        background: "#000",
        timer: "2000",
      });
    }
  }
  return (
    <Card key={course.id} bg="dark">
      <center>
        <FightSVG fill={COLORS.rubyRed} width="70%" height="auto" />
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
          <Button
            className="button-login-r bottom mb-1"
            onClick={desactivateCourse}
            variant="primary"
          >
            Desactivar curso
          </Button>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
