import { Row, Col} from "react-bootstrap";
import { UserCard } from "./userCard";

export const Profile = () => {
  return (
    <div>      
      <h1 className="text-white"> Perfil de Usuario</h1>   
      <Row>
        <Col>
          <UserCard />
        </Col>
      </Row>
    </div>    
  );
};