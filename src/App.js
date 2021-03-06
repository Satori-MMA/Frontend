import { Container, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";
import { Home } from "./components/home/home";
import { Footer } from "./components/Footer";
import { About } from "./components/about/about";
import { Register } from "./components/register/register";
import {PasswordReset} from './components/profile/formResetPassword';
import {PasswordForget} from './components/profile/formForgetPassword';
import { Login } from "./components/login/login";
import { Contacto } from "./components/contacto/Contacto";
import { CoursesGestion } from "./components/courses/CoursesGestion";
import { Mensuality } from "./components/payments/mensuality";
import { Reports } from "./components/reports/reports";
import { Profile } from "./components/profile/profile";
import { ProfileUpdate } from "./components/profile/formUpdateProfile";
import {PasswordUpdate} from './components/profile/formUpdatePassword';
import { CourseEdit } from "./components/courses/course-edit";
import { CourseInformation } from "./components/courses/course-information";
import { CoursesList } from "./components/courses/courses-list";
import { Welcome } from "./components/utilities/Welcome";
import { RegisterCourse } from "./components/courses/register-course";
import { LessonRegister } from "./components/lesson/lessonRegister";
import { LessonCRUD } from "./components/lesson/lessonList";
import { LessonsView } from "./components/lesson/lessonsListUser";
import { LessonEdit } from "./components/lesson/lesson-edit";
import { MensualityRegister } from "./components/payments/mensualityRegister";
function App() {
  
  
  return (
    <Router className="App">
      {window.localStorage.getItem('alreadyLoad')?<></>:<Welcome/>}
      <NavigationBar />
      <header className="App-header bg-ourGray">
        <Container fluid className="p-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contacto />} />
            <Route path="/courses" element={<CoursesList />} />            
            <Route path="/courses/:cat" element={<CoursesList />} />
            <Route path="/coursegestion" element={<CoursesGestion />} />            
            <Route path="/mensuality" element={<Mensuality />} />
            <Route path="/registerMonthly" element={<MensualityRegister/>}/>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profileupdate" element={<ProfileUpdate />} />
            <Route path="/passwordupdate" element={<PasswordUpdate />} />
            <Route path="/sendEmailForget" element={<PasswordForget />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/login" element={<Login />} />
            <Route path="/password-reset/:token" element={<PasswordReset />} />
            <Route path="/course-edit/:id" element={<CourseEdit/>}/>
            <Route path="/information/:id" element={<CourseInformation />} />
            <Route path="/registerCourse" element={<RegisterCourse/>}/>
            <Route path="/registerLesson/:id" element={<LessonRegister/>}/>
            <Route path="/crudLesson/:id" element={<LessonCRUD/>}/>
            <Route path="/lessons/:id" element={<LessonsView/>}/>
            <Route path="/lesson-edit/:id" element={<LessonEdit/>}/>
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
