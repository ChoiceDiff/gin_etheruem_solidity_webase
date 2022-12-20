import React, { useState,useEffect, Fragment } from 'react'
import { Button, Popover,message,Image} from 'antd';
import './main.css';
import { v4 as uuidv4 } from 'uuid';
import api from"../../../api"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
export default function Main() {
    
    const navigate = useNavigate()
    const username = localStorage.getItem("userinfo")
                    ? JSON.parse(localStorage.getItem("userinfo")).username
                    :""
    const [order,setOrder] = useState([]);
    const [orderInfo,setOrderInfo] = useState({
        "orderId": "",
        "goodsId": "",
        "goodsNum": 0,
        "goodsName": "",
        "time": "",
        "dealTime": "",
        "sellerId": "",
        "sellerName": "",
        "buyerId": "",
        "buyerName": "",
        "supplierId": "",
        "supplierName": "",
        "address": "",
        "originalPrice":0,
        "deposit":0,
        "price": 0,
        "ultimatePrice": 0,
        "discount": ""
    });
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
    const [TransferInfo,setTransferInfo] = useState([])
    const [SecondTransferInfo,setSecondTransferInfo] = useState([]);
    
    
    // 订单详情隐藏页面
      const orderContent = (
        <div className="tx">
         <ul className="txInfo">
            <li>订单批次号</li> 
            <li>商品编号</li>
            <li>商品名称</li>
            <li>下单时间</li>
            <li>交付时间</li>
            <li>买家ID</li>
            <li>买家名称</li>
            <li>卖家ID</li>
            <li>卖家名称</li>
            <li>生产商ID</li>
            <li>生产商名称</li>
            <li>配送地址</li>
            <li>原价</li>
            <li>定金</li>
            <li>折扣价</li>
            <li>折扣率</li>
            <li>商品数量</li>
            <li>成交价</li>
           
        </ul>
        <ul className="txData">
            <li>{orderInfo.orderId}</li>
            <li>{orderInfo.goodsId}</li>
            <li>{orderInfo.goodsName}</li>
            <li>{orderInfo.time}</li>
            <li>{orderInfo.dealTime===""?"暂定":orderInfo.dealTime}</li>
            <li>{orderInfo.buyerId}</li>
            <li>{orderInfo.buyerName}</li>
            <li>{orderInfo.sellerId}</li>
            <li>{orderInfo.sellerName}</li>
            <li>{orderInfo.supplierId}</li>
            <li>{orderInfo.supplierName}</li>
            <li>{orderInfo.address}</li>
            <li>{orderInfo.originalPrice}元</li>
            {/* <li>{(orderInfo.deposit*orderInfo.originalPrice).toFixed(2)}元</li> */}
            <li>0 元</li>
            <li>{orderInfo.price===orderInfo.originalPrice?<span>当日交付无折扣</span>:<span>{orderInfo.price}元</span>}</li>
            <li>{orderInfo.discount}</li>
            <li>{orderInfo.goodsNum}件</li>
            <li>{orderInfo.ultimatePrice}元</li>
           
        </ul>
       
        </div>
      );
    //   区块信息隐藏页面
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
    //   交易流程 隐藏页面
      const transferContent = (
        <div className="block">
            <ul className="blockInfo">
                <li>订单号：</li> 
                <li>交易ID</li>
                <li>订单类型：</li>
                <li>拥有者：</li>
                <li>买方：</li>
                <li>卖方：</li>
                <li>下单时间：</li>
                <li>定价：</li>
                <li>交易价：</li>
                <li>折扣率：</li>
                <li>产品来源：</li>
                {
                TransferInfo.goodsClazz==="tea"?<>
                  <li>出产茶园：</li>
                  <li>采摘时间：</li>
                  <li>出厂日期：</li>
                  <li>茶园图片链接：</li>
                  <li>执照图片链接：</li>
                  <li>茶园卫星图链接：</li>
                  <li>茶园图片链接：</li>
                  <li>茶公司执照图片链接：</li>
                  <li>六堡茶系列产品链接：</li>
                </>:<></>
              }
            </ul>
            <ul className="blockData">
                <li>{TransferInfo.orderid}</li>
                <li>{TransferInfo.id}</li>
                <li>{(TransferInfo.level)}</li>
                <li>{TransferInfo.client}</li>
                <li>{TransferInfo.client}</li>
                <li>{TransferInfo.store}</li>
                <li>{TransferInfo.time}</li>
                <li>{TransferInfo.price}</li>
                <li>{TransferInfo.ultimatePrice}</li>
                <li>{TransferInfo.discountRate}</li>
                <li>{TransferInfo.generateFrom}</li>   
                {
                TransferInfo.goodsClazz==="tea"?<>
                  <li>{TransferInfo.teaGarden}</li>
                  <li>{TransferInfo.pickTime}</li>
                  <li>{TransferInfo.leaveFactoryTime}</li>
                  <li><a href={require("../../../upload/teagradenPic.jpg")}>点击查看 </a></li>
                  <li><a href={TransferInfo.licensedPhotosUrl}>点击查看</a></li>
                  <li><a href={require("../../../upload/teagradenPic.jpg")}>点击查看 </a></li>
                  <li><a href='https://oss.puercn.com/fit/800/800/we/0/chayou/entry_photos/000/795/530/2.jpg'>点击查看 </a></li>
                  <li><a href={require("../../../upload/businessLicense.jpg")}>点击查看</a></li>  
                  <li><a href='http://wsjkw.gxzf.gov.cn/spaqyyyzs_49672/spaqqybz/spaqqybzbaqgs/P020220706572871369238.pdf'>点击查看</a></li>  
                </>:<></>
              }     
            </ul>
            <h4 style={{lineHeight : 3,fontWeight:"bold"}} >交易记录：</h4>
            {  SecondTransferInfo.map((res)=> (
              TransferInfo.orderid === res.transferId ?
              <Fragment key={uuidv4()}> <li key={uuidv4()}> {res.category===0 ?"订单生成":"订单转让"} &nbsp;&nbsp;({res.level})  &nbsp;&nbsp;  &nbsp;&nbsp;{res.time}</li>
                  <li> {res.category===0 ?"商家":"转出人"}:&nbsp;&nbsp;{res.sender} &nbsp;&nbsp;  {res.category===0 ?"买家":"接收人"}:&nbsp;&nbsp;{res.receiver}</li>
                   <li key={uuidv4()}> {res.category===0 ?"购买序号":"转让序号"}：&nbsp;&nbsp;{res.id}</li>
                  <li>{''}</li>
              </Fragment>
              :<Fragment></Fragment>   
               
            ))}
        </div>
        
      );
    //   订单详情信息获取
      const showOrderInfo = (id)=>{
        api.getsecondOrderLisId(id).then(response=>{
            let orderData=response.data.data;
            setOrderInfo({
                "orderId": orderData.orderId,
                "goodsId": orderData.goodsId,
                "goodsNum": orderData.goodsNum,
                "goodsName": orderData.goodsName.split('（')[0],
                "time": orderData.time,
                "dealTime": orderData.dealTime,
                "sellerId": orderData.sellerId,
                "sellerName": orderData.sellerName,
                "buyerId": orderData.buyerId,
                "buyerName": orderData.buyerName,
                "supplierId": orderData.supplierId,
                "supplierName": orderData.supplierName,
                "address": orderData.address,
                "originalPrice": orderData.originalPrice.toFixed(2),
                "price": orderData.price.toFixed(2),
                // "deposit":orderData.deposit.toFixed(2),
                "ultimatePrice": orderData.ultimatePrice.toFixed(2),
                "discount":orderData.discount
            })
        });
    }
    // 区块详情信息获取
    const showBlockInfo = (id)=>{
        api.getblockChain(id).then(response=>{
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
    // 获取所有订单
    const getAllOrders=()=>{
        let role =username;
        api.getsecondOrderListBuyerNameOrderState(role).then((res)=>{
           if(res.data.status===200){
            setOrder(res.data.data); 
           } 
        });
    }
    // 获取所有历史订单交易
    const getSecondTransferInfo=()=>{
        api.getorderChange().then(response=>{
            if(response.data.status===200){
                setSecondTransferInfo(response.data.data);
            }
        });
    }
    const secondOrderTransfer=(orderId)=>{
        api.getsecondOrderLisId(orderId).then(res=>{
        if(res.data.data.order_state===1)
            message.info("订单正在转让中");
        else
        {
            api.patchsecondOrderList(orderId).then((res)=>{
                getAllOrders();
                message.success("转让二级订单")
            })
        }
        })
    }
    // 获取订单交易
    const showOrderTransfer = (id)=>{
        api.getsecondOrderLisId(id).then(response=>{
            const order=response.data.data;
            setTransferInfo({
                "id":order.id,
                "orderid":order.orderId,
                "level":"二级订单",
                "client":order.buyerName,
                "store":order.sellerName,
                "time":order.time,
                "price":order.price,
                "ultimatePrice":order.ultimatePrice,
                "discountRate":order.discount,
                "generateFrom":order.supplierName,
                "pickTime": order.pickTime,
                "leaveFactoryTime": order.leaveFactoryTime,
                "teaGarden": order.teaGarden,
                "licensedPhotosUrl": order.licensedPhotosUrl,
                "teaGardenPic":order.teaGardenPic,
                "goodsClazz":order.goodsClazz 
            })            
        }).catch((error)=>{
            setTransferInfo([]);
            console.log(error);
        })
    }
    //钩子函数didMount
    useEffect(()=>{
        getAllOrders();
        getSecondTransferInfo();
        let timer = setInterval(()=>{
            const userType = localStorage.getItem("userinfo")?
                JSON.parse(localStorage.getItem("userinfo")).userType
                :
                ""
            if(userType!=="consumer"){
                navigate("/login")
            }
        },2000)
        return ()=>clearInterval(timer)

    },[])
    // 渲染界面
  return (
    <div>
      <div className="goods-container w">
        <div className="allgoods">
            <h4>全部订单</h4>
            {/* <Table columns={columns} dataSource={data} /> */}
            <div className="cart-main">
                <div className="order-th clearfix">
                    <div className="">商品详情</div>
                    <div className="">单价（元）</div>
                    <div className="">数量</div>
                    <div className="">商品操作</div>
                    <div className="">实付款</div>
                    <div className="">交易状态</div>
                    <div className="">交易操作</div>
                </div>
                <div className="cart-title clearfix">
                    <h5 className="fl">蚝饷自营</h5>
                   
                </div>
                <div className="cart-item-list">
                    <div className="cart-body">
                        <div className="cart-list">
                        {
                            order.map((res,index)=>{
                                return <div key={index}>
                                    <h4 className="order-number">
                                        <span style={{fontWeight:'bold'}}>订单批次号: </span>
                                        <span>{res.orderId}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                                        <span style={{fontWeight:'bold'}}>交易时间: </span> 
                                        <span>{res.time}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                                        <span style={{fontWeight:'bold'}}>交货时间: </span> 
                                        <span>{res.dealTime===""?"暂定":res.dealTime}</span> 
                                        <div className="fr"><span style={{fontWeight:'bold'}}>上链状态: </span> 
                                        {/* {res.onChain=='等待上链'?<span style={{color:'red'}}>{res.onChain}</span>:<span style={{color:'green'}}>{res.onChain}</span>} */}
                                        <span style={{color:'green'}}>已上链</span>
                                        </div>
                                    </h4>
                            <ul className="goods-list yui3-g">
                           
                                <li className="yui3-u-3-8">
                                    <div className="order-good-item">
                                        
                                        <div className="item-img">
                                            {/* <img alt="" src={require("../../../"+res.imgUrl)}/> */}
                                            <Image width={100}  src={res.imgUrl}/>
                                        </div>
                                        <div className="item-order-msg">
                                        <strong style={{fontSize:"15px"}}>{res.goodsName.split('（')[0]}</strong>
                                        <div><strong>卖方：{res.sellerName}</strong></div>
                                        <div><strong>买方：{res.buyerName}</strong></div>
                                        </div>
                                    </div>
                                </li>
                                
                                <li className="yui3-u-1-8">
                                    <span className="price">{res.price.toFixed(2)}</span>
                                </li>
                                <li className="yui3-u-1-8">
                                    <div className="sum">
                                       {res.goodsNum}
                                    </div>
                                </li>
                                <li className="yui3-u-1-8">
                                    <div className="services">
                                        <a href="#none">申请售后</a>
                                    </div>
                                    <div className="complain">
                                        <a href="#none">投诉卖家</a>
                                    </div>
                                </li>
                                {/* 实付款 */}
                                <li className="yui3-u-1-8">
                                    <span className="price">{res.ultimatePrice.toFixed(2)}</span>
                                </li>
                                <li className="yui3-u-1-8">
                                    <strong>{res.order_state===0?"交易成功":"订单转让中"}</strong>
                                    <br/>
                                    <span>
                                    <Popover 
                                        placement="topRight" 
                                        content={orderContent} 
                                        title={<h4 style={{textAlign:"center",fontWeight:"bold"}}>订单详情</h4>} 
                                        trigger="click" 
                                        >
                                            <a href="/#" onClick={()=>showOrderInfo(res.id)}>订单详情</a>
                                        </Popover>
                        
                                    </span>
                                    <br/>
                                    <span>
                                        <Popover 
                                        placement="topRight" 
                                        content={blockContent} 
                                        title={<h4 style={{textAlign:"center",fontWeight:"bold"}}>区块详情</h4>} 
                                        trigger="click" 
                                        >
                                            <a href='/#' onClick={()=>showBlockInfo(res.id)}>区块详情</a>
                                        </Popover>
                                    </span>
                                    
                                    <br/>
                                    <span>物流信息</span>
                                    <br/>
                                </li>
                                <li className="yui3-u-1-8">
                                    <div className="delete">
                                        <a href="#none">删除订单</a>
                                    </div>
                                    {/* <div className="comment">
                                        <a href="#none">追加评论</a>
                                    </div> */}
                                    <div className="second—transfer">
                                        <a href='#' onClick={()=>secondOrderTransfer(res.id)}>二级订单转让</a>
                                    </div>
                                    <div className="buy-again">
                                        <Link to={res.route} target="_blank">再次购买</Link>
                                    </div>
                                  
                                </li>
                                
                                <Popover 
                                        placement="topRight" 
                                        content={transferContent} 
                                        title={<h4 style={{textAlign:"center",fontWeight:"bold"}}>交易详情</h4>} 
                                        trigger="click" 
                                        >
                                            <Button onClick={()=>showOrderTransfer(res.id,res.orderId)}>交易记录</Button>
                                  </Popover>
                            </ul>
                        </div>})
                        } 
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    
    </div>
   
  )}


