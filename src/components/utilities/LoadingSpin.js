import { Container, Spinner } from "react-bootstrap";
export const LoadingSpin = () => {
  return (
    <Container className="d-flex justify-content-center">
        <Spinner className="text-carnelian" animation="border" style={{ width: '6rem', height: '6rem' }}/>
    </Container>
  );
};
