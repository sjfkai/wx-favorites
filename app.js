var koa = require('koa');
var route = require('koa-route');
var logger = require('koa-logger');
var controllers = require('./controllers');
var session = require('koa-generic-session');
var app = koa();
//var wechat = require('co-wechat');

app.use(session());
app.use(logger())

app.use(route.get('/' , function * (){
	this.body = "main page";
}));

app.use(route.get('/wechat' , controllers.wechat));
app.use(route.post('/wechat' , controllers.wechat));



app.listen(3333);