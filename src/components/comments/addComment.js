import { useState } from "react";
import { Form, Row, Col, Container,Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import REVIEW_REGISTER from "../../graphql/comments/REVIEW_REGISTER.JS";
export const AddComment = ({idLesson}) => {
    const [mutateFunction, { data, loading, error, reset }] = useMutation(REVIEW_REGISTER);
    const [comment, changeComment] = useState({ field: "", valid: null });
    const [appreciation, setAprreciation] = useState({ value: "malo" });

    const handleInputChange = (e) => {
        changeComment({ ...comment, field: e.target.value, valid: "true" });
    };
    const onChangeCategory = (e) => {
        setAprreciation(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

    };
    return (
        <Container>
            <Row>
                <Form
                    
                    action=""
                    onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <label>Deja tu opinion<span className="text-danger">*</span></label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={comment.field}
                                onChange={handleInputChange}
                            />
                        </Col>
                        <Col>
                            <label>Selecciona que tal te parecio</label>
                            <Form.Select
                                aria-label="Default select example"
                                value={appreciation.value}
                                onChange={onChangeCategory}
                            >
                                <option value="malo">Malo</option>
                                <option value="bueno">Bueno</option>
                                <option value="regular">Regular</option>
                                <option value="muy bueno">Muy Bueno</option>
                                <option value="excelente">Excelente</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Button className="button-login-r mb-0" type="submit">
                        Guardar comentario
                    </Button>
                </Form>
            </Row>

        </Container>
    );
};
export default AddComment;