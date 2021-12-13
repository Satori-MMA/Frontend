import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import imgAbout1 from "../../Assets/about1.jpg";
import imgAbout2 from "../../Assets/about2.png";
import instructor1 from "../../Assets/about1.jpg";
import instructor2 from "../../Assets/Foto7.jpg";
import { ReactComponent as DividerSvg } from "../../Assets/divider.svg";

const Divider = () => {
  return (
    <div className="text-center">
      <DividerSvg fill="gray" width="50%" />
    </div>
  );
};

export const About = () => {
  return (
    <div>
      <Container fluid>
        <Row className="pt-5 text-center">
          <h1> Sobre Nosotros</h1>
          <Divider />
        </Row>

        <Row className="p-2" xs={1} sm={1} lg={2}>
          <Col className="mb-4 p-2">
            <p>
              Somos un <b>centro de entrenamiento y acondicionamiento físico</b>
              , nos enfocamos en disciplinas como:{" "}
              <i>
                Brazilian Jiu-Jitsu, Grappling, Muay Thai, Boxeo y Artes
                Marciales Mixtas
              </i>
              , con entrenamientos que combinan estas diversas disciplinas para
              un mejor aprendizaje. También damos cursos de defensa personal.
            </p>
            <p>
              Contamos con mas de 25 años de experiencia en artes marciales y
              hemos representado al país en diversos torneos a nivel nacional e
              internacional. No te conformes con leerlo, ven y compruébalo.
            </p>
          </Col>

          <Col>
            <img alt="" width="100%" height="auto" src={imgAbout1} />
          </Col>
        </Row>
        <Row className="pt-5 text-center">
          <Link
            to="/contacto"
            className="bg-black text-white text-decoration-none"
          >
            {" "}
            ¡¡ ENTRENA CON NOSOTROS !!
          </Link>
        </Row>
        <h2 className="text-center mt-3">En Satori Encontraras...</h2>
        <Row xs={1} sm={2} lg={3}>
          <Col>
            <Divider />
            <h3 className="text-center" >BRAZILIAN JIU JITSU</h3>
            <p>
              El BJJ es un arte marcial, deporte de combate, y un sistema de
              autodefensa que se centra en el agarre y especialmente en la lucha
              en el suelo. Coge sus fundamentos del Judo Kodokan (Ne-Waza) de
              principios del siglo XX que fueron enseñados al creador del BJJ
              Carlos Gracie por el maestro judoka Mitsuyo Maeda en 1914.
            </p>
          </Col>
          <Col>
            <Divider />
            <h3 className="text-center">MIXED MARTIAL ARTS</h3>
            <p>
              Las artes marciales mixtas son una combinación de técnicas de
              artes marciales tradicionales con otras más modernas con el fin de
              la competición deportiva de combate o la defensa personal.
            </p>
          </Col>
          <Col>
            <Divider />
            <h3 className="text-center">WRESTLING</h3>
            <p>
              Es un deporte de combate que involucra técnicas de tipo de agarre,
              como peleas de clinch, lanzamientos y derribos, bloqueos de
              articulaciones, pases y otros tipos de agarre.
            </p>
          </Col>
          <Col>
            <Divider />
            <h3 className="text-center">MUAY THAI</h3>
            <p>
              Conocido también como boxeo tailandés, o tradicionalmente como el
              arte de las ocho extremidades es un arte marcial y deporte de
              contacto extremo, tiene como base el boxeo tailandés, el cual se
              desarrolla de pie por medio de golpes con técnicas combinadas de
              manos, pies, rodillas y codos, además de algunos barridos,
              sujeciones (para golpear) y lanzamientos.
            </p>
          </Col>
          <Col>
            <Divider />
            <img alt="" width="100%" height="auto" src={imgAbout2} />
          </Col>
          <Col>
            <Divider />
            <h3 className="text-center">BOXING</h3>
            <p>
              El boxeo (del inglés boxing), también llamado a veces boxeo inglés
              o boxeo irlandés, y coloquialmente conocido como box, es un
              deporte de contacto en el que dos contrincantes luchan utilizando
              únicamente sus puños con guantes, golpeando a su adversario de la
              cintura hacia arriba, dentro de un cuadrilátero especialmente
              diseñado para tal fin.
            </p>
          </Col>
        </Row>
        <Row className="text-center mt-5">
          <Divider />
          <h2>Instructores</h2>
          <p>
            Contamos con instructores dispuestos a enseñar con dedicación y
            empeño para que nuestros clientes tengan la mejor experiencia
            posible en su proceso de aprendizaje.
          </p>
        </Row>
        <Row className="m-3 mb-0">
          <Col>
          <h3 className="text-center mt-2">Jesus Fernando Pinzon</h3>
            <p>30 años de experiencia en practica de artes marciales y 15 años de experiencia como instructor de artes marciales</p>
            <p>Cinturón negro en taekwondo, cinturón negro primer dan en wing tsun, cinturón purpura en Jiu jitsu tradicional, cinturón purpura en Brazilian jiu-jitsu, cinturón azul de judo, cinturón marrón de Kung fu Wushu e  instructor en defensa personal</p>            
            <p>Participacion en competencias nacionales e internacionales, en paises como Ecuador y Panama</p>
          </Col>
          <Col className="text-center">
            <img
            alt="Instructor 1: Jesus Fernando Pinzon" 
            title="Instructor 1: Jesus Fernando Pinzon" 
            width="80%" height="auto" 
            src={instructor1} 
            />
          <p></p>
          <i>"Si no te exiges al máximo nunca sabrás cuál es tu límite"</i>
          </Col>
        </Row>
        <br></br>
        <Divider/>
        <Row className="m-3">
          <Col className="text-center">
           <img
            alt="Instructor 2: Brayan Andres Pinzon"
            title="Instructor 2: Brayan Andres Pinzon"
            width="80%" height="auto" 
            src={instructor2} 
            />
            <p></p>
            <i>"La diferencia entre lo que tienes y lo que quieres es lo que haces"</i>
          </Col>
          <Col>
            <h3 className="text-center mt-2">Brayan Andres Pinzon</h3>
            <p>8 años de experiencia en practica de artes marciales y 1 año de experiencia como instructor artes marciales</p>
            <p>Experiencia en artes marciales como boxeo, muay thai, jiu-jitsu, judo y grappling.</p>
            <p>Conocimiento sobre defensa personal y acondicionamiento fisico.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
