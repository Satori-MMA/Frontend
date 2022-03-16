import { useState } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import swal from "sweetalert2";
import { LoadingSpin } from "../utilities/LoadingSpin";
import REVIEW_REGISTER from "../../graphql/comments/REVIEW_REGISTER.js";
import { useGlobalState } from "../GlobalState";
export const AddComment = ({ idLesson }) => {
    const [mutateFunction, {  loading,  reset }] = useMutation(REVIEW_REGISTER);
    const [comment, changeComment] = useState({ field: "", valid: null });
    const [user] = useGlobalState("user");
    const userId = user?.id;
    let qualification = "malo";
    const options = [
        {
            label: "Malo",
            value: "malo",
        },
        {
            label: "Regular",
            value: "regular",
        },
        {
            label: "Muy bueno",
            value: "muy bueno",
        },
        {
            label: "Execelente",
            value: "excelente",
        },
    ]
    
    if (loading) return <LoadingSpin />;

    const handleInputChange = (e) => {
        changeComment({ ...comment, field: e.target.value, valid: "true" });
    };
    
    const onChangeCategory = (e) => {
        qualification = e.target.value
        // console.log(qualification)
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            comment.field.length > 0
        ) {
            mutateFunction({
                variables: {
                    opComment: comment.field,
                    opQualification: qualification,
                    lessonId: idLesson,
                    userId: userId
                },
            });
            swal.fire({
                icon: "success",
                text: "Opinion guardada",
                color: "#fff",
                background: "#000",
                timer: "2000",
            });
        } else {
            swal.fire({
                icon: "error",
                text: "Se ha presentado un error ineperado",
                color: "#fff",
                background: "#000",
                timer: "2000",
            });
        }
        reset();
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
                                onChange={onChangeCategory}
                            >
                                {options.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>
                    <Button className="button-login-r mb-0" type="submit">
                        Guardar opinión
                    </Button>
                </Form>
            </Row>

        </Container>
    );
};
export default AddComment;