import { Card } from "react-bootstrap";

import { Rating } from 'react-simple-star-rating'



export const CommentCard = ({opComment,opQualification,email}) => {
    let count = 1;
    if(opQualification.toUpperCase() ==="EXCELENTE")
      count = 5;
    if(opQualification.toUpperCase() ==="MUY BUENO")
      count = 4;
    if(opQualification.toUpperCase() ==="BUENO")
      count = 3;
    if(opQualification.toUpperCase() ==="REGULAR")
      count = 2;
    return <Card border="secondary" style={{  margin:'1em' }}>
    <Card.Header>
      <Card.Title>
        Usuario: {email}
      </Card.Title>
    </Card.Header>
    <Card.Body>
    
      <Card.Title> 
      <Rating  fillColor="#E5383B"  initialValue={count} readonly={true} allowHover={false}/>
      
      </Card.Title>
      <Card.Title>
      {opComment} 
      </Card.Title>
    </Card.Body>
  </Card>
};
export default CommentCard;