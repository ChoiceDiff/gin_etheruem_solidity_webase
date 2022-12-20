import axios from "../utils/request";


// 网络请求访问路径
const base={
    // baseUrl:"http://localhost:8000",
    baseUrl:"http://101.132.43.203:8000",
    //LOGIN
    getphonecode:"/getphonecode",
    comparephonecode:"/comparephonecode",
    getmailcode:"/getmailcode",
    comparemailcode:"/comparemailcode",

    //user
    getisrepeated:"/repeat/username",
    register:"register",
    login:"/login",
    postuser:"/user",
    getunapprovesupplier:"/unapprovesupplier",
    getunapproveconsumer:"/unapproveconsumer",
    getunapprovereseller:"/unapprovereseller",
    patchuser:"/user",
    getapprovedsupplier:"/approvedsupplier",
    getrejectedsupplier:"/rejectedsupplier",
    getrejectedconsumer:"/rejectedconsumer",
    getapprovedconsumer:"/approvedconsumer",
    getrejectedeseller:"/rejectedreseller",
    getapprovedreseller:"/approvedreseller",

    
    //firstorder
    postFirstOrderList:"/firstOrderList",
    getfirstOrderListBuyer:'/firstOrderListBuyer',
    getfirstOrderListOrdeState:"/firstOrderListOrdeState",
    getfirstOrderList:"/firstOrderList",
    deletefirstOrderList:'/firstOrderList',
    patchfirstOrderList1:"/firstOrderList1",
    patchfirstOrderList2:"/firstOrderList2",
    //secondorder
    getsecondOrderList:"/secondOrderList",
    postsecondOrderList:"/secondOrderList",
    getsecondOrderLisId:"/secondOrderListId",
    getsecondOrderListOrderState:"/secondOrderListOrderState",
    getsecondOrderListClazz:"/secondOrderListClazz",
    getsecondOrderListBuyerNameOrderState:"/secondOrderListBuyerNameOrderState",
    patchsecondOrderList:"/secondOrderList",
    deletesecondOrderList:"/secondOrderList",
    //itemList
    patchitemList:"/itemList",
    getitemList:"/itemList",
    getitemListUnapprove:"/itemListUnapprove",
    getitemListUnapproved:"/itemListUnapproved",
    getitemListApproved:"/itemListApproved",

    //根据厂家id查询未读审批状态的个数
    getunchecknum:"/getunchecknum",
    //根据厂家id查询上架记录
    gethistoryitembyfacid:"/gethistoryitembyfacid",
    goodsDeleteFac:"/goodsDeleteFac",

    patchitemListApproveGoods:"/itemListApproveGoods",
    patchitemListRejectGoods:"/itemListRejectGoods",
    postitemList:"/itemList",
    //goods
    postgoodstea:"/goodstea",
    postgoodsclo:"/goodsclo",
    //blockchain
    postblockChain:"/blockChain",
    getblockChain:"/blockChain",

    //orderchange
    postorderChange:"/orderChange",   
    getorderChange:"/orderChange",
    
    //goodslist
    getgoodsList:"/goodslist",
   
    
}

