import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Row, Form, Col, Container, Button, Image } from "react-bootstrap";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import "./courses.css";
import Input from "../register/input";
import FIND_COURSE from "../../graphql/courses/FIND_COURSE";
import ALL_CATEGORIES from "../../graphql/courses/ALL_CATEGORIES";
import UPDATE_COURSE from "../../graphql/courses/UPDATE_COURSE";
import { LoadingSpin } from "../utilities/LoadingSpin";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../GlobalState";
import { CloudinaryUploader } from "../utilities/CloudinaryUploader";


export const CourseEdit = () => {
  const params = useParams();
  const [user] = useGlobalState("user");

  const [findCourse, { data, loading }] = useLazyQuery(FIND_COURSE, {
    fetchPolicy: "network-only",
  });
  const {
    data: c_data,
  } = useQuery(ALL_CATEGORIES);
  const [
    mutateFunction,
    { data: m_data},
  ] = useMutation(UPDATE_COURSE);

  const [id, setId] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [title, changeTitle] = useState({ field: "", valid: null });
  const [description, changeDescription] = useState({ field: "", valid: null });
  const [image, changeImage] = useState({ field: "", valid: null });
  const [price, changePrice] = useState({ field: "", valid: null });
  const [linkCronogram, changelinkCronogram] = useState({
    field: "",
    valid: null,
  });
  const [instructor, changeInstructor] = useState({ field: "", valid: null });
  const [dificultad, changeDificultad] = useState({ field: "", valid: null });
  const [showImage, setShowImage] = useState(false);
  const [selects, setSelect] = useState();  
  const navigate = useNavigate();

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
    else{          
      findCourse({ variables: { title: params.id } });
    }
  }, []);


  useEffect(() => {
    if (isLoaded) {
      if (data) {
        // console.log("Le llego esto: ", title.field);
        // console.log(data);
        if (data.allCourses.edges.length > 0) {
          // console.log("Mismo nombre"); 
          swal.fire({
            icon: "error",
            text: "Ya existe un curso con el mismo nombre",
            color: "#fff",
            background: "#000",
            timer: "2000",
          });
        } else {
          // console.log("Todo ok 2"); 

          mutateFunction({
            variables: {
              id: id,
              coTitle: title.field,
              coDescription: description.field,
              coImage: image.field,
              coPrice: price.field,
              categoryId: selects,
              coInstructor: instructor.field,
              coDifficulty: dificultad,
              coCalendar: linkCronogram.field,
            },
          });
          swal.fire({
            icon: "success",
            text: "Curso actualizado",
            color: "#fff",
            background: "#000",
            timer: "2000",
          });

          navigate("/coursegestion");
        }
      }
    } else {
      console.log(data)
      if (data !== undefined){
        console.log(data); 
        setId(data.allCourses.edges[0].node.id);

        changeTitle({
          field: data.allCourses.edges[0].node.coTitle,
          valid: "true",
        });
        changeDescription({
          field: data.allCourses.edges[0].node.coDescription,
          valid: "true",
        });
        changeInstructor({
          field: data.allCourses.edges[0].node.coInstructor,
          valid: "true",
        });
        changePrice({
          field: data.allCourses.edges[0].node.coPrice,
          valid: "true",
        });
        changelinkCronogram({
          field: data.allCourses.edges[0].node.coCalendar,
          valid: "true",
        });        
        setSelect(
          data.allCourses.edges[0].node.category.id,          
        )
        changeDificultad(data.allCourses.edges[0].node.coDifficulty.split("_")[1])
        setIsLoaded(true);
        changeImage({
          field: data.allCourses.edges[0].node.coImage,
          valid: "true",
        });
        setShowImage(true);
      }
    }
  }, [data]);

  const onChangeCategory = (e) => {
    setSelect(e.target.value);
  };

   const onChangeDificultad = (e) => {
    changeDificultad(e.target.value);
  };

  if (loading || !data) return <LoadingSpin />;

  const expressions = {
    text: /^[a-zA-ZñÑáéíóúÁÉÍÓÚZ0-9\s_.-]{1,100}$/, // Letras, numeros, guion, guion bajo y acentos
    longText: /^[a-zA-ZñÑáéíóúÁÉÍÓÚZ0-9\s_.-./.=.?.&.:.,]{1,254}$/, // Letras, numeros, guion, guion bajo y acentos
    price: /^\d{1,14}$/, // 7 a 14 numeros.
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      title.valid === "true" &&
      price.valid === "true" &&
      description.valid === "true"
    ) {
      if (params.id === title.field) {
        mutateFunction({
          variables: {
            id: id,
            coTitle: title.field,
            coDescription: description.field,
            coImage: image.field,
            coPrice: price.field,
            categoryId: selects,
            coInstructor: instructor.field,
            coDifficulty: dificultad,
            coCalendar: linkCronogram.field,
          },
        });
        swal.fire({
          icon: "success",
          text: "Curso actualizado",
          color: "#fff",
          background: "#000",
          timer: "2000",
        });

        navigate("/coursegestion");
      } else {
        // console.log("le voy a mandar: ", title.field); 
        findCourse({ variables: { title: title.field } });
      }
    } else {
      swal.fire({
        icon: "error",
        text: "Llena correctamente el formulario por favor",
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
          <h3 className="pt-3">Actualizar curso</h3>
          <Col sm={8} className="pt m-auto shadow-sm rounded-lg" id="form">
            <Form
              className="bg-ourBlack form-border"
              action=""
              onSubmit={handleSubmit}
            >
              <Input
                state={title}
                changeState={changeTitle}
                label="Título"
                type="text"
                name="title"
                errorLabel="El nombre no puede contener caracteres especiales ni ser vacio"
                regularExpresion={expressions.title}
              />
              <Input
                state={description}
                changeState={changeDescription}
                label="Descripción"
                type="textarea"
                name="description"
                errorLabel="La descripcion no puede contener caracteres especiales ni ser vacía"
                regularExpresion={expressions.longText}
              />
              <Input
                state={instructor}
                changeState={changeInstructor}
                label="Nombre del instructor"
                type="text"
                name="instructor"
                errorLabel="El nombre no puede contener caracteres especiales ni ser vacío"
                regularExpresion={expressions.text}
              />
              <Input
                state={price}
                changeState={changePrice}
                label="Precio"
                type="text"
                name="price"
                errorLabel="El precio solo puede contener números y el maximo son 14 dígitos."
                regularExpresion={expressions.price}
              />
              <Input
                state={linkCronogram}
                changeState={changelinkCronogram}
                label="Link del Cronograma"
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
                    {c_data?.allCategories?.edges?.map(({ node }) =>                                         
                      <option value={node.id} key={node.id} selected={selects}>                                                    
                          {node.catName}
                        </option>
                    )}
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

              <Button className="button-login-r mb-1" type="submit">
                Actualizar Curso
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
