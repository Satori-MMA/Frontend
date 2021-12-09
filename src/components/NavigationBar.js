import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container } from "react-bootstrap";
import logo from "../Assets/LogoPNG.png";

export const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <div className="d-flex align-items-center">
            <img
              alt="Logo Satori"
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{" "}
            Ronin Satori MMA
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};
