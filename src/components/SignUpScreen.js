import axios from "axios";
import {useNavigate} from 'react-router-dom';
import AuthScreen from "./AuthScreen";
import Form from "./Form";  
import Input from "../assets/styles/Input";



export default function SignUpScreen({formData,setFormData,setIsDisabled,isDisabled,handleForm,CleanInputs,FailedRequest}){
    window.scrollTo(1,0);
    
    const navigate=useNavigate();

    function doSignUp(e){
        e.preventDefault();
        setIsDisabled(true);
        if(formData.password!==formData.passwordRepeted){
            CleanInputs();
            setIsDisabled(false);
            return alert("As senhas digitadas não conferem!");
        }
        const body={
            email: formData.email,
            name: formData.name,
            password: formData.password,
        };  
         
         axios.post("http://localhost:4000/sign-up",body)
            .then(response=>{
                if(response.status===201) alert('Cadastrado com sucesso!');
                setIsDisabled(false);
                CleanInputs();
                navigate("/");
            })
            .catch(error=>{ FailedRequest(error) });
    }


    return (
        <AuthScreen linkPath={'/'} textPath={'Já tem uma conta? Entre agora!'}>
            <Form 
                formData={formData} 
                setFormData={setFormData}
                submitFunction={doSignUp}
                isDisabled={isDisabled} 
                handleForm={handleForm}
                inputName={<Input type="text" name="name" onChange={handleForm} placeholder="Nome" value={formData.name} disabled={isDisabled} isDisabled={isDisabled} required/>}
                inputPasswordConfirm={<Input type="password" name="passwordRepeted" onChange={handleForm} placeholder="Confirme a senha" value={formData.passwordRepeted} disabled={isDisabled} isDisabled={isDisabled} required/>} authOperation='sign-up'
            />
        </AuthScreen>
    
    );
}