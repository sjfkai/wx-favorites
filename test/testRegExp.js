var INCHATREG = /.*聊|扯逼.*/;
var OUTCHATREG = /.*退出|再见|不聊|改天聊.*/;

console.log('IN 聊天 ' , INCHATREG.test('聊天'));

console.log('IN 来扯逼 ' , INCHATREG.test('来扯逼'));

console.log('IN 聊会天 ' , INCHATREG.test('聊会天'));

console.log('IN 聊一聊？ ' , INCHATREG.test('聊一聊'));

console.log('OUT 改天聊 ' , OUTCHATREG.test('改天聊'));

console.log('OUT 再见 ' , OUTCHATREG.test('再见'));

console.log('OUT 退出 ' , OUTCHATREG.test('退出'));

console.log('OUT 不聊了' , OUTCHATREG.test('不聊了'));

console.log('OUT 呵呵' , OUTCHATREG.test('呵呵'));




