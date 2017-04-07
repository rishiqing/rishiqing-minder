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
				
				var readAsText = function (blob, callback) {
					var fileReader = new FileReader();
					fileReader.onload = function (e) {
	                	callback(null, e.target.result);
	                }
    				fileReader.readAsText(blob);
				}

				var readAsJson = function (blob, callback) {
					readAsText(blob, function (err, s) {
						if (err) {
							if (callback) callback(err);
							return;
						}
						if (s) {
							try {
								var json = JSON.parse(s);
								if (callback) callback(null, json);
							} catch (e) {
								if (callback) callback(e);
							}
						}
					});
				}

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
				scope.uploadImage = function () {
					var fileInput = $('#upload-km');
					if (!fileInput.val()) {
		                return;
		            }
		            if (/^.*\.(km)$/.test(fileInput.val())) {
		                var file = fileInput[0].files[0];
		                readAsJson(file, function (err, data) {
		                	if (data) editor.postMessage.sendCommand('upload_local', data);
		                })
		            }
		            fileInput.val('');
				}

				scope.export = function (type) {
					var options;
					if (type === 'freemind') {
						options = { 
							download: true,
							filename: minder.getRoot().getText() + '.mm'
						};
					} else if (type === 'png') {
						options = {
							width: 300,
							height: 300
						};
					}
					minder.exportData(type, options).then(function (data) {
						if (type === 'png') {
							console.log('data', data);
							util.downloadBase64(data, minder.getRoot().getText() + '.png');
						}
					});
				}
			}
		};
	});