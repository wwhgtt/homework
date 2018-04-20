homework for GXM

### 开发环境搭建

#### 前置条件：
已通过 homebrew 安装好 nondejs;  
http://brew.sh/

1. clone 项目 git repo 到本地,并进入到项目根目录
2. 执行 ｀npm install｀，并确认安装过程成功完成   
3. 执行 `export DEV_HOST=${你的本机 IP}`
4. 执行 'node dyson_services/dyson-server.js'
5. 执行 `npm run start`，并使用浏览器打开 http://${你的本机 IP}:3000/