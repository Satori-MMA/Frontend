import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Row, Form, Col, Container, Button } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import "./courses.css";
import Input from "../register/input";
import FIND_COURSE from "../../graphql/courses/FIND_COURSE";
import ALL_CATEGORIES from "../../graphql/courses/ALL_CATEGORIES";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { LoadingSpin } from "../utilities/LoadingSpin";

export const CourseEdit = () => {
  const params = useParams();
  const { data, loading, error } = useQuery(FIND_COURSE, {
    variables: { title: params.id },
  });
  const [title, changeTitle] = useState({ field: "", valid: null });
  const [description, changeDescription] = useState({ field: "", valid: null });
  const [image, changeImage] = useState({ field: "", valid: null });
  const [price, changePrice] = useState({ field: "", valid: null });
  const {
    data: c_data,
    error: c_error,
    loading: c_loading,
  } = useQuery(ALL_CATEGORIES);
  const [selects, setSelect] = useState();
  useEffect(() => {
    async function loading() {
      if (data !== undefined) {
        changeTitle({
          field: data.allCourses.edges[0].node.coTitle,
          valid: "true",
        });
        changeDescription({
          field: data.allCourses.edges[0].node.coDescription,
          valid: "true",
        });
        changePrice({
          field: data.allCourses.edges[0].node.coPrice,
          valid: "true",
        });
      }
    }
    loading();
  }, [data]);
  const onChangeCategory = (e) => {
    setSelect(e.target.value);
  };

  if (error) return <div>errors</div>;

  if (loading || !data) return <LoadingSpin />;

  const expressions = {
    text: /^[a-zA-Z0-9\s_.-]{4,30}$/, // Letras, numeros, guion y guion_bajo
    price: /^\d{3,14}$/, // 7 a 14 numeros.
  };

  const handleInputChange = (e) => {
    changeDescription({ ...description, field: e.target.value });
  };
  return (
    <div>
      <Container>
        <Row>
          <h3>Actualizar curso</h3>
          <Col sm={8} className="pt m-auto shadow-sm rounded-lg" id="form">
            <Form>
              <Input
                state={title}
                changeState={changeTitle}
                label="Titulo"
                type="text"
                name="title"
                errorLabel="El nombre no puede contener caracteres especiales ni ser vacio"
                regularExpresion={expressions.title}
              />
              <label>
                Descripcion<span className="text-danger">*</span>
              </label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description.field}
                onChange={handleInputChange}
              />
              <Input
                state={price}
                changeState={changePrice}
                label="Precio"
                type="text"
                name="price"
                errorLabel="El precio solo puede contener numeros y el maximo son 14 dígitos."
                regularExpresion={expressions.price}
              />
              <Row>
                <Col>
                  <label htmlFor="file-upload" class="custom-file-upload">
                    <AiOutlineCloudUpload color="red"></AiOutlineCloudUpload>
                    Seleccione una imagen:<span className="text-danger">*</span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    name="img"
                    accept="image/*"
                  ></input>
                </Col>
                <Col>
                  <label>
                    Seleccione una categoria:
                    <span className="text-danger">*</span>
                  </label>
                  <Form.Select
                    aria-label="Default select example"
                    value={selects}
                    onChange={onChangeCategory}
                  >
                    {c_data.allCategories.edges.map(({ node }) => (
                      <option value={node.id}>{node.catName}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>

              <Button className="button-login-r" type="submit">
                Actualizar Curso
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
