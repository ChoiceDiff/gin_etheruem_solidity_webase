import { message,Card, List,InputNumber,Button , Image,DatePicker,Collapse} from 'antd';
import React ,{useState,useEffect}from 'react';
import  moment from 'moment';
import 'moment/locale/zh-cn';
import { sha256} from 'js-sha256';
import locale from 'antd/es/date-picker/locale/zh_CN';
import api from '../../../api';
import { useNavigate } from 'react-router-dom';
const { Panel } = Collapse;


export default function ItemOrder(){
    const navigate =useNavigate()
    const [items,setItems] = useState([]);
    const [discout,setDiscout]=useState([]);
    let today = new Date((new Date).getTime() + 8*60*60*1000).toJSON().split('T').join(' ').substr(0,10);
    const [dealTime,setDealTime]=useState(today);
    function DP_algorithm(price,id,date1) {
      console.log("date1",date1);
      setDealTime(date1.format('YYYY-MM-DD'));
      // setDealTime(date1);
      var DP, OP = price, DR;
      var R = 0.001,AR = 0.2,D; //D>=1&&D<=1825
      var preDate = Date.now();
      var date = Date.parse(date1);
      console.log("data1",date)
      var DR_base = 1 - R * (1 + AR);
      D = Math.ceil((date - preDate) / (1 * 24 * 60 * 60 * 1000));
      DR = Math.pow(DR_base, D);
      DP = DR * OP;
  //     return {"DP":DP,"DR":DR};
      console.log("dr",DR)
      setDiscout(discout.map((item)=>{
        if(item.id===id){
          return {...item,price:DP};
        }else{
          return item;
        }
      }))
 
    }
    function disabledDate(current) {
      return current && current < moment().subtract(1,'day');
    }
    // 获取全部生产方上架的商品信息
    const getAllOrders = ()=>{
        api.getitemList().then((res)=>{
            if(res.data.status===200){
              const data = res.data.data
              setItems(data);
              setDiscout(data.map((item)=>{
                  return {
                    "id":item.id,
                    "price":item.price,
                  }
              }))
            }else{
              setItems([]);
              setDiscout([]);
            }
        });
    }
    useEffect(()=>{
      getAllOrders();
      //判断当前是否含有登录信息，如果没有则将其push到登录页
      let timer = setInterval(()=>{
        const userType = localStorage.getItem("userinfo")?
            JSON.parse(localStorage.getItem("userinfo")).userType
            :
            ""
        if(userType!=="reseller"){
            navigate("/login")
        }
    },2000)
    return ()=>clearInterval(timer)
    },[])
    // 提交申购函数
    const applyForPurchase = (obj)=>{
      let checkTime=new Date((new Date).getTime() + 8*60*60*1000).toJSON().split('T').join(' ').substr(0,19);
      api.postFirstOrderList({
            "itemid":obj.itemid,
            "id": "0x"+sha256(JSON.stringify(checkTime)),
            "orderId": checkTime.substr(2,8).split('-').join('')+Date.now().toString().substr(-8,8),
            "imgUrl": obj.imgUrl,
            "route": "/item",
            "time": checkTime,
            "dealTime": obj.dealTime,
            "supplierId":obj.supplierId,
            "supplierName":obj.supplierName,
            "sellerId": obj.sellerId,
            "sellerName": obj.sellerName,
            "buyerId": JSON.parse(localStorage.getItem("userinfo"))["uid"],
            "buyerName": JSON.parse(localStorage.getItem("userinfo"))["username"],
            "address": "上海市松江区",
            "goodsId": obj.goodsId,
            "goodsNum": obj.goodsNum,
            "goodsName": obj.goodsName,
            "goodsClazz":obj.goodsClazz,
            "originalPrice":obj.originalPrice,
            "price": Number(obj.price),
            "deposit": obj.deposit,
            "ultimatePrice": Number((obj.price*obj.goodsNum).toFixed(2)),
            "discount":((obj.discount*100).toFixed(2))+'%',
            "order_state":0,
            "deal_state":0,
        }).then((res)=>{
          let order =res.data.data;
          let myDate = new Date((new Date).getTime() + 8*60*60*1000);
          let blockTime = myDate.toJSON().split('T').join(' ').substr(0,19);
            // 将当前订单的买卖双方记录下来(生成一级订单的交易记录)
           api.postorderChange({
                "transferId":order.orderId,
                "time": checkTime,
                "sender": obj.sellerName,
                "receiver": JSON.parse(localStorage.getItem("userinfo"))["username"],
                "id": checkTime.substr(1,7).split('-').join('')+Date.now().toString().substr(-7,7),
                "level":"一级订单",
                "category":0,//订单类别，0表示购买，1表示申购
            }).catch(err=>(console.log(err)))
            // 生产区块链部分
            api.getblockChain().then(res=>{
                let chainInfo=res.data.data;
                let prevBlockHash=chainInfo[chainInfo.length-1].id;
                api.postblockChain({
                        "id": '0x'+sha256(String(Date.now())),
                        "txID": order.id,
                        "blockTime":blockTime,
                        "buyerId": order.buyerId,
                        "buyerName": order.buyerName,
                        "sellerId": order.sellerId,
                        "sellerName": order.sellerName,
                        "goodsId": order.goodsId,
                        "checkTime": new Date((new Date).getTime() + 8*60*60*1000).toJSON().split('T').join(' ').substr(0,19),
                        "dealTime": order.dealTime,
                        "prevHash": prevBlockHash
                    }).then(()=>{
                      api.patchitemList({"id":obj.id,"goodsNum":obj.totalGoodsNum- obj.goodsNum}).then(res=>{
                        if(res.data.status===200){
                          message.success("申购成功");
                          getAllOrders();
                        }
                      }).catch(err=>(
                        console.log(err)
                      ))
                    })
            });
        });
    }
    return(
      
        
        <List
              grid={{ gutter: 16, column: 4  }}
              dataSource={items}
              pagination={{
                  onChange: page => {
                    console.log(page);
                  },
                pageSize: 4,
              }}
             renderItem={(item) => (
                <List.Item>
                    <Card title={"商品编号:"+item.id} style={{textAlign:"center"}}>
                        {/* <img src={require("../../../"+item.imgUrl)} style={{width:"100%",aspectRatio:"1/1"}} /> */}
                        <Image width={100}  src={item.imgUrl}/>
                        
                        <div className="fl" ><strong>商品名:</strong>{item.goodsName}</div>
                        <div className="fl" ><strong>供货商:</strong>{item.supplierName}</div>
                        <div className="fl" ><strong>单价(元):</strong><em>¥</em>{item.price.toFixed(2)}</div>
                        <div className="fl"  style={{display:item.goodsNum!==0?"none":""}} >商品库存不足，请等待上架</div>
                      
                        <div  style={{display:item.goodsNum===0?"none":""}}>
                          <div className="fl" ><strong>总件数:</strong>{item.goodsNum}件</div>
                          <div className="fl" ><strong>动态折扣价:</strong><em>¥</em>{(discout.length===0)?"":(discout.find((res)=>{ return (res.id==item.id)}).price).toFixed(2)}</div>
                          <div className="fl" ><strong>申购件数:</strong>
                              <InputNumber
                                  id={item.id}
                                  size="small"
                                  defaultValue={item.goodsNum}
                                  min="1"
                                  max={item.goodsNum}
                              />
                          </div>
                          <div className="fl express"><strong>选择交货日期:</strong></div>      
                          <DatePicker 
                              className="fl "
                              disabledDate={disabledDate}
                              bordered={false}
                              size='small' 
                              allowClear={false}
                              locale={locale}
                              placeholder='请选择送货日期'
                              defaultValue={moment()} 
                              format='YYYY年MM月DD日'
                              onChange={(dateMoment,dateStr)=>DP_algorithm(item.price,item.id,dateMoment)} 
                              inputReadOnly
                          />
                          <Button   disabled={item.goodsNum===0?true:false}
                            style={{
                                  marginTop:"5px",
                                  background: "rgb(38, 33, 117)",
                                  color:"#fff"
                              }}
                            onClick={()=>applyForPurchase({
                              "itemid":item.id,
                              "totalGoodsNum":item.goodsNum, //库存商品数量
                              "dealTime":dealTime,
                              "goodsId": item.goodsId,
                              "goodsNum":Number(document.getElementById(item.id).value),  //选购商品数量
                              "goodsName": item.goodsName,
                              "goodsClazz":item.goodsClazz,
                              "imgUrl": item.imgUrl,
                              "originalPrice": item.price,
                              "price": (discout.length===0)?0:(discout.find((res)=>{ return (res.id==item.id)})).price.toFixed(2),
                              "deposit": 0,
                              // "deposit": item.deposit,
                              "supplierId":item.supplierId,
                              "supplierName":item.supplierName,
                              "sellerId": item.sellerId,
                              "sellerName": item.sellerName,
                              "id":item.id,
                              "discount":(item.price-Number((discout.length===0)?0:(discout.find((res)=>{ return (res.id==item.id)})).price.toFixed(2)))/item.price,
                            })}>立即申购</Button>
                        </div>

                    </Card>
                    
                    <Collapse accordion style={{display:item.goodsClazz==="tea"?"":"none"}}>
                        <Panel header="茶叶详情" key="1">
                        <div className="block" style={{padding:"50px 20px"}}>
                              <h4 style={{lineHeight : 3,fontWeight:"bold",padding:"1px 5px"}} >茶叶溯源信息：  </h4>
                              <ul  className="blockInfo" style={{fontSize:"2px",transform:"scale(0.8)"}} >
                                  <li >出产茶园：</li> 
                                  <li >采摘时间:</li>
                                  <li >出厂日期:</li>
                                  <li >茶园卫星图链接：</li>
                                  <li >茶园图片链接：</li>
                                  <li >茶公司执照图片链接：</li>
                                  <li >六堡茶系列产品链接：</li>
                              </ul>
                              <ul className="blockData" style={{fontSize:"6px",transform:"scale(0.9)"}}>
                                  <li >爱云茶园</li>
                                  <li >2022-04-08 07:38:30</li>
                                  <li >2022-04-10 09:28:11</li>
                                  <li ><a href={require("../../../upload/teagradenPic.jpg")}>点击查看 </a></li>
                                  <li ><a href='https://oss.puercn.com/fit/800/800/we/0/chayou/entry_photos/000/795/530/2.jpg'>点击查看 </a></li>
                                  <li ><a href={require("../../../upload/businessLicense.jpg")}>点击查看</a></li>
                                  <li ><a href='http://wsjkw.gxzf.gov.cn/spaqyyyzs_49672/spaqqybz/spaqqybzbaqgs/P020220706572871369238.pdf'>点击查看</a></li>
                              </ul>
                          </div>
                        </Panel>
                    </Collapse> 
                
                </List.Item>
                
              )}
        />
    
       
        
     
    )
}