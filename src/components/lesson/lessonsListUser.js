import {
  Row,
  Col,
  Container,
  Tab,
  ListGroup,
  Form,
  Button,
  Offcanvas,
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
  const [searchString, setSearchString] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
  };
  if (loading || !data) return <LoadingSpin />;
  return (
    <div>
      <Container fluid>
        <Tab.Container defaultActiveKey="#link1">
          <Row>
            <Col sm={4}>
              <ListGroup>
                {data.allLessons.edges.map(({ node }) => (
                  <>
                    <ListGroup.Item action href={"#" + node.id}>
                      {node.leName}
                    </ListGroup.Item>
                  </>
                ))}
              </ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                {data.allLessons.edges.map(({ node }) => (
                  <>
                    <Tab.Pane eventKey={"#" + node.id}>
                      <h1>{node.leName}</h1>
                      <ReactPlayer
                        url="https://youtu.be/iW_b2srB3DI"
                        className="react-player"
                        playing
                        width="90%"
                        muted="false"
                      />

                      <p>{node.leDescription}</p>
                    </Tab.Pane>
                  </>
                ))}

                <Tab.Pane eventKey="#link2">asd 2</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
};
