import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ReactComponent as FightSVG } from "../../Assets/fight.svg";
import { COLORS } from "../utilities/color";
const CourseCard = ({ course, link, name }) => {
  return (
    <Card key={course.id} bg="dark">
      <center>
        <FightSVG fill={COLORS.rubyRed} width="70%" height="auto"/>
      </center>
      {/* <Card.Img variant="top" src="" title="imagen" /> */}
      <Card.Body>
        <Card.Title>{course.coTitle}</Card.Title>
        <Card.Text>{course.coDescription}</Card.Text>
        <hr />
        <p>
          Precio <span className="text-danger">$</span>
          {course.coPrice}<br/>
          Categoría: {course.category.catName}
        </p>
        <Button
          className="button-login-r mb-1"
          as={Link}
          to={{ pathname: `/${link}/${course.coTitle}` }}
          variant="primary"
        >
          {name}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
