import React from 'react';
import './index.css'
import image from '../../../images/wx_cz.jpg'
export default function Footer() {
    return (
        // 底部模块的制作 start 
        <footer className="footer">
            <div className="w">
                <div className="mod_service">
                    <ul>
                        <li>
                            <h5></h5>
                            <div className="service_txt">
                                <h4>正品保障</h4>
                                <p>正品保障,提供发票</p>
                            </div>
                        </li>
                        <li>
                            <h5></h5>
                            <div className="service_txt">
                                <h4>正品保障</h4>
                                <p>正品保障,提供发票</p>
                            </div>
                        </li>
                        <li>
                            <h5></h5>
                            <div className="service_txt">
                                <h4>正品保障</h4>
                                <p>正品保障,提供发票</p>
                            </div>
                        </li>
                        <li>
                            <h5></h5>
                            <div className="service_txt">
                                <h4>正品保障</h4>
                                <p>正品保障,提供发票</p>
                            </div>
                        </li>
                        
                    </ul>
                </div>
                <div className="mod_help">
                    <dl>
                        <dt>购物指南</dt>
                        <dd><a href="#">购物流程</a></dd>
                        <dd><a href="#">会员介绍</a></dd>
                        <dd><a href="#">生活旅行/团购</a></dd>
                        <dd><a href="#">常见问题</a></dd>
                        <dd><a href="#">购物指南</a></dd>
                    </dl>
                    <dl>
                        <dt>配送方式</dt>
                        <dd><a href="#">上门自提</a></dd>
                        <dd><a href="#">211限时达</a></dd>
                        <dd><a href="#">配送服务查询</a></dd>
                        <dd><a href="#">配送费收取标准</a></dd>
                        <dd><a href="#">海外配送</a></dd>
                    </dl>
                   
                    <dl>
                        <dt>支付方式</dt>
                        <dd><a href="#">货到付款</a></dd>
                        <dd><a href="#">在线支付</a></dd>
                        <dd><a href="#">分期付款</a></dd>
                        <dd><a href="#">邮局汇款</a></dd>
                        <dd><a href="#">公司转账</a></dd>
                    </dl>
                    <dl>
                        <dt>售后服务</dt>
                        <dd><a href="#">售后政策</a></dd>
                        <dd><a href="#">价格保护</a></dd>
                        <dd><a href="#">退款说明</a></dd>
                        <dd><a href="#">返修/退换货</a></dd>
                        <dd><a href="#">取消订单</a></dd>
                    </dl>
                    <dl>
                        <dt>特色服务</dt>
                        <dd><a href="#">夺宝岛</a></dd>
                        <dd><a href="#">DIY装机</a></dd>
                        <dd><a href="#">延保服务</a></dd>
                        <dd><a href="#">蚝饷E卡</a></dd>
                        <dd><a href="#">蚝饷通信</a></dd>
                    </dl>
                    <dl>
                        <dt>帮助中心</dt>
                        <dd>
                            <img src={image} alt="" />
                            蚝饷客户端
                        </dd>
                    </dl>
                </div>
                <div className="mod_copyright">
                    <div className="links">
                        <a href="#">关于我们</a> | <a href="#">联系我们</a> | <a href="#">联系客服</a> | <a href="#">商家入驻</a> | <a
                            href="#">营销中心</a> | <a href="#">手机品优购</a> | <a href="#">友情链接</a> | <a href="#">销售联盟</a> | <a
                                href="#">品优购社区</a> |
                        <a href="#">品优购公益</a> | <a href="#">English Site</a> | <a href="#">Contact U</a>
                    </div>
                    <div className="copyright">
                        地址：北京市昌平区建材城西路金燕龙办公楼一层 邮编：100096 电话：400-618-4000 传真：010-82935100 邮箱: zhanghj+itcast.cn <br />
                        京ICP备08001421号京公网安备110108007702
                    </div>
                </div>
            </div>
        </footer>
    )
    {/* 底部模块的制作 end  */ }
}
