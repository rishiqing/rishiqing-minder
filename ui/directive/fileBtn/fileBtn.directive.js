angular.module('kityminderEditor')
	.directive('fileBtn', function (util, rModal) {
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
				scope.rename = function () {
					editor.postMessage.sendCommand('rename');
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

				scope.export = function () {
					rModal.open({
                        animation: true,
                        templateUrl: 'ui/dialog/export/export.tpl.html',
                        controller: 'export.ctrl',
                        size: 'md',
                        resolve: {
                            minder: function () {
                                return scope.minder;
                            }
                        }
                    });
				}
			}
		};
	});