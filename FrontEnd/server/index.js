const express =require("express");
const app = express();
const routers = require("./routers")
const bodyparser = require("body-parser");
const cors=require("cors")

//跨域配置
app.use(cors())
// app.use(bodyparser.urlencoded({
//     extended:true
// }))
app.use(bodyparser.json({limit:'100mb'}))
app.use(bodyparser.urlencoded({ limit:'100mb', extended: true }));

app.use('',routers)


app.listen(8000,()=>{
    console.log("服务器运行在8000端口")
})