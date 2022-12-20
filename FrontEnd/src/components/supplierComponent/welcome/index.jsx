import React from 'react'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert } from 'antd'
import api from '../../../api'

export default function Welcome(){
    const [num,setNum]= useState(0)
     
    const uid=JSON.parse(localStorage.getItem("userinfo")).uid

    const navigate = useNavigate()

    const getunchecknum=(uid)=>{
        api.getunchecknum(uid).then((res)=>{
            console.log(res.data.num)
            setNum(res.data.num)
        })
    }


    useEffect(()=>{
        getunchecknum(uid)
        //判断当前是否含有登录信息，如果没有则将其push到登录页
        let timer = setInterval(()=>{
            const userType = localStorage.getItem("userinfo")?
                JSON.parse(localStorage.getItem("userinfo")).userType
                :
                ""
            if(userType!=="supplier"){
                navigate("/login")
            }
        },2000)
        return ()=>clearInterval(timer)
    },)
    return(
        <div>
           {
            num!==0? 
            (<Alert
                message={"您有"+num+"条审核消息未查看，请点击上架记录查看详细信息"}
                type="info"
                closable
             />)
             :
             <></>
           }
            <div style={{margin:"20px"}}><h1 style={{textAlign:"center",fontSize:"20px",letterSpacing:"10px"}}>欢迎进入商品与订单管理平台！</h1></div>

        </div>
    )
}