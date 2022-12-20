import React from 'react';
import { Carousel } from 'antd';
import { Link } from 'react-router-dom'
import recomIcon from '../../../images/recom.png'
import {LeftOutlined, RightOutlined  } from '@ant-design/icons';
import icons from "../../../utils/icons"
import  './index.css'
// export default class Main extends Component {
export default function Main(){

 
return (

   <div className="home-component">
    {/* 头部内容 */}
         
    {/* 左侧导航栏 */}
    <nav className="nav">
        <div className="w">
            <div className="dropdown">
                <div className="dt">全部商品分类</div>
                <div className="dd">
                    <ul>
                        <li><Link to={
                            `/list/${"tea"}`
                        }>六堡茶</Link></li>
                        <li><Link to={
                            `/list/${'furniture'}`
                        }>床和床垫</Link></li>
                        {/* <li><Link to='/list'>储物和收纳</Link></li>
                        <li><Link to='/list'>居家办公</Link></li>
                        <li><Link to='/list'>纺织品、装饰品</Link></li>
                        <li><Link to='/list'>花盆和植物</Link></li>
                        <li><Link to='/list'>浴室产品、户外产品</Link></li>
                        <li><Link to='/list'>婴儿和儿童</Link></li>
                        <li><Link to='/list'>灯具照明</Link></li>
                        <li><Link to='/list'>地毯、门垫和地板</Link></li>
                        <li><Link to='/list'>餐具和厨具</Link></li>
                        <li><Link to='/list'>清洁及晾晒用品</Link></li>
                        <li><Link to='/list'>家居修缮、智能家居</Link></li>
                        <li><Link to='/list'>宠物用品</Link></li>
                        <li><Link to='/list'>夏季灵感、冬季节日</Link></li> */}
                    </ul>
                </div>
            </div>
            <div className="navitems">
                {/* <ul>
                    <li><a href="#">所有商品</a></li>
                    <li><a href="#">居家办公</a></li>
                    <li><a href="#">活动和特惠</a></li>
                    <li><a href="#">设计和服务</a></li>
                    <li><a href="#">家居新品</a></li>
                    <li><a href="#">家居热卖</a></li>
                    <li><a href="#">智能家居</a></li>
                </ul> */}
            </div>
        </div>
    </nav>
    {/* 主页内容 */}
    <main className="w">
        <div className="main">
            <div className="focus">
                <Carousel   
                arrows={true}   
                prevArrow={<LeftOutlined />} 
                nextArrow={<RightOutlined />} 
                autoplay>
                    <div>
                        <img style={{width:"800px"}} src={require('../../../upload/tea11.jpg')} alt=""/>
                    </div>
                    <div>
                         <img src="upload/focus1.png" alt=""/>
                    </div>
                </Carousel>
                                
            </div>
            <div className="newsflash">
                <div className="news">
                    <div className="news_hd">
                        <h5>蚝饷快报</h5>
                        <a href="#" className="more">更多</a>
                    </div>
                    <div className="news_bd">
                        <ul>
                            <li><a href="#"><strong>[重磅]</strong> 贡茶金御叶，王气沐天下。</a></li>
                            <li><a href="#"><strong>[重磅]</strong> 金风御露叶中逢，一杯香醉天地人。　</a></li>
                            <li><a href="#"><strong>[重磅]</strong> 长梦好香茶弄水，香茶弄水引天祥。</a></li>
                            <li><a href="#"><strong>[重磅]</strong> 茶有益，茶有大益</a></li>
                            <li><a href="#"><strong>[重磅]</strong> 佳茗逾千年，六堡香万里。</a></li>
                            <div style={{clear:'both'}}></div>
                        </ul>
                    </div>
                </div>
                <div className="lifeservice" style={{display:"none"}}>
                    <ul>
                        <li>
                            <i style={{
                                background:`url(${icons.bed}) no-repeat`,backgroundSize:"22px 22px"
                              }}
                            >
                            </i>
                            <p>床单</p>
                        </li>
                        <li>
                            <i style={{
                                 background:`url(${icons.tealeaf}) no-repeat`,backgroundSize:"28px 28px"
                                }}
                            >
                            </i>
                            <p>茶叶</p>
                        </li>
                        <li>
                            <i style={{
                                background:`url(${icons.mattress}) no-repeat`,backgroundSize:"28px 28px"
                                }}
                            >
                            </i>
                            <p>床垫</p>
                        </li>
                        <li>
                            <i style={{
                                background:`url(${icons.wine}) no-repeat`,backgroundSize:"24px 24px"
                                }}
                            >
                            </i>
                            <p>红酒</p>
                        </li>
                        <li>
                            <i style={{
                                background:`url(${icons.flowerpot}) no-repeat`,backgroundSize:"34px 34px"
                                }}
                            >
                            </i>
                            <p>花盆</p>
                        </li>
                       
                        <li>
                             <i style={{
                                background:`url(${icons.lamp}) no-repeat`,backgroundSize:"30px 30px"
                                }}
                             >
                            </i>
                            <p>灯具</p>
                        </li>
                        <li>
                            <i style={{
                                background:`url(${icons.cooker}) no-repeat`,backgroundSize:"27px 27px"
                                }}
                             >

                             </i>
                            <p>厨具</p>
                        </li>
                        <li>
                             <i style={{
                                background:`url(${icons.pets}) no-repeat`,backgroundSize:"26px 26px"
                                }}
                             >
                            </i>
                            <p>宠物用品</p>
                        </li>
                        <li>
                            <i style={{
                                background:`url(${icons.mobile}) no-repeat`,backgroundSize:"24px 24px"
                                }}
                             >

                             </i>
                            <p>手机</p>
                        </li>
                        <li>
                            <i style={{
                                background:`url(${icons.car}) no-repeat`,backgroundSize:"25px 25px"
                                }}
                             >

                             </i>
                            <p>模型</p>
                        </li>
                        <li>
                            <i style={{
                                background:`url(${icons.book}) no-repeat`,backgroundSize:"24px 24px"
                                }}
                             >
                            </i>
                            <p>书</p>
                        </li>
                        <li>
                            <i style={{
                                background:`url(${icons.glass}) no-repeat`,backgroundSize:"24px 24px"
                                }}
                             >
                            </i>
                            <p>眼镜</p>
                        </li>
                    </ul>
                </div>
                {/* <div className="bargain">
                    <img style={{width:'200px',height:'75px'}} src={require('../../../upload/tea04.jpg')} alt=""/>
                </div> */}
            </div>
        </div>
    </main>
    <div className="w recom" style={{display:"none"}}>
        <div className="recom_hd">
            <img src={recomIcon} alt=""/>
        </div>
        <div className="recom_bd">
            <ul>
                <li>
                    <Link to="/item1"><img src={require("../../../upload/tea07.jpg")} alt=""/></Link>
                </li>
                <li>
                    <Link to="/item1"><img src={require("../../../upload/tea02.jpg")} alt=""/></Link>
                </li>
                <li>
                    <Link to="/item1"><img src={require("../../../upload/tea03.jpg")} alt=""/></Link>
                </li>
                <li>
                    <Link to="/item1"><img src={require("../../../upload/tea04.jpg")} alt=""/></Link>
                </li>
            </ul>
        </div>
    </div>
  
    <div className="floor" style={{display:"none"}}>
        
        <div className="w jiadian">
            <div className="box_hd">
                <h3>茶叶用品</h3>
                <div className="tab_list">
                    <ul>
                        <li><a href="#" className="style_red">热门</a>|</li>
                        <li><a href="#">沁怡六堡茶</a>|</li>
                        <li><a href="#">沁怡六堡茶</a>|</li>
                        <li><a href="#">沁怡六堡茶</a>|</li>
                        <li><a href="#">沁怡六堡茶</a></li>
                    </ul>
                </div>
            </div>
            <div className="box_bd">
                <div className="tab_content">
                    <div className="tab_list_item">
                        <div className="col_210">
                            <ul>
                                <li><a href="#">六堡茶</a></li>
                                <li><a href="#">六堡茶</a></li>
                                <li><a href="#">六堡茶</a></li>
                                <li><a href="#">六堡茶</a></li>
                                <li><a href="#">六堡茶</a></li>
                                <li><a href="#">六堡茶</a></li>
                            </ul>
                            <a href="#">
                                <img style={{width:'210px',height:'258px'}} src={require('../../../upload/tea08.jpg')} alt=""/>
                            </a>
                        </div>
                        <div className="col_329">
                            <a href="#">
                                <img style={{width:'326px',height:'360px'}} src={require('../../../upload/tea07.jpg')} alt=""/>
                            </a>
                        </div>
                        <div className="col_221">
                        <a href="#" className="bb">
                            <img style={{width:'220px',height:'179px'}} src={require('../../../upload/tea06.jpg')} alt=""/>
                            </a>
                            <a href="#">
                            <img style={{width:'220px',height:'180px'}} src={require('../../../upload/tea05.jpg')} alt=""/>
                            </a>
                        </div>
                        <div className="col_221">
                            <a href="#">
                                <img style={{width:'220px',height:'360px'}} src={require('../../../upload/tea04.jpg')} alt=""/>
                            </a>
                        </div>
                        <div className="col_219">
                        <a href="#" className="bb">
                            <img style={{width:'220px',height:'179px'}} src={require('../../../upload/tea03.jpg')} alt=""/>
                            </a>
                            <a href="#">
                            <img style={{width:'220px',height:'180px'}} src={require('../../../upload/tea02.jpg')} alt=""/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="w shouji">
            <div className="box_hd">
                <h3>家居用品</h3>
                <div className="tab_list">
                    <ul>
                        <li><a href="#" className="style_red">热门</a>|</li>
                        <li><a href="#">蚝饷床垫</a>|</li>
                        <li><a href="#">蚝饷被子</a>|</li>
                        <li><a href="#">蚝饷枕头</a>|</li>
                        <li><a href="#">蚝饷睡眠垫</a></li>
                    </ul>
                </div>
            </div>
            <div className="box_bd">
                <div className="tab_content">
                    <div className="tab_list_item">
                        <div className="col_210">
                            <ul>
                                <li><a href="#">健康清洁</a></li>
                                <li><a href="#">健康清洁</a></li>
                                <li><a href="#">健康清洁</a></li>
                                <li><a href="#">健康清洁</a></li>
                                <li><a href="#">健康清洁</a></li>
                                <li><a href="#">健康清洁</a></li>
                            </ul>
                            <a href="#">
                                <img style={{width:'206px',height:'258px'}} src={require('../../../upload/floor-1-1.jpg')} alt=""/>
                            </a>
                        </div>
                        <div className="col_329">
                            <a href="#">
                                <img style={{width:'329px',height:'360px'}} src={require('../../../upload/floor-1-b01.jpg')} alt=""/>
                            </a>
                        </div>
                        <div className="col_221">
                            <a href="#" className="bb">
                            <img style={{width:'220px',height:'179px'}} src={require('../../../upload/floor-1-2.jpg')} alt=""/>
                            </a>
                            <a href="#">
                            <img style={{width:'220px',height:'180px'}} src={require('../../../upload/floor-1-2.jpg')} alt=""/>
                            </a>
                        </div>
                        <div className="col_221">
                            <a href="#">
                            <img style={{width:'220px',height:'360px'}} src={require('../../../upload/floor-1-4.jpg')} alt=""/>
                            </a>
                        </div>
                        <div className="col_219">
                            <a href="#" className="bb">
                            <img style={{width:'220px',height:'179px'}} src={require('../../../upload/floor-1-5.jpg')} alt=""/>
                            </a>
                            <a href="#">
                            <img style={{width:'220px',height:'180px'}} src={require('../../../upload/floor-1-5.jpg')} alt=""/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

      </div>
    )
  
}
