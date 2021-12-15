import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const colors = {
    borde: "#0075FF",
    error: "#bb2929",
    exito: "#1ed12d"
}
const Label = styled.label`
    margin: 1%;
    display: inline-block;
    font-size: medium;
    font-weight: bold;
	cursor: pointer;
	${props => props.valido === 'false' && css`
		color: ${colors.error};
	`}
    @media (max-width: 800px){
        font-size:small;
    }
`;
const LeyendaError = styled.p`
	font-size: 12px;
	margin-bottom: 0;
	color: ${colors.error};
	display: none;
	${props => props.valid === 'true' && css`
		display: none;
	`}
	${props => props.valid === 'false' && css`
		display: block;
	`}
`;
const ErrorMessage= styled.div`
	height: 45px;
	line-height: 45px;
	background: #F66060;
	padding: 0px 15px;
	border-radius: 3px;
	grid-column: span 2;
	p {
		margin: 0;
	} 
	b {
		margin-left: 10px;
	}
`;
const Input = styled.input`
    margin-top: 1%;
    border-radius: .2rem;
    padding: 0.5rem;
	&:focus {
		border: 3px solid ${colors.borde};
		outline: none;
		box-shadow: 3px 0px 30px rgba(163,163,163, 0.4);
        border-radius: .2rem;
	}
	${props => props.valid === 'true' && css`
		border: 3px solid transparent;
        border-radius: .2rem;
	`}
	${props => props.valid === 'false' && css`
		border: 3px solid ${colors.error} !important;
        border-radius: .2rem;
	`}
    @media (max-width: 800px){
		::placeholder {
            
            font-size: 14px;
          }
	}
`;
const GroupInput = styled.div`
	position: relative;
	z-index: 90;
`;
const ValidationIcon = styled(FontAwesomeIcon)`
    position:absolute;
    z-index: 100;
    bottom: 14px;
    right: 10px;
    font-size: 18px;
	opacity: 0;
	${props => props.valid === 'false' && css`
		opacity: 1;
		color: ${colors.error};
	`}
	${props => props.valid === 'true' && css`
		opacity: 1;
		color: ${colors.exito};
	`}
`;
export {
	ErrorMessage,
    ValidationIcon,
    Label,
    Input,
    LeyendaError,
    GroupInput
};