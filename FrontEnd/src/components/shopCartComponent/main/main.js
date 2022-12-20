import React from 'react'
import './main.css'
export default function Main() {
  return (
    <div>
      
      <div className="goods-container w">
        <div className="allgoods">
            <h4>全部商品
                <span>6</span>
            </h4>

            <div className="cart-main">
                <div className="cart-th clearfix">
                    <div>
                        <input type="checkbox"/>全选</div>
                    <div className="">商品</div>
                    <div className="">单价（元）</div>
                    <div className="">数量</div>
                    <div className="">小计（元）</div>
                    <div className="">操作</div>
                </div>
                <div className="cart-title clearfix">
                    <h5 className="fl">蚝饷自营</h5>
                    <div className="yunfei fr">
                        运费：￥6.00
                        <span>还差￥99.00免运费</span>
                    </div>
                </div>
                <div className="cart-item-list">
                    <div className="cart-body">
                        <div className="cart-list">
                            <ul className="goods-list yui3-g">
                                <li className="yui3-u-3-8">
                                    <div className="good-item">
                                        <div className="item-img">
                                            <img src={require('../../../upload/pillow.jpg')}/>
                                        </div>
                                        <div className="item-msg">爱可比蚝饷被子</div>
                                    </div>
                                </li>
                                <li className="yui3-u-1-8">
                                    <span>颜色: 白色</span>
                                    <br/>
                                    <span>规格: 常规款</span>
                                    <br/>
                                    
                                </li>
                                <li className="yui3-u-1-8">
                                    <span className="price">3900.00</span>
                                </li>
                                <li className="yui3-u-1-8">
                                    <div className="clearfix">
                                        <a href="#" className="increment mins">-</a>
                                        <input autocomplete="off" type="text" value="1" minnum="1" className="itxt"/>
                                        <a href="#" className="increment plus">+</a>
                                    </div>
                                    <div className="youhuo">有货</div>
                                </li>
                                <li className="yui3-u-1-8">
                                    <span className="sum">3900.00</span>
                                </li>
                                <li className="yui3-u-1-8">
                                    <div className="delete">
                                        <a href="#none">删除</a>
                                    </div>
                                    <div>移到我的关注</div>
                                </li>
                            </ul>
                            <ul className="goods-list yui3-g">
                                <li className="yui3-u-1-2 huangou-li">
                                    <div className="good-item">
                                        <div className="huangou">
                                            <span>换购</span> 活动商品购满2888.00元，即可加价换购商品1件 >
                                            <span className="huangou-product">查看换购品</span>去凑单 >
                                        </div>
                                        <div className="item-img ">
                                            <img src={require('../../../upload/pillow.jpg')}/>
                                        </div>
                                        <div className="item-msg huangou-msg">爱可比蚝饷被子</div>
                                        <div className="fl huangou-color">

                                            <span>颜色: 白色</span>
                                            <br/>
                                            <span>规格: 常规款</span>
                                            <br/>
                                            
                                        </div>
                                        <div className="gift">
                                            <ul>
                                                <li>[赠品]爱可比蚝饷清洁套装... &nbsp;X1</li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>

                                <li className="yui3-u-1-8">
                                    <span className="price huangou-price">3900.00</span>
                                </li>
                                <li className="yui3-u-1-8">
                                    <div className="clearfix">
                                        <a href="#" className="increment mins">-</a>
                                        <input autocomplete="off" type="text" value="1" minnum="1" className="itxt"/>
                                        <a href="#" className="increment plus">+</a>
                                    </div>
                                    <div className="youhuo">有货</div>
                                </li>
                                <li className="yui3-u-1-8">
                                    <span className="sum">3900.00</span>
                                </li>
                                <li className="yui3-u-1-8 huangou-del">
                                    <div className="delete">
                                        <a href="#none">删除</a>
                                    </div>
                                    <div>移到我的关注</div>
                                </li>
                            </ul>
                            <ul className="goods-list active yui3-g">
                                <li className="yui3-u-3-8 pr">
                                  
                                    <input type="checkbox" className="good-checkbox" checked/>
                                    
                                    <div className="good-item">
                                        <div className="item-img">
                                             <img src={require('../../../upload/pillow.jpg')}/>
                                        </div>
                                        <div className="item-msg">爱可比蚝饷被子</div>
                                    </div>
                                </li>
                                <li className="yui3-u-1-8">
                                    <span>颜色: 白色</span>
                                    <br/>
                                    <span>规格: 常规款</span>
                                    <br/>
                                  
                                </li>
                                <li className="yui3-u-1-8">
                                    <span className="price">3900.00</span>
                                </li>
                                <li className="yui3-u-1-8">
                                    <div className="clearfix">
                                        <a href="#" className="increment mins">-</a>
                                        <input autocomplete="off" type="text" value="1" minnum="1" className="itxt"/>
                                        <a href="#" className="increment plus">+</a>
                                    </div>
                                    <div className="youhuo">有货</div>
                                </li>
                                <li className="yui3-u-1-8">
                                    <span className="sum">3900.00</span>
                                </li>
                                <li className="yui3-u-1-8">
                                    <div className="delete">
                                        <a href="#none">删除</a>
                                    </div>
                                    <div>移到我的关注</div>
                                </li>
                            </ul>
                            <ul className="goods-list yui3-g">
                                <li className="yui3-u-3-8">
                                    <div className="good-item">
                                        <div className="item-img">
                                             <img src={require('../../../upload/pillow.jpg')}/>
                                        </div>
                                        <div className="item-msg">爱可比蚝饷被子</div>
                                    </div>
                                </li>
                                <li className="yui3-u-1-8">
                                    <span>颜色: 白色</span>
                                    <br/>
                                    <span>规格: 常规款</span>
                                    <br/>
                                    
                                </li>
                                <li className="yui3-u-1-8">
                                    <span className="price">3900.00</span>
                                </li>
                                <li className="yui3-u-1-8">
                                    <div className="clearfix">
                                        <a href="#" className="increment mins">-</a>
                                        <input autocomplete="off" type="text" value="1" minnum="1" className="itxt"/>
                                        <a href="#" className="increment plus">+</a>
                                    </div>
                                    <div className="youhuo">有货</div>
                                </li>
                                <li className="yui3-u-1-8">
                                    <span className="sum">3900.00</span>
                                </li>
                                <li className="yui3-u-1-8">
                                    <div className="delete">
                                        <a href="#none">删除</a>
                                    </div>
                                    <div>移到我的关注</div>
                                </li>
                            </ul>
                            <ul className="goods-list yui3-g">
                                <li className="yui3-u-3-8">
                                    <div className="good-item">
                                        <div className="item-img">
                                            <img src={require('../../../upload/pillow.jpg')}/>
                                        </div>
                                        <div className="item-msg">爱可比蚝饷被子</div>
                                    </div>
                                </li>
                                <li className="yui3-u-1-8">
                                    <span>颜色: 白色</span>
                                    <br/>
                                    <span>规格: 常规款</span>
                                    <br/>
                                   
                                </li>
                                <li className="yui3-u-1-8">
                                    <span className="price">3900.00</span>
                                </li>
                                <li className="yui3-u-1-8">
                                    <div className="clearfix">
                                        <a href="#" className="increment mins">-</a>
                                        <input autocomplete="off" type="text" value="1" minnum="1" className="itxt"/>
                                        <a href="#" className="increment plus">+</a>
                                    </div>
                                    <div className="youhuo">有货</div>
                                </li>
                                <li className="yui3-u-1-8">
                                    <span className="sum">3900.00</span>
                                </li>
                                <li className="yui3-u-1-8">
                                    <div className="delete">
                                        <a href="#none">删除</a>
                                    </div>
                                    <div>移到我的关注</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="cart-title clearfix">
                    <h5 className="fl">爱可比家居用品专卖店</h5>
                </div>
            </div>
            <div className="cart-item-list">
                <div className="cart-body">
                    <div className="cart-list">
                        <ul className="goods-list yui3-g">
                            <li className="yui3-u-1-2 huangou-li">
                                <div className="good-item">
                                    <div className="huangou">
                                        <span>换购</span> 活动商品购满2888.00元，即可加价换购商品1件 >
                                        <span className="huangou-product">查看换购品</span>去凑单 >
                                    </div>
                                    <div className="item-img ">
                                        <img src={require('../../../upload/pillow.jpg')}/>
                                    </div>
                                    <div className="item-msg huangou-msg">爱可比蚝饷被子</div>
                                    <div className="fl huangou-color">

                                        <span>颜色: 白色</span>
                                        <br/>
                                        <span>规格: 常规款</span>
                                        <br/>
                                       
                                    </div>
                                    <div className="gift">
                                        <ul>
                                            <li>[赠品]爱可比蚝饷清洁套装... &nbsp;X1</li>
                                        </ul>
                                    </div>
                                </div>
                            </li>

                            <li className="yui3-u-1-8">
                                <span className="price huangou-price">3900.00</span>
                            </li>
                            <li className="yui3-u-1-8">
                                <div className="clearfix">
                                    <a href="#" className="increment mins">-</a>
                                    <input autocomplete="off" type="text" value="1" minnum="1" className="itxt"/>
                                    <a href="#" className="increment plus">+</a>
                                </div>
                                <div className="youhuo">有货</div>
                            </li>
                            <li className="yui3-u-1-8">
                                <span className="sum">3900.00</span>
                            </li>
                            <li className="yui3-u-1-8 huangou-del">
                                <div className="delete">
                                    <a href="#none">删除</a>
                                </div>
                                <div>移到我的关注</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="cart-tool clearfix">
                <div className="cart-tool-left clearfix fl">
                    <ul>
                        <li>
                            <a href="javascript:;">全选</a>
                        </li>
                        <li>
                            <a href="javascript:;">删除选中的商品</a>
                        </li>
                        <li>
                            <a href="javascript:;">移到我的关注</a>
                        </li>
                        <li>
                            <a href="javascript:;">清除下柜商品</a>
                        </li>
                    </ul>
                </div>
                <div className="money-box">
                    <div className="sumprice">
                        <div className="sumprice-top">
                            <span>
                已选择
                <strong>1</strong> 件商品</span>
                            <span>
                <em>总价（不含运费）：</em>
                <i className="summoney">¥3900.00</i>
              </span>
                        </div>
                        <div className="sumprice-bottom">
                            已节省：￥20.00
                        </div>
                    </div>
                    <div className="sumbtn">
                        <a className="sum-btn" href="checkout.html">结算</a>
                    </div>
                </div>
            </div>
            <div className="deleted">
                已删除的商品，您可以重新购买或加关注：
                <div className="del-product">
                    <ul className="clearfix">
                        <li>[赠品]爱可比蚝饷清洁套装... &nbsp;X1</li>
                        <li>3900.00</li>
                        <li>1</li>
                        <li>重新购买</li>
                        <li>移到我的关注</li>
                    </ul>
                </div>
            </div>
            <div className="youLike">
                <div className="yk-title">
                    <span>猜你喜欢</span>特惠换购</div>
                <div className="yk-product">
                    <ul className="clearfix">
                        <li>
                            <div className="yk-product-top">
                                <img src={require('../../../upload/recom_03.jpg')} width="238" alt=""/>
                            </div>
                            <div className="yk-product-middle">
                                爱可比蚝饷睡眠垫
                                <br/>抑菌防螨 舒适柔软
                                <p>￥3900.00</p>
                            </div>
                            <div className="yk-product-bottom">
                            <img src={require('../../../upload/car.gif')} alt=""/> 加入购物车
                            </div>
                        </li>
                        <li>
                            <div className="yk-product-top">
                                <img src={require('../../../upload/recom_03.jpg')} width="238" alt=""/>
                            </div>
                            <div className="yk-product-middle">
                                爱可比蚝饷睡眠垫
                                <br/>抑菌防螨 舒适柔软
                                <p>￥3900.00</p>
                            </div>
                            <div className="yk-product-bottom">
                            <img src={require('../../../upload/car.gif')} alt=""/> 加入购物车
                            </div>
                        </li>
                        <li>
                            <div className="yk-product-top">
                                <img src={require('../../../upload/recom_03.jpg')} width="238" alt=""/>
                            </div>
                            <div className="yk-product-middle">
                                爱可比蚝饷睡眠垫
                                <br/>抑菌防螨 舒适柔软
                                <p>￥3900.00</p>
                            </div>
                            <div className="yk-product-bottom">
                            <img src={require('../../../upload/car.gif')} alt=""/> 加入购物车
                            </div>
                        </li>
                        <li>
                            <div className="yk-product-top">
                                <img src={require('../../../upload/recom_03.jpg')} width="238" alt=""/>
                            </div>
                            <div className="yk-product-middle">
                                爱可比蚝饷睡眠垫
                                <br/>抑菌防螨 舒适柔软
                                <p>￥3900.00</p>
                            </div>
                            <div className="yk-product-bottom">
                                <img src={require('../../../upload/car.gif')} alt=""/> 加入购物车
                            </div>
                        </li>

                    </ul>
                    <span> &lt; </span>
                    <span>&gt; </span>
                </div>
            </div>
        </div>
    
    </div>
   
  </div>
  )
}
