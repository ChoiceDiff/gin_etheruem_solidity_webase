import { message,Card,Image, List,Button,Popover} from 'antd';
import React ,{useState,useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import 'moment/locale/zh-cn';
import { sha256} from 'js-sha256';
import api from '../../../api';

export default function ItemOrder(){
    const navigate = useNavigate()
    const username = localStorage.getItem("userinfo")?JSON.parse(localStorage.getItem("userinfo")).username:""
    let today = new Date((new Date).getTime() + 8*60*60*1000).toJSON().split('T').join(' ').substr(0,10);
    const [items,setItems] = useState([]);
    const [dealTime,setDealTime]=useState(today);
    const [discout,setDiscout]=useState([]);
    const [blockInfo,setBlockInfo] = useState({
      "id": "0x5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9",
      "blockTime": 0,
      "txID": 0,
      "buyerId": "",
      "buyerName": "",
      "sellerId": "",
      "sellerName": "",
      "goodsId": "MPQ000X0Y",
      "checkTime": 0,
      "dealTime": 0,
      "prevHash": 0
    });
    const blockContent = (
      <div className="block">
        <ul className="blockInfo">
              <li>区块ID</li>
              <li>上链时间</li>
              <li>交易ID</li>
              <li>买方</li>
              <li>卖方</li>
              <li>商品编号</li>
              <li>下单时间</li>
              <li>交付时间</li>
              <li>父区块哈希</li>
          </ul>
          <ul className="blockData">
              <li>{blockInfo.id}</li>
              <li>{blockInfo.blockTime}</li>
              <li>{blockInfo.txID}</li>
              <li>{blockInfo.buyerId}（{blockInfo.buyerName}）</li>
              <li>{blockInfo.sellerId}（{blockInfo.sellerName}）</li>
              <li>{blockInfo.goodsId}</li>
              <li>{blockInfo.checkTime}</li>
              <li>{blockInfo.dealTime===""?"暂定":blockInfo.dealTime}</li>
              <li>{blockInfo.prevHash}</li>
          </ul>
      </div>
    );
    const showBlockInfo = (obj)=>{
      api.getblockChain(obj.id).then(response=>{
          let blockData=response.data.data[0];
          setBlockInfo({
              "id": blockData.id,
              "blockTime": blockData.blockTime,
              "txID": blockData.txID,
              "buyerId": blockData.buyerId,
              "buyerName": blockData.buyerName,
              "sellerId": blockData.sellerId,
              "sellerName": blockData.sellerName,
              "goodsId": blockData.goodsId,
              "checkTime": blockData.checkTime,
              "dealTime": blockData.dealTime,
              "prevHash": blockData.prevHash,
          })
      });
    }
    const getAllOrders=()=>{
      api.getfirstOrderListOrdeState().then((res)=>{
          if(res.data.status===200){
            setItems(res.data.data)
            setDiscout(res.data.data.map((item)=>{
              return {
                "orderId":item.orderId,
                "price":item.price
              }
            }))
          }else{
            setItems([])
          }
      });
    }
    useEffect(()=>{
          //判断当前是否含有登录信息，如果没有则将其push到登录页
          let timer = setInterval(()=>{
            console.log("timer")
              const userType = localStorage.getItem("userinfo")?
                JSON.parse(localStorage.getItem("userinfo")).userType
                :
                ""
              if(userType!=="supplier"){
                  navigate("/login")
              }
          },2000)
          getAllOrders();
          return ()=>clearInterval(timer)
      },[]) 
    const applyForPurchase = (obj)=>{
          let checkTime=new Date((new Date).getTime() + 8*60*60*1000).toJSON().split('T').join(' ').substr(0,19);
          api.getfirstOrderList(obj.id).then((res)=>{
              let order =res.data.data;
              api.postFirstOrderList({
                  ...order,
                  "id":'0x'+sha256(obj.id),
                  "time": new Date((new Date).getTime() + 8*60*60*1000).toJSON().split('T').join(' ').substr(0,19),
                  "price":Number(obj.price),
                  "sellerId": obj.sellerId,
                  "sellerName": obj.sellerName,
                  "buyerId":JSON.parse(localStorage.getItem("userinfo")).uid,
                  "buyerName":username,
                  "order_state":0,
              }).then((res)=>{
                let order=res.data.data;
                let myDate = new Date((new Date).getTime() + 8*60*60*1000);
                let blockTime = myDate.toJSON().split('T').join(' ').substr(0,19);

                // 将当前订单的买卖双方记录下来(一级订单的交易记录)
                api.postorderChange({
                    "id": checkTime.substr(1,7).split('-').join('')+Date.now().toString().substr(-7,7),
                    "transferId":order.orderId,
                    "time": checkTime,
                    "sender": obj.sellerName,
                    "receiver": JSON.parse(localStorage.getItem("userinfo")).username,
                    "level": "一级订单",
                    "category":1,//订单类别，0表示购买，1表示申购
                }).catch(err=>(console.log("orderchange",err)))

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
                          api.deletefirstOrderList(obj.id).then(()=>{
                            getAllOrders();
                            message.success("申购成功");
                          })     
                      })
                });
            })
          });
    }
    return(
        <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={items}
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 4,
        }}
        renderItem={(item,index) => (
          <List.Item>
            <Card title={"批次号:"+item.orderId} key={index}>
              <div>
              <Image width={100}  src={item.imgUrl}/>

                <div style={{marginLeft:"50px",textAlign:"center"}}>
                  <span  style={{fontWeight:"bold"}}>{item.goodsName}</span>
                  
                    <div style={{transform:"scale(0.8)",padding:"0px"}}>
                    转让方：{item.buyerName}
                    </div>
                    <div style={{transform:"scale(0.8)",marginBottom:"15px"}}>
                    类别：一级订单
                    </div>
                  
                  </div>
              </div>
               
              <div>
                  <span><strong>售价:</strong><em>¥</em><i>{item.price.toFixed(2)}</i></span><br/>
                   <span><strong>件数:</strong>{item.goodsNum}件</span><br/>
                   <span><strong>总价:</strong><em>¥</em>{(item.goodsNum*item.price).toFixed(2)}</span><br/>
                   (<span style={{fontSize:"12px"}}>定金:<em>¥</em>{(item.goodsNum*item.originalPrice*item.deposit).toFixed(2)}</span>)
               </div>
                <div style={{textAlign:"center"}}>
                  <Button 
                      size="small"
                      style={{
                          marginTop:"5px",
                          background: "rgb(38, 33, 117)",
                          color:"#fff"
                      }}
                      onClick={()=>applyForPurchase({
                        "id":item.id,
                        "sellerId": item.buyerId, 
                        "sellerName": item.buyerName,
                        "ultimatePrice":(discout.length===0)?"":(discout.find((res)=>{ return (res.orderId==item.orderId)}).price*item.goodsNum).toFixed(2),
                        "price":(discout.length===0)?0:discout.find((res)=>{ return (res.orderId==item.orderId)}).price.toFixed(2),
                        // "goodsNum":Number(document.getElementById(item.id).value),(discout.find((res)=>{ return (res.orderId==item.orderId)}).price*item.goodsNum).toFixed(2)}
                      })}
                    > 
                      立即申购
                    </Button>
                    <Popover 
                        
                          placement="right" 
                          content={blockContent} 
                          title={<h4   style={{textAlign:"center",fontWeight:"bold"}}>区块详情</h4>} 
                          trigger="click" 
                    >
                      <Button 
                        size="small"
                        style={{
                          marginTop:"5px",
                          background: "rgb(38, 33, 117)",
                          color:"#fff"
                        }}
                        onClick={()=>showBlockInfo({
                          "id":item.id,
                        })}>区块信息</Button>
                    </Popover>
                </div>
            </Card>
          </List.Item>
        )}
      />
    )
}