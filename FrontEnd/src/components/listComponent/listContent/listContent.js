import React ,{useState,useEffect}from 'react';
import './listContent.css';
import { message } from 'antd';
import {Image} from 'antd';
import 'moment/locale/zh-cn';
import { sha256} from 'js-sha256';
import { Link,useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import api from '../../../api';

export default function ListContent() {
    const {goodsClazz} = useParams()
    const navigate = useNavigate();
    const username = localStorage.getItem("userinfo")
                    ? JSON.parse(localStorage.getItem("userinfo")).username
                    :""
    let today = new Date((new Date).getTime() + 8*60*60*1000).toJSON().split('T').join(' ').substr(0,10);
    //存储交易时间
    const [dealTime,setDealTime]=useState(today);
    // items存储goodsList中的数据
    const [items,setItems] = useState([]);
    // orders存储二级订单
    const [orders,setOrders] = useState([]);
    // 存储当前状态
    const [select,setSelect] = useState('item');
    // 存储动态折扣
    const [discout,setDiscout]=useState([]);

    const getAllOrders=()=>{
        api.getsecondOrderListOrderState().then((res)=>{
            if(res.data.status===200){
                setOrders(res.data.data);
                setDiscout(res.data.data.map((item)=>{
                    return {
                    "orderId":item.orderId,
                    "price":item.price
                    }
                }))
            }

    });
    }
    // 当前商品列表种类
    useEffect(()=>{
        getAllOrders();
        api.getgoodsList().then((res)=>{
            setItems(res.data.data)
        });
        let timer = setInterval(()=>{
            const userType = localStorage.getItem("userinfo")?
                JSON.parse(localStorage.getItem("userinfo")).userType
                :
                ""
            if(userType!=="consumer"){
                message.error("请先登录消费者账户！")
                navigate("/login")
            }
        },2000)
        return ()=>clearInterval(timer)
    },[]);
    //执行购买二级订单函的数
    const applyForPurchase = (obj)=>{
        let checkTime=new Date((new Date).getTime() + 8*60*60*1000).toJSON().split('T').join(' ').substr(0,19);
        api.getsecondOrderLisId(obj.id).then((res)=>{
            let order =res.data.data;
            api.postsecondOrderList({
                ...order,
                "id":'0x'+sha256(obj.id)+2,
                "time": new Date((new Date).getTime() + 8*60*60*1000).toJSON().split('T').join(' ').substr(0,19),
                "sellerId": obj.sellerId,
                "sellerName": obj.sellerName,
                "buyerId":JSON.parse(localStorage.getItem("userinfo")).uid,
                "buyerName":username,
                "order_state":0,
                "deal_state":0,
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
                    "transferId":order.orderId,
                    "time": checkTime,
                    "sender": obj.sellerName,
                    "receiver": username,
                    "id": checkTime.substr(1,7).split('-').join('')+Date.now().toString().substr(-7,7),
                    "level":"二级订单",
                    "category":category//订单类别，0表示购买，1表示申购
                }).then(()=>{
                    api.deletefirstOrderList(order.firstOrderId).then((res)=>{
                        console.log(res)
                    }).catch(err=>(console.log(err)))
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
                    api.deletesecondOrderList(obj.id).then((res)=>{
                        console.log(res)
                        getAllOrders();
                        message.success("申购成功")
                    })
                  })
          });
         
        })
  
       
      });
    }
  return (
    <div>
        <li style={{float: "right",marginRight:"10%"}}>
            <Link to='/order'>我的订单</Link>
        </li>
    {/* 列表页头部部分 */}
        <nav className="sk-nav">
                <div className="w">
                    <div className="sk_list">
                        <ul>
                            <li><a onClick={()=>{setSelect("item")}}>商品申购</a></li>
                            <li><a onClick={()=>{setSelect("order")}}>订单申购</a></li>
                            {/* <li><a href="#">超值低价</a></li> */}
                        </ul>
                    </div>
                    {/* 头部链接 */}
                    <div className="sk_con">
                        <ul>
                            <li><a href="#">收纳</a></li>
                            <li><a href="#" className="style_blue">床垫</a></li>
                            <li><a href="#">床单</a></li>
                            <li><a href="#">被罩</a></li>
                            <li><a href="#">枕头</a></li>
                            <li><a href="#">席梦思</a></li>
                            <li><a href="#">棉绒被</a></li>
                            <li><a href="#">灯具照明</a></li>
                            <li><a href="#">更多分类</a></li>
                        </ul>
                    </div>
                </div>
        </nav>
            {/* <!-- nav模块制作 end -->
    <!-- 主体部分 start --> */}
        <div className="w sk_container">
            <div className="many-goods-list">
                <ul className="yui3-g">     
                    {select==="item"?
                        orders.map((item,index)=>{
                            if(item.goodsClazz===goodsClazz){
                                return (<li className="yui3-u-1-5" key={index} >
                                        <div className="p-img">
                                        {/* <Link to={`/item/${item.id}`} ><img src={require("../../../"+item.imgUrl)} style={{width:'288px',height:'242px'}} /></Link> */}
                                            <Image width={100}  src={item.imgUrl}/>
                                            {/* <img src={require("../../../"+item.imgUrl)} style={{width:'288px',height:'242px'}} /> */}
                                        </div>
                                        <div className="attr"><em>{item.goodsName}（{item.description}）</em></div>
                                        <div >
                                            <strong className="price"><em>¥</em><i>{item.price}</i></strong>
                                            <span style={{marginLeft:"5px",fontSize:"12px",fontWeight:"bold"}}></span>
                                        </div>
                                        <div className="sold">
                                            <span>正在销售</span>
                                            <img  
                                                style={{display:'inline'}} 
                                                src={require("../../../upload/state_07.png")} 
                                                alt=""
                                            />
                                            <span>
                                                总共{item.goodsNum}件
                                            </span>
                                        </div>
                                        <div className="operate">
                                            {/* <Link to={`/item/${item.id}`} ><button>立即购买</button></Link> */}
                                            <button onClick={()=>applyForPurchase({
                                                            "id":item.id,
                                                            "sellerId": item.buyerId,
                                                            "sellerName": item.buyerName,
                                                            "ultimatePrice":(discout.length===0)?"":(discout.find((res)=>{ return (res.orderId==item.orderId)}).price*item.goodsNum).toFixed(2),
                                                            "price":(discout.length===0)?0:discout.find((res)=>{ return (res.orderId==item.orderId)}).price.toFixed(2),
                                                            "dealTime":dealTime,
                                                            "discount":(item.price-Number((discout.length===0)?0:(discout.find((res)=>{ return (res.orderId==item.orderId)})).price.toFixed(2)))/item.price,
                                                            })
                                                        }>立即购买</button>
                                        </div>
                                    </li>
                            )}
                            
                        })
                        :
                        orders.map((order,index)=>{
                            if(order.goodsClazz===goodsClazz){
                                return (<li className="yui3-u-1-5" key={index}>
                                            <div className="p-img">
                                                <a ><Image width={100}  src={order.imgUrl}/></a>
                                            </div>
                                            <div style={{fontSize:"15px"}}><strong>批次号：</strong><em>{order.orderId}</em></div>
                                            <div style={{fontSize:"15px"}}><strong>转让方:</strong>{order.buyerName}</div>
                                            <div style={{fontSize:"15px"}}><strong>商品名：</strong><em>{order.goodsName}</em></div>
                                            <div style={{fontSize:"15px"}}>
                                                <strong >价格：</strong><em>¥</em><i>{order.price.toFixed(2)}</i>
                                            </div>
                                        
                                            <div style={{fontSize:"15px"}}><strong>件数：</strong>{order.goodsNum}件</div>
                                            <div style={{fontSize:"15px"}}><strong>总价：</strong><em>¥</em>{(order.goodsNum*order.price).toFixed(2)}</div>      
                                            <div className="operate">
                                                <a>
                                                    <button  
                                                        onClick={()=>applyForPurchase({
                                                            "id":order.id,
                                                            "sellerId": order.buyerId,
                                                            "sellerName": order.buyerName,
                                                            "ultimatePrice":(discout.length===0)?"":(discout.find((res)=>{ return (res.orderId==order.orderId)}).price*order.goodsNum).toFixed(2),
                                                            "price":(discout.length===0)?0:discout.find((res)=>{ return (res.orderId==order.orderId)}).price.toFixed(2),
                                                            "dealTime":dealTime,
                                                            "discount":(order.price-Number((discout.length===0)?0:(discout.find((res)=>{ return (res.orderId==order.orderId)})).price.toFixed(2)))/order.price,
                                                            })
                                                        }>
                                                        立即申购
                                                    </button>
                                                </a>
                                            </div>
                                        </li>
                                )
                            }
                        })
                    }
                </ul>
        {/* 列表页 尾部 */}
        </div>
            <div className="page">
                <div className="sui-pagination pagination-large">   
                    <ul>
                        <li className="prev disabled"><a href="#">«上一页</a></li>
                        <li className="active"><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li className="dotted"><span>...</span></li>
                        <li className="next"><a href="#">下一页»</a></li>
                    </ul>
                    <div>
                        <span>共10页</span>
                        <span>到第 <input type="text" className="page-num"/> 页 </span>
                        <span><button className="page-confirm" style={{padding:'7px 16px' ,border:'1px solid rgb(221, 221, 221)'}}>确定</button></span>
                    </div>
                </div>
            </div>
        </div>
           
    </div>
  )
}
