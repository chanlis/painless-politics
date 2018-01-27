const express = require('express')
const app = express()


var request = require('request');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', (req, res) => {

	var options = {
		url: 'https://api.aylien.com/api/v1/extract',
		type: 'get',
  		qs: {
        // this url is hard coded...
  			url: "https://www.nytimes.com/2018/01/27/business/its-not-a-roar-but-the-global-economy-is-finally-making-noise.html?hp&action=click&pgtype=Homepage&clickSource=story-heading&module=first-column-region&region=top-news&WT.nav=top-news",
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

app.listen(3000, () => console.log('Example app listening on port 3000!'));