import { Container, Form, InputGroup, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill, RiMailFill, RiPhoneFill } from "react-icons/ri";

export const FormContacto = () => {
  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="formContactName">
          <InputGroup>
            <InputGroup.Text>
              <FaUserCircle color="royalblue" size={30} />
            </InputGroup.Text>
            <Form.Control type="txt" placeholder="Ingrese su nombre" />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formContactEmail">
          <InputGroup>
            <InputGroup.Text>
              <RiMailFill color="royalblue" size={30} />
            </InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="Ingrese su correo electronico"
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formContactPhone">
          <InputGroup>
            <InputGroup.Text>
              <RiPhoneFill color="royalblue" size={30} />
            </InputGroup.Text>

            <Form.Control
              type="number"
              placeholder="Ingrese su número de telefono"
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formContactComment">
          <Form.Label>Comentario</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};
