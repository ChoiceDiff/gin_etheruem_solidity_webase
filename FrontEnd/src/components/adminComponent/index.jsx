import React, { Component,useEffect } from 'react'
import { Layout ,Menu } from 'antd';
import {useNavigate  } from 'react-router-dom'

import MyHeader from '../publicComponent/header';

import { UserOutlined, AccountBookOutlined,VideoCameraOutlined } from '@ant-design/icons';
import { Link ,Outlet} from 'react-router-dom';
const { Header,  Sider, Content } = Layout;
// 
const items=[{
  key:"sdadsa",
  icon:React.createElement(AccountBookOutlined),
  label:"商品",
  children:[{
    key:"fddfdd",
    label:<Link to="/admin/goodsunapprove">未审批</Link>
  },{
    key:"fdddd",
    label:<Link to="/admin/goodsapproved">审批已通过</Link>
  },{
    key:"fdaddd",
    label:<Link to="/admin/goodsrejected">审批不通过</Link>
  }]
},{
  key:"sdssadsa",
  icon:React.createElement(UserOutlined),
  label:"用户",
  children:[{
    key:"fddsdd",
    label:<Link to="/admin/userunapprove">未审批</Link>
  },{
    key:"fdsddd",
    label:<Link to="/admin/userapproved">审批已通过</Link>
  },{
    key:"kekds",
    label:<Link to="/admin/userrejected">审批不通过</Link>
  }]
},{
  key:"qwdffg",
  icon:React.createElement(VideoCameraOutlined),
  label:<Link to="">尚未开放</Link>

}]
export default function Index() {
     const navigate = useNavigate();
    useEffect(()=>{
        //判断当前是否含有登录信息，如果没有则将其push到登录页
        let timer = setInterval(()=>{
            const userType = localStorage.getItem("userinfo")?
                JSON.parse(localStorage.getItem("userinfo")).userType
                :
                ""
            if(userType!=="admin"){
                navigate("/login")
            }
        },2000)
        return ()=>clearInterval(timer)
    },[])
    return (
      <div>
        <Layout>
            <Header           
                className="site-layout-sub-header-background" 
                style={{ padding: 0,
                          height:"50px" ,
                          backgroundColor:"white" 
                }}
            > 
                {/* 头部 */}
                <MyHeader/>
            </Header>
            <Layout>
                 {/* 侧边导航栏 */}
                <Sider
                    breakpoint="xs"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                      console.log("broken",broken);
                    }}
                    onCollapse={(collapsed, type) => {
                      console.log("collapsed",collapsed, type);
                    }}
                    style={{
                      height: '100vh',
                    }}
                >
                  <div className="logo" />
                  <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['sdadsa']}
                    items={items}
                  />
                </Sider>
                  {/* 中心内容 */}
                <Content>
                     <Outlet/>
                </Content>
            </Layout>
        </Layout>
      </div>
    )
}
