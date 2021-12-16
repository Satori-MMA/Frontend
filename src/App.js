import { Container, ListGroup, Spinner } from "react-bootstrap";
import logo from "./Assets/LogoPNG.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";
import { Home } from "./components/home/home";
import { Footer } from "./components/Footer";
import { About } from "./components/about/about";
import { Register } from "./components/register/register";
import { Login } from "./components/login/login";
import { useQuery } from "@apollo/client";
import ALL_USERS from "./graphql/users/ALL_USERS";
import { Contacto } from "./components/contacto/Contacto";
function App() {
  return (
    <Router className="App">
      <NavigationBar />
      <header className="">
        <Container fluid className="bg-ourGray pb-3 pt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cursos" element={<Cursos />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </header>
      <Footer />
    </Router>
  );
}

// const Home = () => {
//   const { data, loading } = useQuery(ALL_USERS);
//   return (
//     <div>
//       <img src={logo} className="App-logo" alt="logo" />
//       <p>Ejemplo fetching</p>
//       <Container>
//         {loading ? (
//           <center>
//             <Spinner animation="border" variant="danger" />
//           </center>
//         ) : (
//           <ListUsers users={data.users} />
//         )}
//       </Container>
//     </div>
//   );
// };

const ListUsers = ({ users }) => {
  return (
    <ListGroup>
      {users.edges.map((row) => (
        <ListGroup.Item key={row.node.id}> {row.node.email}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};
const Cursos = () => {
  return (
    <div>
      <p>Aqui iran los cursos ofertados</p>
    </div>
  );
};

export default App;
