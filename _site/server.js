import urlArr from "script.js";


const express = require('express')
const app = express()

// text array
var txtArr;

var request = require('request');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

for(var i = 0; i < urlArr.length; i ++) {
  app.get('/', (req, res) => {

	 var options = {
	 	url: 'https://api.aylien.com/api/v1/extract',
		type: 'get',
  		qs: {
        // this url is hard coded...
  			url: urlArr[i];
    		best_image: false,
    	},
   		headers: {
   			'X-AYLIEN-TextAPI-Application-Key': "abe3d0e38369c8254dec0e700b88e15e",
   			'X-AYLIEN-TextAPI-Application-ID': "41d4d6e1",
   		}
   	};

   	function callback(error, response, body) {
   		console.log(error, response.statusCode, JSON.parse(body));
  		if (!error && response.statusCode == 200) {
    		var info = JSON.parse(body);
    		res.send(info);
  		}
 	}

   	request(options, callback);
})

}

app.listen(3000, () => console.log('Example app listening on port 3000!'));