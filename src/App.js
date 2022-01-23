import { Container, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";
import { Home } from "./components/home/home";
import { Footer } from "./components/Footer";
import { About } from "./components/about/about";
import { Register } from "./components/register/register";
import { Login } from "./components/login/login";
import { Contacto } from "./components/contacto/Contacto";
import { Courses } from "./components/cursos/Courses";
import { CoursesGestion } from "./components/cursos/CoursesGestion";
import { Mensuality } from "./components/payments/mensuality";
import { Reports } from "./components/reports/reports";
import { Profile } from "./components/profile/profile";
import { ProfileUpdate } from "./components/profile/formUpdateProfile";

function App() {
  return (
    <Router className="App">
      <NavigationBar />
      <header className="App-header bg-ourGray">
        <Container fluid className="pb-3 pt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contacto />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/coursegestion" element={<CoursesGestion />} />
            <Route path="/mensuality" element={<Mensuality />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profileupdate" element={<ProfileUpdate />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reports" element={<Reports />} />
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

export const ListUsers = ({ users }) => {
  return (
    <ListGroup>
      {users.edges.map((row) => (
        <ListGroup.Item key={row.node.id}> {row.node.email}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default App;
