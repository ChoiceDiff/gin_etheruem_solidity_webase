import React, { useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { message,Card, List,Layout,Image ,Collapse} from 'antd';
import api from "../../../api"
const { Header, Footer, Sider, Content } = Layout;
const { Panel } = Collapse;

export default function Admin(){
    const navigate = useNavigate();
    const [items,setItems] = useState([]);
    

    // 获取将要审批的全部生产方商品信息
    const  getAllOrders = ()=>{
        api.getitemListUnapproved().then((res)=>{
            if(res.data.status===200){
              const data = res.data.data
              setItems(data);
              console.log(data)
            }else{
              setItems([]);
            }
        });
    }
    // const approve=(obj)=>{
    //     api.patchitemListApproveGoods(obj.id).then((res)=>{
    //         console.log(res)
    //         if(res.data.status===200){
    //             message.success("上架成功！")
    //         }
    //     })
    // }   
    useEffect(()=>{
        //判断当前是否含有登录信息，如果没有则将其push到登录页
        let timer = setInterval(()=>{
            const userType = localStorage.getItem("userinfo")?
                JSON.parse(localStorage.getItem("userinfo")).userType
                :
                ""
            if(userType!=="admin"){
                navigate("/login")
            }
        },2000)
        getAllOrders()
        return ()=>clearInterval(timer)
    },[])

    return (
        <div>
            <h1 style={{fontSize: "20px",letterSpacing:"4px",padding:"10px 0px 5px 10px" }}>未通过审批的商品：</h1>
            <List
              grid={{ gutter: 16, column: 4  }}
              dataSource={items}
              pagination={{
                  onChange: page => {
                    console.log(page);
                  },
                pageSize: 4,
              }}
             renderItem={(item) => (
                <List.Item>
                    <Card title={"商品编号:"+item.id} style={{textAlign:"center"}}>
                        {/* <img src={require("../../../"+item.imgUrl)} style={{width:"100%",aspectRatio:"1/1"}} /> */}
                        <Image width={100}  src={item.imgUrl}/>
                        
                        <div className="fl"><strong>商品名:</strong>{item.goodsName}</div>
                        <div className="fl"><strong>总件数:</strong>{item.goodsNum}件</div>
                        <div className="fl"><strong>供货商:</strong>{item.supplierName}</div>
                        <div className="fl"><strong>单价(元):</strong><em>¥</em>{item.price.toFixed(2)}</div>
                        <div className="fl">
                            <div> <strong>申请上架时间:</strong> { item.postTime.replace("T"," ").replace(".000Z","")}</div>
                            <div><strong>审批时间：</strong>{item.examineTime.replace("T"," ").replace(".000Z","")}</div>
                        </div>
                        <div className="fl">
                            <div><strong>审批理由：</strong>{item.examineComment?item.examineComment:"无"}</div>
                        </div>
                        <div className="fl">
                            <div><strong>审批员编号：</strong>{item.examineMan?item.examineMan:"无"}</div>
                        </div>

                    </Card>
                    
                    <Collapse accordion style={{display:item.goodsClazz==="tea"?"":"none"}}>
                        <Panel header="茶叶详情" key="1">
                        <div className="block" style={{padding:"50px 20px"}}>
                              <h4 style={{lineHeight : 3,fontWeight:"bold",padding:"1px 5px"}} >茶叶溯源信息：  </h4>
                              <ul  className="blockInfo" style={{fontSize:"2px",transform:"scale(0.8)"}} >
                                  <li >出产茶园：</li> 
                                  <li >采摘时间:</li>
                                  <li >出厂日期:</li>
                                  <li >茶园卫星图链接：</li>
                                  <li >茶园图片链接：</li>
                                  <li >茶公司执照图片链接：</li>
                                  <li >六堡茶系列产品链接：</li>
                              </ul>
                              <ul className="blockData" style={{fontSize:"6px",transform:"scale(0.9)"}}>
                                  <li >爱云茶园</li>
                                  <li >2022-04-08 07:38:30</li>
                                  <li >2022-04-10 09:28:11</li>
                                  <li ><a href={require("../../../upload/teagradenPic.jpg")}>点击查看 </a></li>
                                  <li ><a href='https://oss.puercn.com/fit/800/800/we/0/chayou/entry_photos/000/795/530/2.jpg'>点击查看 </a></li>
                                  <li ><a href={require("../../../upload/businessLicense.jpg")}>点击查看</a></li>
                                  <li ><a href='http://wsjkw.gxzf.gov.cn/spaqyyyzs_49672/spaqqybz/spaqqybzbaqgs/P020220706572871369238.pdf'>点击查看</a></li>
                              </ul>
                          </div>
                        </Panel>
                    </Collapse> 
                
                </List.Item>
                
              )}
            />
        </div>
    )
}
