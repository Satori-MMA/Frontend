import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import {Link} from "react-router-dom";
import ALL_COURSES from "../../graphql/courses/ALL_COURSES";
import "./courses.css";
import CourseCard from "./courseCard";


export const CoursesList = () => {
    const { data, loading, error, fetchMore } = useQuery(ALL_COURSES, { variables: { after: null } });
    console.log("la data es: " + data)
    if (error) return <div>errors</div>;

    if (loading || !data) return <div>loading</div>;
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col xs={6} md={3}>
                        <Form>
                            <Form.Control type="serach" />
                        </Form>
                    </Col>
                    <Col xs={12} md={8}>
                        <Button
                            className="button-login-r"
                            variant="success"
                            as={Link}
                            to="/registerCourse"

                        >Agregar un curso</Button>
                        <h1>Programas de formacion y Cursos</h1>
                        <h3>Tenemos cursos para todos los niveles</h3>
                        <Row>
                            {data.allCourses.edges.map(({ node }) => (
                                <CourseCard
                                    course={node}
                                    link={'course-edit'}
                                    name={'Editar'}
                                />
                                // renderCard(node)
                            ))}
                        </Row>
                        <Row className="justify-content-md-center">
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
                                                ...fetchMoreResult.allCourses.edges
                                            ];
                                            return fetchMoreResult;
                                        }
                                    });
                                }}
                            >
                                Cargar mas cursos
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};