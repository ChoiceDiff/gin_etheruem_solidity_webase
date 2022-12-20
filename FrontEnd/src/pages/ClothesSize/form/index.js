import React from 'react'
import { Form, Input, Select, Space } from 'antd';
import "./index.css"
const layout = {
    labelCol: {
      span: 2,
    },
    wrapperCol: {
      span: 2,
    },
 };

export default function Index()  {
    return (
       <div className='clothuserinfocontainer'>
            <Form {...layout} name="nest-messages" >
                <Input  style={{width: 100}}  suffix="cn" defaultValue="mysite" />
                <br></br>
                <Input style={{width: 100}} suffix="cn" defaultValue="mysite" />
                <br></br>        
                <Input style={{width: 100}} suffix="cn" defaultValue="mysite" />
            </Form>
       </div>
        
    )
}
