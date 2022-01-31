import { Row, Col, Container, Form, Button, Offcanvas } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import ALL_COURSES from "../../graphql/courses/ALL_COURSES";
import "./courses.css";
import CourseCard from "./courseCard";
import { LoadingSpin } from "../utilities/LoadingSpin";
import { useState } from "react";
import { MdManageSearch } from "react-icons/md";

export const CoursesList = () => {
  const { data, loading, error, refetch } = useQuery(ALL_COURSES, {
    fetchPolicy: "network-only",
  });
  const [show, setShow] = useState(false);
  const [searchString, setSearchString] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
  };
  const handleSearchStringChange = (e) => {
    setSearchString(e.target.value);
  };
  refetch();

  console.log("la data es: " + data);
  if (error) return <div>errors</div>;

  if (loading || !data) return <LoadingSpin />;
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
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filtrar cursos</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form onSubmit={handleSubmit}>
              Filtrar por nombre
              <Form.Control
                type="search"
                value={searchString}
                onChange={handleSearchStringChange}
              />
            </Form>
          </Offcanvas.Body>
        </Offcanvas>

        <Row>
          <h1>Programas de formacion y Cursos</h1>
          <h3>Tenemos cursos para todos los niveles</h3>
          {data.allCourses.edges
            .filter((element) =>
              element.node.coTitle
                .toLowerCase()
                .includes(searchString.toLowerCase())
            )
            .map(({ node }) => (
              <CourseCard
                course={node}
                link={"buy"}
                name={"Comprar"}
                key={node.id}
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
