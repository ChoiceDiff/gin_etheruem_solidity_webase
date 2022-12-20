const express = require("express")
const router= express.Router();
const sqlFn = require("../../config")
const jwt = require("jsonwebtoken")
const key = require("../../secretKey")
const {randomCode,sendCode}=require("../../utils/getMessage");
const nodemailer = require('nodemailer');


router.get("/getphonecode",(req,res)=>{
    const {phonenum,timestamp} = req.query
    let code=randomCode(4);//生成6位数字随机验证码
    sendCode(phonenum,code,function(success){
        if(success){
            {
                const sql="update  messageloginvalidate set `isdelete`=1 where `phonenum`=?";
                const arr = [phonenum]
                sqlFn(sql,arr,result=>{
                     console.log(result)
                 }) 
            }
            const sql="insert into messageloginvalidate set `phonenum`=?,`code`=?,`latestTime`=?";
            const arr = [phonenum,code,timestamp]
            sqlFn(sql,arr,result=>{
                 if(result.affectedRows>0){
                     res.send({
                         msg:"短信验证码已发送",
                         status:200
                     })
                 }else{
                     res.status(401).send({
                         msg:"存储，出错了",
                         status:401
                     })
                 }
             }) 

        }else{
            res.send({
                msg:"短信验证码出现问题",
                status:402
            });
        }
    })
})
router.post("/comparephonecode",(req,res)=>{
    const {phonenum,phonecode,timestamp} = req.body
    const sql = "select * from messageloginvalidate where `phonenum`=? and `code`=? and `isdelete`=0";
    const arr=[phonenum,phonecode]
    sqlFn(sql,arr,result=>{
        if(result.length===0){
            res.send({
                status: 201,
                msg: "请点击获取验证码"
            })
        }else{
            const latestTimeStamp = result[0].latestTime
            //设置五分钟的验证码
            if((timestamp- latestTimeStamp)<5*60*100){
                const sqll = "select * from user where `phonenum`=?"
                const arrr = [phonenum]
                sqlFn(sqll,arrr,result=>{
                    const token = jwt.sign({
                        uid:result[0].id,
                        username:result[0].username
                    },key.secretKey)
                    res.send({
                        status:200,
                        msg:"验证通过",
                        token,
                        id:result[0].id,
                        nick:result[0].userNick,
                        userType:result[0].userType,
                        username:result[0].username,
                    })
                })

                
            }else{
                res.send({
                    status:202,
                    msg:"验证码超时，五分钟"
                })
            }
        }
      
    })
})
router.get("/getmailcode",(req,res)=>{
    const {emailnum,timestamp} = req.query
    var code=Math.floor(Math.random()*900000) +100000
    const transporter = nodemailer.createTransport({
        host: "smtp.qq.com", // 网易的邮件地址或者按前面配置一下自己用的邮箱
        port: 465, // 端口
        secureConnection: true, // 用不用 SSL
        auth: {
            "user": '3209412418@qq.com', // 邮箱账号
            "pass": 'edpvxqirlabrddhf' // 你自己邮箱的授权码，就之前记录下的那个
        }
    });
    let options={
        from: '3209412418@qq.com', // 发件人地址
        to:emailnum, // 收件人地址，多个收件人可以使用逗号分隔
        //在这里，如果只留存收件人的邮箱，很可能在发送很多个以后就被系统自动识别为骚扰邮件拦截了，所以这里加上自己的发件人的邮箱就OK了。
        subject: 'bctsp在线--验证码', // 邮件的标题啦
        html: `<h1>Hello!</h1><p style="font-size: 18px;color:#000;">bctsp的验证码为：<u style="font-size: 16px;color:#1890ff;">  ${code}  </u></p><p style="font-size: 14px;color:#666;">10分钟内有效</p>` // 邮件的内容
    }

    //配置服务
    transporter.sendMail(options,function(err,msg){
    if(err){
        console.log(err)
    }else{
        console.log("msg.rejected.length",msg.rejected.length)
        //这里就可以去配置你邮件发送完毕后的操作
        transporter.close() //用完，记得关闭这个接口
        {
            const sql="update  mailloginvalide set `isdelete`=1 where `mailnum`=?";
            const arr = [emailnum]
            sqlFn(sql,arr,result=>{
                 console.log(result)
             }) 
        }
        const sql ="insert into mailloginvalide set `mailnum`=?,`code`=?,`latesttime`=?"
        const arr = [emailnum,code,timestamp]
        sqlFn(sql,arr,result=>{
            if(result.affectedRows>0){
                res.send({
                    msg:"邮件验证码已发送",
                    status:200
                })
            }else{
                res.status(401).send({
                    msg:"存储，出错了",
                    status:401
                })
            }
        })
    }
    })
})
router.post("/comparemailcode",(req,res)=>{
    const {emailnum,emailcode,timestamp} = req.body
    const sql = "select * from mailloginvalide where `mailnum`=? and `code`=? and `isdelete`=0";
    const arr=[emailnum,emailcode]
    sqlFn(sql,arr,result=>{
        if(result.length===0){
            res.send({
                status: 201,
                msg: "请点击获取验证码"
            })
        }else{
            const latestTimeStamp = result[0].latesttime
            if((timestamp- latestTimeStamp)<5*60*100){
                const sqll = "select * from user where `email`=?"
                const arrr = [emailnum]
                sqlFn(sqll,arrr,result=>{
                    const token = jwt.sign({
                        uid:result[0].id,
                        username:result[0].username
                    },key.secretKey)
                    res.send({
                        status:200,
                        msg:"验证通过",
                        token,
                        id:result[0].id,
                        nick:result[0].userNick,
                        userType:result[0].userType,
                        username:result[0].username,
                    })
                }) 
            }else{
                res.send({
                    status:202,
                    msg:"验证码超时，五分钟"
                })
            }
        }
      
    })
})
 
 //用户注册
 router.post("/register",(req,res)=>{
     const {isValid,errors} = validatorInput(req.body)
     if(isValid){
         res.send({
             errors,
             status:400
         })
     }else{
         //成功，将数据写入到数据库
        const {username,email,password} =req.body;
        const sql="insert into user values (null,?,?,?)";
        const arr = [username,email,password]
        sqlFn(sql,arr,result=>{
             if(result.affectedRows>0){
                 res.send({
                     msg:"注册成功",
                     status:200
                 })
             }else{
                 res.status(401).send({
                     msg:"注册失败",
                     status:401
                 })
             }
         })
     }
 })
 
 //是否重名
 router.get("/repeat/username",(req,res)=>{
     const userIdCust = req.query.userIdCust;
     const sql = "select * from user where userIdCust=?";
     const arr = [userIdCust]
     sqlFn(sql,arr,result=>{
         if(result.length>0){
             res.send({
                 status:200,
                 msg:"用户名重复",
                 flag:false
             })
         }else{
             res.send({
                 status:201,
                 msg:"用户名可用",
                 flag:true
             })
         }
     })
 })
 
 /**
  * 用户登录
  */
 router.post("/login",(req,res)=>{
     const userIdCust = req.body.userIdCust;
     const password = req.body.password;
     const sql = "select * from user where userIdCust=? and password=?";
     const arr = [userIdCust,password];
     sqlFn(sql,arr,result=>{
         if(result.length>0){
             const token = jwt.sign({
                 uid:result[0].id,
                 username:result[0].username
             },key.secretKey)
             res.send({
                 token,
                 id:result[0].id,
                 nick:result[0].userNick,
                 userType:result[0].userType,
                 username:result[0].username,
                 status:200
             })
         }else{
             res.send({
                 status:400,
                 msg:"用户名密码错误"
             })
         }
     })
     
 })
