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
  ProgressBar,
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

  useEffect(() => {
    if (data) {
      changeLesson(
        data.allLessons.edges.filter(
          (element) =>
            element.node.course.id === window.localStorage.getItem("idCourse")
        )[0].node.id
      );
    }
  }, [data]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
  };
  if (loading || !data) return <LoadingSpin />;
  return (
    <div>
      <div className="courseContainer bg-ourBlack text-white">
      <ProgressBar
          className="p-0"
          striped
          variant="danger"
          animated
          now={50}
        />
        <h1 className="pt-3 pb-3">
          {
            data.allLessons.edges.filter(
              (element) =>
                element.node.course.id ===
                window.localStorage.getItem("idCourse")
            )[0].node.course.coTitle
          }
        </h1>        
      </div>
      <div className="courseContainer">
        <Row>
          <Col sm={3} className="bg-ourBlack text-white">
            <h2 className="text-center pt-2 pb-2">Lecciones              
            </h2>
            {data.allLessons.edges
              .filter(
                (element) =>
                  element.node.course.id ===
                  window.localStorage.getItem("idCourse")
              )
              .map(({ node }) => (
                <Button
                  className="button-login btn btn-outline-primary"
                  variant="outline-primary"
                  onClick={() => changeLesson(node.id)}
                >
                  {node.leName}
                </Button>
              ))}
          <Button
                  className="button-login-r btn btn-outline-primary mt-4"
                  variant="outline-primary"
                  // onClick={}
                >
                 Descargar Cronograma
                </Button>    
          </Col>
          <Col sm={8}>
            {data.allLessons.edges
              .filter(
                (element) =>
                  element.node.course.id ===
                  window.localStorage.getItem("idCourse")
              )
              .map(({ node }, index, array) => (
                <>
                  {lesson === node.id ? (
                    <>
                      <h1>{node.leName}</h1>
                      {console.log(node)}
                      <ReactPlayer
                        url={node.leLinkVideo}
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
                              <Button
                                className="button-login-r btn btn-success"
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
                              <Button
                                className="button-login-r btn btn-success"
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
      </div>
    </div>
  );
};
