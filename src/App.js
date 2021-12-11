import logo from "./Assets/LogoPNG.png";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";
import { Footer } from "./components/Footer";

function App() {
  return (
    <Router className="App">
      <NavigationBar />
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </header>
      <Footer />
    </Router>
  );
}

const Home = () => {
  return (
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <p>Pagina en construcción</p>
    </div>
  );
};
const Cursos = () => {
  return (
    <div>
      <p>Aqui iran los cursos ofertados</p>
    </div>
  );
};
const About = () => {
  return (
    <div>
      <p>Aqui ira la información de los cursos</p>
    </div>
  );
};
const Contacto = () => {
  return (
    <div>
      <p>Aqui ira la información de contacto</p>
    </div>
  );
};
export default App;
