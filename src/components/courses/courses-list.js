import { Row, Container, Form, Button, Offcanvas } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import ALL_COURSES from "../../graphql/courses/ALL_COURSES";
import "./courses.css";
import CourseCard from "./courseCard";
import { LoadingSpin } from "../utilities/LoadingSpin";
import { useState, useEffect } from "react";
import { MdManageSearch } from "react-icons/md";
import { useParams } from "react-router-dom";
import ALL_CATEGORIES from "../../graphql/courses/ALL_CATEGORIES";

export const CoursesList = () => {
  const { data, loading, error, refetch } = useQuery(ALL_COURSES, {
    fetchPolicy: "network-only",
  });

  const {
    data: category_data,
    loading: category_load_,
    refetch: category_refecth,
  } = useQuery(ALL_CATEGORIES, {
    fetchPolicy: "network-only",
  });

  const [show, setShow] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [category, setCategory] = useState("");
  const params = useParams();

  useEffect(() => {
    if (params.cat) {
      setCategory(params.cat);
    }
  }, []);
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

  const handleSearchCategory = (e) => {
    console.log("Buscando por categoria");
    console.log(e.target.name);
    setCategory(e.target.name);
  };
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
              <Button
                className="button-courses mt-4 mb-2"
                name=""
                variant="outline-primary"
                onClick={handleSearchCategory}
              >
                Todos los cursos
              </Button>
              {category_data?.allCategories?.edges?.map(({ node }) => (
                <Button
                  className="button-courses"
                  name={node.catName}
                  variant="outline-primary"
                  onClick={handleSearchCategory}
                >
                  {node.catName}
                </Button>
              ))}
            </Form>
          </Offcanvas.Body>
        </Offcanvas>

        <Row>
          {data.allCourses.edges.filter(
            (element) =>
              element.node.coTitle
                .toLowerCase()
                .includes(searchString.toLowerCase()) &&
              element.node.category.catName.includes(category) &&
              element.node.isActive
          ).length === 0 ? (
            <h3>
              Por el momento no tenemos cursos que concuerden con su busqueda
            </h3>
          ) : (
            <>
              <h1 className="text-imperialRed">Programas de formación y Cursos</h1>
              <h3>Tenemos cursos para todos los niveles</h3>
            </>
          )}

          {data.allCourses.edges
            .filter(
              (element) =>
                element.node.coTitle
                  .toLowerCase()
                  .includes(searchString.toLowerCase()) &&
                element.node.category.catName.includes(category) &&
                element.node.isActive
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
