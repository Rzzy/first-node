var fs = require("fs");

exports.getAllAlbum = function(callback){
  
	fs.readdir("./uploads",function(err,files){

		var allAlbum = [];

		(function iterator(i){

			if(i==files.length) {

				console.log(i + allAlbum);

				callback(allAlbum);

				return;

			}

			fs.stat("./uploads/"+files[i],function(err,stats){

				if(stats.isDirectory()){
					console.log(files[i]);
					allAlbum.push(files[i]);

				}
				iterator(i+1);
			});

		})(0);

	})

}

exports.getImagesByAlbum = function(albumName,callback){

	fs.readdir("./uploads/"+ albumName,function(err,files){

		console.log(files);

		var imagesArr = [];

		if(err){

			callback("没有找到图片文件",null)

			return;

		}

		(function iterator(i){

			if(i==files.length) {

				callback(err,imagesArr);

				return;

			}

			fs.stat("./uploads/"+ albumName + "/" +files[i],function(err,stats){

				if(stats.isFile()){
					console.log(files[i])
					imagesArr.push(files[i]);

				}
				iterator(i+1);
			});

		})(0);

	})




}