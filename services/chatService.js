var request = require('co-request');

var INCHATREG = /.*聊|扯逼.*/; 
var OUTCHATREG = /.*退出|再见|不聊|改天聊.*/;
/**
 * 处理可能为聊天的文本信息
 * @param app		koa上下文
 *        message	用户发送的文字信息
 *
 * @return true		是与机器人的聊天信息无需收藏
 *         false	收藏此信息
 */
var handleChat = exports.handleChat = function * (app, message) {
	//console.log(app.wxsession.isChatting);
	if (app.wxsession.isChatting) {
		if (OUTCHATREG.test(message)) {
			app.wxsession.isChatting = false;
			app.body = {
				type: 'text',
				content: '您已退出聊天模式'
			}
			return true;
		}
		app.body = yield chatWithRobot(app.wxSessionId, message);

		return true;
	} else if (INCHATREG.test(message)) {

		app.wxsession.isChatting = true;
		app.body = {
			type: 'text',
			content: '你好呀，我是小夹儿。\n\n（您已进入聊天模式，回复“再见”、“退出”、“改天聊”等即可退出）'
		}
		return true;
	} else {
		return false;
	}
}

/**
 * 与图灵机器人聊天
 *
 * @param userid	tuling API所需userid
 *        message	要发送给机器人的信息
 *
 * @return  将机器人返回的内容转化为微信可接收格式后的内容
 */
var chatWithRobot = function * (userId, message) {
	var result;
	//转发给图灵机器人
	var uri = encodeURI('http://www.tuling123.com/openapi/api?key=8c3fec087be20b887f35be89d8066791&info=' + message + '&userid=' + userId);
	console.log('request tuling123 ' + uri);
	var requestOpt = {
		uri: uri,
		headers: {
			'Content-type': 'text/html',
			'charset': 'utf-8'
		}
	};
	var response = yield request(requestOpt);
	if (response.statusCode == 200) {
		var result = JSON.parse(response.body);
		console.log(result);
		if (result.code == 100000) { //文字
			//返回文字
			return {
				type: 'text',
				content: result.text
			}
		} else if (result.code == 200000) { //url
			//返回url
			return {
				type: 'text',
				content: result.url
			}
		} else if (result.code == 302000) { //新闻
			var news = result.list;
			var content = [];
			for (var i = 0; i < news.length && i < 10; i++) {
				var thisNews = news[i];
				content.push({
					title: thisNews.article || '',
					description: thisNews.article || '',
					picurl: thisNews.icon || '',
					url: thisNews.detailurl || ''
				});
			}
			//返回图文
			return content;
		} else if (result.code == 305000) { //列车
			//返回url
			return {
				type: 'text',
				content: result.list[0] ? result.list[0].detailurl : '没有找到列车'
			}
		} else if (result.code == 306000) { //航班
			//返回url
			return {
				type: 'text',
				content: result.list[0] ? result.list[0].detailurl : '没有找到航班'
			}
		} else if (result.code == 308000) { //菜谱
			var details = result.list;
			var content = [];
			for (var i = 0; i < details.length && i < 10; i++) {
				var thisDetail = details[i];
				content.push({
					title: thisDetail.name || '',
					description: thisDetail.info || '',
					picurl: thisDetail.icon || '',
					url: thisDetail.detailurl || ''
				});
			}
			//返回图文
			return content;
		} else {
			//返回文字
			return {
				type: 'text',
				content: '不应该啊，机器人什么也没说'
			}
		}
	} else {
		//返回文字
		return {
			type: 'text',
			content: '服务器请求出错 ' + statusCode
		}
	}
}