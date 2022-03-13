import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Row, Badge, Col, Container, Button } from "react-bootstrap";
import { useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import "./courses.css";
import FIND_COURSE from "../../graphql/courses/FIND_COURSE";
import { LoadingSpin } from "../utilities/LoadingSpin";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../GlobalState";

export const CourseInformation = () => {
  const params = useParams();
  const [findCourse, { data, loading }] = useLazyQuery(FIND_COURSE, {
    fetchPolicy: "network-only",
  });

  const navigate = useNavigate();
  const [user] = useGlobalState("user");

  useEffect(() => {
    if (user?.rolUser?.edges[0]?.node.rolName !== "STUDENT") {
      navigate("/register");
    }
  }, []);
  useEffect(() => {
    findCourse({ variables: { title: params.id } });
  }, []);

  if (loading || !data) return <LoadingSpin />;

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <Container>
        <Row className="pt-4">
          <Col className="m-auto p-auto" lg="3">
            <img
              className="mt-3 mb-3"
              alt="Centro de entrenamiento Satori - Horario"
              width="90%"
              height="auto"
              src={data.allCourses.edges[0].node.coImage}
            />
          </Col>
          <Col>
            <Row className="mb-3">
              <Col>
                <h1>{data.allCourses.edges[0].node.coTitle}</h1>
              </Col>
              <Col>
                <Badge className="m-auto p-auto mt-2 text-rigth" bg="danger" pill>
                  ${data.allCourses.edges[0].node.coPrice}
                </Badge>
              </Col>
            </Row>
            <div className="ms-2 me-auto">
              <h2>{data.allCourses.edges[0].node.coDescription}</h2>
            </div>
            <Row>
              <Col>
                <h3 className="text-left">Instructor: Nombre Instructor</h3>
              </Col>
              <Col>
              <h3>Dificultad: * * * * *</h3>
              </Col>
            </Row>
          </Col>
          <Row className="mt-4">
            <Col>
              <Button className="button-login-r mt-1" onClick={handleSubmit}>
                Comprar Curso
              </Button>
            </Col>
            <Col>
              <Button
                className="button-courses bottom mt-0"
                as={Link}
                to={"/courses"}
                variant="outline-primary"
              >
                Volver a Cursos
              </Button>{" "}
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
};
