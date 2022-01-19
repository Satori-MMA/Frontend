import { Col} from "react-bootstrap";
import { LeyendaError,Label,Input,ValidationIcon,GroupInput } from "./inputDinamicStyle";
const InputComponent = ({ state,changeState,label, name, placeholder, type, errorLabel,regularExpresion }) => {

    const handleInputChange = (e) => {
        changeState({...state,field:e.target.value});
    }
    const validate = () =>{
        if(regularExpresion){
            if(regularExpresion.test(state.field)){
                changeState({...state, valid:'true'});
            }else{
                changeState({...state, valid:'false'});
            }
        }
    }
    return (
        <Col className='form-group' >
            <Label>{label}<span className='text-danger'>*</span></Label>
            <GroupInput>
            <Input
                className='form-control'
                type={type}
                name={name}
                value={state.field}
                required
                onChange={handleInputChange}
                onKeyUp={validate}
                onBlur={validate}
                valid = {state.valid}
                placeholder={placeholder} />
                <ValidationIcon
					valid={state.valid}
				/>
                </GroupInput>
            <LeyendaError valid={state.valid}><span></span>{errorLabel}</LeyendaError>
        </Col>
    );
}

export default InputComponent;