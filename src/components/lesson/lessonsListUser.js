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
  Modal,
  Image
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
import AddComment from "../comments/addComment";
import ListComment from "../comments/listComments";
export const LessonsView = () => {
  const params = useParams();
  const { data, loading, error, refetch } = useQuery(ALL_LESSONS, {
    fetchPolicy: "network-only",
  });

  const navigate = useNavigate();
  const [user] = useGlobalState("user");
  const [show, setShow] = useState(false);
  const [lesson, changeLesson] = useState("");

  const [showM, setShowM] = useState(false);

  const handleCloseM = () => setShowM(false);
  const handleShowM = () => setShowM(true);

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
            <h2 className="text-center pt-2 pb-2">Lecciones</h2>
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
              href="https://drive.google.com/file/d/1Aot6sCSvXBnkbwMWErKdPyvZ505F6grU/view?usp=sharing"
              target="blank"  
            >
              Descargar Cronograma
            </Button>
            <Image publicId="SatoriMMA/os8s8yt04k2kmipit63c.pdf" >
            </Image>           
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
                      <Modal
                        show={showM}
                        onHide={handleCloseM}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Envianos tu opinión</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <AddComment idLesson={node.id} />
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleCloseM}>
                            Cerrar
                          </Button>
                        </Modal.Footer>
                      </Modal>
                      <Modal
                        show={show}
                        onHide={handleClose}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Comentarios</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <ListComment idLesson={node.id} />
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                          </Button>
                        </Modal.Footer>
                      </Modal>
                      {console.log(node)}
                      <ReactPlayer
                        url={node.leLinkVideo}
                        className="react-player"
                        playing
                        width="100%"
                        muted="false"
                      />
                      <Button
                        onClick={handleShowM}
                        className="button-login-r btn btn-outline mt-4"
                        style={{ width: "150px" }}
                      >
                        Dejar comentario
                      </Button>
                      <Button
                        id="button-list-comments"
                        onClick={handleShow}
                        className="button-login-r btn btn-outline-primary mt-4"
                        style={{ width: "150px" }}
                      >
                        Ver comentarios
                      </Button>
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
