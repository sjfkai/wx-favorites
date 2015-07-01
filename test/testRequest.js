var request = require('request');

request(encodeURI('http://www.tuling123.com/openapi/api?key=8c3fec087be20b887f35be89d8066791&info=嗨.') , function(err ,res){
	console.log(res.body);
});
