import { useState, useEffect } from "react";
import { Row, Form, Col, Container, Button } from "react-bootstrap";
import { AiOutlineCloudUpload } from "react-icons/ai"
import "./courses.css";
import Input from "../register/input";
import { useQuery, useMutation } from "@apollo/client";
import ALL_CATEGORIES from "../../graphql/courses/ALL_CATEGORIES"
import CREATE_COURSE from "../../graphql/courses/CREATE_COURSE"
import FIND_COURSE from "../../graphql/courses/FIND_COURSE";
import { toast } from "react-toastify";

export const RegisterCourse = () => {
    
    const { data:c_data, error:c_error, loading:c_loading } = useQuery(ALL_CATEGORIES)
    const [title,setTitle] = useState("null");
    const [mutateFunction, { data:m_data, loading:m_loading, error:m_error, reset:m_reset }] = useMutation(CREATE_COURSE);
    const {data:f_data,loading:f_loading} = useQuery(FIND_COURSE,{variables:{title}})
    const [mytitle, changeTitle] = useState({ field: "", valid: null });
    const [description, changeDescription] = useState({ field: "", valid: null });
    const [image, changeImage] = useState({ field: "", valid: null });
    const [price, changePrice] = useState({ field: "", valid: null });
    const [selects, setSelect] = useState()

    useEffect(() => {
        async function loading() {
            if (c_data !== undefined) {
                setSelect(c_data.allCategories.edges[0].node.id)
            }
        }
        loading()
    }, [c_data]);

   
    const expressions = {
        text: /^[a-zA-Z0-9\s_.-]{4,30}$/, // Letras, numeros, guion y guion_bajo
        price: /^\d{3,14}$/, // 7 a 14 numeros.
    };
    if (c_error) return <div>errors</div>;

    if (c_loading ) return <div>loading</div>;

    if (m_loading) {
        
    }
    if (f_loading){
        console.log("cargando la mutacion")
    }
    if (typeof data != "undefined") {
        
    }

    const onChangeCategory = (e) => {
        setSelect(e.target.value)
    };

    const handleInputChange = (e) => {
        changeDescription({ ...description, field: e.target.value, valid: 'true' });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setTitle(mytitle.field);
        if (
            mytitle.valid === "true" &&
            description.valid === "true" &&
            price.valid === "true"
        ) {
            
           
            
            console.log(f_data)
            if(f_data.allCourses.edges.length > 0){
                console.log("El curso existe")
            }else{
                console.log("El curso no existe")
            }
        

            /*mutateFunction({
                variables: {
                    coTitle: mytitle.field,
                    coDescription: description.field,
                    coImage: "TODO",
                    coPrice: price.field,
                    categoryId: selects

                },
            });*/
        }
    };
    return (
        <div>
            <Container>
                <Row>
                    <h3>Crear un nuevo curso</h3>
                    <Col sm={8} className="pt m-auto shadow-sm rounded-lg" id="form">
                        <Form
                            className="bg-ourBlack form-border"
                            action=""
                            onSubmit={handleSubmit}
                        >
                            <Input
                                state={mytitle}
                                changeState={changeTitle}
                                label="Titulo"
                                type="text"
                                name="title"
                                errorLabel="El nombre no puede contener caracteres especiales ni ser vacio"
                                regularExpresion={expressions.text}
                            />
                            <label>Descripcion<span className='text-danger'>*</span></label>
                            <Form.Control
                                as="textarea" rows={3}
                                value={description.field} onChange={handleInputChange}
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
                                        Seleccione una imagen:<span className='text-danger'>*</span>
                                    </label>
                                    <input id="file-upload" type="file" name="img" accept="image/*"></input>
                                </Col>
                                <Col>

                                    <label>Seleccione una categoria:<span className='text-danger'>*</span></label>
                                    <Form.Select aria-label="Default select example" value={selects} onChange={onChangeCategory}>
                                        {c_data.allCategories.edges.map(({ node }) => (
                                            <option value={node.id}>{node.catName}</option>

                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>


                            <Button
                                className="button-login-r"
                                type="submit"
                            >
                                Crear Curso
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </div>
    );
};