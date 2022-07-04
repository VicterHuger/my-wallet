import { useState, useContext, useEffect, useCallback } from "react";

import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import dayjs from "dayjs";
import {BallTriangle} from "react-loader-spinner";

import UserContext from '../contexts/UserContext.js';

import Loading from '../assets/styles/Loading.js';
import Transaction from "./Transaction.js";

export default function UserHomePage(){

    window.scrollTo(1,0);
    
    require('dayjs/locale/pt-br');

    dayjs().locale('pt-br');

    const navigate=useNavigate();

    const {userData, setUserData}=useContext(UserContext);
    const [loading,setLoading]=useState(false);
    const [name,setName]=useState(null);
    const [transactions,setTransactions]=useState(null);
    const [isPositive, setIsPositive]=useState(true);
    const [saldo,setSaldo]=useState(0);

        if(!userData.token){
            navigate('/');
        }

        const getUserInfo=useCallback(()=>{
            const config={
                headers:{
                    Authorization:`Bearer ${userData.token}`
                }
            };
        const promise=axios.get("https://api-wallet-back.herokuapp.com/user",config);

        promise.then(res=>{
            return setName(res.data.name);
        });

        promise.catch(err=>{setLoading(false); return alert(err.response.data)});
    },[userData.token]);

    const getTransactionsInfos=useCallback(()=>{
        const config={
            headers:{
                Authorization:`Bearer ${userData.token}`
            }
        };
        const promise=axios.get("https://api-wallet-back.herokuapp.com/transactions",config);

        promise.then(res=>{
            return setTransactions(res.data);
        });

        promise.catch(err=>{setLoading(false); return alert(err.response.data)});
    },[userData.token]);
    
    useEffect(()=>{
        getUserInfo();
        getTransactionsInfos();
        let newSaldo=0;
        if(transactions){
            transactions.forEach(item=>{
                if(item.type==='saida'){
                    newSaldo-=Number(item.value);
                }else{
                    newSaldo+=Number(item.value);
                }
                });
            newSaldo=newSaldo.toFixed();
            if(newSaldo>=0){
                setIsPositive(true);
            }else{
                setIsPositive(false);
            }
            setSaldo(newSaldo);
        }
    },[getUserInfo,getTransactionsInfos,transactions]);

    function deleteSession(){
        const config={
            headers:{
                Authorization:`Bearer ${userData.token}`
            }
        };
        
        const promise=axios.delete("https://api-wallet-back.herokuapp.com/",config);

        promise.then(res=>{
            window.localStorage.removeItem('user');
            setUserData({});
        });

        promise.catch(err=>{setLoading(false); return alert(err.response.data)});
    }

    function HomeScreenContent(){
        if(!name ){
            return (
                <Loading>
                    <BallTriangle 
                    width="200"
                    height="200"
                    strokeColor="#126BA5"
                    animationDuration="1"
                    color="#ffffff"
                    />
                </Loading>
            )
        }else{
            return (
               
                    <>
                        {loading ? 
                        <Loading>
                            <BallTriangle 
                                width="200"
                                height="200"
                                strokeColor="#FFFFFF"
                                animationDuration="1"
                                color="ffffff"
                            />
                        </Loading>
                        :
                        <Content>
                            <Header> 
                                <h2>Olá, {name}</h2>
                                <ion-icon onClick={ () => deleteSession() } name="log-out-outline"></ion-icon>    
                            </Header>
                            <TransactionsDiv isContentNull={transactions}>
                                {!transactions 
                                  ?
                                 <h3>Não há registros de entrada ou saída</h3> 
                                 : 
                                 transactions.map((transaction,index)=>{
                                    return (<Transaction key={index} transaction={transaction} setLoading={setLoading}/>);
                                    })}
                                <SaldoDiv>
                                    <Saldo>Saldo</Saldo>
                                    <Valor isPositive={isPositive}>{saldo}</Valor>
                                </SaldoDiv>
                            </TransactionsDiv>
                            <Footer>
                                <TransactionsOptions onClick={()=>navigate('/entry')}>
                                    <ion-icon name="add-circle-outline"></ion-icon>
                                    <h4>Nova Entrada</h4>
                                </TransactionsOptions>

                                <TransactionsOptions  onClick={()=>navigate('/exit')}>
                                    <ion-icon name="add-circle-outline"></ion-icon>
                                    <h4>Nova Saída</h4>  
                                </TransactionsOptions>
                            </Footer>
                        </Content >
                        }
                    </>
                
            )
        }
    }

    const renderPageHomeScreen=HomeScreenContent();

    return(
            renderPageHomeScreen
    )
}

const SaldoDiv=styled.div`
display:flex;
justify-content:space-between;
align-items:center;
position:absolute;
bottom:10px;
width:94%;
`;
const Saldo=styled.h4`
font-weight:700;
color:#000000;
font-size:1rem;
`;

const Valor=styled.h4`
color:${props=>(props.isPositive ? "#03AC00" : "#C70000")};
font-size:1rem;
`;

const Content=styled.main`
    min-height:100vh;
    width:100%;
    background-color:#8C11BE;
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:0 6.5%;
    font-family:'Raleway', sans-serif;
`
const Header=styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-top:6%;
    
    &>h2{
        color:#FFFFFF;
        font-size:1.625rem;
        font-weight:700;
    }
    &>ion-icon{
        color:#FFFFFF;
        font-size:2rem; 
    }
    
`;

const TransactionsDiv=styled.div`
    width:100%;
    min-height:26rem;
    margin:1.4rem 0 0.7rem 0;
    background-color:#FFFFFF;
    border-radius:5px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:${props=>(props.isContentNull ? 'flex-start' : 'center'  )};
    &>h3{
        color: #868686;
        font-size:1.25rem;
        word-wrap: break-word;
        width:60%;
        text-align:center;
    }
    position:relative;
`;

const Footer=styled.div`
    width:100%;
    height:7.125rem;
    display:flex;
    justify-content:space-between;
    align-items:center;
`;

const TransactionsOptions=styled.div`
    height:100%;
    width:48%;
    background-color:#A328D6;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    border-radius:5px;
    padding:4%;
    color:#FFFFFF;
    font-weight:700;
    font-size:1.06rem;
    &>h4{
        width:50%;
    }
    &>ion-icon{
        font-size:1.5rem;
        
    }
`;

    
