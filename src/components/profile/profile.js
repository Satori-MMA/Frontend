import { Row, Col} from "react-bootstrap";
import { LoadingMessage } from "../utilities/LoadingMessage";
import { UserCard } from "./userCard";

export const Profile = () => {
  return (
    <div>      
      <h1 className="text-white text-center"> Perfil </h1>    
      <LoadingMessage/>
      <Row>
        <Col>
          <UserCard />
        </Col>
      </Row>
    </div>    
  );
};