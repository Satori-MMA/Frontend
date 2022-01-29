import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../Assets/LogoPNG.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaUserCircle, FaUserGraduate, FaUserNinja } from "react-icons/fa";
import { useGlobalState } from "./GlobalState";
import Swal from 'sweetalert2'
import { COLORS } from "./utilities/color";

export const NavigationBar = () => {
  let navigate = useNavigate();
  const [user, updateUser] = useGlobalState("user");
  const rol = user?.rolUser?.edges[0]?.node.rolName;
  const logout = (e) => {
    updateUser(null);
    window.localStorage.removeItem("user");
    navigate("/");
  };

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
              Inicio
            </Nav.Link>

            {rol === "STUDENT" ? (
              <>
                <Nav.Link as={Link} to="/courses">
                  Cursos
                </Nav.Link>
                <Nav.Link as={Link} to="/about">
                  Sobre nosotros
                </Nav.Link>
                <Nav.Link as={Link} to="/contact">
                  Contacto
                </Nav.Link>
              </>
            ) : rol === "TEACHER" ? (
              <>
                <Nav.Link as={Link} to="/coursegestion">
                  Gestion de Cursos
                </Nav.Link>
                <Nav.Link as={Link} to="/mensuality">
                  Gestion de Mensualidades
                </Nav.Link>
                <Nav.Link as={Link} to="/reports">
                  Reportes
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/courses">
                  Cursos
                </Nav.Link>
                <Nav.Link as={Link} to="/about">
                  Sobre nosotros
                </Nav.Link>
                <Nav.Link as={Link} to="/contact">
                  Contacto
                </Nav.Link>
              </>
            )}
          </Nav>

          {/* Perfil del Usuario - Inicio Sesion */}
          {user ? (
            <>
              {rol === "STUDENT" ? (
                <FaUserGraduate color={COLORS.carnelian} size={40} />
              ) : (
                <FaUserNinja color={COLORS.carnelian} size={40} />
              )}
              <Navbar.Text>{user.firstName}</Navbar.Text>
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
                <NavDropdown.Item onClick={logout}>
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
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
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
