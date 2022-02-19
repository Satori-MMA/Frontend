import {
  Row,
  Col,
  Container,
  Tab,
  ListGroup,
  Form,
  Button,
  Offcanvas,
  Nav,
} from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";
import ALL_LESSONS from "../../graphql/lessons/ALL_LESSONS";
import "../courses/courses.css";
import { LoadingSpin } from "../utilities/LoadingSpin";
import { useEffect, useState } from "react";
import { MdManageSearch } from "react-icons/md";
import { useGlobalState } from "../GlobalState";
import LessonCard from "./lessonCard";
import { LessonRegister } from "./lessonRegister";
import ReactPlayer from "react-player";

export const LessonsView = () => {
  const params = useParams();
  const { data, loading, error, refetch } = useQuery(ALL_LESSONS, {
    fetchPolicy: "network-only",
  });

  const navigate = useNavigate();
  const [user] = useGlobalState("user");
  const [show, setShow] = useState(false);
  const [lesson, changeLesson] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
  };
  if (loading || !data) return <LoadingSpin />;
  return (
    <div>
      <Container>
          <Row>
            <Col sm={4}>
              {data.allLessons.edges.map(({ node }) => (
                <Button className="button-login btn btn-outline-primary" variant="outline-primary" onClick={() => changeLesson(node.id)}>
                  {node.leName}
                </Button>
              ))}
            </Col>
            <Col sm={8}>
                {data.allLessons.edges.map(({ node }, index, array) => (
                  <>
                    {lesson === node.id ? (
                      <>
                        <h1>{node.leName}</h1>
                        <ReactPlayer
                          url="https://youtu.be/iW_b2srB3DI"
                          className="react-player"
                          playing
                          width="100%"
                          muted="false"
                        />
                          <Row>
                            <Col>
                              <center>
                                {index === 0 ? (
                                  <></>
                                ) : (
                                  <Button className="button-login-r btn btn-success"
                                    onClick={() =>
                                      changeLesson(array[index - 1].node.id)
                                    }
                                  >
                                    Lección anterior
                                  </Button>
                                )}
                              </center>
                            </Col>
                            <Col>
                              <center>
                                {array.length - 1 === index ? (
                                  <></>
                                ) : (
                                  <Button className="button-login-r btn btn-success"
                                    onClick={() =>
                                      changeLesson(array[index + 1].node.id)
                                    }
                                  >
                                    Siguiente lección
                                  </Button>
                                )}
                              </center>
                            </Col>
                          </Row>

                        <p>{node.leDescription}</p>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ))}

            </Col>
          </Row>
      </Container>
    </div>
  );
};
