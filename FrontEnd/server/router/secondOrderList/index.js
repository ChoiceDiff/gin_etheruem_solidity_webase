const express = require("express")
const router= express.Router();
const sqlFn = require("../../config")


/**
 *get secondOrderList
 */
 router.get("/secondOrderList",(req,res)=>{
    const {buyerName} = req.query
    const sql = "SELECT * FROM secondorderlist WHERE buyerName=? AND isDelete=0 order by time desc";
    const arr = [buyerName]
    sqlFn(sql,arr,result=>{
        if(result.length>0){
            res.send({
                status:200,
                data:result,
            })
        }else{
            res.send({
                status:201,
                data:"查找二级订单失败或该用户不存在二级订单",
            })
        }
    })
})
/**
 *get secondOrderListBuyerNameOrderState
 */
 router.get("/secondOrderListBuyerNameOrderState",(req,res)=>{
    
    const {buyerName} = req.query
    const sql = "SELECT * FROM secondorderlist WHERE order_state=0 AND buyerName=? AND isDelete=0 order by time desc";
    const arr = [buyerName]
    sqlFn(sql,arr,result=>{
        
        if(result.length>0){
            res.send({
                status:200,
                data:result,
            })
        }else{
            res.send({
                status:201,
                data:"查找二级订单失败或该用户不存在二级订单",
            })
        }
    })
})
/**
 *get secondOrderListOrderState
 */
 router.get("/secondOrderListOrderState",(req,res)=>{
    const sql = "SELECT * FROM secondorderlist WHERE order_state=1 AND isDelete=0 order by time desc";
    const arr = []
    sqlFn(sql,arr,result=>{
        if(result.length>0){
            res.send({
                status:200,
                data:result,
            })
        }else{
            res.send({
                status:201,
                data:"查找二级订单失败",
            })
        }
    })
})
/**
 *get secondOrderListId
 */
 router.get("/secondOrderListId",(req,res)=>{
    const id = req.query.id
    const sql = "SELECT * FROM secondorderlist WHERE id=? AND isDelete=0";
    const arr = [id]
    sqlFn(sql,arr,result=>{
        if(result.length>0){
            if(result[0].goodsClazz==="tea"){
                const sql = "select * from secondorderlist as t1 left join goodstea as t2 on t1.itemid=t2.id where  t1.id=?"
                sqlFn(sql,arr,result=>{
                    res.send({
                        status:200,
                        data:result[0],
                    })
                })
            }
        }else{
            res.send({
                status:200,
                data:"查找二级订单失败",
            })
        }
    })
})
/**
 *get secondOrderListClazz
 */
 router.get("/secondOrderListClazz",(req,res)=>{
    const goodsClazz = req.query.goodsClazz
    const sql = "SELECT * FROM secondorderlist WHERE goodsclazz=? AND isDelete=0 order by time desc";
    const arr = [goodsClazz]
    sqlFn(sql,arr,result=>{
        if(result.length>0){
            res.send({
                status:200,
                data:result,
            })
        }else{
            res.send({
                status:200,
                data:"查找二级订单失败",
            })
        }
    })
})
/**
 *post secondOrderList
 */
 router.post("/secondOrderList",(req,res)=>{
    const {id,orderId,imgUrl,route,time,dealTime,supplierId,supplierName,sellerId,sellerName,buyerId,buyerName,address,goodsId,goodsNum,goodsName,goodsClazz,originalPrice,price,deposit,ultimatePrice,discount,order_state,deal_state,isDelete,itemid,firstOrderId} = req.body.params
    const sql = "INSERT INTO secondorderlist SET id=?,orderId=?,imgUrl=?,route=?,time=?,dealTime=?,supplierId=?,supplierName=?,sellerId=?,sellerName=?,buyerId=?,buyerName=?,address=?,goodsId=?,goodsNum=?,goodsName=?,goodsClazz=?,originalPrice=?,price=?,deposit=?,ultimatePrice=?,discount=?,order_state=?,deal_state=?,isDelete=?,itemid=?,firstOrderId=?";
    const arr = [id,orderId,imgUrl,route,time,dealTime,supplierId,supplierName,sellerId,sellerName,buyerId,buyerName,address,goodsId,goodsNum,goodsName,goodsClazz,originalPrice,price,deposit,ultimatePrice,discount,order_state,deal_state,isDelete,itemid,firstOrderId]
    sqlFn(sql,arr,result=>{
        console.log(result)
        if(result.affectedRows>0){
            res.send({
                status:200,
                data:req.body.params,
                mgs:"插入二级订单成功",
            })
        }else{
            res.send({
                status:200,
                data:"插入二级订单失败",
            })
        }
    })
})
/**
 *patch secondOrderList
 */
 router.patch("/secondOrderList",(req,res)=>{
    
    const id = req.query.id? req.query.id:req.body.id
    const sql = "UPDATE  secondorderlist SET order_state=1 WHERE id=?";
    const arr = [id]
    sqlFn(sql,arr,result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                data:"二级订单更新成功",
            })
        }else{
            res.send({
                status:200,
                data:"二级订单更新失败",
            })
        }
    })
})
/**
 *delete secondOrderList
 */
 router.delete("/secondOrderList",(req,res)=>{
    const id = req.query.id
    const sql = "UPDATE  secondorderlist SET isDelete=1 WHERE id=?";
    const arr = [id]
    sqlFn(sql,arr,result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                data:"订单已经删除",
            })
        }else{
            res.send({
                status:200,
                data:"订单删除失败",
            })
        }
    })
})

module.exports = router;