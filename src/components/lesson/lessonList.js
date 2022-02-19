import { Row, Col, Container, Form, Button, Offcanvas } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";
import ALL_LESSONS from "../../graphql/lessons/ALL_LESSONS";
import "./lessons.css";
import { LoadingSpin } from "../utilities/LoadingSpin";
import { useEffect, useState } from "react";
import { MdManageSearch } from "react-icons/md";
import { useGlobalState } from "../GlobalState";
import LessonCard from "./lessonCard";
import { LessonRegister } from "./lessonRegister";

export const LessonCRUD = () => {
  const params = useParams();
  const { data, loading, error, refetch } = useQuery(ALL_LESSONS, {
    fetchPolicy: "network-only",
  });

  const navigate = useNavigate();
  const [user] = useGlobalState("user");
  const [show, setShow] = useState(false);
  const [searchString, setSearchString] = useState("");
  useEffect(() => {
    if (user?.rolUser?.edges[0]?.node.rolName !== "TEACHER") {
      navigate("/");
    }
    refetch();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
  };
  const handleSearchStringChange = (e) => {
    // console.log("Buscando")
    setSearchString(e.target.value);
  };
  const handlereturn = (e)=>{
    <LessonRegister />
    navigate({ pathname: `/registerLesson/${params.id}` });
  }

  // console.log("la data es: " + data);
  if (error) return <div>errors</div>;

  if ( loading || !data) return <LoadingSpin />;
  return (
    <div>
      <Container fluid>
        <Button
          className="floating-button p-0 m-0"
          variant="danger"
          onClick={handleShow}
        >
          <MdManageSearch color="white" size={30} />
        </Button>
        <Offcanvas
          className="bg-ourBlack border-line-carnelian text-white"
          show={show}
          onHide={handleClose}
          scroll="true"
        >
          <Offcanvas.Header className="text-white" closeButton>
            <Offcanvas.Title>Filtrar lecciones</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form onSubmit={handleSubmit}>
              Filtrar por nombre
              <Form.Control
                type="search"
                value={searchString}
                onChange={handleSearchStringChange}
              />
              {console.log("data")}
            
            </Form>
          </Offcanvas.Body>
        </Offcanvas>
        <h1>Gestión de lecciones</h1>
        <Row>
          <Col></Col>
          <Col xs={12} md={8}>
            <Button
              className="button-login-r mb-2"
              variant="success"
              onClick={handlereturn}
            >
              Agregar un lección
            </Button>
            <Button
                className="button-courses bottom mt-0 mb-3 "
                as={Link}
                to={"/coursegestion"}
                variant="outline-primary"
              >
                Volver a Gestión de Cursos
              </Button>
          </Col>
          <Col></Col>
        </Row>

        <Row>          
          {data.allLessons.edges
            .filter(
              (element) =>
                element.node.leName
                  .toLowerCase()
                  .includes(searchString.toLowerCase())
                
            )
            .map(({ node }) => (
            <LessonCard
              lesson = {node}
              id = {params.id}
            />
            // renderCard(node)
            
            ))}
        </Row>
        {/* <Row className="justify-content-md-center">
          <Button
            className="bg-ourBlack button-main"
            variant="outline-success m-2"
            id="more"
            onClick={() => {
              const { endCursor } = data.allCourses.pageInfo;

              fetchMore({
                variables: { after: endCursor },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                  fetchMoreResult.allCourses.edges = [
                    ...prevResult.allCourses.edges,
                    ...fetchMoreResult.allCourses.edges,
                  ];
                  return fetchMoreResult;
                },
              });
            }}
          >
            Cargar mas cursos
          </Button>
        </Row> */}
      </Container>
    </div>
  );
};
