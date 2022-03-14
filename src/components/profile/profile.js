import { Row, Col, ListGroup, Badge, Container, Button } from "react-bootstrap";
import { UserCard } from "./userCard";
import USER_COURSES from "../../graphql/users/USER_COURSES";
import ALL_LESSONS from "../../graphql/lessons/ALL_LESSONS";
import { useGlobalState } from "../GlobalState";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { LoadingSpin } from "../utilities/LoadingSpin";
import { useEffect, useState } from "react";

export const Profile = () => {
  const [user] = useGlobalState("user");
  const { data, loading, error } = useQuery(USER_COURSES, {
    variables: { email: user.email },
  });

  const {
    data: m_data,
  } = useQuery(ALL_LESSONS, {
    fetchPolicy: "network-only",
  });
  const rol = user?.rolUser?.edges[0]?.node.rolName;
  
   const calcularProgreso = (idCou) => {
    const L = m_data.allLessons.edges.filter(
      (element) =>
        element.node.course.id === idCou
    );
    if(L.length >0){
    let cont = 0;
    for (var i = 0; i < L.length; i++) {
      let n = L[i].node.lessonuserSet.edges.filter(
        (element) => element.node.user?.email === user.email
      );
      if (n.length === 1) {
        console.log("i " + i);
        cont++;
      }
    }
    console.log(cont)

    return (100 * cont) / L.length;
  }
  else{
    return 0
  }
  };

  //console.log(data);
  if (loading || !data || !m_data) return <LoadingSpin />;
  return (
    <Container fluid>
      <Row className="pt-2 mb-3 text-center">
        <h1 className="text-imperialRed"> Perfil de Usuario</h1>
      </Row>
      <Row>
        <Col className="mt-5 pt-3" lg="3">
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
                <Col className="m-auto p-auto" lg="2">
                  <img
                    className="mt-3 mb-3"
                    alt="Centro de entrenamiento Satori - Horario"
                    width="90%"
                    height="auto"
                    src={node.course.coImage}
                  />
                </Col>
                <Col>
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">
                      <h2>{node.course.coTitle}</h2>
                    </div>
                    <h5>{node.course.coDescription}</h5>
                  </div>
                 
                  <Badge className="m-auto p-auto" bg="danger" pill>
                  {m_data ? calcularProgreso(node.course.id) : 0}%
                  </Badge>
                </Col>
                <Col className="ml-3">
                  <Button
                    className="profileCourseButton m-5"
                    as={Link}
                    to={{ pathname: `/lessons/${node.course.id}` }}
                    onClick={() =>
                      window.localStorage.setItem("idCourse", node.course.id)
                    }
                    variant="danger"
                  >
                    Ir al curso
                  </Button>
                </Col>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};
