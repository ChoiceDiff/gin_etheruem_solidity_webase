import React, { Component } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Welcome(){
    const navigate = useNavigate()
    useEffect(()=>{
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
    },[])
    return(
        <div>
            <h1>你好，管理员！</h1>
            <h1>你好，管理员！</h1>
            <h1>你好，管理员！</h1>
            <h1>你好，管理员！</h1>
            <h1>你好，管理员！</h1>
            <h1>你好，管理员！</h1>
            <h1>你好，管理员！</h1>
            <h1>你好，管理员！</h1>
            <h1>你好，管理员！</h1>
            <h1>你好，管理员！</h1>
            <h1>你好，管理员！</h1>
            <h1>你好，管理员！</h1>
            <h1>你好，管理员！</h1>
            <h1>你好，管理员！</h1>
        </div>
    )
}