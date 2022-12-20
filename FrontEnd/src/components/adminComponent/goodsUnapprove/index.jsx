import React, { useEffect,useState,useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { Divider ,message,Card, List,Image,Button ,Collapse,Popconfirm,Modal,Input,Form } from 'antd';
import api from "../../../api"
import "./index.css"
const { TextArea } = Input;
const { Panel } = Collapse;
export default function Admin(){
 
    const info = (params) => {
        console.log(params,)
        var reason =""
        const examineMan=JSON.parse(localStorage.getItem("userinfo")).uid
        const change =(event)=>{
            reason = event.target.value
          }
        Modal.confirm({
          title: '审批不通过理由',
          destroyOnClose:true,
          content: (
            <div>
                 <TextArea onChange={change}  placeholder="请输入理由" allowClear />
            </div>
          ),
          onOk() {
            reject({
                "id":params,
                "time":storeTime(),
                "examineMan": examineMan,
                "examineComment": reason, 

            })
            console.log("reject")
          },
          okText:"确定",
          cancelText:"取消",
          closable:"true"
        });
      };

    const navigate = useNavigate();
    const [items,setItems] = useState([]);
    

    // 获取将要审批的全部生产方商品信息
    const  getAllOrders = ()=>{
        api.getitemListUnapprove().then((res)=>{
            if(res.data.status===200){
              const data = res.data.data
              setItems(data);
            }else{
              setItems([]);
            }
        });
    }
    const approve=(obj)=>{
        api.patchitemListApproveGoods(obj.id,obj.time,obj.examineMan).then((res)=>{
            if(res.data.status===200){
                message.success("上架成功！")
                getAllOrders()
            }else{
                message.error("操作失败")
                getAllOrders()
            }
        })
    }   
    const reject=(obj)=>{
        api.patchitemListRejectGoods(obj.id,obj.time,obj.examineMan,obj.examineComment).then((res)=>{
            if(res.data.status===200){
                message.info("操作完成！")
                getAllOrders()
            }else{
                message.error("操作失败")
                getAllOrders()
            }
        })
    } 
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
    // 数据库存储的时间
    let storeTime =()=>{
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day =(date.getHours()+8>=24)?date.getDate()+1:date.getDate() ;
        var hours = (date.getHours()+8)%24;
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
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    }
    return (
        <div>
            {items.length>0?
            <>
                <h1 style={{fontSize: "20px",letterSpacing:"4px",padding:"10px 0px 5px 10px" }}>
                     请审批以下商品是否上架：
                </h1>  
                <Divider style={{margin:"5px 0px 10px"}} />
            </>
            :
            <h1 className='goodsUnapprove_h1'>尚无审核商品</h1>}

    
           
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
                        <div><strong>用户请求商品上架时间：</strong> {item.postTime.replace("T"," ").replace(".000Z","")}</div>
                        <Popconfirm
                                 title="确定审批通过?"
                                 okText="确定"
                                 cancelText="取消"
                                 placement="topRight"
                                 onConfirm={()=>approve({
                                    "id":item.id,
                                    'time':storeTime(),
                                    'examineMan':JSON.parse(localStorage.getItem("userinfo")).uid
                                })}
                        >
                                <Button style={{background: "rgb(38, 33, 117)",color:"#fff"}}>
                                    通过
                                </Button>
                        </Popconfirm>
                        <Button 
                          style={{
                                marginTop:"5px",
                                background: "rgb(38, 33, 117)",
                                color:"#111",
                                backgroundColor:"pink",
                            }}
                        //   onClick={()=>reject({
                        //          "id":item.id,
                        //          'time':storeTime()
                        //      })}
                             onClick={(e)=>info(
                                 item.id
                             )}
                        >
                            不通过
                        </Button>
                        {/* <Button onClick={info}>Info</Button> */}
                
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
