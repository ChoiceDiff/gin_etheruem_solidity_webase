
const express = require("express")
const router= express.Router();
const sqlFn = require("../../config")


//查找用户未读审批量
router.get("/getunchecknum",(req,res)=>{
    const {supplierId} = req.query
    const sql = "select count(*) as num from  itemlist where `supplierId`=? AND `facCheck`=0"
    const arr=[supplierId]
    sqlFn(sql,arr,result=>{
        res.send({
            "status":200,
            "num":result[0].num
        })
    })
})

//查找用户历史上架信息
router.get("/gethistoryitembyfacid",(req,res)=>{
    const {supplierId} = req.query
    var res2,res1="sdsdsdfd"
   
    const sql1 = "select *  from  goodstea left join itemlist  on goodstea.id=itemlist.id where goodstea.supplierId=? and goodstea.isdelete=0;"
    const sql2 = "select *  from  goodsclo left join itemlist  on goodsclo.id=itemlist.id where goodsclo.supplierId=? and goodsclo.isdelete=0"
    const arr=[supplierId]
  

    sqlFn(sql1,arr,result=>{
        res1=result
        sqlFn(sql2,arr,result=>{
            res2=result
            res.send({
                "status":"200",
                "tea":res1,
                "clo":res2
            })

        })
      
    })
   
   
})


//标记溯源信息记录是否被用户删除
router.patch("/goodsDeleteFac",(req,res)=>{
    const {id,goodsClazz} = req.body
    console.log(req.body)
    const arr=[id]
    console.log(arr)
    var sql
    if(goodsClazz==="tea"){
        sql = "update goodstea set isdelete=1 where id=?"
    }else if(goodsClazz==="furniture"){
        sql = "update goodsclo set isdelete=1 where id=?"
    }
    sqlFn(sql,arr,result=>{
        console.log(result)
    })
})



/**
 * get itemList approved undeleted
 * goodsNum_get=1 approve=1 
 */
 router.get("/itemList",(req,res)=>{
    const sql = "select * from itemlist WHERE examine=1 AND approve=1  AND isDelete=0";
    // const sql = "select * from itemlist WHERE examine=1 AND approve=1 AND goodsNum>0 AND isDelete=0";
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
                data:"无审批通过的商品",
            })
        }
    })
})

/**
 * get itemList approved
 * goodsNum_get=1 approve=1 
 */
 router.get("/itemListApproved",(req,res)=>{
    const sql = "select * from itemlist WHERE examine=1 AND approve=1 AND goodsNum>0 ";
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
                data:"无审批通过的商品",
            })
        }
    })
})
/**
 * get itemList unapproved
 * goodsNum_get=1 approve=1
 */
 router.get("/itemListUnapproved",(req,res)=>{
    const sql = "select * from itemlist WHERE examine=2 AND approve=1 AND goodsNum>0 ";
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
                data:"尚无未审批通过的商品",
            })
        }
    })
})
/**
 * get itemList unapproved
 * goodsNum_get=1 approve=1
 */
 router.get("/itemListUnapprove",(req,res)=>{
    const sql = "select * from itemlist WHERE approve=0 AND goodsNum>0 AND isDelete=0";
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
                data:"无审批商品",
            })
        }
    })
})
/**
 *post itemList
 */
 router.post("/itemList",(req,res)=>{
    const params = req.body.params;
    const sql = "INSERT INTO itemlist SET ?";
    const arr = [params]
    sqlFn(sql,arr,result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                data:"商品上架成功",
            })
        }else{
            res.send({
                status:200,
                data:"商品上架失败",
            })
        }
    })
})
/**
 * delete itemList
 * goodsNum_get=1
 */
 router.patch("/itemList",(req,res)=>{
    const {id,goodsNum} = req.body
    const sql = "UPDATE  itemlist SET `goodsNum`=?  where id=?";
    const arr = [goodsNum,id]
    sqlFn(sql,arr,result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                data:"操作成功",
            })
        }else{
            res.send({
                status:201,
                data:"操作失败",
            })
        }
    })
})
/**
 * patch itemList
 */
 router.patch("/itemListApproveGoods",(req,res)=>{
    const {id,examineMan,time} =req.body;
    const sql = "UPDATE  itemlist SET `examine`=1 , `approve`='1' ,`examineMan`=?,  `examineTime`=? where `id`=?";
    const arr = [examineMan,time,id]
    sqlFn(sql,arr,result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                data:"审批通过",
            })
        }else{
            res.send({
                status:201,
                data:"审批出现问题",
            })
        }
    })
})
/**
 * patch itemList
 */
 router.patch("/itemListRejectGoods",(req,res)=>{
    const {time,id,examineComment,examineMan} = req.body;
    const sql = "UPDATE  itemlist SET  `examine`=2, `approve`='1',`examineTime`=?,`examineComment`=?,`examineMan`=? where `id`=?";
    const arr = [time,examineComment,examineMan,id]
    sqlFn(sql,arr,result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                data:"拒绝上架",
            })
        }else{
            res.send({
                status:201,
                data:"审批出现问题",
            })
        }
    })
})
module.exports = router;