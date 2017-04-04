angular.module('kityminderEditor')
	.directive('fileBtn', function () {
		return {
			restrict: 'E',
			templateUrl: 'ui/directive/fileBtn/fileBtn.html',
			scope: {
				minder: '='
			},
			replace: true,
			link: function (scope) {
				scope.openInFile = function () {
					window.parent.postMessage({ command: 'minder_open_in_file' }, '*');
				}
			}
		};
	});