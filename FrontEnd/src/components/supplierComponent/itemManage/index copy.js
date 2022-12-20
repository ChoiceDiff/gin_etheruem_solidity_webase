import React ,{useEffect} from 'react'
import { message,InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../../../api';
export default function ItemManage(){
    const username = localStorage.getItem("userinfo")?JSON.parse(localStorage.getItem("userinfo")).username:""
    const navigate = useNavigate()
    const putOnSale = (obj)=>{
        const timestamp = Math.round(new Date())
        let itemId = timestamp+obj.prefix;
        let itemComp={
          "id":itemId,
          "goodsClazz": obj.goodsClazz,
          "goodsName":obj.goodsName,
          "goodsId": obj.goodsId,
          "price":obj.price,
          "deposit":obj.deposit,
          "goodsNum":obj.goodsNum,
          "imgUrl": obj.imgUrl,
          "description":obj.description,
          "supplierId":obj.supplierId,
          "supplierName":obj.supplierName,
          "sellerId": obj.sellerId,
          "sellerName": obj.sellerName,
          "postTime":storeTime()
        }
        api.postitemList(itemComp).then((res)=>{
            message.info("请等待管理员审核商品");
        })
    }
    // 数据库存储的时间
    let storeTime =()=>{
        var date = new Date();
        var day =(date.getHours()+8>=24)?date.getDate()+1:date.getDate() ;
        var hours = (date.getHours()+8)%24;
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
           
        }
        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    }
    useEffect(()=>{
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
 
    return ( 
            <div className=" many-items-list">
                <ul className="yui3-g">
                    <li className="yui3-u-1-5" style={{display:username==="上海爱可比家纺制造有限公司"?'':'none'}}>
                        <div className="fl p-img">
                            <img src={require("../../../upload/bargain.jpg")} style={{width:'144px',height:'121px',marginRight:'15px'}} />
                        </div>
                        <div className="attr"><h1><strong>爱可比蚝饷床垫</strong></h1></div>
                        <div className="price">
                            <strong>价格:<em>¥</em><i>40000.00</i></strong><br/>
                            <strong>件数:</strong>
                            <InputNumber
                                id="num1"
                                size="small"
                                defaultValue="1000"
                                min="1"
                                max="9999"
                            />
                        </div>
                        <div className="fr item-operate operate" style={{float:"left"}}>
                            <button onClick={()=>putOnSale({
                                        "prefix":"A2aab",
                                        "goodsName":"爱可比蚝饷床垫",
                                        "goodsId": "M100A0B",
                                        "price":40000,
                                        "imgUrl":"upload/bargain.jpg",
                                        "goodsNum":Number(document.getElementById("num1").value),
                                        "deposit":0.2,
                                        "goodsClazz": "furniture",
                                        "description":"透气速干、抑菌防螨、助眠滋养",
                                        "supplierName":"上海爱可比家纺制造有限公司",
                                        "supplierId":"spl1666055762901",
                                        "sellerName":"上海爱可比家纺制造有限公司",
                                        "sellerId":"spl1666055762901",
                                    })
                                }>请求上架</button>
                        </div>
                    </li>
                    <li className="yui3-u-1-5" style={{display:username==="上海爱可比家纺制造有限公司"?'':'none'}}>
                        <div className="fl p-img">
                        <img src={require('../../../upload/floor-1-b01.jpg')} style={{width:'144px',height:'121px',marginRight:'15px'}} />
                        
                        </div>
                        <div className="attr"><h1><strong>爱可比蚝饷枕头</strong></h1></div>
                        {/* <s style={{color:"rgb(38, 33, 117)"}}>￥6988</s> */}
                        <div className="price">
                        <strong>价格:<em>¥</em><i>599.00</i></strong><br/>
                        <strong>件数:</strong>
                            <InputNumber
                            id="num2"
                            size="small"
                            
                            defaultValue="990"
                            min="1"
                            max="9999"
                        />
                        </div>
                    
                        <div className="fr item-operate operate" style={{float:"left"}}>
                        <button onClick={()=>putOnSale({
                                "prefix":"A2aac",
                                "goodsName":"爱可比蚝饷枕头",
                                "goodsId": "P010A0A",
                                "price":599,
                                "imgUrl":"upload/floor-1-b01.jpg",
                                "goodsNum":Number(document.getElementById("num2").value),
                                "deposit":0.1,

                                "goodsClazz": "furniture",
                                "description":"透气速干、抑菌防螨、助眠滋养",
                                "supplierName":"上海爱可比家纺制造有限公司",
                                "supplierId":"spl1666055762901",
                                "sellerName":"上海爱可比家纺制造有限公司",
                                "sellerId":"spl1666055762901",
                            })}>请求上架</button>
                        </div>
                    </li>
                    <li className="yui3-u-1-5" style={{display:username==="上海爱可比家纺制造有限公司"?'':'none'}}>
                        <div className="fl p-img">
                        <img src={require("../../../upload/pillow.jpg")} style={{width:'144px',height:'121px',marginRight:'15px'}} />
                        </div>
                        <div className="attr"><h1><strong>爱可比蚝饷被子</strong></h1></div>
                        <div className="price">
                            <strong>价格:<em>¥</em><i>3900.00</i></strong><br/>
                            <strong>件数:</strong>
                            <InputNumber
                            id="num3"
                            size="small"
                            
                            defaultValue="1000"
                            min="1"
                            max="9999"
                        />
                        </div>
                    
                        <div className="fr item-operate operate" style={{float:"left"}}>
                            <button onClick={()=>putOnSale({
                                "prefix":"A2aaa",
                                "goodsName":"爱可比蚝饷被子",
                                "goodsId": "Q220E0B",
                                "price":3900,
                                "imgUrl":"upload/pillow.jpg",
                                "goodsNum":Number(document.getElementById("num3").value),
                                "deposit":0.15,

                                "goodsClazz": "furniture",
                                "description":"透气速干、抑菌防螨、助眠滋养",
                                "supplierName":"上海爱可比家纺制造有限公司",
                                "supplierId":"spl1666055762901",
                                "sellerName":"上海爱可比家纺制造有限公司",
                                "sellerId":"spl1666055762901",
                            })}>请求上架</button>
                        </div>
                    </li>   
                    <li className="yui3-u-1-5"  style={{display:username==="上海斐华服饰制造有限公司"?'':'none'}}>
                        <div className="fl p-img">
                        <img src={require("../../../upload/tshirt.jpg")} style={{width:'144px',height:'121px',marginRight:'15px'}} />
                        </div>
                        <div className="attr"><h1><strong>斐华夏季短袖</strong></h1></div>
                        <div className="price">
                            <strong>价格:<em>¥</em><i>159.00</i></strong><br/>
                            <strong>件数:</strong>
                            <InputNumber
                            id="num4"
                            size="small"
                            
                            defaultValue="1000"
                            min="1"
                            max="9999"
                        />
                        </div>
                    
                        <div className="fr item-operate operate" style={{float:"left"}}>
                            <button onClick={()=>putOnSale({
                                "prefix":"A2aad",
                                "goodsName":"斐华夏季短袖",
                                "goodsId": "T930Q9B",
                                "price":159,
                                "imgUrl":"upload/tshirt.jpg",
                                "goodsNum":Number(document.getElementById("num4").value),
                                "deposit":0.14,

                                "goodsClazz": "furniture",
                                "description":"透气速干、抑菌防螨、助眠滋养",
                                "supplierName":"上海斐华服饰制造有限公司",
                                "supplierId":"spl1666055130505",
                                "sellerName":"上海斐华服饰制造有限公司",
                                "sellerId":"spl1666055130505",
                            })}>请求上架</button>
                        </div>
                    </li>        
                    <li className="yui3-u-1-5"  style={{display:username==="上海斐华服饰制造有限公司"?'':'none'}}>
                        <div className="fl p-img">
                        <img src={require("../../../upload/jacket.jpg")} style={{width:'144px',height:'121px',marginRight:'15px'}} />
                        
                        </div>
                        <div className="attr"><h1><strong>斐华夹克</strong></h1></div>
                        <div className="price">
                            <strong>价格:<em>¥</em><i>1899.00</i></strong><br/>
                            <strong>件数:</strong>
                            <InputNumber
                            id="num5"
                            size="small"
                            
                            defaultValue="1000"
                            min="1"
                            max="9999"
                        />
                        </div>
                    
                        <div className="fr item-operate operate" style={{float:"left"}}>
                            <button onClick={()=>putOnSale({
                                "prefix":"A2aae",
                                "goodsName":"斐华夹克",
                                "goodsId": "U780Q9B",
                                "price":1899,
                                "imgUrl":"upload/jacket.jpg",
                                "goodsNum":Number(document.getElementById("num5").value),
                                "deposit":0.14,
                                "goodsClazz": "furniture",
                                "description":"透气速干、抑菌防螨、助眠滋养",
                                "supplierName":"上海斐华服饰制造有限公司",
                                "supplierId":"spl1666055130505",
                                "sellerName":"上海斐华服饰制造有限公司",
                                "sellerId":"spl1666055130505",
                            })}>请求上架</button>
                        </div>
                    </li>  
                    <li className="yui3-u-1-5"  style={{display:username==="苍梧县沁怡六堡茶业有限公司"?'':'none'}}>
                        <div className="fl p-img">
                        <img src={require("../../../upload/tea02.jpg")} style={{width:'144px',height:'121px',marginRight:'15px'}} />
                        
                        </div>
                        <div className="attr"><h1><strong>中茶六堡茶窖藏茶香诗韵</strong></h1></div>
                        <div className="price">
                            <strong>价格:<em>¥</em><i>5999.00</i></strong><br/>
                            <strong>件数:</strong>
                            <InputNumber
                            id="num6"
                            size="small"
                            
                            defaultValue="1000"
                            min="1"
                            max="9999"
                        />
                        </div>
                    
                        <div className="fr item-operate operate" style={{float:"left"}}>
                            <button onClick={()=>putOnSale({
                                "prefix":"A1aaa",
                                "goodsName":"中茶六堡茶窖藏茶香诗韵",
                                "goodsId": "A080Q9B",
                                "price":5999,
                                "imgUrl":"upload/tea02.jpg",
                                "goodsNum":Number(document.getElementById("num6").value),
                                "deposit":0.14,

                                "goodsClazz": "tea",
                                "description":"好茶不是偶然，山灵水秀仙境般的胜地",
                                "supplierName":"苍梧县沁怡六堡茶业有限公司",
                                "supplierId":"spl1666055766705",
                                "sellerName":"苍梧县沁怡六堡茶业有限公司",
                                "sellerId":"spl1666055766705",
                                "pickTime":"2022-04-08 09:31:10",
                                "leaveFactoryTime":"2022-04-10 12:28:11",
                                "teaGarden":"爱云茶园",
                                "licensedPhotosUrl":"https://tse2-mm.cn.bing.net/th/id/OIP-C.RuftWP2S3VymqsvKul8OxQHaKe?w=182&h=257&c=7&r=0&o=5&dpr=1.25&pid=1.7",
                                "teaGardenPic":"upload/teagradenPic.jpg",
                            })}>请求上架</button>
                        </div>
                    </li> 
                    <li className="yui3-u-1-5"  style={{display:username==="苍梧县沁怡六堡茶业有限公司"?'':'none'}}>
                        <div className="fl p-img">
                        <img src={require("../../../upload/tea01.jpg")} style={{width:'144px',height:'121px',marginRight:'15px'}} />
                        
                        </div>
                        <div className="attr"><h1><strong>中茶黑茶70周年纪念</strong></h1></div>
                        <div className="price">
                            <strong>价格:<em>¥</em><i>16999.00</i></strong><br/>
                            <strong>件数:</strong>
                            <InputNumber
                            id="num7"
                            size="small"

                            defaultValue="1000"
                            min="1"
                            max="9999"
                        />
                        </div>
                    
                        <div className="fr item-operate operate" style={{float:"left"}}>
                            <button onClick={()=>putOnSale({
                                "prefix":"A1aab",
                                "goodsName":"中茶黑茶70周年纪念",
                                "goodsId": "BT80Q9B",
                                "price":16999,
                                "imgUrl":"upload/tea01.jpg",
                                "goodsNum":Number(document.getElementById("num7").value),
                                "deposit":0.14,

                                "goodsClazz": "tea",
                                "description":"好茶不是偶然，山灵水秀仙境般的胜地",
                                "supplierName":"苍梧县沁怡六堡茶业有限公司",
                                "supplierId":"spl1666055766705",
                                "sellerName":"苍梧县沁怡六堡茶业有限公司",
                                "sellerId":"spl1666055766705",
                                "pickTime":"2022-04-08 08:28:10",
                                "leaveFactoryTime":"2022-04-11 09:32:21",
                                "teaGarden":"爱云茶园",
                                "licensedPhotosUrl":"https://tse2-mm.cn.bing.net/th/id/OIP-C.RuftWP2S3VymqsvKul8OxQHaKe?w=182&h=257&c=7&r=0&o=5&dpr=1.25&pid=1.7",
                                "teaGardenPic":"upload/teagradenPic.jpg",
                            })}>请求上架</button>
                        </div>
                    </li>
                    <li className="yui3-u-1-5"  style={{display:username==="苍梧县沁怡六堡茶业有限公司"?'':'none'}}>
                        <div className="fl p-img">
                        <img src={require("../../../upload/tea03.jpg")} style={{width:'144px',height:'121px',marginRight:'15px'}} />
                        
                        </div>
                        <div className="attr"><h1><strong>中茶六堡茶一级箩筐茶</strong></h1></div>
                        <div className="price">
                            <strong>价格:<em>¥</em><i>9999.00</i></strong><br/>
                            <strong>件数:</strong>
                            <InputNumber
                            id="num8"
                            size="small"
                            
                            defaultValue="1000"
                            min="1"
                            max="9999"
                        />
                        </div>
                    
                        <div className="fr item-operate operate" style={{float:"left"}}>
                            <button onClick={()=>putOnSale({
                                "prefix":"A1aac",
                                "goodsName":"中茶六堡茶一级箩筐茶",
                                "goodsId": "TR80Q9B",
                                "price":8999,
                                "imgUrl":"upload/tea03.jpg",
                                "goodsNum":Number(document.getElementById("num8").value),
                                "deposit":0.14,
                                
                                "goodsClazz": "tea",
                                "description":"好茶不是偶然，山灵水秀仙境般的胜地",
                                "supplierName":"苍梧县沁怡六堡茶业有限公司",
                                "supplierId":"spl1666055766705",
                                "sellerName":"苍梧县沁怡六堡茶业有限公司",
                                "sellerId":"spl1666055766705",
                                "pickTime":"2022-04-08 09:38:30",
                                "leaveFactoryTime":"2022-04-11 10:28:51",
                                "teaGarden":"青山茶园",
                                "licensedPhotosUrl":"https://tse2-mm.cn.bing.net/th/id/OIP-C.RuftWP2S3VymqsvKul8OxQHaKe?w=182&h=257&c=7&r=0&o=5&dpr=1.25&pid=1.7",
                                "teaGardenPic":"upload/teagradenPic.jpg",
                            })}>请求上架</button>
                        </div>
                    </li>
                </ul>
            </div>
    )
}
