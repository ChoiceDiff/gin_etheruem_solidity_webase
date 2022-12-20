import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import { Button,  Form, Input ,message,Select,Upload,InputNumber,Tooltip,Typography, Space } from 'antd';
import { PlusOutlined,UploadOutlined  } from '@ant-design/icons';
import api from '../../api';
import './index.css'



export default function Register() {
    const { Option } = Select;
    const { TextArea } = Input;
    const [usertype,setUserType] = useState({userType:"consumer"})
    const [form] = Form.useForm();
    const resellerRequire = usertype.userType==="reseller"?
        {rules:[{
                required: true,message:"请输入店铺名"
            }],hidden:false}
        :""
    const supplierRequire = usertype.userType==="supplier"?
        {rules:[{
                required: true,message:"请输入厂家名称"
            }],hidden:false}
        :""
    const consumerRequire = usertype.userType==="consumer"?
        {rules:[{
                required: true,message:"请输入用户名"
            }],hidden:false}
        :""
        
    const onFinish = (values) => {
        
        values["liscencePic"]=typeof(values["liscencePic"]) ==="undefined"?"无": values["liscencePic"][0].thumbUrl
        values["facPic"]=typeof(values["facPic"]) ==="undefined"?"无": values["facPic"][0].thumbUrl
        values["signupTime"]=new Date().getTime()
        api.getisrepeated(values["userIdCust"]).then((res)=>{
           if(res.data.status===200){
                message.error("账号名已经存在")
           }else{
            api.postuser(values).then((res)=>{
                if(res.data.status===200){
                    message.info("注册申请发送成功")
                }else if(res.data.status===203){
                    message.warning("该用户已经存在")
                }else{
                    message.warn("用户注册失败")
                }
                form.resetFields()
                form.setFieldsValue({
                    userType:usertype
                })
            })
           }
        })
       
       
    };
    const normFile = (e) => {
        console.log('Upload event:', e);
        const formData = new FormData();
        formData.append("file",e.file)

        if (Array.isArray(e)) {
          return e;
        }
      
        return e?.fileList;
      };
    //   停止文件自动上传
    const beforeUpload=({fileList})=>{
        return false
    }
    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo,"errorInfo")
        message.warning("请输入正确信息")
    };
    //密码校验规则
    const changName = (errorInfo) => {
        // 获取表格数据
        const password = form.getFieldValue("password")
        // 动态判断输入文本是否符合检验条件
        if(password.length==0){
          return Promise.reject('输入密码')

        }
        // 长度为8-18位数
        if (password.length < 8 || password.length > 18) {
          return Promise.reject('请输入8-18位密码')
        }
        const reg = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])|(?=.*\d)(?=.*[A-Z])(?=.*[_!@#$%^&*()?=\[\]])|(?=.*\d)(?=.*[a-z])(?=.*[_!@#$%^&*()?=\[\]])|(?=.*[A-Z])(?=.*[a-z])(?=.*[_!@#$%^&*()?=\[\]])).{8,18}$/
        const flag = reg.test(password)
        if (!flag) {
          return Promise.reject('数字、大写字母、小写字母、特殊字符至少3种, 特殊字符仅限于：_!@#$%^&*()?=[]')
        }
        // 通过验证
        return Promise.resolve()
      };
    //手机号校验规则
    const phoneNumValid = (errorInfo) => {
        // 获取表格数据
        const phone = form.getFieldValue("phone")
        // 动态判断输入文本是否符合检验条件
        // 长度为8-18位数
        
        const reg =  /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/

        const flag = reg.test(phone)
        if (!flag) {
          return Promise.reject('手机号码格式不对')
        }
        // 通过验证
        return Promise.resolve()
      };
      //账号校验规则
    const userIdcustValid = (errorInfo) => {
        // 获取表格数据
        const userIdCust = form.getFieldValue("userIdCust")
        // 动态判断输入文本是否符合检验条件
        
        const reg =  /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[!#@*&.])[a-zA-Z\d!#@*&.]{6,18}$/
        const flag = reg.test(userIdCust)
        if (!flag) {
          return Promise.reject('账号名格式不对')
        }
        // 通过验证
        return Promise.resolve()
      };
    const onUserChange = (value) => {
        
        switch (value) {
          case 'consumer':
            setUserType({userType:"consumer"})
            break;
    
          case 'supplier':
            setUserType({userType:"supplier"})
            break;
    
          case 'reseller':
            setUserType({userType:"reseller"})
        }
      };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );
    return (
       <>
     
        <div className='registercontainer'>    
           <div className="registerarea">
                
                <h3>注册新用户
                    <div className="login">我有账号，去 <Link to='/login'>登录</Link></div>
                </h3>
               <h1 style={{visibility:"hidden"}}>{usertype.userType}</h1>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 12,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{prefix:+86,userType:"consumer"}}
                >
                    <Form.Item
                        name="userType"
                        label="用户类型"
                        rules={[{required: true}]}
                        wrapperCol={{
                            offset: 0,
                            span: 4,
                            }}
                    >
                        <Select
                            placeholder="选择注册用户身份"
                            onChange={onUserChange}
                        >
                            <Option value="consumer">消费者</Option>
                            <Option value="reseller">销售者</Option>
                            <Option value="supplier">厂家</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="账号名"
                        name="userIdCust"
                        rules={[
                            {required: true,message:""},{validator:userIdcustValid}
                        ]}
                    >
                     
                        <Space>
                        <Form.Item name="userIdCust" noStyle ><Input /></Form.Item>
                        <Tooltip placement="right"  title="账号名用于登录系统，请设置6-18位由大小写字母、数字、符号构成的账号"> 
                                <Typography.Link href="#API">帮助？</Typography.Link>
                            </Tooltip>
                       </Space>
                    </Form.Item>

                    <Form.Item
                        label="用户名"
                        name="username"
                        hidden="true"
                        rules={[
                            {required: false}
                        ]}
                        {...consumerRequire}
                    >
                      <Input/>
                    </Form.Item>

                    <Form.Item
                        label="店铺名"
                        name="storeName"
                        hidden="true"
                        rules={[{required: false}]}
                        {...resellerRequire}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="厂家名称"
                        name="factoryName"
                        hidden="true"
                        rules={[{required: false,message:"请输入厂家名称"}]}
                        {...supplierRequire}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{required: true,message:'请输入设置的密码'}, { validator: changName }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="手机号码"
                        rules={[
                        {
                            required: true,message:''
                        },{validator:phoneNumValid}
                        ]}
                    >
                        <Input
                        addonBefore={prefixSelector}
                        style={{
                            width: '100%',
                        }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="邮箱"
                        rules={[
                        {
                            type: 'email',
                            message: '请输入合法邮箱',
                        },
                        {
                            message: '请输入邮箱',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                                   
                    <Form.Item
                        label="工厂人数规模"
                        name="workerNums"
                        hidden="true"
                        rules={[
                            {
                                required: false,
                            },
                            ]}
                        {...supplierRequire}
                    >
                        <InputNumber min={100} />
                    </Form.Item>

                    <Form.Item  
                        label="店铺简介" 
                        name="storeintro"
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                        hidden="true"
                        {...resellerRequire}
                    >
                         <TextArea  showCount maxLength={50} rows={2} />
                    </Form.Item>
                    
                    <Form.Item 
                        name="liscencePic"
                        label="上传执照照片" 
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        hidden="true"
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                        {...resellerRequire}
                    >
                        <Upload 
                            listType="picture-card"
                            beforeUpload={beforeUpload}
                        >
                            <div>
                                <PlusOutlined />
                                <div
                                    style={{
                                    marginTop: 8,
                                    }}
                                >
                                    Upload
                                </div>
                            </div>
                        </Upload>
                    </Form.Item>
                    
                    <Form.Item
                        name="facPic"
                        label="营业相关文件"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        extra="上传合法的营业执照"
                        hidden="true"
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                        {...supplierRequire}
                    >
                        <Upload 
                            name="logo" 
                            // action="/upload.do" 
                            listType="picture"
                            beforeUpload={beforeUpload}
                            multiple
                        >
                             <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                        offset: 8,
                        span: 8,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className='containerloader'>
                    <span>注</span>
                    <span>册</span>
                    <span>新</span>
                    <span>用</span>
                    <span>户</span>
                    <span>，</span>
                    <span>加</span>
                    <span>入</span>
                    <span>我</span>
                    <span>们</span>
            </div>
        </div>
       </>
    )
}