/**
 * get supplier unapprove
 */

router.get("/unapprovesupplier",(req,res)=>{
    const sql ='SELECT * FROM supplier WHERE approve=0 and isDelete=0'
    const arr=[]
    sqlFn(sql,arr,result=>{
        if(result.length>0){
            res.send({
                status:200,
                data:result
            })
        }else{
            res.send({
                status:201,
                data:"无需厂家注册申请"
            })
        }
    })
})
/**
 * get supplier approved
 */

 router.get("/approvedsupplier",(req,res)=>{
    const sql ='SELECT * FROM supplier WHERE approve=1 and examine=1 and isDelete=0'
    const arr=[]
    sqlFn(sql,arr,result=>{
        if(result.length>0){
            res.send({
                status:200,
                data:result
            })
        }else{
            res.send({
                status:201,
                data:"数据库无符合条件数据"
            })
        }
    })
})
/**
 * get supplier rejected
 */

 router.get("/rejectedsupplier",(req,res)=>{
    const sql ='SELECT * FROM supplier WHERE approve=1 and examine=2 and isDelete=0'
    const arr=[]
    sqlFn(sql,arr,result=>{
        if(result.length>0){
            res.send({
                status:200,
                data:result
            })
        }else{
            res.send({
                status:201,
                data:"数据库无符合条件数据"
            })
        }
    })
})
/**
 * get consumer unapprove
 */

 router.get("/unapproveconsumer",(req,res)=>{
    const sql ='SELECT * FROM consumer WHERE approve=0 and isDelete=0'
    const arr=[]
    sqlFn(sql,arr,result=>{
        if(result.length>0){
            res.send({
                status:200,
                data:result
            })
        }else{
            res.send({
                status:201,
                data:"无用户注册申请"
            })
        }
    })
})
/**
 * get consumer approved
 */

 router.get("/approvedconsumer",(req,res)=>{
    const sql ='SELECT * FROM consumer WHERE approve=1 and examine=1 and isDelete=0'
    const arr=[]
    sqlFn(sql,arr,result=>{
        if(result.length>0){
            res.send({
                status:200,
                data:result
            })
        }else{
            res.send({
                status:201,
                data:"数据库无符合条件数据"
            })
        }
    })
})
/**
 * get consumer rejected
 */

 router.get("/rejectedconsumer",(req,res)=>{
    const sql ='SELECT * FROM consumer WHERE approve=1 and examine=2 and isDelete=0'
    const arr=[]
    sqlFn(sql,arr,result=>{
        if(result.length>0){
            res.send({
                status:200,
                data:result
            })
        }else{
            res.send({
                status:201,
                data:"数据库无符合条件数据"
            })
        }
    })
})
/**
 * get consumer unapprove
 */

 router.get("/unapprovereseller",(req,res)=>{
    const sql ='SELECT * FROM reseller WHERE approve=0 and isDelete=0'
    const arr=[]
    sqlFn(sql,arr,result=>{
        if(result.length>0){
            res.send({
                status:200,
                data:result
            })
        }else{
            res.send({
                status:201,
                data:"无店铺注册申请"
            })
        }
    })
})
/**
 * get consumer approved
 */

 router.get("/approvedreseller",(req,res)=>{
    const sql ='SELECT * FROM reseller WHERE approve=1 and examine=1 and isDelete=0'
    const arr=[]
    sqlFn(sql,arr,result=>{
        if(result.length>0){
            res.send({
                status:200,
                data:result
            })
        }else{
            res.send({
                status:201,
                data:"数据库无符合条件数据"
            })
        }
    })
})
/**
 * get consumer rejected
 */

 router.get("/rejectedreseller",(req,res)=>{
    const sql ='SELECT * FROM reseller WHERE approve=1 and examine=2 and isDelete=0'
    const arr=[]
    sqlFn(sql,arr,result=>{
        if(result.length>0){
            res.send({
                status:200,
                data:result
            })
        }else{
            res.send({
                status:201,
                data:"数据库无符合条件数据"
            })
        }
    })
})
 
