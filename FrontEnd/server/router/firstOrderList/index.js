const express = require("express")
const router= express.Router();
const sqlFn = require("../../config")
const url = require('url');

/**
 *get firstOrderList
  id
 */
  router.get("/firstOrderList",(req,res)=>{
    const id = url.parse(req.url,true).query.id;
    const sql = "select * from firstorderlist where id=?";
    const arr = [id]
    sqlFn(sql,arr,result=>{
        if(result.length>0){
            if(result[0].goodsClazz==="tea"){
                const sql = "select * from firstorderlist as t1 left join goodstea as t2 on t1.itemid=t2.id where  t1.id=?"
                sqlFn(sql,arr,result=>{
                    res.send({
                        status:200,
                        data:result[0],
                    })
                })
            }else{
                res.send({
                    status:202,
                    data:"查询一级订单失败",
                })
            }
        }else{
            res.send({
                status:201,
                data:"查询一级订单失败",
            })
        }
    })
})
/**
 *get firstOrderListBuyer
 buyerName: username

 */
  router.get("/firstOrderListBuyer",(req,res)=>{
    const {buyerName} = req.query
    const sql = "select * from firstorderlist where buyerName=? AND isDelete='0' order by time desc";
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
                data:"无当前用户订单",
            })
        }
    })
})
/**
 *get firstOrderList 
 :order_state

 */
 router.get("/firstOrderListOrdeState",(req,res)=>{
    const sql = "select * from firstorderlist where order_state=1 AND isDelete='0' order by time desc";
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
                data:"查询一ssssssss级订单失败",
            })
        }
    })
})
/**
 *post firstOrderList
 */
  router.post("/firstOrderList",(req,res)=>{

    const {id,orderId,imgUrl,route,time,dealTime,supplierId,supplierName,sellerId,sellerName,buyerId,buyerName,address,goodsId,goodsNum,goodsName,goodsClazz,originalPrice,price,deposit,ultimatePrice,discount,order_state,deal_state,itemid} = req.body
    const sql = "INSERT INTO firstorderlist SET id=?,orderId=?,imgUrl=?,route=?,time=?,dealTime=?,supplierId=?,supplierName=?,sellerId=?,sellerName=?,buyerId=?,buyerName=?,address=?,goodsId=?,goodsNum=?,goodsName=?,goodsClazz=?,originalPrice=?,price=?,deposit=?,ultimatePrice=?,discount=?,order_state=?,deal_state=?,isDelete=0,itemid=?";
    const arr = [id,orderId,imgUrl,route,time,dealTime,supplierId,supplierName,sellerId,sellerName,buyerId,buyerName,address,goodsId,goodsNum,goodsName,goodsClazz,originalPrice,price,deposit,ultimatePrice,discount,order_state,deal_state,itemid]
    sqlFn(sql,arr,result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                data:req.body,
            })
        }else{
            res.send({
                status:200,
                data:"插入一级订单失败",
            })
        }
    })
})
/**
 *delete firstOrderList
 */
 router.delete("/firstOrderList",(req,res)=>{
    const id = req.query.id
    const sql = "UPDATE  firstorderlist SET isDelete=1 WHERE id=?";
    const arr = [id]
    sqlFn(sql,arr,result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                data:"订单已经删除",
            })
        }else{
            res.send({
                status:201,
                data:"订单删除失败",
            })
        }
    })
})

/**
 *patch firstOrderList1
  id
 */
  router.patch("/firstOrderList1",(req,res)=>{
    
    const id = req.body.params.id
    const order_state = 1
    const sql = "update firstorderlist set order_state=? where id=?";
    const arr = [order_state,id]
    sqlFn(sql,arr,result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                data:"订单修改修改成功",
            })
        }else{
            res.send({
                status:200,
                data:"订单状态修改失败",
            })
        }
    })
})
/**
 *patch firstOrderList2
  id
 */
  router.patch("/firstOrderList2",(req,res)=>{
    
    const id = req.body.params.id
    const order_state = 1
    const sql = "update firstorderlist set deal_state=? where id=?";
    const arr = [order_state,id]
    sqlFn(sql,arr,result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                data:"订单修改修改成功",
            })
        }else{
            res.send({
                status:200,
                data:"订单状态修改失败",
            })
        }
    })
})

module.exports = router;