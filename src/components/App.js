import { BrowserRouter,Routes,Route } from "react-router-dom";
import {useState} from 'react';

import UserContext from "../contexts/UserContext";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import GlobalStyle from "../assets/styles/globalstyle";

export default function App(){

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordRepeted: '',
    });

    const [isDisabled,setIsDisabled]=useState(false);
    
    let initialData={};

    const itemStorage=localStorage.getItem("user");
            if(itemStorage!==null){
                initialData=JSON.parse(itemStorage);      
            }

    const[userData,setUserData]=useState(initialData);

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
            name: '',
            email: '',
            password: '',
            passwordRepeted: '',
        
        });
    }

    function FailedRequest(error){
        alert(`${error.response.data}`);
        CleanInputs();
    }

    return(
    <>
        <GlobalStyle/>
            <UserContext.Provider value={{userData}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SignInScreen/>}/> 
                        <Route path="/sign-up" element={<SignUpScreen formData={formData} setFormData={setFormData} setIsDisabled={setIsDisabled} isDisabled={isDisabled}handleForm={handleForm} CleanInputs={CleanInputs} FailedRequest={FailedRequest} />}/>
                        
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
    </>);
    

}