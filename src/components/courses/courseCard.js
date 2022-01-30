import {Card,Button} from "react-bootstrap";
import { Link } from "react-router-dom";
const CourseCard = ({course,link,name}) =>{
    return(
        <Card key={course.id} bg="dark" >
        <Card.Img variant="top" src="" title="imagen" />
        <Card.Body>
            <Card.Title>{course.coTitle}</Card.Title>
            <Card.Text>
                {course.coDescription}
            </Card.Text>
            <hr/>
            <p>Precio <span className="text-danger">$</span>{course.coPrice}</p>
            <Button
            as={Link}
            to={{pathname: `/${link}/${course.coTitle}`}}
            variant="primary"
            >{name}</Button>
        </Card.Body>
    </Card>
    );
}

export default CourseCard;