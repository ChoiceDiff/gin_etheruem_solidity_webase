import React ,{useEffect,useState } from 'react'
import { message,Tabs , Input ,DatePicker,Button,Form,Upload,InputNumber, } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Descriptions } from 'antd';
import moment from 'moment';
import api from '../../../api';

export default function ItemManage(){

    const [form] = Form.useForm();
    const username = localStorage.getItem("userinfo")?JSON.parse(localStorage.getItem("userinfo")).username:""
    const uid = localStorage.getItem("userinfo")?JSON.parse(localStorage.getItem("userinfo")).uid:""
    const navigate = useNavigate()

    //商品编号校验规则
    const itemnumValid = () => {
        // 获取表格数据
        // console.log(params)
        const itemId = form.getFieldValue("id")
    
        const flag = true
        if (!flag) {
            return Promise.reject('商品编号格式不对')
        }
        // 通过验证
        return Promise.resolve()
    };
    const onFinish1 = (values) => {
        values["leaveFactoryTime"]= typeof(values["leaveFactoryTime"]) !=="undefined"? moment(values["leaveFactoryTime"]).format('YYYY-MM-DD'):""
        values["pickTime"]= typeof(values["pickTime"]) !=="undefined"? moment(values["pickTime"]).format('YYYY-MM-DD'):""
        values["imgUrl"] =typeof(values["imgUrl"]) !=="undefined"? values["imgUrl"][0].thumbUrl:""
        values["teaGardenPic"] =typeof(values["teaGardenPic"]) !=="undefined"? values["teaGardenPic"][0].thumbUrl:""
        console.log(values)
        api.postgoodstea({...values,uid}).then((res)=>{
            if(res.data.status===200){
                message.info("申请上架中，请等待审核")
                form.resetFields()
            }else{
                message.error("申请上架商品操作失败")
            }
        })

        let itemComp={
            "id":uid.substr(uid.length-4)+values.id,
            "goodsClazz": values.goodsClazz,
            "goodsName":values.goodsName,
            "goodsId": values.goodsId,
            "price":values.price,
            "deposit":"0",
            "goodsNum":values.goodsNum,
            "imgUrl": values.imgUrl,
            "description":values.description,
            "supplierId":uid,
            "supplierName":username,
            "sellerId": uid,
            "sellerName": username,
            "postTime":storeTime()
          }
        api.postitemList(itemComp).then((res)=>{
            console.log(res)
        })


      };
    const onFinish2 = (values) => {
        const applicablescene =typeof(values["clo_applicablescene"]) !=="undefined"? values["clo_applicablescene"]:""
        const applyseason =typeof(values["clo_applyseason"]) !=="undefined"? values["clo_applyseason"]:""
        const basicstyle =typeof(values["clo_basicstyle"]) !=="undefined"? values["clo_basicstyle"]:""
        const brand =typeof(values["clo_brand"]) !=="undefined"? values["clo_brand"]:""
        const collartype =typeof(values["clo_collartype"]) !=="undefined"? values["clo_collartype"]:""
        const colour =typeof(values["clo_colour"]) !=="undefined"? values["clo_colour"]:""
        const description =typeof(values["clo_description"]) !=="undefined"? values["clo_description"]:""
        const goodsClazz =typeof(values["clo_goodsClazz"]) !=="undefined"? values["clo_goodsClazz"]:""
        const  goodsName =typeof(values["clo_goodsName"]) !=="undefined"? values["clo_goodsName"]:""
        const goodsNum =typeof(values["clo_goodsNum"]) !=="undefined"? values["clo_goodsNum"]:""
        const material =typeof(values["clo_material"]) !=="undefined"? values["clo_material"]:""
        const model =typeof(values["clo_model"]) !=="undefined"? values["clo_model"]:""
        const pattern=typeof(values["clo_pattern"]) !=="undefined"? values["clo_pattern"]:""
        const price=typeof(values["clo_price"]) !=="undefined"? values["clo_price"]:""
        const shelfLife =typeof(values["clo_shelfLife"]) !=="undefined"? values["clo_shelfLife"]:""
        const sleevetype =typeof(values["clo_sleevetype"]) !=="undefined"? values["clo_sleevetype"]:""
        const  subdivisionstyle=typeof(values["clo_subdivisionstyle"]) !=="undefined"? values["clo_subdivisionstyle"]:""
        const suitableobject =typeof(values["clo_suitableobject"]) !=="undefined"? values["clo_suitableobject"]:""
        const  thickness =typeof(values["clo_thickness"]) !=="undefined"? values["clo_thickness"]:""
        const  imgUrl =typeof(values["clo_imgUrl"]) !=="undefined"? values["clo_imgUrl"][0].thumbUrl:""
        const  detailsofstyle =typeof(values["clo_detailsofstyle"]) !=="undefined"? values["clo_detailsofstyle"]:""
        const  style =typeof(values["clo_style"]) !=="undefined"? values["clo_style"]:""
        const  goodsId =typeof(values["clo_goodsId"]) !=="undefined"? values["clo_goodsId"]:""
        const  id =typeof(values["clo_id"]) !=="undefined"? values["clo_id"]:""
        
        api.postgoodsclo({goodsId,id,uid, applicablescene,applyseason,basicstyle,brand,collartype,colour,description,goodsClazz,goodsName,goodsNum,material,model,pattern,price,shelfLife,sleevetype,subdivisionstyle,suitableobject,thickness,imgUrl,detailsofstyle,style}).then((res)=>{
            if(res.data.status===200){
                message.info("申请上架中，请等待审核")
                form.resetFields()
            }else{
                message.error("申请上架商品操作失败")
            }
        })

        let itemComp={
            "id":uid.substr(uid.length-4)+values.id,  
            "goodsClazz": goodsClazz,
            "goodsName":goodsName,
            "goodsId": goodsId,
            "price":price,
            "deposit":"0",
            "goodsNum":goodsNum,
            "imgUrl": imgUrl,
            "description":description,
            "supplierId":uid,
            "supplierName":username,
            "sellerId": uid,
            "sellerName": username,
            "postTime":storeTime()
          }
        api.postitemList(itemComp).then((res)=>{
            console.log(res)
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    // const putOnSale = (obj)=>{
    //     const timestamp = Math.round(new Date())
    //     let itemId = timestamp+obj.prefix;
    //     let itemComp={
    //       "id":itemId,
    //       "goodsId": obj.goodsId,
    //       "deposit":obj.deposit,

    //       "supplierId":uid,
    //       "supplierName":username,
    //       "sellerId": uid,
    //       "sellerName": username,
    //       "postTime":storeTime()
    //     }
    //     api.postitemList(itemComp).then((res)=>{
    //         message.info("请等待管理员审核商品");
    //     })
    // }
    // const onChange = (value) => {
    //     console.log('changed', value);
    //   };
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
    // 数据库存储的时间
    let storeTime =()=>{
        var date = new Date();
        var day =(date.getHours()+8>=24)?date.getDate()+1:date.getDate() ;
        var hours = (date.getHours()+8)%24;
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
           
        }
        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    }
    
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
 
    return ( 
            <div className=" many-items-list">
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="茶叶" key="1">
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{
                            span: 16,
                        }}
                        wrapperCol={{
                            span: 36,
                        }}
                        initialValues={{
                            goodsClazz: "tea",
                            price:1000,
                        }}
                        onFinish={onFinish1}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        >
                        <Descriptions bordered >
                             <Descriptions.Item label="商品类别">
                                <Form.Item
                                    name="goodsClazz"
                                    defaultValue="furniture"
                                >
                                 <Input disabled/>
                                </Form.Item>
                            </Descriptions.Item>
                            <Descriptions.Item label="商品名称">
                                <Form.Item
                                    name="goodsName"
                                >
                                <Input/>
                                </Form.Item>
                            </Descriptions.Item>
                            <Descriptions.Item label="商品编号">
                                <Form.Item
                                    name="id"
                                >
                                <Input/>
                                </Form.Item>
                            </Descriptions.Item>
                            <Descriptions.Item label="产品编号">
                                <Form.Item
                                    name="goodsId"
                                >
                                <Input/>
                                </Form.Item>
                            </Descriptions.Item>
                            <Descriptions.Item label="品牌">
                                <Form.Item
                                    name="brand"
                                >
                                <Input/>
                                </Form.Item>
                            </Descriptions.Item>
                            <Descriptions.Item label="价格"> 
                                <Form.Item noStyle
                                    name="price"
                                    defaultValue={1000}

                                 >
                                    <InputNumber
                                        formatter={(value) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        step="0.01"
                                        min=""
                                    />
                                </Form.Item>
                            </Descriptions.Item>
                           
                            <Descriptions.Item label="茶种类"> <Form.Item
                                    name="teaClazz"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="生产许可证编号"> <Form.Item
                                    name="productionLicenseNo"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="产品标准号"> <Form.Item
                                    name="productStandardNumber"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="配料表"> <Form.Item
                                    name="burdenSheet"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="储藏方法"> <Form.Item
                                    name="store"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="保质期"> <Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="食品添加剂"> <Form.Item
                                    name="foodAdditives"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                           
                            <Descriptions.Item label="系列"> <Form.Item
                                    name="series"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="生产工艺"> <Form.Item
                                    name="manuTech"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="包装种类"> <Form.Item
                                    name="typeofpackages"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="包装方式"> <Form.Item
                                    name="mannerofpacking"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="出产茶园"> <Form.Item
                                    name="teaGarden"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="特产品类"> <Form.Item
                                    name="specialtyCategory"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="数量">
                                 <Form.Item noStyle
                                    name="goodsNum"
                                 >
                                    <InputNumber min={1} max={10000}  />
                                </Form.Item>
                            </Descriptions.Item>
                            <Descriptions.Item label="采摘时间"> 
                                <Form.Item
                                    name="pickTime" 
                                >
                                    <DatePicker  />
                                </Form.Item>
                            </Descriptions.Item>
                            <Descriptions.Item label="出厂日期"> 
                                <Form.Item
                                    name="leaveFactoryTime" 
                                >
                                    <DatePicker  />
                                </Form.Item>
                            </Descriptions.Item>

                            <Descriptions.Item label="茶园图片">
                            <Form.Item 
                                name="teaGardenPic"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
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
                            </Descriptions.Item>
                            <Descriptions.Item label="商品图片">
                            <Form.Item 
                                name="imgUrl"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
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
                            </Descriptions.Item>
                            <Descriptions.Item span={3} label="商品描述">
                              <Form.Item
                                name="description"
                              >
                                <Input/>
                              </Form.Item></Descriptions.Item>
                           </Descriptions>
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
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="衣服" key="2">
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{
                            span: 16,
                        }}
                        wrapperCol={{
                            span: 36,
                        }}
                        initialValues={{
                            clo_goodsClazz: "furniture",
                            clo_price:"1000",
                        }}
                        onFinish={onFinish2}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Descriptions bordered>
                             <Descriptions.Item label="商品类别">
                                <Form.Item
                                    name="clo_goodsClazz"
                                    defaultValue="furniture"
                                >
                                 <Input disabled/>
                                </Form.Item>
                            </Descriptions.Item>
                            <Descriptions.Item label="商品名称">
                                <Form.Item
                                    name="clo_goodsName"
                                >
                                    <Input/>
                                </Form.Item>
                            </Descriptions.Item>
                            <Descriptions.Item label="商品编号">
                                <Form.Item
                                    name="clo_id"
                                >
                                <Input/>
                                </Form.Item>
                            </Descriptions.Item>
                            <Descriptions.Item label="产品编号">
                                <Form.Item
                                    name="clo_goodsId"
                                >
                                <Input/>
                                </Form.Item>
                            </Descriptions.Item>
                            <Descriptions.Item label="商品图片">
                               
                            <Form.Item 
                                name="clo_imgUrl"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
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
                            </Descriptions.Item>
                            <Descriptions.Item label="数量">
                                <Form.Item noStyle
                                    name="clo_goodsNum"
                                 >
                                    <InputNumber min={1} max={10000}  />
                                </Form.Item>
                            </Descriptions.Item>
                            <Descriptions.Item label="价格">
                                
                                 <Form.Item noStyle
                                    name="clo_price"
                                    defaultValue={1000}

                                 >
                                    <InputNumber
                                        formatter={(value) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    />
                                </Form.Item>
                            </Descriptions.Item>
                            <Descriptions.Item label="品牌"><Form.Item
                                    name="clo_brand"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="图案"><Form.Item
                                    name="clo_pattern"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="领型"><Form.Item
                                    name="clo_collartype"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="颜色"><Form.Item
                                    name="clo_colour"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="袖型"><Form.Item
                                    name="clo_sleevetype"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="细分风格"><Form.Item
                                    name="clo_subdivisionstyle"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="基础风格"><Form.Item
                                    name="clo_basicstyle"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="适用季节"><Form.Item
                                    name="clo_applyseason"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="厚薄"><Form.Item
                                    name="clo_thickness"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="适用场景"><Form.Item
                                    name="clo_applicablescene"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="版型"><Form.Item
                                    name="clo_model"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="服装款式细节"><Form.Item
                                    name="clo_detailsofstyle"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="适用对象"><Form.Item
                                    name="clo_suitableobject"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="款式"><Form.Item
                                    name="clo_shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="服装口袋样式"><Form.Item
                                    name="clo_style"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="材质成分"><Form.Item
                                    name="clo_material"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item   label="商品描述"><Form.Item
                                    name="clo_description"
                                >
                                <Input />
                                </Form.Item></Descriptions.Item>
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
                        </Descriptions>
                    </Form>
                    </Tabs.TabPane>
                    {/* <Tabs.TabPane tab="床垫" key="3">
                        <Descriptions bordered>
                             <Descriptions.Item label="商品类别">
                                <Form.Item
                                    name="goodsClazz"
                                    defaultValue="furniture"
                                >
                                 <Input disabled/>
                                </Form.Item>
                            </Descriptions.Item>
                            <Descriptions.Item label="商品名称"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item> 
                            <Descriptions.Item label="商品图片"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="数量"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="价格"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="品牌"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="尺寸"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="厚度"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="颜色分类"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="面料分类"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="是否可定制"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="海绵类型"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="适用人群"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="弹簧类型"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="床垫尺寸"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="床垫软硬度"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="床垫厚度"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="海绵厚度"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="乳胶厚度"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="棕的厚度"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="商品描述"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                        </Descriptions>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="枕头" key="4">
                        <Descriptions bordered>
                            <Descriptions.Item label="商品类别">
                                <Form.Item
                                    name="goodsClazz"
                                    defaultValue="furniture"
                                >
                                 <Input disabled/>
                                </Form.Item>
                            </Descriptions.Item>
                            <Descriptions.Item label="商品名称"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="商品图片"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="数量"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="价格"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="品牌"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="枕头面料"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="形状"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="包装种类"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="颜色分类"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="填充物"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="重量"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="高度"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="商品描述"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                        </Descriptions>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="被子" key="5">
                        <Descriptions bordered>
                            <Descriptions.Item label="商品类别">
                                <Form.Item
                                    name="goodsssClsazz"
                                    defaultValue="furniture"
                                >
                                 <Input disabled/>
                                </Form.Item>
                            </Descriptions.Item>
                            <Descriptions.Item label="商品名称"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="商品图片"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="数量"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="价格"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="品牌"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="尺寸"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="颜色分类"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="被套织造工艺"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="适用季节"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="款式"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="棉花含量"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="被套面料"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item></Descriptions.Item>
                            <Descriptions.Item label="商品描述"><Form.Item
                                    name="shelfLife"
                                >
                                <Input/>
                                </Form.Item>    </Descriptions.Item>
                        </Descriptions>
                    </Tabs.TabPane> */}
                </Tabs>
            </div>
    )
}
