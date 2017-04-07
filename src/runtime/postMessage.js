/*
* @Author: qinyang
* @Date:   2017-04-05 08:47:29
* @Last Modified by:   qinyang
* @Last Modified time: 2017-04-06 08:05:11
*/

define(function (require, exports, module) {
	function PostMessageRuntime () {
		var minder = this.minder;

		var prefix = 'minder_';

		var DefaultCommand = {
			ContentChange: 'content_change',
			ImportJson: 'import_json',
			InitData: 'init_data'
		};

		function sendData (data) {
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

		this.postMessage = {
			sendData: sendData,
			sendCommand: sendCommand,
			sendInitData: sendInitData,
			DefaultCommand: DefaultCommand,
			onImportJson: onImportJson
		};

		minder.on('contentchange', function () {
			sendCommand(DefaultCommand.ContentChange, minder.exportJson());
		});
	}
	return module.exports = PostMessageRuntime;
});