/**
 *post user
 */
 router.post("/user",(req,res)=>{
    var {userType,signupTime,userIdCust} = req.body.params;
    signupTime=signupTime.toString().substr(7,7)
    if(userType==="consumer"){
        const {username,password,phone,email} = req.body.params;
        const id = 'csm'+signupTime
        const consumerInsert = "INSERT INTO consumer SET `id`=?,`username`=? , `password`=?, `phonenum`=? ,`email`=? ,`signupTime`=? ,`userIdCust`=? ";
        const arr = [id,username,password,phone,email?email:'',signupTime,userIdCust]
        sqlFn(consumerInsert,arr,result=>{
            if(result.affectedRows>0){
                res.send({
                    status:200,
                    data:"上传成功，等待审核",
                })
            }else{
                res.send({
                    status:201,
                    data:"上传未成功，请排除错误",
                })
            }
        })
    }else if(userType==="reseller"){
        const {storeName,phone,password,email,storeintro,liscencePic}=req.body.params;
        const id = 'rsl'+signupTime
        const pic = liscencePic;
        const resellerInsert = "INSERT INTO reseller SET `id`=? ,`storename`=? , `password`=?, `phonenum`=? ,`email`=?, `storeintro`=?,  `licensePic`=?,`signupTime`=?,`userIdCust`=?";
        const arr =[id,storeName,password,phone,email?email:'',storeintro,pic,signupTime,userIdCust]
        sqlFn(resellerInsert,arr,result=>{
            if(result.affectedRows>0){
                res.send({
                    status:200,
                    data:"上传成功，等待审核",
                })
            }else{
                res.send({
                    status:201,
                    data:"上传未成功，请排除错误",
                })
            }
        })

    }else if(userType==="supplier"){
        const {factoryName,password,phone,email,workerNums,facPic}=req.body.params;
        const pic = facPic;
        const id = 'spl'+signupTime

        const supplierInsert = "INSERT INTO supplier SET `id`=?, `factorname`=? , `password`=?, `phonenum`=? ,`email`=?, `workernums`=?,  `liscenceFac`=?,`signupTime`=?,`userIdCust`=?";
        const arr =[id,factoryName,password,phone,email?email:'',workerNums,pic,signupTime,userIdCust]
        sqlFn(supplierInsert,arr,result=>{
            if(result.affectedRows>0){
                res.send({
                    status:200,
                    data:"上传成功，等待审核",
                })
            }else{
                res.send({
                    status:201,
                    data:"上传未成功，请排除错误",
                })
            }
        })

    }else{
        res.send({
            status:205,
            data:"用户类型未知",
        })
    }
    
})

