import { Space, Table, Tag ,Button,message,Popover,Image} from 'antd';
import React ,{useState,useEffect,Fragment}from 'react';
import { v4 as uuidv4 } from 'uuid';
import api from '../../../api';
import { useNavigate } from 'react-router-dom';

export default function SecondOrder(){
    const navigate = useNavigate()
    const [orders,setOrders] = useState([]);
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
  const [TransferInfo,setTransferInfo] = useState([])
  const [SecondTransferInfo,setSecondTransferInfo] = useState([]);
  

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
          <li>0元</li>
          {/* <li>{(orderInfo.deposit*orderInfo.originalPrice).toFixed(2)}元</li> */}
          <li>{orderInfo.price===orderInfo.originalPrice?<span>当日交付无折扣</span>:<span>{orderInfo.price}元</span>}</li>
          <li>{orderInfo.discount}</li>
          <li>{orderInfo.goodsNum}件</li>
          <li>{orderInfo.ultimatePrice}元</li>
         
      </ul>
     
      </div>
    );
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
     //   交易流程 隐藏页面
     const transferContent = (
      <div className="block">
          <h4 style={{lineHeight : 3,fontWeight:"bold"}} >当前记录（详）：  </h4>
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
              </Fragment>
              :<Fragment></Fragment> 
             
          ))}
      </div>
      
    );
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
              "deposit":0,
              // "deposit":orderData.deposit.toFixed(2),
              "ultimatePrice": orderData.ultimatePrice.toFixed(2),
              "discount":orderData.discount
          })
      });
  }
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
    const getAllOrders =()=>{
      api.getsecondOrderList({
        buyerName:JSON.parse(localStorage.getItem("userinfo")).username,
        deal_state:0,
      }).then((res)=>{
            if(res.data.status===200){
              let data = res.data.data.map((order)=>{
                return ({
                    id:order.id,
                    key: order.key,
                    itemdetail: {
                        "orderId":order.orderId,
                        "imgUrl":order.imgUrl,
                        "name":order.goodsName,
                        "sellerName":order.sellerName,
                        "buyerName":order.buyerName,
                        "time":order.time
                    },
                    applytype:{
                      "order_state": order.order_state,
                      "deal_state": order.deal_state
                    },
                    price: order.price.toFixed(2),
                    num: order.goodsNum,
                    totalprice: (order.price*order.goodsNum).toFixed(2),
                    
                })
              })
              setOrders(data)
            }
    });
    }
    const secondOrderTransfer=(orderId)=>{
        api.getsecondOrderLisId(orderId).then(res=>{
            if(res.data.data.order_state===1)
              message.info("订单正在转让中");
            else{
              api.patchsecondOrderList(orderId).then((res)=>{
                console.log(res.data.data)
                getAllOrders();
                message.success("转让二级订单")
            })
          }
        })
    }
     // 获取所有历史订单交易
     const getSecondTransferInfo=()=>{
      api.getorderChange().then(response=>{
         if(response.data.status===200){
          setSecondTransferInfo(response.data.data);
         }
      });
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
    useEffect(()=>{
        getAllOrders();
        getSecondTransferInfo();
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
    
    const columns = [
      {
        title: '商品详情',
        dataIndex: 'itemdetail',
        key: 'itemdetail',
        render: (itemdetail) =>(<div><div>
         <Image width={100}  src={itemdetail.imgUrl}/>

         {/* <img className="fl" src={require("../../../"+itemdetail.imgUrl)} style={{width:"120px",aspectRatio:'1/1',margin:"0px 0px 0px 66px"}}/> */}
         {/* <a>{require("../../../"+itemdetail.imgUrl)}</a>
         <a>{itemdetail.imgUrl}</a> */}
         <div className="fl" style={{paddingTop:"10px"}}>
        <span  style={{fontWeight:"bold"}}>{itemdetail.name}</span>
          <div style={{transform:"scale(0.7)",padding:"0px"}}>
           卖方：{itemdetail.sellerName}
          </div>
          <div style={{transform:"scale(0.7)"}}>
          买方：{itemdetail.buyerName}
          </div>
          
        </div>
        </div>
        <div  className="fl"  style={{transform:"scale(0.7)",marginLeft:"-35px"}}>订单生成时间：{itemdetail.time}</div>
        <div  className="fl"  style={{transform:"scale(0.7)",marginLeft:"-30px"}}>订单批次号：{itemdetail.orderId}</div>
        </div>),
        align:'center',
      },
      {
        title: '单价（元）',
        dataIndex: 'price',
        key: 'price',
        align:'center',
      },
      {
        title: '数量',
        dataIndex: 'num',
        key: 'num',
        align:'center',
      },
      {
        title: '总价',
        dataIndex: 'totalprice',
        key: 'totalprice',
        align:'center',
      },
      {
        title: '订单类别',
        key: 'ordertype',
        // dataIndex: 'ordertype',
        render: (_, record) => (
         
                <Tag  key={record}>
                  二级订单
                </Tag>
        ),
        align:'center',
      },
      {
        title: '状态',
        key: 'applytype',
        dataIndex: 'applytype',
        render: (applytype, record) => (
          <Space size="middle">
            {applytype.order_state===0?
                    (<Tag color='green' key={record}>申购成功</Tag>
                    ): 
                    (<Tag color='blue' key={record}>二级订单转让中</Tag>)
                  }
          </Space>
        ),
        align:'center',
      },
      {
        title: '操作',
        key: 'action',
        dataIndex:'id',
        render: (id, record) => (
          <Space size="middle" direction="vertical">
           <Popover 
              placement="topRight" 
              content={orderContent} 
              title={<h4 style={{textAlign:"center",fontWeight:"bold"}}>订单详情</h4>} 
              trigger="click" 
              >
                  <Button onClick={()=>showOrderInfo(id)}><strong>订单详情</strong></Button>
              </Popover>
              <Popover 
              placement="topRight" 
              content={blockContent} 
              title={<h4 style={{textAlign:"center",fontWeight:"bold"}}>区块详情</h4>} 
              trigger="click" 
              >
                  <Button onClick={()=>showBlockInfo(id)}><strong>区块详情</strong></Button>
            </Popover>
            <Popover 
              placement="topRight" 
              content={transferContent} 
              title={<h4 style={{textAlign:"center",fontWeight:"bold"}}>交易记录·</h4>} 
              trigger="click" 
              >
                  <Button onClick={()=>showOrderTransfer(id)}><strong>交易记录</strong></Button>
            </Popover>
            <Button onClick={()=>secondOrderTransfer(id)}><strong>二级订单转让</strong></Button>
            {/* <a>Delete</a> */}
          </Space>
        ),
        align:'center',
      },
    ];
    
    return (<Table 
    columns={columns} 
    dataSource={orders}
    rowKey={record=>record.id}
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 5,
    }} />)
}