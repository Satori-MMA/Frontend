import { useState, useEffect } from "react";
import { Row, Form, Col, Container, Button, Image } from "react-bootstrap";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import "./courses.css";
import Input from "../register/input";
import {
  useQuery,
  useMutation,
  useLazyQuery,
  resetCaches,
} from "@apollo/client";
import ALL_CATEGORIES from "../../graphql/courses/ALL_CATEGORIES";
import CREATE_COURSE from "../../graphql/courses/CREATE_COURSE";
import FIND_COURSE from "../../graphql/courses/FIND_COURSE";
import { useNavigate } from "react-router-dom";
import { LoadingSpin } from "../utilities/LoadingSpin";
import { ErrorMessageLog } from "../utilities/ErrorMessageLog";
import { useGlobalState } from "../GlobalState";
import { CloudinaryUploader } from "../utilities/CloudinaryUploader";

export const RegisterCourse = () => {
  const {
    data: c_data,
    error: c_error,
    loading: c_loading,
  } = useQuery(ALL_CATEGORIES);
  const [title, setTitle] = useState("null");
  const [
    mutateFunction,
    { data: m_data, loading: m_loading, error: m_error, reset: m_reset },
  ] = useMutation(CREATE_COURSE);
  const [findCourse, { data: f_data, loading: f_loading }] = useLazyQuery(
    FIND_COURSE,
    {
      fetchPolicy: "network-only",
    }
  );
  const [mytitle, changeTitle] = useState({ field: "", valid: null });
  const [description, changeDescription] = useState({ field: "", valid: null });
  const [image, changeImage] = useState({ field: "", valid: null });
  const [price, changePrice] = useState({ field: "", valid: null });
  const [instructor, changeInstructor] = useState({ field: "", valid: null });
  const [dificultad, changeDificultad] = useState({ field: "", valid: null });

  const [linkCronogram, changelinkCronogram] = useState({
    field: "",
    valid: null,
  });
  const [selects, setSelect] = useState();
  const [difficulty, setDifficulty] = useState();
  const [showImage, setShowImage] = useState(false);
  const navigate = useNavigate();
  const [user] = useGlobalState("user");
  const successCallBackUpload = (result) => {
    changeImage({ field: result.info.url, valid: true });
  };
  const failureCallBackUpload = (result) => {
    console.log("Algo salio mal con el envio en cloudinary");
  };
  useEffect(() => {
    if (user?.rolUser?.edges[0]?.node.rolName !== "TEACHER") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    async function loading() {
      if (c_data !== undefined) {
        setSelect(c_data.allCategories.edges[0].node.id);        
      }
    }
    loading();
  }, [c_data]);

  useEffect(() => {
    if (f_data) {
      console.log(title);
      console.log(f_data);
      if (f_data.allCourses.edges.length > 0) {
        console.log("Mismo nombre");
        swal.fire({
          icon: "error",
          text: "Ya existe un curso con el mismo nombre",
          color: "#fff",
          background: "#000",
          timer: "2000",
        });
      } else {
        console.log("Todo ok");
       
        mutateFunction({
          variables: {
            coTitle: mytitle.field,
            coDescription: description.field,
            coImage: image.field,
            coPrice: price.field,
            categoryId: selects,
            coInstructor: instructor.field,
            coDifficulty:  difficulty,
            coCalendar: linkCronogram.field
          },
        });
        swal.fire({
          icon: "success",
          text: "Curso creado",
          color: "#fff",
          background: "#000",
          timer: "2000",
        });

        navigate("/coursegestion");
      }
    }
  }, [f_data]);

  const expressions = {
    text: /^[a-zA-ZñÑáéíóúÁÉÍÓÚZ0-9\s_.-]{1,30}$/, // Letras, numeros, guion, guion bajo y acentos
    longText: /^[a-zA-ZñÑáéíóúÁÉÍÓÚZ0-9\s_.-./.=.?.&.:]{1,254}$/, // Letras, numeros, guion, guion bajo y acentos
    price: /^\d{1,14}$/, // 7 a 14 numeros.
  };
  if (c_error) return <ErrorMessageLog></ErrorMessageLog>;

  if (c_loading) return <LoadingSpin />;

  if (m_loading) {
  }
  if (f_loading) {
    console.log("cargando la mutacion");
  }
  if (typeof data != "undefined") {
  }

  const onChangeCategory = (e) => {
    setSelect(e.target.value);
  };
  const onChangeDificultad = (e) => {
    changeDificultad(e.target.value);
    setDifficulty(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitle(mytitle.field);
    if (
      mytitle.valid === "true" &&
      description.valid === "true" &&
      price.valid === "true"
    ) {
      console.log(title);
      findCourse({ variables: { title: mytitle.field } });
    } else {
      swal.fire({
        icon: "error",
        text: "Llena el formulario correctamente por favor",
        color: "#fff",
        background: "#000",
        timer: "2000",
      });
    }
  };
  return (
    <div>
      <Container>
        <Row>
          <h3 className="pt-4">Crear un nuevo curso</h3>
          <Col sm={8} className="pt m-auto shadow-sm rounded-lg" id="form">
            <Form
              className="bg-ourBlack form-border"
              action=""
              onSubmit={handleSubmit}
            >
              <Input
                state={mytitle}
                changeState={changeTitle}
                label="Título"
                placeholder="Ingrese el titulo del curso"
                type="text"
                name="title"
                errorLabel="El nombre no puede contener caracteres especiales ni ser vacío"
                regularExpresion={expressions.text}
              />
              <Input
                state={description}
                changeState={changeDescription}
                label="Descripción"
                placeholder="Ingrese la descripcion del curso"
                type="textarea"
                name="description"
                errorLabel="La descripcion no puede contener caracteres especiales ni ser vacía"
                regularExpresion={expressions.longText}
              />

              <Input
                state={instructor}
                changeState={changeInstructor}
                label="Nombre del instructor"
                placeholder="Ingrese el nombre del instructor"
                type="text"
                name="instructor"
                errorLabel="El nombre no puede contener caracteres especiales ni ser vacío"
                regularExpresion={expressions.text}
              />

              <Input
                state={price}
                changeState={changePrice}
                placeholder="Ingrese el precio del curso: $"
                label="Precio"
                type="text"
                name="price"
                errorLabel="El precio solo puede contener números y el máximo son 14 dígitos."
                regularExpresion={expressions.price}
              />

              <Input
                state={linkCronogram}
                changeState={changelinkCronogram}
                label="Link del Cronograma"
                placeholder="Ingrese el link del cronograma del curso"
                type="text"
                name="linkC"                
                errorLabel="La descripcion no puede contener caracteres especiales ni ser vacio"
                regularExpresion={expressions.longText}
              />
              <Row className="mt-4">
              <Col>
              <label>
                Seleccione la dificultad del curso:
                <span className="text-danger">*</span>
              </label>
              </Col>
              <Col>
              <Form.Select                
                aria-label="Default select example"
                value={dificultad}
                onChange={onChangeDificultad}
              >                
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
              </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <CloudinaryUploader
                    successFunction={successCallBackUpload}
                    failureFunction={failureCallBackUpload}
                  />
                  <Button
                    className="button-login-r mb-1"
                    onClick={() => {
                      setShowImage(!showImage);
                    }}
                  >
                    {showImage ? "Ocultar imagen" : "Visualizar imagen"}
                  </Button>
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
                      <option value={node.id} key={node.id}>
                        {node.catName}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>

              <Row>
                {image.valid && showImage ? (
                  <Image src={image.field}></Image>
                ) : (
                  <></>
                )}
              </Row>

              <Button className="button-login-r mb-0" type="submit">
                Crear Curso
              </Button>
              <Button
                className="button-courses bottom mt-2 "
                as={Link}
                to={"/coursegestion"}
                variant="outline-primary"
              >
                Volver a Gestión de Cursos
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
