/*
* @Author: qinyang
* @Date:   2016-09-27 13:18:55
* @Last Modified by:   qinyang
* @Last Modified time: 2017-04-08 06:58:50
* @for: 往bearychat上面推消息
*/
const config = require('./.config.json');
const request   = require('sync-request');

module.exports = function(opt) {
  const json = {
    text: opt.text
  };
  if (opt.channel) {
    json.channel = opt.channel;
  }
  if (opt.user) {
    json.user = opt.user;
  }
  if (opt.notification) {
    json.notification = opt.notification;
  }
  if (opt.attachments) {
    json.attachments = opt.attachments;
  }
  request('POST', config.bearychatUrl, {
    'headers': {
      'Content-Type': 'application/json'
    },
    'json': json
  });
}
