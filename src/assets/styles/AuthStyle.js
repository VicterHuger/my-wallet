import styled from "styled-components";

const AuthStyle = styled.main`
    min-height:100vh;
    width:100%;
    background-color:#8C11BE;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    padding:0 6.5%;
    
    &>h1{
        color:#FFFFFF;
        font-size: 2rem; //32px;
        font-family: 'Saira Stencil One', cursive;
        margin-bottom:2.5rem;
    }
    &>a{
        margin-top:1rem;
        height:fit-content;
    }
    &>a>h4{
        color:#FFFFFF;
        font-weight:700;
        font-family: 'Raleway', sans-serif;
        font-size:0.94rem;
        
    }
`;
export default AuthStyle;