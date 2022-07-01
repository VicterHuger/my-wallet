import styled from "styled-components";

const Input=styled.input`
    width:100%;
    height: 3.62rem;
    margin-bottom:0.81rem;
    padding:0 5%;
    background-color:${props=>(props.isDisabled ? "#F2F2F2" : "#FFFFFF")};
    border: none;
    border-radius:5px;
    font-size:1.25rem;
    &::placeholder{
        color:${props=>(props.isDisabled ? '#AFAFAF' : '#000000')};
        font-size:1.25rem;
    }
`;

export default Input;