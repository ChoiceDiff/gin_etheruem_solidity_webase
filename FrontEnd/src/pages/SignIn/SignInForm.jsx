import React, {useState} from 'react'
import { useNavigate} from 'react-router-dom'
import { message } from 'antd';
import "./login.css"
import api from '../../api';
import {latestTimeStamp} from "../../utils/tools"
import { useEffect } from 'react';

export default function SignInForm(props){

  const navigate = useNavigate();
  const [account,setAccount] =useState({
    phonenum:"",
    phonecode:"",
    emailnum:"",
    emailcode:"",
    userIdCust:"",
    password:""
  })
 
  const {phonenum,phonecode,emailnum,emailcode,userIdCust,password} =account
  let login_opt ;
  let form_bar ;
  useEffect(()=>{
    login_opt = document.getElementsByName('login-opt');
    form_bar = document.getElementById('form-bar');
  },[])

  const naviToSignUp=e=>{
    navigate('/register')
  }
  
  //登录界面配置
  const checkRadio=(e)=>{
    e.stopPropagation();
    if(login_opt[0].checked){
      form_bar.style.transform = 'translateX(0)';
      console.log('1')
    } else if(login_opt[1].checked){
      form_bar.style.transform = 'translateX(-348px)';
      console.log('2')
    } else{
      form_bar.style.transform = 'translateX(-692px)';
    }
  };
  const inputChangeHandler = (event) => {
    setAccount({ 
      userIdCust,
      password,
      phonenum,
      phonecode,
      emailnum,
      emailcode,
      [event.target.name]: event.target.value
    });
  };

   //func
   
  const submitFormHandler1 = (event) => {
    event.preventDefault();
    const timestamp = latestTimeStamp() //当前时间戳
    props.authActions.asynSetUserObjByPhone({phonenum,phonecode,timestamp})
    .then((res)=>{
        const {userType,status} =res.data
        if(status===200){
          if(userType==="reseller"){
            navigate('/business')
            message.success("登陆成功")
          }else if(userType==="supplier"){
            navigate('/supplier')
            message.success("登陆成功")
          }else if(userType==="consumer"){
            navigate('/home')
            message.success("登陆成功")
          }else if(userType==="admin"){
            navigate('/admin')
            message.success("你好，管理员")
          }else{
            message.error("用户类型未知")
          }
        }else if(status===201){
          message.info("请点击获取验证码")
        }else{
          message.error("验证码已过期，请重新获取")
        }
    })
  };
  const submitFormHandler2=(e)=>{
    e.preventDefault()
    props.authActions.asynSetUserObj({
        userIdCust,
        password
    }).then(res=>{
       const {status,userType} = res.data
       if(status===200){
            if(userType==="reseller"){
              navigate('/business')
              message.success("登陆成功")
            }else if(userType==="supplier"){
              navigate('/supplier')
              message.success("登陆成功")
            }else if(userType==="consumer"){
              navigate('/home')
              message.success("登陆成功")
            }else if(userType==="admin"){
              navigate('/admin')
              message.success("你好，管理员")
            }else{
              message.error("用户类型未知")
            }
       }else{
          message.error("登录失败")
       }
    })
  }
  const submitFormHandler3 = (event) => {
    event.preventDefault();
    if(emailnum===""){
      message.info("请输入邮箱")
    }else{
      const timestamp = latestTimeStamp() //当前时间戳
      props.authActions.asynSetUserObjByMail({emailnum,emailcode,timestamp})
      .then((res)=>{
          const {userType,status} =res.data
          if(status===200){
            if(userType==="reseller"){
              navigate('/business')
              message.success("登陆成功")
            }else if(userType==="supplier"){
              navigate('/supplier')
              message.success("登陆成功")
            }else if(userType==="consumer"){
              navigate('/home')
              message.success("登陆成功")
            }else if(userType==="admin"){
              navigate('/admin')
              message.success("你好，管理员")
            }else{
              message.error("用户类型未知")
            }
          }else if(status===201){
            message.info("请点击获取验证码")
          }else{
            message.error("验证码已过期，请重新获取")
          }
      })
    }
  };
  const identifyCodeGet1=(event)=>{
    event.preventDefault();
    const timestamp = latestTimeStamp()
    if(phonenum!==''){
      api.getphonecode({phonenum,timestamp}).then((res)=>{
        console.log(res)
        if(res.data.status===200){
          message.info("验证码已发送")
        }else{
          message.error("errrro")
        }
      })
    }else{
      message.info("请输入您的手机号")
    }
  }
  const identifyCodeGet2=(event)=>{
    event.preventDefault();
    const timestamp = latestTimeStamp()
    if(emailnum!==''){
      api.getmailcode({emailnum,timestamp}).then((res)=>{
        if(res.data.status===200){
          message.info("验证码已发送")
        }else{
          message.error("errrro")
        }
      })
    }else{
      message.info("请输入您的邮箱")
    }
  }
  return (
      <div className='bodystyle'>
        <div className="login-app ">
            <div className="login-header" onChange={checkRadio}>
              <input type="radio" name="login-opt" id="message" defaultChecked={true}/>
              <label htmlFor="message" className="m-btn">短信登录</label>
              <input type="radio" name="login-opt" id="username" />
              <label htmlFor="username" className="u-btn">密码登录</label>
              <input type="radio" name="login-opt" id="qrcode"/>
              <label htmlFor="qrcode" className="q-btn">邮箱登录</label>
            </div>
            <div className="login-body">
              <div id="form-bar">
                <form className="m-form">
                  <input type="text" placeholder="请输入手机号码" name="phonenum" value={phonenum} onChange={inputChangeHandler}/>
                  <input type="text" placeholder="请输入验证码" name="phonecode" value={phonecode} onChange={inputChangeHandler}/>
                  <button className="vercode-btn" onClick={identifyCodeGet1}>获取验证码</button>
                  <input type="checkbox" name="" id="sure"/>
                  {/* <label htmlFor="sure" className="tobesure"><p>未注册手机登录时会自动创建新账号，我已阅读并同意<a href="">服务协议</a>和<a href="">隐私权条款</a></p></label> */}
                  {/* <button className="login-btn">登录</button> */}
                  <button className="login-btn" onClick={submitFormHandler1}>登录</button>
                  <a  onClick={naviToSignUp}>立即注册</a>
                </form>
              
                <form  className="u-form"  onSubmit={submitFormHandler2}>
                  <input type="text" placeholder="请输入账号" name="userIdCust" value={userIdCust} onChange={inputChangeHandler}/>
                  <input type="password" placeholder="请输入密码" name="password" value={password} onChange={inputChangeHandler}/>
                  {/* <button className="vercode-btn" onClick={identifyCodeGet}>获取验证码</button>
                  <input type="checkbox" name="" id="sure"/> */}
                  <button className="login-btn">登录</button>
                  <a onClick={naviToSignUp}>立即注册</a>
                </form>
              
                <form className="q-form" >
                    <input type="text" placeholder="请输入邮箱" name="emailnum" value={emailnum} onChange={inputChangeHandler}/>
                    <input type="text" placeholder="请输入验证码" name="emailcode" value={emailcode} onChange={inputChangeHandler}/>
                    <button className="vercode-btn" onClick={identifyCodeGet2}>获取验证码</button>
                    <input type="checkbox" name="" id="sure"/>
                    <button className="login-btn" onClick={submitFormHandler3}>登录</button>
                    <a onClick={naviToSignUp}>立即注册</a>
                </form>
            
              </div>
            </div>
        </div>
      </div>
   
  )
}
