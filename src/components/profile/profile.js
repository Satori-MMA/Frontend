import { Row, Col, ListGroup, Badge, Container, Button } from "react-bootstrap";
import { UserCard } from "./userCard";
import USER_COURSES from "../../graphql/users/USER_COURSES";
import { useGlobalState } from "../GlobalState";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import CourseCard from "../courses/courseCard";
export const Profile = () => {
  const [user] = useGlobalState("user");
  const { data, loading, error } = useQuery(USER_COURSES, {
    variables: { email: user.email },
  });
  const rol = user?.rolUser?.edges[0]?.node.rolName;
  //console.log(data);
  return (
    <Container fluid>
      <Row className="pt-0 mt-2 mb-3 text-center">
        <h1 className="text-imperialRed"> Perfil de Usuario</h1>
      </Row>
      <Row>
        <Col lg="3">
          <UserCard user={user} />
        </Col>
        <Col>
          {rol === "TEACHER" ? (
            <></>
          ) : (
            <>
              <h1>Mis cursos</h1>
              <Button
                className="btn-lg bg-ourBlack button-main button-courses2"
                as={Link}
                to="/courses"
                variant="outline-success m-2"
              >
                Explorar mas cursos
              </Button>
            </>
          )}
          <ListGroup as="ol" numbered>
            {data?.allUsers.edges[0].node.paymentSet.edges.map(({ node }) => (
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{node.course.coTitle}</div>
                  {node.course.coDescription}
                </div>
                <Badge bg="danger" pill>
                  {node.course.coPrice}
                </Badge>
                <Button
                  className="profileCourseButton m-2 mt-4"
                  as={Link}
                  to={{ pathname: `/lessons/${node.course.id}` }}
                  variant="danger"
                >
                  Ir al curso
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};
