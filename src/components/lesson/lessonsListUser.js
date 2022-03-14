import { Row, Col, Button, ProgressBar, Modal, Image } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import ALL_LESSONS from "../../graphql/lessons/ALL_LESSONS";
import REGISTER_USER_LESSON from "../../graphql/lessons/REGISTER_USER_LESSON";
import "../courses/courses.css";
import { LoadingSpin } from "../utilities/LoadingSpin";
import { useEffect, useState } from "react";
import { useGlobalState } from "../GlobalState";
import ReactPlayer from "react-player";
import AddComment from "../comments/addComment";
import ListComment from "../comments/listComments";
export const LessonsView = () => {
  const [user] = useGlobalState("user");
  const [show, setShow] = useState(false);
  const [lesson, changeLesson] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showM, setShowM] = useState(false);
  const { data, loading, error, refetch } = useQuery(ALL_LESSONS, {
    fetchPolicy: "network-only",
  });

  const [
    mutateFunction,
    { data: m_data, loading: m_loading, error: m_error, refetch: m_refetch },
  ] = useMutation(REGISTER_USER_LESSON);

  const handleCloseM = () => setShowM(false);
  const handleShowM = () => setShowM(true);
  const calcularProgreso = () => {
    const L = data.allLessons.edges.filter(
      (element) =>
        element.node.course.id === window.localStorage.getItem("idCourse")
    );
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
    return (100 * cont) / L.length;
  };

  useEffect(() => {
    setIsChecked(false);
  }, [m_data]);

  useEffect(() => {
    if (data) {
      const L = data.allLessons.edges.filter(
        (element) =>
          element.node.course.id === window.localStorage.getItem("idCourse")
      );
      if (L.length > 0) {
        console.log(L);
        console.log(window.localStorage.getItem("idCourse"));
        changeLesson(L[0].node.id);
      }
    }
  }, [data]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCheck = (UsID, lesID, lesLen) => {
    setIsChecked(!isChecked);
    console.log(isChecked);
    mutateFunction({
      variables: {
        userID: UsID,
        lessonID: lesID,
      },
    });
    refetch();
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
          now={data ? calcularProgreso() : 0}
        />
        <h1 className="pt-3 pb-3">
          {
            data?.allLessons?.edges?.filter(
              (element) =>
                element.node.course.id ===
                window.localStorage.getItem("idCourse")
            ).length > 0?
            data?.allLessons?.edges?.filter(
              (element) =>
                element.node.course.id ===
                window.localStorage.getItem("idCourse")
            )[0].node.course.coTitle: "Curso Sin Lecciones"
          }
        </h1>
      </div>
      <div className="courseContainer">
        <Row className="m-3 mb-0">
          <Col sm={4} className="bg-ourGray col-course-user text-white">
            <h2 className="text-center pt-2 p-4 mr-3">Lecciones</h2>
            {data.allLessons.edges
              .filter(
                (element) =>
                  element.node.course.id ===
                  window.localStorage.getItem("idCourse")
              )
              .map(({ node }) => (
                <>
                  {node.lessonuserSet.edges.filter(
                    (element) => element.node.user?.email === user.email
                  ).length === 1 ? (
                    <Button
                      className="btn-lg bg-ourBlack button-main button-leccions2"
                      variant="outline-success"
                      onClick={() => changeLesson(node.id)}
                    >
                      {node.leName}
                    </Button>
                  ) : (
                    <Button
                      className="button-login btn btn-outline-primary"
                      variant="outline-primary"
                      onClick={() => changeLesson(node.id)}
                    >
                      {node.leName}
                    </Button>
                  )}
                </>
              ))}
            <Button
              className="button-login-r btn btn-outline-primary mt-4"
              variant="outline-primary"
              href="https://drive.google.com/file/d/1Aot6sCSvXBnkbwMWErKdPyvZ505F6grU/view?usp=sharing"
              target="blank"
            >
              Descargar Cronograma
            </Button>
            <Image publicId="SatoriMMA/os8s8yt04k2kmipit63c.pdf"></Image>
          </Col>
          <Col sm={8} className="col-course-user">
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
                      <Row>
                        <h1 className="pb-2">{node.leName}</h1>
                      </Row>
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
                      <ReactPlayer
                        url={node.leLinkVideo}
                        className="react-player"
                        playing
                        width="100%"
                        volume={0.4}
                        muted={false}
                        controls={true}
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
                      {node.lessonuserSet.edges.filter(
                        (element) => element.node.user?.email === user.email
                      ).length === 1 ? (
                        <></>
                      ) : (
                        <Row>
                          <Col></Col>
                          <Col className="chackBox-lesson">
                            <div>
                              <label>
                                <input
                                  type="checkbox"
                                  onChange={() =>
                                    handleCheck(
                                      user.id,
                                      node.id,
                                      data.allLessons.length
                                    )
                                  }
                                />
                                <svg
                                  className={`checkbox ${
                                    isChecked ? "checkbox--active" : ""
                                  }`}
                                  aria-hidden="true"
                                  viewBox="0 0 15 11"
                                  fill="none"
                                >
                                  <path
                                    d="M1 4.5L5 9L14 1"
                                    strokeWidth="2"
                                    stroke={isChecked ? "#fff" : "none"} // only show the checkmark when `isCheck` is `true`
                                  />
                                </svg>
                                Lección Tomada
                              </label>
                            </div>
                          </Col>
                        </Row>
                      )}

                      <p>{node.leDescription}</p>

                      <Row className="mb-4">
                        <Button
                          onClick={handleShowM}
                          className="button-login-r btn btn-outline mt-4 mb-2 btn-course-user-l"
                          style={{ width: "30%" }}
                        >
                          Dejar comentario
                        </Button>
                        <Button
                          id="button-list-comments"
                          onClick={handleShow}
                          className="button-login-r btn btn-outline-primary mt-4 mb-2 btn-course-user-r"
                          style={{ width: "30%" }}
                        >
                          Ver comentarios
                        </Button>
                      </Row>
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
