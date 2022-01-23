import { Container, Form, InputGroup, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { RiMailFill, RiPhoneFill } from "react-icons/ri";
import { COLORS } from "../utilities/color";

export const FormContacto = () => {
  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="formContactName">
          <InputGroup>
            <InputGroup.Text className="bg-ourBlack border-carnelian">
              <FaUserCircle color={COLORS.carnelian} size={30} />
            </InputGroup.Text>
            <Form.Control
              type="txt"
              className="bg-cultured border-line-carnelian"
              placeholder="Ingrese su nombre"
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formContactEmail">
          <InputGroup>
            <InputGroup.Text className="bg-ourBlack border-carnelian">
              <RiMailFill color={COLORS.carnelian} size={30} />
            </InputGroup.Text>
            <Form.Control
              type="email"
              className="bg-cultured border-line-carnelian"
              placeholder="Ingrese su correo electronico"
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formContactPhone">
          <InputGroup>
            <InputGroup.Text className="bg-ourBlack border-carnelian">
              <RiPhoneFill color={COLORS.carnelian} size={30} />
            </InputGroup.Text>

            <Form.Control
              type="number"
              className="bg-cultured border-line-carnelian"
              placeholder="Ingrese su número de telefono"
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formContactComment">
          <Form.Label>Comentario</Form.Label>
          <Form.Control
            className="bg-cultured border-line-carnelian"
            as="textarea"
            rows={3}
          />
        </Form.Group>
        <Button className="button-login-r" type="submit"
        variant="success">
          Enviar
        </Button>        
      </Form>
    </Container>
  );
};
