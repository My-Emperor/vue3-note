const path = require('path');

//webpack配置文件
module.exports = {
    //入口
    entry:"./src/index.js",

    //出口
    output:{
        //要求是绝对路径
        //path.resolve 拼接路径  __dirname 当前文件下的绝对路径
        path: path.resolve(__dirname,'./build'),
        //导出名称
        filename:"bundle.js"

    }
}