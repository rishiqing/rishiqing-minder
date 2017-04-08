/*
* @Author: qinyang
* @Date:   2016-09-27 23:28:23
* @Last Modified by:   qinyang
* @Last Modified time: 2017-04-08 06:58:57
* @for: 解析jenkins的信息
*/
'use strict';
const config = require('./.config.json');
const urlMap = config.urlMap;
const nameMap = {
  beta: 'beta版本',
  master: '正式版',
  dev: 'beta测试版'
};
const channelMap = {
  beta: '更新通知-beta',
  master: '更新通知-正式版',
  dev: '更新通知'
};

const autoDeployBranchPrefix = 'autodeploy-beta-';
const json = {};
if (process.env.JENKINS) {
  const branch = process.env.GIT_BRANCH.replace('origin/', '');
  let url = urlMap.master;
  let name = '自动部署分支', channel = '更新通知';
  if (/^autodeploy-beta-/.test(branch)) {
    url = `http://${branch.replace(autoDeployBranchPrefix, '')}.${config.autoDeployDomain}`;
    name = nameMap.dev;
  } else if (/^tags\/beta-deploy-/.test(branch)) { // 发布标签
    url = urlMap.beta;
    name = nameMap.beta;
    channel = channelMap.beta;
  } else if (/^tags\/master-deploy-/.test(branch)) { // 发布标签
    url = urlMap.master;
    name = nameMap.master;
    channel = channelMap.master;
  } else if (urlMap[branch]) {
    url = urlMap[branch];
    name = nameMap[branch];
    channel = channelMap[branch];
  }

  json.branch  = branch;
  json.url     = url;
  json.name    = name;
  json.channel = channel;
}

module.exports = json;
