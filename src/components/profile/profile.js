import { Row, Col, ListGroup, Badge } from "react-bootstrap";
import { UserCard } from "./userCard";
import USER_COURSES from "../../graphql/users/USER_COURSES";
import { useGlobalState } from "../GlobalState";
import { useQuery } from "@apollo/client";
import CourseCard from "../courses/courseCard";
export const Profile = () => {
  const [user] = useGlobalState("user");
  const { data, loading, error } = useQuery(USER_COURSES, {
    variables: { email: user.email },
  });
  //console.log(data);
  return (
    <div>
      <h1 className="text-white"> Perfil de Usuario</h1>
      <Row>
        <Col lg="3">
          <UserCard user={user} />
        </Col>
        <Col>
          <h1>Tus cursos</h1>
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
                <Badge variant="primary" pill>
                  {node.course.coPrice}
                </Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};
