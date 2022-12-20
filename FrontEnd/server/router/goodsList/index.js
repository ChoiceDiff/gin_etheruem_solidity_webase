const express = require("express")
const router= express.Router();
const sqlFn = require("../../config")

/**==
 * get goodsList
 */
router.get("/goodsList",(req,res)=>{
    const sql = "select * from goodslist";
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
                data:"查询一级订单失败或不存在该区块信息",
            })
        }
    })
})
router.post("/goodstea",(req,res)=>{
    const {uid,id,goodsClazz,goodsName,brand,price,teaClazz,productionLicenseNo,productStandardNumber,burdenSheet,store,shelfLife,foodAdditives,series,manuTech,typeofpackages,mannerofpacking,teaGarden,specialtyCategory,goodsNum,pickTime,leaveFactoryTime,teaGardenPic,imgUrl,description,goodsId} = req.body.params
    const sql = "insert into  goodsTea set `supplierId`=?,`id`=?,`itemnum`=?, `goodsClazz`=?,`goodsName`=?,`brand`=?,`price`=?,`teaClazz`=?,`productionLicenseNo`=?,`productStandardNumber`=?,`burdenSheet`=?,`store`=?,`shelfLife`=?,`foodAdditives`=?,`series`=?,`manuTech`=?,`typeofpackages`=?,`mannerofpacking`=?,`teaGarden`=?,`specialtyCategory`=?,`goodsNum`=?,`pickTime`=?,`leaveFactoryTime`=?,`teaGardenPic`=?,`imgUrl`=?,`description`=?,`goodsId`=?";
    const arr = [uid,uid+id,id,goodsClazz,goodsName,brand,price,teaClazz,productionLicenseNo,productStandardNumber,burdenSheet,store,shelfLife,foodAdditives,series,manuTech,typeofpackages,mannerofpacking,teaGarden,specialtyCategory,goodsNum,pickTime,leaveFactoryTime,teaGardenPic,imgUrl,description,goodsId]
    sqlFn(sql,arr,result=>{
        console.log(result)
        if(result.affectedRows>0){
            res.send({
                status:200,
                data:"数据插入成功",
            })
        }else{
            res.send({
                status:201,
                data:"数据插入失败",
            })
        }
    })
})
router.post("/goodsclo",(req,res)=>{
    const {goodsId,id,uid,applicablescene,applyseason,basicstyle,brand,collartype,colour,description,goodsClazz,goodsName,goodsNum,material,model,pattern,price,shelfLife,sleevetype,subdivisionstyle,suitableobject,thickness,imgUrl,detailsofstyle,style} = req.body.params
    const sql = "insert into  goodsclo set `supplierId`=?, `id`=?,`itemnum`=?,`goodsId`=?, `applicablescene`=?,`applyseason`=?,`basicstyle`=?,`brand`=?,`collartype`=?,`colour`=?,`description`=?,`goodsClazz`=?,`goodsName`=?,`goodsNum`=?,`material`=?,`model`=?,`pattern`=?,`price`=?,`shelfLife`=?,`sleevetype`=?,`subdivisionstyle`=?,`suitableobject`=?,`thickness`=?,`imgUrl`=?,`detailsofstyle`=?,`style`=?";
    const arr = [uid,uid+id,id,goodsId,applicablescene,applyseason,basicstyle,brand,collartype,colour,description,goodsClazz,goodsName,goodsNum,material,model,pattern,price,shelfLife,sleevetype,subdivisionstyle,suitableobject,thickness,imgUrl,detailsofstyle,style]
    sqlFn(sql,arr,result=>{
        console.log(result)
        if(result.affectedRows>0){
            res.send({
                status:200,
                data:"数据插入成功",
            })
        }else{
            res.send({
                status:201,
                data:"数据插入失败",
            })
        }
    })
})

module.exports = router;