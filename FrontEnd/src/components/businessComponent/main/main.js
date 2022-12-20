import React, { Component } from 'react';
import { Link,Outlet } from 'react-router-dom'
import './main.css'
import { GroupOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
const {  Content, Sider } = Layout;

const items = [
  {
    key: 'itemOrder',
    icon: React.createElement(GroupOutlined),
    label: <Link to="/business/item">商品订购</Link>,
  },
  {
    key: 'orderManage',
    icon: React.createElement(GroupOutlined),
    label: '订单管理',
    children:[{
      key:"firstOrder",
      label:<Link to="/business/firstorder">一级订单管理</Link>
    },
    {
      key:"secondOrder",
      label:<Link to="/business/secondorder">二级订单管理</Link>
    }]
  },
  {
    key: 'orderSubscribe',
    icon: React.createElement(GroupOutlined),
    label: '订单申购平台',
    children:[{
      key:"firstSubscribe",
      label:<Link to="/business/firstsubscribe">一级订单申购</Link>
    },
    {
      key:"secondSubscribe",
      label:<Link to="/business/secondsubscribe">二级订单申购</Link>
    }]
  }
  ]
    
    
 
export default class Main extends Component {
    
  render() {
    return (
      <div>
  
    {/* 主页内容 */}
      
    <Layout>
    <Content
      style={{
        padding: '0 50px',
      }}
    >
      <Breadcrumb
        style={{
          margin: '8px 0',
        }}
      >
        {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item> */}
      </Breadcrumb>
      <Layout
        className="site-layout-background"
        style={{
          padding: '24px 0',
        }}
      >
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
            }}
            items={items}
          />
        </Sider>
        <Content
          style={{
            padding: '0 24px',
            minHeight: 280,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Content>
   
  </Layout>
  
   </div>
    )
  }
}
