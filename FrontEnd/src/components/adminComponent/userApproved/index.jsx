import React ,{useState,useEffect,Fragment}from 'react';
import api from "../../../api"
import { Link,useNavigate  } from 'react-router-dom'

import { Card,Descriptions,Image} from 'antd';
import "./index.css"
export default function UserUnapprove(){

  const navigate = useNavigate()
  const [supplier,setSupplier] = useState([])
  const [consumer,setConsumer] = useState([])
  const [reseller,setReseller] = useState([])

  const getSupplier=()=>{
      api.getapprovedsupplier().then(res=>{
          if(res.data.status===200){
            setSupplier(res.data.data)
          }else{
            setSupplier([])
          }
      })
    }
  const getConsumer=()=>{
      api.getapprovedconsumer().then(res=>{
        if(res.data.status===200){
          setConsumer(res.data.data)
        }else{
          setConsumer([])
        }
      })
  }
  const getReseller=()=>{
    api.getapprovedreseller().then(res=>{
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
    
  
  useEffect(()=>{
    getReseller()
    getSupplier()    
    getConsumer()
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
        {
          supplier.length>0? 
          <Card title=<h3 style={{marginLeft:"20px",letterSpacing:"9px"}}><strong>厂家申请:</strong></h3>>
          {
            supplier.map((item,index)=>{
              return(
                  <Card 
                      key={index} 
                      type="inner" 
                      bodyStyle={{padding:"0px"}}
                      title=<strong>{'申请方工厂名称：'+item.factorname }</strong> 
                      extra={
                                <p
                                  className='userUnapprove_button_approve' 
                                >
                                  已通过
                                </p>
                            }
                  >
                    <div style={{backgroundColor:"#E0FFFF",padding:"20px"}}>
                      <Descriptions labelStyle={{fontWeight:"bold"}}>
                        <Descriptions.Item label="电话号码:">{item.phonenum}</Descriptions.Item>
                        <Descriptions.Item label="电子邮箱：">{item.email?item.email:"未填写"}</Descriptions.Item>
                        <Descriptions.Item label="工厂人数：">{item.workernums}</Descriptions.Item>
                        <Descriptions.Item label="营业证件："><Image width={100}  src={item.liscenceFac}/></Descriptions.Item>
                        <Descriptions.Item label="注册时间">{getNowFormatDate(item.signupTime)}</Descriptions.Item>
                        <Descriptions.Item label="审批时间：">{getNowFormatDate(item.examineTime)}</Descriptions.Item>
                      </Descriptions>
                    </div>
                  </Card> 
              )
            })
          }
          </Card>:""
        }
        {
          reseller.length >0 ?
          <Card title=<h3 style={{marginLeft:"20px",letterSpacing:"9px"}}><strong>店铺申请:</strong></h3>>
          {
            reseller.map((item,index)=>{
              return(
                  <Card 
                      key={index} 
                      type="inner" 
                      bodyStyle={{padding:"0px"}}
                      title=<strong>{'申请方店铺名称：'+item.storename }</strong> 
                      extra={
                                <p className='userUnapprove_button_approve'>                             
                                  已通过
                                </p>
                            }
                  >
                    <div style={{backgroundColor:"#E0FFFF",padding:"20px"}}>
                      <Descriptions labelStyle={{fontWeight:"bold"}}>
                        <Descriptions.Item label="电话号码：" >{item.phonenum}</Descriptions.Item>
                        <Descriptions.Item label="电子邮箱：">{item.email?item.email:"未填写"}</Descriptions.Item>
                        <Descriptions.Item label="店铺简介：">{item.storeintro}</Descriptions.Item>
                        <Descriptions.Item label="营业证件："><Image width={100}  src={item.licensePic}/></Descriptions.Item>
                        <Descriptions.Item label="注册时间">{getNowFormatDate(item.signupTime)}</Descriptions.Item>
                        <Descriptions.Item label="审批时间：">{getNowFormatDate(item.examineTime)}</Descriptions.Item>
                      </Descriptions>
                    </div>
                    
                  </Card> 
              )
              })
          }
          </Card>:""
        }
      
      {
        consumer.length>0?
        <Card title=<h3 style={{marginLeft:"20px",letterSpacing:"9px"}}><strong>用户申请:</strong></h3>>
        {
          consumer.map((item,index)=>{
            return(
                <Card 
                    key={index} 
                    type="inner" 
                    bodyStyle={{padding:"0px"}}
                    title=<strong>{'申请者姓名：'+item.username }</strong> 
                    extra={
                            <p className='userUnapprove_button_approve'>
                              已通过
                            </p>
                          }
                >
                  <div style={{backgroundColor:"#E0FFFF",padding:"20px"}}>
                    <Descriptions labelStyle={{fontWeight:"bold"}}>
                      <Descriptions.Item label="电话号码：">{item.phonenum}</Descriptions.Item>
                      <Descriptions.Item label="电子邮箱:">{item.email?item.email:"未填写"}</Descriptions.Item>
                      <Descriptions.Item label="注册时间">{getNowFormatDate(item.signupTime)}</Descriptions.Item>
                      <Descriptions.Item label="审批时间：">{getNowFormatDate(item.examineTime)}</Descriptions.Item>
                    </Descriptions>
                  </div>
                
              </Card> 
          )
          })
        }
        </Card>:""
      }
      <h1 className='goodsUnapprove_h1' style={{display:supplier.length>0||consumer.length>0||reseller.length>0?"none":""}}>
            尚无审核通过用户
      </h1>
        
      </div>
      
    )
}
