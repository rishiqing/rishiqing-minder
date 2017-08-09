/*
* @Author: qinyang
* @Date:   2017-04-05 08:47:29
* @Last Modified by:   qin yang
* @Last Modified time: 2017-08-08 22:58:32
*/

define(function (require, exports, module) {
	function PostMessageRuntime () {
		var minder = this.minder;
		var search = window.location.search.split('?')[1];
		var ns = ''; // 命名空间，用来隔离事件通道
		if (search) {
			var list = search.split('&');
			list.forEach(function (item) {
				if (item.indexOf('ns') === 0) {
					ns = item.split('=')[1];
				}
			});
		}

		var prefix = ns + 'minder_';

		var DefaultCommand = {
			ContentChange: 'content_change',
			ImportJson: 'import_json',
			InitData: 'init_data',
			OpenFileByUrl: 'open_file_by_url'
		};

		function sendData (data) {
			data.ns = ns;
			window.parent.postMessage(data, '*');
		}

		function sendCommand (type, _data) {
			var data = {
				command: prefix + type,
				data: _data
			}
			sendData(data);
		}

		function sendInitData () {
			var data = {
				command: prefix + DefaultCommand.InitData,
				data: minder.exportJson()
			};
			sendData(data);
		}

		window.addEventListener('message', function (e) {
			var data = e.data;
			var command = data.command;
			switch (command) {
				case prefix + DefaultCommand.ImportJson:
					_onImportJson(data.data);
					break;
				case prefix + DefaultCommand.OpenFileByUrl:
					_onOpenFileByUrl(data.data);
					break;
				default:
					break;
			}
		})

		function _onImportJson (data) {
			onImportJsonFnList.forEach(function (fn) {
				fn(data);
			});
		}

		var onImportJsonFnList = []; // record callback list

		function onImportJson (callback) {
			onImportJsonFnList.push(callback);
		}

		function _onOpenFileByUrl (data) {
			onOpenFileByUrlFnList.forEach(function (fn) {
				fn(data);
			});
		}

		var onOpenFileByUrlFnList = [];

		function onOpenFileByUrl (callback) {
			onOpenFileByUrlFnList.push(callback);
		}

		this.postMessage = {
			sendData: sendData,
			sendCommand: sendCommand,
			sendInitData: sendInitData,
			DefaultCommand: DefaultCommand,
			onImportJson: onImportJson,
			onOpenFileByUrl: onOpenFileByUrl
		};

		minder.on('contentchange', function () {
			sendCommand(DefaultCommand.ContentChange, minder.exportJson());
		});
	}
	return module.exports = PostMessageRuntime;
});