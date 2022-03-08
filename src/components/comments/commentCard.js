import { Card } from "react-bootstrap";

import ReactStars from "react-rating-stars-component";



export const CommentCard = ({opComment},{opQualification}) => {
    let count = 1;
    if(opQualification==="Excelente")
      count = 5;
    if(opQualification==="Muy bueno")
      count = 4;
    if(opQualification==="Bueno")
      count = 3;
    if(opQualification==="Regular")
      count = 2;
    return <Card border="secondary" style={{ width: '18rem', margin:'1em' }}>
    <Card.Header>Usuario</Card.Header>
    <Card.Body>
      <Card.Title>
      <ReactStars
        count={count}
        size={24}
        activeColor='null'
        color="#E5383B"
      />
        </Card.Title>
      <Card.Text>
        {opComment}
      </Card.Text>
    </Card.Body>
  </Card>
};
export default CommentCard;