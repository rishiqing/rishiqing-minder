angular.module('kityminderEditor')
	.directive('fullScreen', function () {
		return {
			restrict: 'E',
			templateUrl: 'ui/directive/fullScreen/fullScreen.html',
			scope: {
				minder: '=',
				editor: '='
			},
			replace: true,
			link: function (scope) {
				scope.out = true;
				scope.in = false;
				scope.toggleIcon = function () {
					scope.out = !scope.out;
					scope.in = !scope.in;
					editor.postMessage.sendCommand('full_screen', scope.out);
				};
				scope.getTip = function () {
					if (scope.out) {
						return '全屏';
					} else return '退出全屏';
				}
			}
		};
	});