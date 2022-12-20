const mysql = require("mysql")
const pool = mysql.createPool({
    // host:"101.132.43.203",
    // password:"Asdfgh2!",
    host:"127.0.0.1",
    password:"123456",
    port:3306,
    user:"root",
    database:"FrontEnd",
    connectionLimit:"20",
    multipleStatements:"true"
})



/**
 * query执行数据库语句的方法
 *          sql：数据库语句
 *          arr：数据库语句的参数
 *          callback：相应结果的回调函数callback（error，result)
 */

module.exports = function sqlFn(sql,arr,callback){
   pool.getConnection(function (err,conn){
        if(err){
            console.log("数据库连接失败")
        }else{
            console.log("数据库连接成功")
            conn.query(sql,arr,(error,result)=>{
                if(error){
                    console.log(error)
                    return;
                }else{
                    callback(result)//回调函数
                    conn.release();
                }
            })
        }
   })
}