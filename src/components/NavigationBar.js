import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../Assets/LogoPNG.png";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useGlobalState } from "./GlobalState";

export const NavigationBar = () => {
  const [user] = useGlobalState("user");
  const isLogged = 1;
  const rol = 1;

  return (
    <Navbar bg="ourBlack" variant="dark" expand="lg">
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
        <Navbar.Toggle
          className="button-toggle"
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              {user?.firstName}
            </Nav.Link>

            {rol === 1 ? (
              <Nav.Link as={Link} to="/courses">
                Cursos
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/coursegestion">
                Gestion de Cursos
              </Nav.Link>
            )}
            {rol === 1 ? (
              <Nav.Link as={Link} to="/about">
                Sobre nosotros
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/mensuality">
                Gestion de Mensualidades
              </Nav.Link>
            )}
            {rol === 1 ? (
              <Nav.Link as={Link} to="/contact">
                Contacto
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/reports">
                Reportes
              </Nav.Link>
            )}
          </Nav>

          {/* Perfil del Usuario - Inicio Sesion */}
          {isLogged === 2 ? (
            <Nav>
              <Button
                className="bg-ourBlack button-main"
                as={Link}
                to="/login"
                variant="outline-success m-2"
              >
                Iniciar Sesion
              </Button>

              <Button
                className="bg-ourBlack button-main"
                as={Link}
                to="/register"
                variant="outline-success m-2"
              >
                Registrar
              </Button>
            </Nav>
          ) : (
            <NavDropdown
              title="Perfil"
              id="basic-nav-dropdown"
              icon={<FaUserCircle color="red" size={30} />}
            >
              <NavDropdown.Item as={Link} to="/profile">
                Ir al Perfil
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/profileupdate">
                Editar Informacion
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Darse de Baja</NavDropdown.Item>
            </NavDropdown>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

function NavItem(props) {
  return (
    <li className="nav-item">
      <a href="#" className="icon-button">
        {props.icon}
      </a>
    </li>
  );
}
