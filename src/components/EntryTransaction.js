import { useContext, useState } from "react";
import styled from "styled-components";
import Input from "../assets/styles/Input.js";
import UserContext from "../contexts/UserContext.js";
import axios from "axios";
import Button from "../assets/styles/Button.js";
import { useNavigate } from "react-router-dom";


export default function EntryTransaction(){
    const navigate=useNavigate();

    const {userData}=useContext(UserContext);

    const [formData, setFormData] = useState({
        value: '',
        sumary: ''
    });
    if(!userData.token){
        navigate('/');
    }

      
    const [isDisabled,setIsDisabled]=useState(false);

    function handleForm(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          }); 
    }

    function CleanInputs(){
        setIsDisabled(false);
        
        setFormData({
            ...formData,
            value: '',
            sumary: ''
        
        });
    }

    function sendToAPi(e){
        e.preventDefault();
        setIsDisabled(true);

        const config={
            headers:{
                Authorization:`Bearer ${userData.token}`
            }
        };
        
        const body={
            value: parseFloat(formData.value),
            sumary: formData.sumary,
            type: 'entrada'
        }

        const promise=axios.post("https://api-wallet-back.herokuapp.com/transactions", body, config);

        promise.then(res=>{

            if(res.status===201){
                setIsDisabled(false);
                CleanInputs();
                alert('Entrada computada!');
                navigate("/home");
           }
            
        });

        promise.catch(error=>FailedRequest(error));

    }

    function FailedRequest(error){
        alert(`${error.response.data}`);
        CleanInputs();
    }
    return(
        <Content>
            <h2>Nova Entrada</h2>
            <FormStyle onSubmit={sendToAPi}>
                <Input type="text" name="value" onChange={handleForm} placeholder="Valor" value={formData.value} disabled={isDisabled} isDisabled={isDisabled} required/>
                <Input type="text" name="sumary" onChange={handleForm} placeholder="Descrição" value={formData.description} disabled={isDisabled} isDisabled={isDisabled} required/>
                <Button type="submit" isDisabled={isDisabled}>Salvar entrada</Button>
            </FormStyle>
        </Content>
    )
}


const Content=styled.main`
    min-height:100vh;
    width:100%;
    background-color:#8C11BE;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    padding:0 6.5%;
    font-family:'Raleway', sans-serif;
    &>h2{
        font-size:26px;
        color:#FFFFFF;
        margin:25px 0 40px;
    }
`;
const FormStyle = styled.form`
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
`;