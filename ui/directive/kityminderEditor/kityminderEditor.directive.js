angular.module('kityminderEditor')
	.directive('kityminderEditor', ['config', 'minder.service', 'revokeDialog', '$http', 'util', function(config, minderService, revokeDialog, $http, util) {
		return {
			restrict: 'EA',
			templateUrl: 'ui/directive/kityminderEditor/kityminderEditor.html',
			replace: true,
			scope: {
				onInit: '&',
				disablePreview: '=',
				enablePreview: '=',
				state: '='
			},
			link: function(scope, element, attributes) {
				var $minderEditor = element.children('.minder-editor')[0];

				function onInit(editor, minder) {
					scope.onInit({
						editor: editor,
						minder: minder
					});

					minderService.executeCallback();
				}

				window.enablePreview = function () {
					scope.enablePreview();
					if (window.minder && window.minder.getStatus() !== 'readonly') window.minder.disable();
				};
				window.disablePreview = function () {
					scope.disablePreview();
					if (window.minder && window.minder.getStatus() === 'readonly') window.minder.enable();
				};

				// function getDataByUrl (url, callback) {
				// 	$http.get(url)
				// 	.then(function (result) {
				// 		callback(result.data);
				// 	})
				// }

				if (typeof(seajs) != 'undefined') {
					/* global seajs */
					seajs.config({
						base: './src'
					});

					define('demo', function(require) {
						var Editor = require('editor');

						var editor = window.editor = new Editor($minderEditor);

						if (!window.parent.I_AM_MINDER_FATHER) {
							if (window.localStorage.__dev_minder_content) {
								editor.minder.importJson(JSON.parse(window.localStorage.__dev_minder_content));
							}

							editor.minder.on('contentchange', function() {
								window.localStorage.__dev_minder_content = JSON.stringify(editor.minder.exportJson());
							});
						}

						window.editor.postMessage.onImportJson(function (data) {
							editor.minder.importJson(data);
						})

						window.editor.postMessage.onOpenFileByUrl(function (data) {
							util.openFileByUrl(data.url, data.contentType);
						})
						

						window.minder = window.km = editor.minder;

						if (scope.state.preview) {
							// fire('readonly') 比 disable()好用，原因是因为，如果只用minder.disable()，当选中某个节点的时候
							// 在键盘输入，一样会导致节点改变，在移动端，就会导致弹起键盘
							// 具体代码看 src/runtime/receiver.js line: 80 附近
							// receiver里面虽然监听了readonly, 但是disable方法并不会触发readonly事件
							// 导致虽然表面上看是readonly状态，但是receiver还是处在可以编辑的状态
							window.minder.fire('readonly');
							window.minder.execCommand('hand'); // 预览的时候，默认启用拖动
							if (scope.state.furl) util.previewByUrl(scope.state.furl);
						}

						scope.editor = editor;
						scope.minder = minder;
                        scope.config = config.get();

                        //scope.minder.setDefaultOptions(scope.config);
						scope.$apply();

						window.editor.postMessage.sendInitData();

						onInit(editor, minder);
					});

					seajs.use('demo');

				} else if (window.kityminder && window.kityminder.Editor) {
					var editor = new kityminder.Editor($minderEditor);

					window.editor = scope.editor = editor;
					window.minder = scope.minder = editor.minder;

					if (scope.state.preview) {
						window.minder.fire('readonly');
						window.minder.execCommand('hand'); // 预览的时候，默认启用拖动
						if (scope.state.furl) util.previewByUrl(scope.state.furl);
					}

					window.editor.postMessage.onImportJson(function (data) {
						editor.minder.importJson(data);
					});
					window.editor.postMessage.onOpenFileByUrl(function (data) {
						util.openFileByUrl(data.url, data.contentType);
					})

                    scope.config = config.get();

                    //scope.minder.setDefaultOptions(config.getConfig());

                    window.editor.postMessage.sendInitData();

                    onInit(editor, editor.minder);
                }
			}
		}
	}]);