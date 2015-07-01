var wechat = require('co-wechat');
var chatService = require('../services/chatService');


var wechatConfig = {
	token: 'sjfkai',
	encodingAESKey: '3a2zUQO5qMkoHNL8sAIKGFiqfdqGSyExFpWZw5KLv5V',
	appid: 'wx5f8e788e63c54791'
}
module.exports = wechat(wechatConfig).middleware(function * () {
	// 微信输入信息都在this.weixin上
	var message = this.weixin;
	console.log(message);
	//console.log(this.wxsession);

	if (message.MsgType == 'text') {
		var content = message.Content;
		var chatResult = yield chatService.handleChat(this, content)
		if (!chatResult) { //true if is chat message
			this.body = {
				type: 'text',
				content: message.Content
			}
		}


	} else if (message.MsgType == 'image') {
		this.body = {
			type: 'image',
			content: {
				mediaId: message.MediaId
			}
		}
	} else if (message.MsgType == 'voice') {
		this.body = {
			type: 'voice',
			content: {
				mediaId: message.MediaId
			}
		}
	} else if (message.MsgType == 'video') {
		this.body = {
			type: 'video',
			content: {
				title: '您发送的视频',
				description: '您发送的视频',
				mediaId: message.MediaId
			}
		}
	} else if (message.MsgType == 'shortvideo') {
		this.body = {
			type: 'video',
			content: {
				//title: '您发送的视频',
				//description: '您发送的视频',
				mediaId: message.MediaId
			}
		}
	} else if (message.MsgType == 'location') {
		this.body = {
			type: 'text',
			content: 'location'
		}
	} else if (message.MsgType == 'link') {
		this.body = {
			type: 'text',
			content: 'link'
		}
	} else if (message.MsgType == 'event') {
		//订阅
		if (message.Event == 'subscribe') {
			this.body = {
				type: 'text',
				content: '欢迎订阅叼炸天的收藏夹。\n\n'+
						 '很抱歉，收藏功能暂未完成，\n'+
						 '但是您可以发送：\n \n'+
						 '  “聊一聊”、“来扯逼”、“聊天”等\n   与我聊天\n'
				
			}
		} else(
			this.body = {
				type: 'text',
				content: '非文本消息'
			}
		)

	}

	/*   if (message.FromUserName === 'diaosi') {
    // 回复屌丝(普通回复)
    this.body = 'hehe';
  } else if (message.FromUserName === 'text') {
    //你也可以这样回复text类型的信息
    this.body = {
      content: 'text object',
      type: 'text'
    };
  } else if (message.FromUserName === 'hehe') {
    // 回复一段音乐
    this.body = {
      type: "music",
      content: {
        title: "来段音乐吧",
        description: "一无所有",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3"
      }
    };
  } else if (message.FromUserName === 'kf') {
    // 转发到客服接口
    this.body = {
      type: "customerService",
      kfAccount: "test1@test"
    };
  } else {
    // 回复高富帅(图文回复)
    this.body = [
      {
        title: '你来我家接我吧',
        description: '这是女神与高富帅之间的对话',
        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        url: 'http://nodeapi.cloudfoundry.com/'
      }
    ];
  } */
});