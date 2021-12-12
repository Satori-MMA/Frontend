import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../Assets/LogoPNG.png";
import { Link } from "react-router-dom";
import { Button} from 'react-bootstrap';

export const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/cursos">
              Cursos
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              Sobre nosotros
            </Nav.Link>
            <Nav.Link as={Link} to="/contacto">
              Contacto
            </Nav.Link>
          </Nav>
          <Nav>
            <Button  as={Link} to="/login"  variant="outline-success m-2">Iniciar Sesion</Button>

            <Button  as={Link} to="/registro" variant="outline-success m-2">Registrar</Button>
          </Nav>          
          
        </Navbar.Collapse>


      </Container>
    </Navbar>
  );
};
