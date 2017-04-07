angular.module('kityminderEditor')
	.directive('kityminderEditor', ['config', 'minder.service', 'revokeDialog', function(config, minderService, revokeDialog) {
		return {
			restrict: 'EA',
			templateUrl: 'ui/directive/kityminderEditor/kityminderEditor.html',
			replace: true,
			scope: {
				onInit: '&'
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
						

						window.minder = window.km = editor.minder;

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

					window.editor.postMessage.onImportJson(function (data) {
						editor.minder.importJson(data);
					});

                    scope.config = config.get();

                    //scope.minder.setDefaultOptions(config.getConfig());

                    window.editor.postMessage.sendInitData();

                    onInit(editor, editor.minder);
                }
			}
		}
	}]);