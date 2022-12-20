const express = require("express")
const router= express.Router();
const sqlFn = require("../../config")



/**
 * get orderChange
 */
 router.get("/orderChange",(req,res)=>{
    const sql = "select * from orderchange ORDER BY time";
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
                data:"查询交易记录失败",
            })
        }
    })
})

/**
 *post orderChange
 */
 router.post("/orderChange",(req,res)=>{
    const data = req.body;
    const sql = "INSERT INTO orderchange SET ?";
    const arr = [data]
    sqlFn(sql,arr,result=>{
        if(result.length>0){
            res.send({
                status:200,
                data:result[0],
            })
        }else{
            res.send({
                status:200,
                data:"查询一级订单失败",
            })
        }
    })
})

module.exports = router;