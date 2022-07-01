import styled from "styled-components";
import { Link } from "react-router-dom";
import AuthStyle from "../assets/styles/AuthStyle.js"
import AuthScreen from "./AuthScreen.js";

export default function SignInScreen(){
    return (
        <AuthScreen linkPath={'/sign-up'} textPath={'Primeira vez? Cadastre-se!'}>
            
        </AuthScreen>
    )
}