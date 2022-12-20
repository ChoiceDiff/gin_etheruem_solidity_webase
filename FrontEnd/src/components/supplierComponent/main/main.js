import React, { Component } from 'react';
import { Link,Outlet} from 'react-router-dom'
import { GroupOutlined ,HistoryOutlined} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import './main.css'

const { Content, Sider } = Layout;

const items = [
  {
    key: 'itemManage',
    icon: React.createElement(GroupOutlined),
    label: <Link to="/supplier/item">上架商品</Link>,
  },
  {
    key: 'itemHistory',
    icon: React.createElement(HistoryOutlined),
    label: <Link to="/supplier/historyonshelf">上架记录</Link>,
  },
  {
    key: 'orderManage',
    icon: React.createElement(GroupOutlined),
    label: '订单管理',
    children:[{ 
          key:"firstOrder",
          label:<Link to="/supplier/firstorder">一级订单管理</Link>
          },
          {
            key:"secondOrder",
            label:<Link to="/supplier/secondorder">二级订单管理</Link>
          }
        ]
  },
  {
    key: 'orderSubscribe',
    icon: React.createElement(GroupOutlined),
    label: '订单申购平台',
    children:[{
        key:"firstSubscribe",
        label:<Link to="/supplier/firstsubscribe">一级订单申购</Link>
      },
      {
        key:"secondSubscribe",
        label:<Link to="/supplier/secondsubscribe">二级订单申购</Link>
      }
    ]
    }]
    
    
 
export default class Main extends Component {
    
  render() {
    return (
      <div>
  
   
      
    <Layout>
      <Content style={{ padding: '0 50px',}}>
          <Breadcrumb style={{ margin: '8px 0', }}>
          </Breadcrumb>
      <Layout className="site-layout-background" style={{ padding: '10px 0', }} >
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
