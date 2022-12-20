import React ,{useState,useEffect}from 'react';
import api from "../../../api"
import {useNavigate  } from 'react-router-dom'

import { Card,  Button,Space, message,Descriptions,Image, Popconfirm} from 'antd';
import "./index.css"
export default function UserUnapprove(){

  const navigate = useNavigate()
  const [supplier,setSupplier] = useState([])
  const [consumer,setConsumer] = useState([])
  const [reseller,setReseller] = useState([])

  const getUserInfo=()=>{
      api.getunapprovesupplier().then(res=>{
          if(res.data.status===200){
            setSupplier(res.data.data)
          }else{
            setSupplier([])
          }
      })
      api.getunapproveconsumer().then(res=>{
        if(res.data.status===200){
          setConsumer(res.data.data)
        }else{
          setConsumer([])
        }
      })
      api.getunapprovereseller().then(res=>{
        if(res.data.status===200){
          setReseller(res.data.data)
        }else{
          setReseller([])
        }
      })
    }

  function getNowFormatDate(timeStamp) {//获取当前时间
    var date = new Date(timeStamp*1);
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
    var minutes =date.getMinutes()>9?date.getMinutes():'0'+date.getMinutes()
    var seconds =date.getSeconds()>9?date.getSeconds():'0'+date.getSeconds()
    var hours =date.getHours()>9?date.getHours():'0'+date.getHours()
    var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
      + " " + hours+ seperator2 +minutes  + seperator2 + seconds;
    return currentdate;
  }
  const examineAction =(obj)=>{
      api.patchuser(obj).then((res)=>{
        if(res.data.status===200){
          message.success("操作成功")
          getUserInfo()
        }else{
          message.error("操作失败")
          getUserInfo()
        }
      })
      
  }
  
  useEffect(()=>{
    getUserInfo()
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
    console.log("timer")
    return ()=>clearInterval(timer)
  },[])
  return (
      <div>
        <Card title=<h3 style={{marginLeft:"20px",letterSpacing:"9px"}}><strong>厂家申请:</strong></h3>>
          {
            supplier.length>0? supplier.map((item,index)=>{
              return(
                  <Card 
                      key={index} 
                      type="inner" 
                      bodyStyle={{padding:"0px"}}
                      title=<strong>{'申请方工厂名称：'+item.factorname }</strong> 
                      extra={<Space>
                               <Popconfirm
                                 title="确定审批通过?"
                                 okText="确定"
                                 cancelText="取消"
                                 placement="topRight"
                                 onConfirm={()=>examineAction({
                                    "id":item.id,
                                    "userIdCust":item.userIdCust,
                                    "factorname":item.factorname,
                                    "password":item.password,
                                    "userType":"supplier",
                                    "time": new Date().getTime(),
                                    "examine":1,
                                    "phonenum":item.phonenum,
                                    "email":item.email
                                })}
                              >
                                   <Button 
                                    type="primary" ghost
                                    size='small'
                                   >
                                    通过
                                  </Button> 
                               </Popconfirm>|
                               <Popconfirm
                                 title="确定驳回请求?"
                                 okText="确定"
                                 cancelText="取消"
                                 placement="topRight"
                                 onConfirm={()=>examineAction({
                                    "id":item.id,
                                    "userType":"supplier",
                                    "time": new Date().getTime(),
                                    "examine":2
                                  })}
                                >
                                  <Button 
                                    type="primary" danger ghost
                                    size='small'
                                  >
                                    驳回
                                  </Button>
                                </Popconfirm>
                              </Space>
                            }
                  >
                    <div style={{backgroundColor:"ivory",padding:"20px 30px"}}>
                      <Descriptions labelStyle={{fontWeight:"bold"}}>
                        <Descriptions.Item label="电话号码:">{item.phonenum}</Descriptions.Item>
                        <Descriptions.Item label="电子邮箱：">{item.email?item.email:"未填写"}</Descriptions.Item>
                        <Descriptions.Item label="工厂人数：">{item.workernums}</Descriptions.Item>
                        <Descriptions.Item label="营业证件："><Image width={100}  src={item.liscenceFac}/></Descriptions.Item>
                        <Descriptions.Item label="注册时间">{getNowFormatDate(item.signupTime)}</Descriptions.Item>
                      </Descriptions>
                    </div>
                  </Card> 
              )
            })
            :
            <h1 style={{textAlign:"center",letterSpacing:"10px"}}>尚无</h1>
          }
        </Card>
        <Card title=<h3 style={{marginLeft:"20px",letterSpacing:"9px"}}><strong>店铺申请:</strong></h3>>
          {
            reseller.length >0 
            ?
            reseller.map((item,index)=>{
              return(
                  <Card 
                      key={index} 
                      type="inner" 
                      bodyStyle={{padding:"0px"}}
                      title=<strong>{'申请方店铺名称：'+item.storename }</strong> 
                      extra={<>
                            <Popconfirm
                              title="确定审批通过?"
                              okText="确定"
                              cancelText="取消"
                              placement="topRight"
                              onConfirm={()=>examineAction({
                                    "userIdCust":item.userIdCust,
                                    "id":item.id,
                                    "userIdCust":item.userIdCust,
                                    "storename":item.storename,
                                    "password":item.password,
                                    "userType":"reseller",
                                    "time": new Date().getTime(),
                                    "phonenum":item.phonenum,
                                    "email":item.email,
                                    "examine":1
                               })}
                            >
                              <Button 
                                  type="primary" ghost
                                  size='small'
                              >
                                通过
                              </Button> 
                               
                            </Popconfirm> | 
                            <Popconfirm
                              title="确定驳回请求?"
                              okText="确定"
                              cancelText="取消"
                              placement="topRight"
                              onConfirm={()=>examineAction({
                                  "id":item.id,
                                  "userType":"reseller",
                                  "time": new Date().getTime(),
                                  "examine":2
                              })}
                            >
                              <Button 
                                type="primary" danger ghost
                                size='small'
                              >
                                驳回
                              </Button>
                            </Popconfirm>
                          </>
                            }
                  >
                  <div style={{backgroundColor:"ivory",padding:"20px 30px"}}>
                    <Descriptions labelStyle={{fontWeight:"bold"}}>
                      <Descriptions.Item label="电话号码：" >{item.phonenum}</Descriptions.Item>
                      <Descriptions.Item label="电子邮箱：">{item.email?item.email:"未填写"}</Descriptions.Item>
                      <Descriptions.Item label="店铺简介：">{item.storeintro}</Descriptions.Item>
                      <Descriptions.Item label="营业证件："><Image width={100}  src={item.licensePic}/></Descriptions.Item>
                      <Descriptions.Item label="注册时间">{getNowFormatDate(item.signupTime)}</Descriptions.Item>
                    </Descriptions>
                  </div>
                    
                  </Card> 
              )
              })
            :
            <h1 style={{textAlign:"center",letterSpacing:"10px"}}>尚无</h1>
          }
        </Card>
        
        <Card title=<h3 style={{marginLeft:"20px",letterSpacing:"9px"}}><strong>用户申请:</strong></h3>>
        {
          consumer.length>0
          ? 
          consumer.map((item,index)=>{
            return(
                <Card 
                    key={index} 
                    type="inner" 
                    bodyStyle={{padding:"0px"}}
                    title=<strong>{'申请者姓名：'+item.username }</strong> 
                    extra={<Space>
                              <Popconfirm
                                 title="确定审批通过?"
                                 okText="确定"
                                 cancelText="取消"
                                 placement="topRight"
                                 onConfirm={()=>examineAction({
                                    "id":item.id,
                                    "userIdCust":item.userIdCust,
                                    "userType":"consumer",
                                    "username":item.username,
                                    "password":item.password,
                                    "time": new Date().getTime(),
                                    "phonenum":item.phonenum,
                                    "email":item.email,
                                    "examine":1
                                 })}
                              >
                                <Button 
                                    type="primary" ghost
                                    size='small'
                                >
                                  通过
                                </Button> 
                              </Popconfirm>| 
                              <Popconfirm
                                 title="确定驳回请求?"
                                 okText="确定"
                                 cancelText="取消"
                                 placement="topRight"
                                 onConfirm={()=>examineAction({
                                  "id":item.id,
                                  "userType":"consumer",
                                  "time": new Date().getTime(),
                                  "examine":2
                                })}
                              >
                                <Button 
                                    type="primary" danger ghost
                                    size='small'
                                >
                                  驳回
                                </Button>
                              </Popconfirm>
                            </Space>
                          }
                >
                  <div style={{backgroundColor:"ivory",padding:"20px 30px"}}>
                    <Descriptions labelStyle={{fontWeight:"bold"}}>
                      <Descriptions.Item label="电话号码：">{item.phonenum}</Descriptions.Item>
                      <Descriptions.Item label="电子邮箱:">{item.email?item.email:"未填写"}</Descriptions.Item>
                      <Descriptions.Item label="注册时间">{getNowFormatDate(item.signupTime)}</Descriptions.Item>
                    </Descriptions>
                  </div>
                  
                </Card> 
            )
          })
          :
          <h1 style={{textAlign:"center",letterSpacing:"10px"}}>尚无</h1>
        }
        </Card>
      </div>
      
    )
}
