import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Badge, Col, Container, Button } from "react-bootstrap";
import { useMutation, useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import "./courses.css";
import FIND_COURSE from "../../graphql/courses/FIND_COURSE";
import REGISTER_PAYMENT from "../../graphql/payment/REGISTER_PAYMENT";
import { LoadingSpin } from "../utilities/LoadingSpin";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../GlobalState";
import BuyCursePopup from "./BuyCoursePopup.js";
import ALL_PAYMENTS from "../../graphql/payment/ALL_PAYMENTS";
import {AiFillStar,  AiOutlineStar} from "react-icons/ai";

export const CourseInformation = () => {
  const params = useParams();
  const [user] = useGlobalState("user");
  let navigate = useNavigate();
  const [findCourse, { data, loading }] = useLazyQuery(FIND_COURSE, {
    fetchPolicy: "network-only",
  });
  const [allPayments, { data: p_data, loading: p_loading }] = useLazyQuery(
    ALL_PAYMENTS,
    {
      fetchPolicy: "network-only",
    }
  );
  const [mutateFunction, { data: data_m }] = useMutation(REGISTER_PAYMENT);

  const [btnPopup, setbtnPopup] = useState(false);

  useEffect(() => {    

    findCourse({ variables: { title: params.id } });
    allPayments();
    
  }, []);

  if (loading || !data || !p_data) return <LoadingSpin />;

  const handleComprar = () => {
    console.log(btnPopup);
    setbtnPopup(true);
  };

  const handleGoCourse = () => {
    console.log("Go")
    window.localStorage.setItem("idCourse", data.allCourses.edges[0].node.id);
    navigate({ pathname: `/lessons/${data.allCourses.edges[0].node.id}` });    
  };

  const handleTomar = (e) => {
    const hoy = new Date(Date.now());      
    mutateFunction({
      variables: {
        pDate: hoy.toISOString().split("T")[0],
        uId: user.id,
        cID: data.allCourses.edges[0].node.id,
      },
    });
    handleGoCourse()  
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
                <Badge
                  className="m-auto p-auto mt-2 text-rigth"
                  bg="danger"
                  pill
                >
                  ${data.allCourses.edges[0].node.coPrice}
                </Badge>
              </Col>
            </Row>
            <div className="ms-2 me-auto">
              <h2>{data.allCourses.edges[0].node.coDescription}</h2>
            </div>
            <Row>
              <Col>
                <h3 className="text-left">Instructor: {data.allCourses.edges[0].node.coInstructor}</h3>
              </Col>
              <Col>
                <h3>Dificultad: 
                {new Array(parseInt(data.allCourses.edges[0].node.coDifficulty[2]))
                .fill(1).concat(new Array(5-parseInt(data.allCourses.edges[0].node.coDifficulty[2]))
                .fill(0))
                .map((c) => 
                c===1?
                <AiFillStar></AiFillStar>
                :
                <AiOutlineStar></AiOutlineStar>
              )}
              </h3>
              </Col>
            </Row>
          </Col>
          <Row className="mt-4">
            <Col>
              {console.log(data.allCourses.edges[0].node.coPrice)}
              {data.allCourses.edges[0].node.coPrice === 0 ? (
                <>                                   
                  {p_data.allPayments.edges.filter(
                    (element) =>
                    element.node.course.id === data.allCourses.edges[0].node.id &&
                    element.node.user.email === user.email).length === 1 ? (
                    <Button
                      className="button-login-r mt-1"
                      onClick={handleGoCourse}
                    >
                      Ir al Curso
                    </Button>
                  ) : (
                    <Button
                      className="button-login-r mt-1"
                      onClick={handleTomar}
                    >
                      Tomar Curso
                    </Button>
                  )}
                </>
              ) : (
                <>                                   
                {p_data.allPayments.edges.filter(
                  (element) =>
                  element.node.course.id === data.allCourses.edges[0].node.id &&
                  element.node.user.email === user.email).length === 1 ? (
                  <Button
                    className="button-login-r mt-1"
                    onClick={handleGoCourse}
                  >
                    Ir al Curso
                  </Button>
                ) : (
                  <Button className="button-login-r mt-1" onClick={handleComprar}>
                  Comprar Curso
                </Button>
                )}
              </>                
              )}
              <BuyCursePopup
                trigger={btnPopup}
                setTrigger={setbtnPopup}
              ></BuyCursePopup>
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
