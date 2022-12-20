import React ,{useEffect}from 'react'
import { Link,useNavigate  } from 'react-router-dom'
import * as authActions from "../../../redux/actions/auth"
import { bindActionCreators } from 'redux';
import {connect} from "react-redux"
import './index.css'
import { message } from 'antd';


function Header(props) {
    const userinfo=JSON.parse(localStorage.getItem("userinfo"))
    // console.log("userinfo",userinfo)
   
    useEffect(()=>{
        if(userinfo){
            props.authActions.setUserObj(userinfo)
        }
    },[])
    const logoutHandle = ()=>{
        props.authActions.logOut({}) 
        localStorage.removeItem("userinfo") 
        message.success("退出登录")  
    }

    return (
        <div className="shortcut">
            <ul >
                {
                    props.auth.user.nick ?
                    <>
                        <li  style={{
                            color: "black",
                            fontSize: "20px",
                            fontWeight: "bold",
                            letterSpacing: "2px",
                            }}
                        >
                            蚝饷商城欢迎您！&nbsp;{props.auth.user.nick}
                            &nbsp;&nbsp;
                        </li>
                        <button onClick={logoutHandle} 
                        style={{
                            float: "right",
                            marginRight:"8%",
                            backgroundColor: "#rgb(242, 238, 181)",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "bold",
                            letterSpacing: "2px",
                            borderRadius:"15px",
                            padding:"0 16px"
                            }}>退出登录</button>
                    </>
                    :
                    <>
                        <Link to='/login'  className="style_blue">请登录&nbsp;</Link>
                        <Link to='/register' className="style_blue">免费注册&nbsp;&nbsp;</Link>
                    </>
                }
            </ul>
        </div>
    )
}
const mapStatetoProps = state=>{
    return{
        auth:state.auth
    }
}
const mapDispatchToProps =dispatch=>{
    return{
        authActions:bindActionCreators(authActions,dispatch)
    }
}
export default connect(mapStatetoProps,mapDispatchToProps)(Header)