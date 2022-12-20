import React from 'react'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Descriptions ,Divider,Image ,Button} from 'antd';
import api from '../../../api'

export default function Welcome(){
    const [items,setItems]= useState({
        tea:[],
        clo:[],
    })
    const {tea,clo} = items
     
    const uid=JSON.parse(localStorage.getItem("userinfo")).uid

    const navigate = useNavigate()

    const gethistoryitembyfacid=(uid)=>{
        api.gethistoryitembyfacid(uid).then((res)=>{
            console.log(res)
            setItems({
                "tea":tea,
                "clo":clo,
                "tea": res.data.tea,
                "clo": res.data.clo,
             })
        })
    }

    useEffect(()=>{
        gethistoryitembyfacid(uid)
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
    return(
        <div>
            {
               ( tea.length>0&&clo.length>0)? <></>:<div>无</div>
            }
            {
                tea.length>0?
                tea.map((item,index)=>{
                    return(
                      <>
                          <Descriptions key={index} title={item.goodsName} column={12} size="small" bordered layout="vertical"> 
                            <Descriptions.Item label="商品类别">{item.goodsClazz}</Descriptions.Item>
                            <Descriptions.Item label="商品名称">{item.goodsName}</Descriptions.Item>
                            <Descriptions.Item label="商品编号">{item.id}</Descriptions.Item>
                            <Descriptions.Item label="产品编号">{item.goodsId}</Descriptions.Item>
                            <Descriptions.Item label="品牌">{item.brand}</Descriptions.Item>
                            <Descriptions.Item label="价格">{item.price}</Descriptions.Item>
                            <Descriptions.Item label="茶种类">{item.teaClazz}</Descriptions.Item>
                            <Descriptions.Item label="生产许可证编号">{item.productionLicenseNo}</Descriptions.Item>
                            <Descriptions.Item label="产品标准号">{item.productStandardNumber}</Descriptions.Item>
                            <Descriptions.Item label="配料表">{item.burdenSheet}</Descriptions.Item>
                            <Descriptions.Item label="储藏方法">{item.store}</Descriptions.Item>
                            <Descriptions.Item label="保质期">{item.shelfLife}</Descriptions.Item>
                            <Descriptions.Item label="食品添加剂">{item.foodAdditives}</Descriptions.Item>
                            <Descriptions.Item label="系列">{item.series}</Descriptions.Item>
                            <Descriptions.Item label="生产工艺">{item.manuTech}</Descriptions.Item>
                            <Descriptions.Item label="包装种类">{item.typeofpackages}</Descriptions.Item>
                            <Descriptions.Item label="包装方式">{item.mannerofpacking}</Descriptions.Item>
                            <Descriptions.Item label="出产茶园">{item.teaGarden}</Descriptions.Item>
                            <Descriptions.Item label="特产品类">{item.specialtyCategory}</Descriptions.Item>
                            <Descriptions.Item label="数量">{item.goodsNum}</Descriptions.Item>
                            <Descriptions.Item label="采摘时间">{item.pickTime}</Descriptions.Item>
                            <Descriptions.Item label="出厂日期">{item.leaveFactoryTime}</Descriptions.Item>
                            <Descriptions.Item label="茶园图片" ><Image height='50px' width="50px" src={item.teaGardenPic}></Image></Descriptions.Item>
                            <Descriptions.Item label="商品图片"><Image  height='50px' width="50px" src={item.imgUrl}></Image></Descriptions.Item>
                            <Descriptions.Item label="商品描述">{item.description}</Descriptions.Item>  
                            <Descriptions.Item label="审批状态">{item.examine===1?"审批通过":"审批不通过"}</Descriptions.Item>    
                            <Descriptions.Item label="审批人工号">{item.examineMan}</Descriptions.Item> 
                            <div style={{display:item.examine===1?"none":""}}>
                                <Descriptions.Item label="审批意见" span={10}>{item.examineComment}</Descriptions.Item>   
                            </div>   
                        </Descriptions>
                        <Divider />
                      </>
                    )
                }):<></>
            }
            
            {
                clo.length>0?
                clo.map((item,index)=>{
                    return(
                      <>
                          <Descriptions title={item.goodsName} key={index}  column={12} size="small" bordered layout="vertical"> 
                            <Descriptions.Item label="商品编号">{item.id}</Descriptions.Item>
                            <Descriptions.Item label="商品类别">{item.goodsClazz}</Descriptions.Item>
                            <Descriptions.Item label="商品名称">{item.goodsName}</Descriptions.Item>
                            <Descriptions.Item label="商品图片"><Image width="50px" height="50px"  src={item.imgUrl}></Image></Descriptions.Item>
                            <Descriptions.Item label="产品编号">{item.goodsId}</Descriptions.Item>
                            <Descriptions.Item label="数量">{item.goodsNum}</Descriptions.Item>
                            <Descriptions.Item label="价格">{item.price}</Descriptions.Item>
                            <Descriptions.Item label="品牌">{item.brand}</Descriptions.Item>
                            <Descriptions.Item label="图案">{item.pattern}</Descriptions.Item>
                            <Descriptions.Item label="领型">{item.collartype}</Descriptions.Item>
                            <Descriptions.Item label="颜色">{item.colour}</Descriptions.Item>
                            <Descriptions.Item label="袖型">{item.sleevetype}</Descriptions.Item>
                            <Descriptions.Item label="细分风格">{item.subdivisionstyle}</Descriptions.Item>
                            <Descriptions.Item label="基础风格">{item.basicstyle}</Descriptions.Item>
                            <Descriptions.Item label="适用季节">{item.applyseason}</Descriptions.Item> 
                            <Descriptions.Item label="厚薄">{item.thickness}</Descriptions.Item>
                            <Descriptions.Item label="适用场景">{item.applicablescene}</Descriptions.Item>
                            <Descriptions.Item label="版型">{item.model}</Descriptions.Item>
                            <Descriptions.Item label="服装款式细节">{item.detailsofstyle}</Descriptions.Item>
                            <Descriptions.Item label="适用对象">{item.suitableobject}</Descriptions.Item>
                            <Descriptions.Item label="款式">{item.shelfLife}</Descriptions.Item>
                            <Descriptions.Item label="服装口袋样式">{item.style}</Descriptions.Item>
                            <Descriptions.Item label="材质成分">{item.material}</Descriptions.Item>
                            <Descriptions.Item label="商品描述">{item.description}</Descriptions.Item>
                            <Descriptions.Item label="审批人工号">{item.examineMan}</Descriptions.Item>  
                            <Descriptions.Item label="审批状态">{item.examine===1?"审批通过":"审批不通过"}</Descriptions.Item>    
                            <Descriptions.Item label="审批意见" labelStyle={{display:item.examine===1?"none":""}} contentStyle={{display:item.examine===1?"none":""}}>{item.examineComment}</Descriptions.Item>   
                        </Descriptions>
                        <Divider></Divider>
                      </>
                    )
                }):<></>
            }
        </div>
    )
}