/**
 *patch user
 */
 router.patch("/user",(req,res)=>{
    const {id,userType,time,examine,password,factorname,username,storename,userIdCust,phonenum,email} = req.body.params;
    const  userTableName = username?username:(factorname?factorname:storename)
    if(examine==="1"){
        const sql = "INSERT INTO user SET `id`=?,`username`=?,`userType`=?,`userNick`=? , `password`=?,`userIdCust`=?,`phonenum`=?,`email`=?"
        const arr = [id,userTableName,userType,userTableName,password,userIdCust,phonenum,email]
        sqlFn(sql,arr,result=>{
            console.log("user表插入",result)
        })
    }

    if(userType==="consumer"){
        const sql = "UPDATE consumer SET `examine`=? ,`approve`=1 ,`examineTime`=? WHERE id=?";
        const arr = [examine,time,id]
        sqlFn(sql,arr,result=>{
            if(result.affectedRows>0){
                res.send({
                    status:200,
                    data:"更新信息成功",
                })
            }else{
                res.send({
                    status:201,
                    data:"更新信息失败",
                })
            }
        })

    }else if(userType==="reseller"){
        const sql = "UPDATE reseller SET `examine`=? ,`approve`=1 ,`examineTime`=? WHERE id=?";
        const arr = [examine,time,id]
        sqlFn(sql,arr,result=>{
            if(result.affectedRows>0){
                res.send({
                    status:200,
                    data:"更新信息成功",
                })
            }else{
                res.send({
                    status:201,
                    data:"更新信息失败",
                })
            }
        })

    }else if(userType==="supplier"){
        const sql = "UPDATE supplier SET `examine`=? ,`approve`=1 ,`examineTime`=? WHERE id=?";     
        const arr = [examine,time,id]
        sqlFn(sql,arr,result=>{
            if(result.affectedRows>0){
                res.send({
                    status:200,
                    data:"更新信息成功",
                })
            }else{
                res.send({
                    status:201,
                    data:"更新信息失败",
                })
            }
        })

    }else{
        res.send({
            status:205,
            data:"用户类型未知",
        })
    }
    
})

module.exports = router;