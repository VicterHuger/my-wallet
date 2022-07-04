import styled from "styled-components";

export default function Transaction({transaction, setLoading }){

    // function handleClick(id){
    //     setLoading(true);
    //     const config={
    //         headers:{
    //             Authorization:`Bearer ${userData.token}`
    //         }
    //     };

    //     if(habit.done){
    //         const promise=axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,null,config);

    //         promise.then(()=>{
               
    //             return RenderTodayHabits();
    //         });

    //         promise.catch(err=>{
                
    //             return alert(err.response.data.message)});

    //     }else{
    //         const promise=axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,null,config);

    //         promise.then(()=>{
                
    //             return RenderTodayHabits();
    //         });

    //         promise.catch(err=>{
                
    //             return alert(err.response.data.message);});

    //     }
    // }

    return(
        <>
                    {/* onClick={()=>handleClick(id)} */}
                    <TransactionContent > 
                        <DateSumary>{transaction.date}<span>{transaction.sumary}</span> </DateSumary>
                        <Value type={transaction.type}>{transaction.value}</Value>
                    </TransactionContent>
        </>
    )
}

const TransactionContent=styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:100%;
    margin-top:1.44rem;
    font-family:'Raleway', sans-serif;
    font-size:1rem;
    padding:0 1rem;
`;
const DateSumary=styled.h5`
    color:#C6C6C6;
    &>span{
        margin-left:1rem;
        color:#000000;
    }
`;

const Value=styled.h5`
    color:${props=>(props.type==='entrada' ?  "#03AC00" : "#C70000") } ;
    margin-bottom:5px;
`;