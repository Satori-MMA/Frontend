import { Container, Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { useState, useEffect} from "react";
import Input from "../register/input";
import { toast } from "react-toastify";
import OPINION_REGISTER from "../../graphql/contact/OPINION_REGISTER";
import { ErrorMessage } from "../register/inputDinamicStyle";
import { MdError } from "react-icons/md";
import swal from "sweetalert2";

export const FormContacto = () => {
  const [mutateFunction, { data}] = useMutation(OPINION_REGISTER);
  const [name, changeName] = useState({ field: "", valid: null });
  const [comment, changeComment] = useState({ field: "", valid: null });
  const [email, changeEmail] = useState({ field: "", valid: null });
  const [phone, changePhone] = useState({ field: "", valid: null });
  const [validForm, changeValidForm] = useState(null);
  const expressions = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phone: /^\d{7,14}$/, // 7 a 14 numeros.
    comment: /^[a-zA-ZñÑáéíóúÁÉÍÓÚZ0-9\s_.-./.=.?.&.:]{1,200}$/, // Letras, numeros, guion, guion bajo y acentos    
  };

  useEffect( ()=> {
    
    if (data) {
      console.log("Correcto");
      swal.fire({
        icon: "success",
        text: "Comentario Enviado",
        color: "#fff",
        background: "#000",
        timer: "2000",
      });
    } else {
      console.log(data);
      toast.error("Un error inesperado ha ocurrido: ");
    }

  }, [data])
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name.valid === "true" &&
      comment.valid === "true" &&
      email.valid === "true" &&
      phone.valid === "true"
    ) {      
      mutateFunction({
        variables: {
          userName: name.field,
          userPhone: phone.field,
          userEmail: email.field,
          userComment: comment.field,
        },
      });

      changeValidForm(true);
      changeName({ field: "", valid: null });
      changeComment({ field: "", valid: null });
      changeEmail({ field: "", valid: null });
      changePhone({ field: "", valid: null });
    } else {
     
      changeValidForm(false);
    }
  };

  return (
    <Container fluid className="bg-ourBlack form-border text-left pb-0 pt-3">
      <h1>Envianos un comentario:</h1>
      <Form action="" onSubmit={handleSubmit}>
        <Input
          state={name}
          changeState={changeName}
          label="Nombre"
          placeholder="Ingrese su nombre"
          type="text"
          name="name"
          errorLabel="El nombre no puede contener caracteres especiales ni ser vacío"
          regularExpresion={expressions.name}
        />

        <Input
          state={phone}
          changeState={changePhone}
          label="Teléfono"
          placeholder="Ingrese su teléfono"
          type="text"
          name="phone"
          errorLabel="El teléfono no puede ser vacío, solo puede contener números y el máximo son 14 dígitos."
          regularExpresion={expressions.phone}
        />
        <Input
          state={email}
          changeState={changeEmail}
          label="Correo"
          placeholder="Ingrese su correo"
          type="email"
          name="email"
          errorLabel="El correo solo puede contener letras, números, puntos, guiones y guion bajo."
          regularExpresion={expressions.email}
        />

        <Input
          state={comment}
          changeState={changeComment}
          label="Comentario"
          placeholder="Ingrese el comentario"
          type="text"
          name="comment"
          errorLabel="El comentario no puede contener caracteres especiales ni ser vacío"
          regularExpresion={expressions.comment}
        />
        <hr></hr>
        <Button className="button-login-r" id="register" type="submit">
          Enviar
        </Button>
      </Form>

      {validForm === false && (
        <ErrorMessage>
          <p>
            <MdError color="red" />
            <b>Error:</b> Por favor rellena el formulario correctamente,            
          </p>
        </ErrorMessage>
      )}
    </Container>
  );
};
