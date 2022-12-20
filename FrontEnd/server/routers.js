const blockChain = require("./router/blockChain")
const firstOrderList = require("./router/firstOrderList")
const goodsList = require("./router/goodsList")
const itemList = require("./router/itemList")
const orderChange = require("./router/orderChange")
const secondOrderList = require("./router/secondOrderList")
const user = require("./router/user")

const routers = [blockChain,firstOrderList,goodsList,itemList,orderChange,secondOrderList,user]


module.exports = routers;