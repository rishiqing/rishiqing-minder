/*
* @Author: qin yang
* @Date:   2016-12-09 09:51:37
* @Last Modified by:   qinyang
* @Last Modified time: 2017-04-08 08:24:40
*/

require('babel-core/register');
var config = require('./.config.json');
var yargs = require('yargs');
var Util_File = require('./dev/utils/file');
var child_process = require('child_process');
var bearychat = require('./bearychat.js');
var jenkinsInfo = require('./decodeJenkinsInfo.js');
var bearychatUser = config.bearychatUser;
var package = require('./package.json');
var path = require('path');
var fs = require('fs');

var type,
  distPath = './dist',
  distDeployPath = './distDeploy',
  spawnSync = child_process.spawnSync,
  indexHtmlPaths = [];

if (yargs.argv.beta) {
  type = 'beta';
} else if (yargs.argv.release) {
  type = 'release';
} else {
  console.log('x 请指定需要部署的环境beta或者release'.error);
  process.exit(1);
}

var env = {beta: 'production_beta', release: 'production'}[type];
var gruntResult = spawnSync('npm', ['run', 'grunt-build'], { stdio: 'inherit' });
if (gruntResult.status) {
  bearychat({ text: 'grunt打包失败 分支：' + jenkinsInfo.branch, user: bearychatUser });
  process.exit(1);
}
bearychat({ text: '√ 成功生成打包文件 分支：' + jenkinsInfo.branch, user: bearychatUser });

var copyResult = spawnSync('cp', ['-Rf', distPath, distDeployPath], { stdio: 'inherit' });
if (copyResult.status) {
  bearychat({ text: '复制dist文件失败 分支：' + jenkinsInfo.branch, user: bearychatUser });
  process.exit(1);
}


var fileList      = Util_File.readFileList(distDeployPath) || [];
var gzipType      = ['js', 'css'];
var gzipFileMap   = {};
fileList.forEach((item) => {
  if (gzipType.indexOf(item.type) >= 0 && !item.isGzip) {
    var fBefore         = new Util_File(item.path);
    var md5Before       = fBefore.file.getMd5();
    var oldPath         = item.path;
    var mapPath         = oldPath + '.map';
    var newPath         = oldPath.replace('.' + item.type, '.' + md5Before.slice(0, 10) + '.' + item.type);
    var newPathDetail   = path.parse(newPath);
    var newOriginalPath = path.resolve(newPath, '../original-sources/' + newPathDetail.base);

    spawnSync('mkdir', ['-p', path.resolve(newPath, '../original-sources')]);

    // 如果原来的路径和gzip之后的路径一样，则需要先重命名原文件
    if (oldPath === newPath) {
      var _oldPath = path.resolve(oldPath, '../_' + fBefore.file.name);
      fBefore.file.rename(_oldPath);
      oldPath = _oldPath;
    }

    // // 在有source map的源文件末尾添加上source map 链接
    // var fContent = fBefore.file.read();
    // fContent += '\n' + '//# sourceMappingURL=' + `${newPathDetail.base}.map`;
    // fBefore.file.write(fContent);

    // 进行gzip压缩，并重命名源码文件
    var gzipResult = spawnSync('gzip', ['-9', '-c', oldPath], { stdio: ['inherit', fs.openSync(`${oldPath}.gz`, 'w'), 'inherit'] });
    if (gzipResult.status) {
      bearychat({ text: 'gzip压缩失败, 文件：' + fBefore.file.name + ', 分支：' + jenkinsInfo.branch, user: bearychatUser });
      process.exit(1);
    }
    var gzPath  = oldPath + '.gz';
    var f       = new Util_File(gzPath);
    f.file.rename(newPath);
    gzipFileMap[item.name] = f.file.name;

    // // 重命名.map文件
    // var fm      = new Util_File(mapPath);
    // fm.file.rename(newPath + '.map');

    // 重命名原来的source文件，全部放到 original-sources 文件夹下
    fBefore.file.rename(newOriginalPath);
  }
});

indexHtmlPaths = fileList.filter(function (item) {
  return item.name === 'index.html';
});

indexHtmlPaths.forEach(function (item) {
  var indexHtmlPath = item.path;
  var indexHtml = new Util_File(indexHtmlPath);
  var indexContent = indexHtml.file.read();
  for (var before in gzipFileMap) {
    var after = gzipFileMap[before];
    indexContent = indexContent.replace(new RegExp(before, 'g'), after);
  }
  indexHtml.file.write(indexContent);

  var versionFile = path.resolve(indexHtmlPath, '../backup/index.' + package.version + '.' + new Date().getTime() + '.html');
  spawnSync('mkdir', [path.resolve(indexHtmlPath, '../backup')]);
  spawnSync('cp', [indexHtmlPath, versionFile], { stdio: 'inherit' });
});

process.exit(0);
