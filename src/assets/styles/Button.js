import styled from "styled-components";

const Button=styled.button`
    width:100%;
    background-color:#A328D6;
    border-radius:5px;
    color:  #FFFFFF;
    height:2.88rem;
    font-size:1.25rem;
    border:none;
    margin-bottom:2.25rem;
    opacity:${props=>(props.isDisabled ? 0.7 : 1)};
    display:flex;
    align-items:center;
    justify-content:center;
`;

export default Button;