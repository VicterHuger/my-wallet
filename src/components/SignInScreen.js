import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";
import Form from './Form.js';
import AuthScreen from "./AuthScreen.js";

export default function SignInScreen({formData,setFormData,isDisabled, setIsDisabled, handleForm,CleanInputs,FailedRequest,setUserData}){
    window.scrollTo(1,0);
    const navigate=useNavigate();

    const verifyToken=useCallback(()=>{
        const itemStorage=localStorage.getItem("user");
        if(itemStorage!==null){
            setUserData(JSON.parse(itemStorage));
            navigate("/home");         
        }
    },[navigate,setUserData]);

    useEffect(()=>{
        verifyToken();
    },[verifyToken]);

    function doLogin(e){
        e.preventDefault();
        setIsDisabled(true);
        
        const body={
            email: formData.email,
            password: formData.password,
        }

        const promise=axios.post("https://api-wallet-back.herokuapp.com/sign-in", body);

        promise.then(res=>{

            if(res.status===202){
                const userData={
                    token:res.data.token
                };
                setUserData(userData);
                localStorage.setItem("user",JSON.stringify(userData));
    
                setIsDisabled(false);
                CleanInputs();
                navigate("/home");
            }else{
                alert('Erro inesperado! Por favor, tente novamente!')
            }
            
        });

        promise.catch(error=>FailedRequest(error));

    }

    return (
        <AuthScreen linkPath={'/sign-up'} textPath={'Primeira vez? Cadastre-se!'}>
            <Form formData={formData} setFormData={setFormData} submitFunction={doLogin} isDisabled={isDisabled} handleForm={handleForm} authOperation='sign-in'/>
        </AuthScreen>
    )
}