import React from 'react';
import "./inputStyle.css"
import { Col } from "react-bootstrap";

const validInput = (input) => {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let isValid = true;
    if (format.test(input)) {
        isValid = false;
    }
    return isValid;
}
const handleInputChange = (e) => {
    if (!validInput(e.target.value)) {
        if (e.target.name === "name") {
            console.log('caracter invalido')
        }
    } else {
        if (e.target.name === "name") {
            console.log('caracter valido')
        }
    }

}
const Input = ({ label, name, placeholder, type }) => {
    return (
        <Col className='form-group'>
            <label>{label}<span className='text-danger'>*</span></label>
            <input
                className='form-control'
                type={type}
                name={name}
                required
                onChange={handleInputChange}
                placeholder={placeholder} />
        </Col>
    );
}

export default Input;