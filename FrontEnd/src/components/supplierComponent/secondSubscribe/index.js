import { message,Card, List,Button,Popover,Image } from 'antd';
import React ,{useState,useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import { DatePicker} from 'antd';
import  moment from 'moment';
import 'moment/locale/zh-cn';
import { sha256} from 'js-sha256';
import locale from 'antd/es/date-picker/locale/zh_CN';
import api from '../../../api';
export default function ItemOrder(){
    const navigate = useNavigate()
    const username = localStorage.getItem("userinfo")?JSON.parse(localStorage.getItem("userinfo")).username:""
    const [items,setItems] = useState([]);
    let today = new Date((new Date).getTime() + 8*60*60*1000).toJSON().split('T').join(' ').substr(0,10);
    const [dealTime,setDealTime]=useState(today);
    const [discout,setDiscout]=useState([]);
    const [blockInfo,setBlockInfo] = useState({
      "id": "0x5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9",
      "blockTime": "2022-10-18 10:25:01",
      "txID": "0x54a61c542e7692c3d69cfed05e83b2407affa20c488bd26db870b90c85eff3f138",
      "buyerId": "spl1666055130505",
      "buyerName": "上海斐华服饰制造有限公司",
      "sellerId": "rsl1666055110123",
      "sellerName": "长湘织旗舰店",
      "goodsId": "MPQ000X0Y",
      "checkTime": "2022-10-18 10:25:01",
      "dealTime": "2022-10-18",
      "prevHash": "0xd2e8e888b0ad1d87a9103553b5ab2f014a7fd632bbd418b9da42d7837984abb9"
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
        {/* <p>区块号: {blockInfo.id}</p>
        <p>出块时间: {blockInfo.time}</p>
        <p>交易树根哈希: {blockInfo.rootHash}</p>
        <p>父区块根哈希: {blockInfo.prevHash}</p> */}
      </div>
    );
    const showBlockInfo = (obj)=>{
      
          api.getblockChain(obj.id)
          .then(response=>{
            console.log(response)
              if(response.data.status===200){
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
              }
          });
     }
    function DP_algorithm(price,orderId,date1) {
      console.log(orderId);
      setDealTime(date1.format('YYYY-MM-DD'));
      var DP, OP = price, DR;
      var R = 0.001,AR = 0.2,D; //D>=1&&D<=1825
      var preDate = Date.now();
      var date = Date.parse(date1);
      var DR_base = 1 - R * (1 + AR);
      D = Math.ceil((date - preDate) / (1 * 24 * 60 * 60 * 1000));
     
      DR = Math.pow(DR_base, D);
      
      DP = DR * OP;
  //     return DP;
      console.log(DP)
      setDiscout(discout.map((item)=>{
        if(item.orderId===orderId){
          return {...item,price:DP};
        }else{
          return item;
        }
      }))
 
    }
    function disabledDate(current) {
      // Can not select days before today and today
      // return current && current < moment().endOf('day');
      return current && current < moment().subtract(1,'day');
    }
    const getAllOrders=()=>{
      api.getsecondOrderListOrderState().then((res)=>{
         if(res.data.status===200){
            setItems(res.data.data);
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
    const dynamicComparison=(id,price)=>{
      let dynamicInfo = discout.find((res)=>{ 
        return (res.orderId===id)
      })
      return dynamicInfo ?((dynamicInfo.price===price)?true:false ):true
    }
    useEffect(()=>{
      getAllOrders();
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
    },[]);
    const applyForPurchase = (obj)=>{
        let checkTime=new Date((new Date).getTime() + 8*60*60*1000).toJSON().split('T').join(' ').substr(0,19);
        api.getsecondOrderLisId(obj.id).then((res)=>{
            let order =res.data.data;
            api.postsecondOrderList({
                ...order,
                "id":'0x'+sha256(obj.id)+Math.ceil(Math.random()*10)+8,
                "time": new Date((new Date).getTime() + 8*60*60*1000).toJSON().split('T').join(' ').substr(0,19),
                "price":Number(obj.price),
                "ultimatePrice":Number(obj.ultimatePrice),
                "sellerId": obj.sellerId,
                "sellerName": obj.sellerName,
                "buyerId":JSON.parse(localStorage.getItem("userinfo")).uid,
                "buyerName":username,
                "order_state":0,
                "deal_state":0,
                "dealTime": obj.dealTime,
                "discount": (( (parseFloat(order.discount.replace('%',''))/100+parseFloat(obj.discount))*100)).toFixed(2)+'%',
            }).then((res)=>{
                  let order=res.data.data;
                  let myDate = new Date((new Date).getTime() + 8*60*60*1000);
                  let blockTime = myDate.toJSON().split('T').join(' ').substr(0,19);
                  let category=0;
                  api.getorderChange().then(res=>{
                      for(let item of res.data.data){
                          if(item['transferId']===order.orderId&&item['level']==="二级订单"){
                            category=1;
                          }
                      }
                  })
                  // 将当前订单的买卖双方记录下来(二级订单的交易记录)
                  api.postorderChange({
                    "id": checkTime.substr(1,7).split('-').join('')+Date.now().toString().substr(-7,7),
                    "transferId":order.orderId,
                    "time": checkTime,
                    "sender": obj.sellerName,
                    "receiver": username,
                    "level": "二级订单",
                    "category":category,//订单类别，0表示购买，1表示申购
                  }).then(()=>{
                     api.deletefirstOrderList(order.firstOrderId).catch(err=>(console.log(err)))
                  }).catch(err=>(console.log("orderchange",err))).catch(err=>(console.log("orderchange",err)))
          
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
                  api.deletesecondOrderList(obj.id).then((res)=>{
                      console.log(res)
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
            <Card title={"批次号:"+item.orderId}>
              <div>
                <Image width={100}  src={item.imgUrl}/>
                <div style={{marginLeft:"50px",textAlign:"center"}}>
                  <span  style={{fontWeight:"bold"}}>{item.goodsName}</span>
                    <div style={{transform:"scale(0.8)",padding:"0px"}}>
                    转让方：{item.buyerName}
                    </div>
                    <div style={{transform:"scale(0.8)",marginBottom:"15px"}}>
                    类别：二级订单
                    </div>
                  
                  </div>
              </div>
               
              <div>
                  <span><strong>售价:</strong><em>¥</em><i>{item.price.toFixed(2)}</i></span><br/>
                   <span><strong>件数:</strong>{item.goodsNum}件</span><br/>
                   <span><strong>总价:</strong><em>¥</em>{(item.goodsNum*item.price).toFixed(2)}</span><br/>
                   (<span style={{fontSize:"12px"}}>定金:<em>¥</em>{(item.goodsNum*item.originalPrice*item.deposit).toFixed(2)}</span>)
               </div>
               <div className="fl express"style={{display:dynamicComparison(item.orderId,item.price )?"none":""}}><strong>动态折扣价:</strong><em>¥</em>{(discout.length===0)?"":(discout.find((res)=>{ return (res.orderId==item.orderId)}).price*item.goodsNum).toFixed(2)}</div>
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
                                onChange={(dateMoment,dateStr)=>DP_algorithm(item.price,item.orderId,dateMoment)} 
                                inputReadOnly
                                // open={open_val.isOpen}
                                // onOpenChange={(val)=> {
                                //     console.log(val)
                                //     setOpen({isOpen:val})
                                // }}
                                
                                 />
                                
                                    
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

                    "dealTime":dealTime,
                    // "goodsNum":Number(document.getElementById(item.id).value),(discout.find((res)=>{ return (res.orderId==item.orderId)}).price*item.goodsNum).toFixed(2)}
                    "discount":(item.price-Number((discout.length===0)?0:(discout.find((res)=>{ return (res.orderId==item.orderId)})).price.toFixed(2)))/item.price,
                  })}>立即申购</Button>
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