angular.module('kityminderEditor')
	.directive('fileBtn', function (util) {
		return {
			restrict: 'E',
			templateUrl: 'ui/directive/fileBtn/fileBtn.html',
			scope: {
				minder: '=',
				editor: '='
			},
			replace: true,
			link: function (scope) {
				var editor = scope.editor;
				var minder = scope.minder;
				scope.kity = window.kity;

				scope.openInFile = function () {
					editor.postMessage.sendCommand('open_in_file');
				}
				scope.new = function () {
					editor.postMessage.sendCommand('new_minder');
				}
				scope.save = function () {
					editor.postMessage.sendCommand('save_minder');
				}
				scope.saveAs = function () {
					editor.postMessage.sendCommand('save_as_minder');
				}
				scope.generatePlan = function () {
					editor.postMessage.sendCommand('generate_plan_minder', minder.exportJson());
				}
				scope.uploadImage = function () {
					var fileInput = $('#upload-km');
					if (!fileInput.val()) {
		                return;
		            }
		            if (/^.*\.(km)$/.test(fileInput.val())) {
		                var file = fileInput[0].files[0];
		                util.readAsJson(file, function (err, data) {
		                	if (data) editor.postMessage.sendCommand('upload_local', data);
		                })
		            }
		            if (/^.*\.(xmind)$/.test(fileInput.val())) {
		                var file = fileInput[0].files[0];
		                util.openXmind(file);
		            }
		            if (/^.*\.(mm)$/.test(fileInput.val())) {
		                var file = fileInput[0].files[0];
		                util.openFreemind(file);
		            }
		            fileInput.val('');
				}

				scope.export = function (type) {
					var options;
					var _fileName = minder.getRoot().getText() || '未命名';
					if (type === 'freemind') {
						options = { 
							download: true,
							filename: _fileName + '.mm'
						};
					} else if (type === 'png') {
						options = {
							width: 300,
							height: 300
						};
					} else if (type === 'xmind') {
						options = {
							filename: _fileName + '.xmind'
						};
					}
					minder.exportData(type, options).then(function (data) {
						if (type === 'png') {
							util.downloadBase64(data, _fileName + '.png');
						} else if (type === 'freemind') {
							util.downloadText(data, options.filename);
						} else if (type === 'xmind') {
							saveAs(data, options.filename);
						}
					});
				}
			}
		};
	});