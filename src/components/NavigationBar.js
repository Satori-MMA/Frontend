import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../Assets/LogoPNG.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import DELETE_USER from "../graphql/users/DELETE_USER";
import { FaUserGraduate, FaUserNinja } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { useGlobalState } from "./GlobalState";
import { COLORS } from "./utilities/color";
import swal from "sweetalert2";
export const NavigationBar = () => {
  const [mutateFunction, { data, reset }] = useMutation(DELETE_USER);
  let navigate = useNavigate();
  const [user, updateUser] = useGlobalState("user");
  const rol = user?.rolUser?.edges[0]?.node.rolName;
  const logout = (e) => {
    updateUser(null);
    window.localStorage.removeItem("user");
    navigate("/");
  };

  if (typeof data != "undefined") {
    console.log(data);
    if (data.deleteAccount.success) {
      console.log("Correcto");
      swal.fire({
        icon: "success",
        text: "El usuario ha sido dado de baja",
        color: "#fff",
        background: "#000",
        timer: "2000",
      });
      updateUser(null);
      window.localStorage.removeItem("user");
      navigate("/");
    } else {
      console.log(data.deleteAccount.errors);
      swal.fire({
        icon: "error",
        text: "Contraseña incorrecta",
        color: "#fff",
        background: "#000",
        timer: "2000",
      });
    }
    reset();
  }

  const unsubscribe = (e) => {
    e.preventDefault();
    swal
      .fire({
        title: "Darse de Baja",
        text: "Ingrese la contraseña para completar el proceso de darse de baja",
        icon: "question",
        input: "password",
        inputPlaceholder: "contraseña",
        inputAttributes: {
          autocapitalize: "off",
        },

        color: "#fff",
        background: "#000",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "gray",
        cancelButtonText: "cancelar",
        confirmButtonText: "Aceptar",
      })
      .then((result) => {
        if (result.isConfirmed) {
          console.log(result);
          return mutateFunction({
            variables: {
              password: result.value,
            },
          });
        }
      });
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
                  Gestión de Cursos
                </Nav.Link>
                <Nav.Link as={Link} to="/mensuality">
                  Gestión de Mensualidades
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
              <Nav.Link className="text-gray"as={Link} to="/profile">
                {user.firstName}
              </Nav.Link>
              <NavDropdown               
                title={<AiFillSetting color={COLORS.silverChalice} size={20} />}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  Ir al Perfil
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/profileupdate">
                  Editar Información
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={unsubscribe}>
                  Darse de Baja
                </NavDropdown.Item>

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
                Iniciar Sesión
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
