var express = require("express");
var router = require("./controller/router.js");
var app = express();

//设置模版引擎
app.set("view engine","ejs");

//路由中间件
//静态页面
app.use(express.static('./public'));
app.use(express.static('./uploads'));
app.get("/",router.showIndex);
app.get("/:albumName",router.showAlbum);
app.get("/:up",router.showUp);
app.post("/:up",router.upPic);
app.use(function(req,res){
  res.render("err");
});
app.listen(2000);