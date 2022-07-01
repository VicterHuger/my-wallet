import styled from "styled-components";
import {ThreeDots} from "react-loader-spinner";

import Input from '../assets/styles/Input.js';
import Button from '../assets/styles/Button.js';


export default function Form({formData, submitFunction, isDisabled, handleForm, inputName, inputPasswordConfirm}){
    
    const buttonContent= ()=>{
        if(isDisabled){
            return (<ThreeDots heigth={13} width={51} radius={50} color="#FFFFFF" />);
        }else{
            return "Cadastrar";
        }
    }
    
    return (
        <FormStyle onSubmit={submitFunction}>
            {inputName}
            <Input type="email" name="email" onChange={handleForm} placeholder="Email" value={formData.email} disabled={isDisabled} isDisabled={isDisabled} required/>
            <Input type="password" name="password" onChange={handleForm} placeholder="Senha" value={formData.password} disabled={isDisabled} isDisabled={isDisabled} required/>
            {inputPasswordConfirm}
            <Button type="submit" isDisabled={isDisabled}>{buttonContent()}</Button>
        </FormStyle>
    );
}
const FormStyle = styled.form`
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
`;