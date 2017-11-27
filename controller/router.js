var file = require("../models/file.js");
var formidable = require("formidable");
var path = require("path");
var fs = require("fs");
var sd = require("silly-datetime");

exports.showIndex = function(req,res){
	
	file.getAllAlbum(function(allAlbum){
	
		res.render("index",{

			album:allAlbum

		})

	})

};
exports.showAlbum = function(req,res,next){
	
	var albumName = req.params.albumName;
	
	file.getImagesByAlbum(albumName,function(err,imagesArr){

		if(err){

			next();

			return;

		}

		res.render("album",{

			"albumName":albumName,
			"images":imagesArr

		})

	})

}
exports.showUp = function(req,res){

	file.getAllAlbum(function(allAlbum){
	
		res.render("up",{

			album:allAlbum

		})

	})

}
exports.upPic = function(req,res){

	var form = new formidable.IncomingForm();

	form.uploadDir = path.normalize(__dirname + "/../temp/");

	form.parse(req, function(err, fields, files,next) {

	  console.log(fields);
	  console.log(files);

      if(err){

      	next();

      	return;

      }
      
      var size = parseInt(files.tp.size);

      console.log(size);

      if(size>102400){

      	res.send("图片过大");

      	fs.unlink(files.tp.path);

      	return;

      }

      var ttt = sd.format(new Date(),'YYMMDDHHmmss');
      var ran = parseInt(Math.random()*89999+10000);
      var extname = path.extname(files.tp.name);

      var wj = fields.wjj;
      var oldPath  = files.tp.path;
      var newPath = path.normalize(__dirname+"/../uploads/"+ wj + "/" + ttt + ran +extname);

      fs.rename(oldPath,newPath,function(err){

      	if(err){

      		res.send("改名失败");

      		return;

      	}

      	res.send("改名成功");

      })



    });

}
