// 网络请求方法
const api = {
/**
注册
*/
    register(params){
        return axios.post(base.baseUrl+base.register,params)
    },

    /**
     * 获取验证码
     */
     getphonecode(params){
        return axios.get(base.baseUrl+base.getphonecode,{
            params:{
                phonenum:params.phonenum,
                timestamp:params.timestamp,
            }
        })
     },
     comparephonecode(params){
        return axios.post(base.baseUrl+base.comparephonecode,params)
     },
     getmailcode(params){
        return axios.get(base.baseUrl+base.getmailcode,{
            params:{
                emailnum:params.emailnum,
                timestamp:params.timestamp
            }
        })
     },
     comparemailcode(params){
        return axios.post(base.baseUrl+base.comparemailcode,params)
     },

    /**
     * 登录请求
     */

    login(params){
        return axios.post(base.baseUrl+base.login,params)
    },
    getisrepeated(params){
        console.log("getisrepeated",params)
        return axios.get(base.baseUrl+base.getisrepeated,{
            params:
           {userIdCust:params}
       })
    },
    postuser(params){
        return axios.post(base.baseUrl+base.postuser,{params})
    },
    getunapprovesupplier(){
        return axios.get(base.baseUrl+base.getunapprovesupplier)
    },
    getapprovedsupplier(){
        return axios.get(base.baseUrl+base.getapprovedsupplier)
    },
    getrejectedsupplier(){
        return axios.get(base.baseUrl+base.getrejectedsupplier)
    },
    getunapprovereseller(){
        return axios.get(base.baseUrl+base.getunapprovereseller)
    },
    getapprovedreseller(){
        return axios.get(base.baseUrl+base.getapprovedreseller)
    },
    getrejectedreseller(){
        return axios.get(base.baseUrl+base.getrejectedeseller)
    },
    getunapproveconsumer(){
        return axios.get(base.baseUrl+base.getunapproveconsumer)
    },
    getapprovedconsumer(){
        return axios.get(base.baseUrl+base.getapprovedconsumer)
    },
    getrejectedconsumer(){
        return axios.get(base.baseUrl+base.getrejectedconsumer)
    },
    
    patchuser(params){
        return axios.patch(base.baseUrl+base.patchuser ,{params})
    },
    //goods
    postgoodstea(params){
        return axios.post(base.baseUrl+base.postgoodstea,{params})
    },
    postgoodsclo(params){
        return axios.post(base.baseUrl+base.postgoodsclo,{params})
    },
    
   
    //itemlist
    patchitemList(params){
        return axios.patch(base.baseUrl+base.patchitemList,{
                id:params.id,
                goodsNum:params.goodsNum
        })
    },
    getitemList(){
        return axios.get(base.baseUrl+base.getitemList)
    },
    getitemListUnapprove(params){
        return axios.get(base.baseUrl+base.getitemListUnapprove,params)
    },
    getitemListUnapproved(){
        return axios.get(base.baseUrl+base.getitemListUnapproved)
    },
    getitemListApproved(){
        return axios.get(base.baseUrl+base.getitemListApproved)
    },
    getunchecknum(params){
        return axios.get(base.baseUrl+base.getunchecknum,{
            params:
           {supplierId:params}
       })
    },
    gethistoryitembyfacid(params){
        return axios.get(base.baseUrl+base.gethistoryitembyfacid,{
            params:
           {supplierId:params}
       })  
    },


    postitemList(params){
        return axios.post(base.baseUrl+base.postitemList,{params})
    },
    patchitemListApproveGoods(id,time,examineMan){
        return axios.patch(base.baseUrl+base.patchitemListApproveGoods,
            {
                id:id,
                time:time,
                examineMan
            })
    }, 
    patchitemListRejectGoods(id,time,examineMan,examineComment){
        return axios.patch(base.baseUrl+base.patchitemListRejectGoods,
            {
                id:id,
                time:time,
                examineMan,
                examineComment, 
            })
    },

    //firstOrder
    getfirstOrderListBuyer(params){
        return axios.get(base.baseUrl+base.getfirstOrderListBuyer,{
            params
        })
    },
    getfirstOrderListOrdeState(){
        return axios.get(base.baseUrl+base.getfirstOrderListOrdeState)
    },
    getfirstOrderList(params){
        return axios.get(base.baseUrl+base.getfirstOrderList,
        {params:
            {id:params}
        })
    },
    deletefirstOrderList(params){
        return axios.delete(base.baseUrl+base.deletefirstOrderList,
            {params:
                {id:params}
            })
    },
    patchfirstOrderList1(params){
        return axios.patch(base.baseUrl+base.patchfirstOrderList1,
            {params:
                {
                    id:params
                }
            })
    }, 
    patchfirstOrderList2(params){
        return axios.patch(base.baseUrl+base.patchfirstOrderList2,
            {params:
                {
                    id:params
                }
            })
    },
    postFirstOrderList(params){
        return axios.post(base.baseUrl+base.postFirstOrderList,params)
    },

    //secondorder
    getsecondOrderList(params){
        return axios.get(base.baseUrl+base.getsecondOrderList,
            {
                 params
            })
    },
    postsecondOrderList(params){
        return axios.post(base.baseUrl+base.postsecondOrderList,
            {params:
                params
            })
    },
    getsecondOrderLisId(params){
        return axios.get(base.baseUrl+base.getsecondOrderLisId,
            {
                params:{
                    id:params
                }
            }
        )
    },
    getsecondOrderListOrderState(){
        return axios.get(base.baseUrl+base.getsecondOrderListOrderState)
    },
    getsecondOrderListClazz(params){
        return axios.get(base.baseUrl+base.getsecondOrderListClazz,{params:{
            goodsClazz:params
        }})
    },
    getsecondOrderListBuyerNameOrderState(params){
        return axios.get(base.baseUrl+base.getsecondOrderListBuyerNameOrderState,
            {params:
                {
                    buyerName:params
                }
            })
    },
    patchsecondOrderList(params){
        return axios.patch(base.baseUrl+base.patchsecondOrderList,{
            id: params
        })
    },
    deletesecondOrderList(params){
        return axios.delete(base.baseUrl+base.deletesecondOrderList,
            {params:
                {id:params}
            })
    },
    //blockchain
    getblockChain(params){
        return axios.get(base.baseUrl+base.getblockChain,{
            params:{
                txID:params
            }
        })
    },
    postblockChain(params){
        return axios.post(base.baseUrl+base.postblockChain,params)
    },
    
    //orderChange
    getorderChange(){
        return axios.get(base.baseUrl+base.getorderChange)
    },
    postorderChange(params){
        return axios.post(base.baseUrl+base.postorderChange,params)
    },
    //others
    getgoodsList(){
        return axios.get(base.baseUrl+base.getgoodsList)
    },
    
}

export default api;