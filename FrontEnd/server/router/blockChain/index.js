
const express = require("express")
const router= express.Router();
const sqlFn = require("../../config")
const url = require('url');

/**==
 * get blockChain
 * txID
 */
 router.get("/blockChain",(req,res)=>{

    const txID = url.parse(req.url,true).query.txID;
    
    const str = txID?"where txID=?":""
    const sql = "select * from blockchain "+str;
    const arr = [txID]
    sqlFn(sql,arr,result=>{
        if(result.length>0){
            res.send({
                status:200,
                data:result,
            })
        }else{
            res.send({
                status:201,
                data:"查询区块失败或不存在该区块信息",
            })
        }
    })
})

/**
 *post blockChain
 */
 router.post("/blockChain",(req,res)=>{
    const data = req.body;
    const sql = "INSERT INTO blockchain SET ?";
    const arr = [data]
    sqlFn(sql,arr,result=>{
        if(result.length>0){
            res.send({
                status:200,
                data:result[0],
            })
        }else{
            res.send({
                status:201,
                data:"插入区块链失败",
            })
        }
    })
})


module.exports = router;
