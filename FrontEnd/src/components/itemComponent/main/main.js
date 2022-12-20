import React ,{useState,useEffect}from 'react'
import './main.css'
import  moment from 'moment';
import { DatePicker} from 'antd';
import { sha256} from 'js-sha256';
import { message } from 'antd';
import 'moment/locale/zh-cn';
import { useParams } from "react-router-dom";
import axios from 'axios';
import locale from 'antd/es/date-picker/locale/zh_CN';
// import Login from '../../loginComponent';

export default function Main(props) { 
    // window.scrollTo(0,0);
    // 计算动态折扣
    const username = localStorage.getItem("userinfo")
                    ? JSON.parse(localStorage.getItem("userinfo")).username
                    :""
    let today = new Date((new Date).getTime() + 8*60*60*1000).toJSON().split('T').join(' ').substr(0,10);
    
    // const [open_val,setOpen]=useState({isOpen:false});
    const [dealTime,setDealTime]=useState(today);
    const [price,setPrice]=useState(0);
    const [itemNum,setItemNum]=useState(1);
    const [itemDetail,setItemDetail]=useState({
        'id': "",
        'imgUrl': "",
        'price':0,
        'key': 0,
        'deposit':0,
        "goodsId": "",
        "goodsNum": 0,
        "goodsName":"",
        "supplierId":"",
        "supplierName":"",
        "sellerId": "",
        "sellerName": "",
    })
    const params = useParams();
    useEffect(()=>{
        console.log("params.id",params.id   )
        axios.get('http://127.0.0.1:8000/goodsList',{
            params:{
                "id": params.id,
            }
        }).then((res)=>{
            console.log(res)
            let data=res.data.data[0];
            setItemDetail(data);
            setPrice(data.price);
        })
    },[]);
   
    
    // 高优惠
    function DP_algorithm_high(date1) {
        console.log(date1.format('YYYY-MM-DD'));
        setDealTime(date1.format('YYYY-MM-DD'));
        var DP, OP = 40000, DR;
        var R = 0.001,AR = 0.2,D; //D>=1&&D<=1825
        var preDate = Date.now();
        var date = Date.parse(date1);
        var DR_base = 1 - R * (1 + AR);
        D = Math.ceil((date - preDate) / (1 * 24 * 60 * 60 * 1000));
       
        DR = Math.pow(DR_base, D);
        
        DP = DR * OP;
    //     return DP;
        console.log(DR)
        setPrice(DP)
   
    }
    // 中优惠
    function DP_algorithm_middle(date1) {
        console.log(date1.format('YYYY-MM-DD'));
        setDealTime(date1.format('YYYY-MM-DD'));
        var DP, OP = 3900, DR;
        var R = 0.0005,AR = 0.15,D; //D>=1&&D<=1825
        var preDate = Date.now();
        var date = Date.parse(date1);
        var DR_base = 1 - R * (1 + AR);
        D = Math.ceil((date - preDate) / (1 * 24 * 60 * 60 * 1000));
        DR = Math.pow(DR_base, D);
        DP = DR * OP;
    //     return DP;
       
        setPrice(DP)
   
    }
    // 低优惠
    function DP_algorithm_low(date1) {
        console.log(date1.format('YYYY-MM-DD'));
        setDealTime(date1.format('YYYY-MM-DD'));
        var DP, OP = 599, DR;
        var R = 0.0003,AR = 0.1,D; //D>=1&&D<=1825
        var preDate = Date.now();
        var date = Date.parse(date1);
        var DR_base = 1 - R * (1 + AR);
        D = Math.ceil((date - preDate) / (1 * 24 * 60 * 60 * 1000));
        DR = Math.pow(DR_base, D);
        DP = DR * OP;
    //     return DP;
       
        setPrice(DP);
    }
    function DP_algorithm(price,date){
        if(price>10000)
            DP_algorithm_high(date);
        else if(price>1000)
            DP_algorithm_middle(date);
        else
            DP_algorithm_low(date);
    }
      function disabledDate(current) {
        // Can not select days before today and today
        // return current && current < moment().endOf('day');
        return current && current < moment().subtract(1,'day');
      }
      const success = () => {
        message.success('加入购物车成功');
      };
      const increment = ()=>{
        setItemNum(itemNum+1);
      }
      const decrement = ()=>{
        if(itemNum>1)
            setItemNum(itemNum-1);
    }
      const orderItem=()=>{
        let checkTime=new Date((new Date).getTime() + 8*60*60*1000).toJSON().split('T').join(' ').substr(0,19);
        let tx = {
            "imgUrl":itemDetail.imgUrl,
            "route":"/item",
            "goodsId": "M100A0B",
            "goodsNum": itemNum,
            "goodsName":document.querySelector('.sku-name>h2').innerHTML,
            "time": Date.now(),
            "dealTime": dealTime,
            "sellerId": "29457382",
            "sellerName": "蚝饷自营",
            "buyerId": JSON.parse(localStorage.getItem("userinfo")).uid,
            "buyerName": "匿名",
            "address": "上海市松江区",
            "price": Number(price),
            "ultimatePrice": Number((price*itemNum).toFixed(2)),
            "discount":((itemDetail.price-price)*100/itemDetail.price).toFixed(2).toString()+'%'
        };//交易信息显示
        let txID = sha256(JSON.stringify(tx));//生成一个ID，包含于txComp完全
        let txComp = {
            "id":'0x'+txID,
            "orderId":checkTime.substr(2,8).split('-').join('')+Date.now().toString().substr(-8,8),
            "imgUrl":itemDetail.imgUrl,
            "route":"/item",
            "goodsId": itemDetail.goodsId,
            "goodsNum": itemNum,
            "goodsName":itemDetail.goodsName,
            "time": checkTime, 
            "dealTime": dealTime,
            "supplierId":itemDetail.supplierId,
            "supplierName":itemDetail.supplierName,
            "sellerId": itemDetail.sellerId,
            "sellerName": itemDetail.sellerName,
            "buyerId":JSON.parse(localStorage.getItem("userinfo")).uid,
            "buyerName": username,
            "address": "上海市松江区",
            "originalPrice":itemDetail.price,
            "price": Number(price.toFixed(2)),
            "deposit":itemDetail.deposit,
            "ultimatePrice": Number((price*itemNum).toFixed(2)),
            "discount":((itemDetail.price-price)*100/itemDetail.price).toFixed(2).toString()+'%',
            "pickTime": "2022-04-08 07:38:30",
            "leaveFactoryTime": "2022-04-10 09:28:11",
            "teaGarden": "爱云茶园",
            "licensedPhotosUrl": "https://tse2-mm.cn.bing.net/th/id/OIP-C.RuftWP2S3VymqsvKul8OxQHaKe?w=182&h=257&c=7&r=0&o=5&dpr=1.25&pid=1.7",
            "teaGardenPic": "upload/teagradenPic.jpg",
            "order_state": 0,
            "deal_state": 0
        };//交易信息显示
        axios.post('http://127.0.0.1:8000/secondOrderList',txComp).then((res)=>{
            let myDate = new Date((new Date).getTime() + 8*60*60*1000);
            let blockTime = myDate.toJSON().split('T').join(' ').substr(0,19);

             // 将当前订单的买卖双方记录下来(一级订单的交易记录)
             axios.post('http://127.0.0.1:8000/orderChange',{
                "id": checkTime.substr(1,7).split('-').join('')+Date.now().toString().substr(-7,7),
                "transferId":res.data.orderId,
                "time": checkTime,
                "sender": itemDetail.sellerName,
                "receiver": username,
                "level": "一级订单",
                "category":0,//订单类别，0表示购买，1表示申购
            }).catch(err=>(console.log("orderchange",err)))
            //区块链相关信息获取与更新
            axios.get('http://127.0.0.1:8000/blockChain').then(res=>{
                let chainInfo=res.data;
                let prevBlockHash=chainInfo[chainInfo.length-1].id;
                axios.post(
                    'http://127.0.0.1:8000/blockChain',
                    {
                        "id": '0x'+sha256(String(Date.now())),
                        "txID": '0x'+txID,
                        "blockTime":blockTime,
                        "buyerId": JSON.parse(localStorage.getItem("userinfo")).username.uid,
                        "buyerName": username,
                        "sellerId": itemDetail.sellerId,
                        "sellerName": itemDetail.sellerName,
                        "goodsId": itemDetail.goodsId,
                        "checkTime": checkTime,
                        "dealTime": dealTime,
                        "prevHash": prevBlockHash
                    }
                    ).then(()=>{
                        message.success('购买成功');
                    })
            });
          
         });
      }
  return (
    <div>
        
        <div className="item-container w">
            
           
            <div className="product-info">
                <div className="fl preview-wrap">
                 
                    <div className="zoom">
                       
                        <div id="preview" className="spec-preview">
                            <img className="xzoom"  src={require('../../../'+itemDetail.imgUrl)} width="410" height="410"/>
                        </div>
                      
                        <div className="spec-scroll">
                            <a href="upload/b1.png"><img className="xzoom-gallery" src={require('../../../'+itemDetail.imgUrl)} width="60"/></a>
                            <a href="upload/b2.png"><img className="xzoom-gallery" src={require('../../../'+itemDetail.imgUrl)} width="60"/></a>
                            <a href="upload/b3.png"><img className="xzoom-gallery" src={require('../../../'+itemDetail.imgUrl)} width="60"/></a>
                            <a href="upload/b1.png"><img className="xzoom-gallery" src={require('../../../'+itemDetail.imgUrl)} width="60"/></a>
                            <a href="upload/b2.png"><img className="xzoom-gallery" src={require('../../../'+itemDetail.imgUrl)} width="60"/></a>
                            <span className="prev">&lt;</span>
                            <span className="next">&gt;</span>
                        </div>
                    </div>
                </div>
                <div className="fr itemInfo-wrap">
                    <div className="sku-name">
                        <h2>{itemDetail.goodsName}（{itemDetail.description}）</h2>
                    </div>
                    <div className="summary">
                        <div className="summary-wrap">
                            <div className="fl title"><i>价　　格</i></div>
                            <div className="fl price"><i>¥</i><em>{itemDetail.price.toFixed(2)}</em> <s>（需支付定金:¥{(itemDetail.deposit*itemDetail.price).toFixed(2)}）</s></div>
                            <div className="fr remark"><i>累计评价</i><em>61</em></div>
                        </div>
                        <div className="summary-wrap">
                            <div className="fl title"><i>促　　销</i></div>
                            <div className="fl price"><span>加价购</span>满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，<br/>即可在购物车换购热销商品 <a href="#">详情》</a></div>
                        </div>
                    </div>
                    <div className="support">
                        <div className="summary-wrap">
                            <div className="fl title"><i>支　　持</i></div>
                            <div className="fl fix-width"><em className="t-gray">以旧换新，礼品购</em></div>
                        </div>
                        <div className="summary-wrap">
                            <div className="fl title"><i>配 送 至</i></div>
                            <div className="fl fix-width"><em className="t-gray">上海市松江区<i className="iconfont"></i>有货    支持  99元免运费 |货到付款 |211限时达   </em></div>
                            <div className="fl express"><em className="t-gray">由自营发货，并提供售后服务。11:00前完成下单，预计<strong>今天（{moment().format('YYYY年MM月DD日')}）送达</strong></em></div>
                           
                        </div>
                        <div className="summary-wrap">
                            <div className="fl discount"><span>动态折扣</span></div>
                            <div className="fl discount-price" >{price.toFixed(2)}元</div>
                            <div className="fl express"><em className="t-gray"><strong>&nbsp;动态折扣由预计送货日期决定</strong></em></div>
                            
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
                                onChange={(dateMoment,dateStr)=>DP_algorithm(itemDetail.price,dateMoment)} 
                                inputReadOnly
                                // open={open_val.isOpen}
                                // onOpenChange={(val)=> {
                                //     console.log(val)
                                //     setOpen({isOpen:val})
                                // }}
                                
                                 />
                                 {
                                    price===itemDetail.price?<div className="fl discount-price" >当日发货无折扣</div>:<div className="fl discount-price" >折扣率:{((itemDetail.price-price)*100/itemDetail.price).toFixed(4)}%</div>
                                 }
                                    
                        </div>
                     
                    </div>
                    <div className="clearfix choose">
                        <div id="specification" className="summary-wrap clearfix">
                            <dl>
                                <dt className="fl title"><i>选择颜色</i></dt>
                                <dd>
                                    <a href="#" className="selected">白色</a>
                                    <a href="#">黄色</a>
                                    <a href="#">蓝色</a>
                                   
                                </dd>
                            </dl>
                            <dl>
                                <dt className="fl title"><i>选择规格</i></dt>
                                <dd>
                                    <a href="#" className="selected">常规款</a>
                                    <a href="#">定做款</a>
                                </dd>
                            </dl>
                           
                           
                        </div>

                        <div className="summary-wrap">
                            <div className="controls">
                                <input autocomplete="off" type="text" value={itemNum} min="1" className="itxt"/>
                                <a onClick={increment} className="plus">+</a>
                                <a onClick={decrement} className="mins">-</a>
                            </div>
                            <button onClick={orderItem}  className="sui-btn  btn-danger addshopcar">立即购买</button>&nbsp;
                            <button onClick={success} className="sui-btn  btn-danger addshopcar">加入购物车</button>
                        </div>
                    </div>
                </div>
            </div>
          
            <div className="clearfix product-detail">
                <div className="fl aside">
                    <ul className="item-tab-wraped">
                        <li className="active">
                            <a href="#index" data-toggle="tab"><span>相关分类</span></a>
                        </li>
                        <li>
                            <a href="#profile" data-toggle="tab"><span>推荐品牌</span></a>
                        </li>
                    </ul>
                    <div className="tab-content tab-wraped">
                        <div id="index" className="tab-pane active">
                            <ul className="part-list unstyled">
                                <li>被子</li>
                                <li>床垫</li>
                                <li>枕头</li>
                                <li>睡眠垫</li>
                            </ul>
                            <ul className="goods-item-list unstyled">
                                <li>
                                    <div className="p-img"><img src={require('../../../upload/floor-1-1.jpg')} width="100%"/></div>
                                    <div className="attr"><em>爱可比蚝饷被子</em></div>
                                    <div className="price"><strong>￥3900</strong></div>
                                    <div className="operate"><a href="#" className="sui-btn btn-bordered">加入购物车</a></div>
                                </li>
                                <li>
                                    <div className="p-img"><img src={require('../../../upload/floor-1-1.jpg')} width="100%"/></div>
                                    <div className="attr"><em>爱可比蚝饷被子</em></div>
                                    <div className="price"><strong>￥3900</strong></div>
                                    <div className="operate"><a href="#" className="sui-btn btn-bordered">加入购物车</a></div>
                                </li>
                                <li>
                                    <div className="p-img"><img src={require('../../../upload/floor-1-1.jpg')} width="100%"/></div>
                                    <div className="attr"><em>爱可比蚝饷被子</em></div>
                                    <div className="price"><strong>￥3900</strong></div>
                                    <div className="operate"><a href="#" className="sui-btn btn-bordered">加入购物车</a></div>
                                </li>
                            </ul>
                        </div>
                        {/* <div id="profile" className="tab-pane">
                            <p>推荐品牌</p>
                        </div> */}
                    </div>
                </div>
                <div className="fr detail">
                    <ul className="item-tab-wraped">
                        <li className="active"><a href="#one" data-toggle="tab"><span>商品介绍</span></a></li>
                        <li><a href="#two" data-toggle="tab"><span>规格与包装</span></a></li>
                        <li><a href="#three" data-toggle="tab"><span>售后保障</span></a></li>
                        <li><a href="#four" data-toggle="tab"><span>商品评价</span></a></li>
                    </ul>
                    <div className="tab-content tab-wraped">
                       
                       <img src={require('../../../upload/goods-description.jpg')} width="100%" />
                    </div>
                </div>
            </div>
     
    </div>
    </div>
  )
}
