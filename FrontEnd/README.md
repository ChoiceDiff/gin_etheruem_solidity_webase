# BCTSP

#### 介绍
交易服务平台开发项目（demo）

#### 软件架构
前端：React+React-Router+Axios+Antd  
后端：用json-server模拟接口。用json文件进行存储

#### 安装教程
1. 需要事先安装好node.js环境，我使用的是node.js v16.13.0版本，最好和我版本保持一致。
2.  在bctsp文件夹下进入cmd窗口，执行npm install,第一次安装时间较长，等待即可；
3.  然后执行npm start，即可启动前端；
4.  在json-server文件夹下进入cmd窗口，执行如下指令
    npx json-server --watch info.json --port 8000,成功标志如下：
![alt 执行成功](./json-server/启动截图.png)  

#### server启动命令

npx json-server --watch .\json-server\info.json --port 8000

