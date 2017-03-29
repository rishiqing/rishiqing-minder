angular.module('kityminderEditor')
	.directive('toolbar', function () {
		return {
			restrict: 'A',
			templateUrl: 'ui/directive/toolbar/toolbar.html',
			scope: {
				minder: '=toolbar',
				editor: '='
			},
			link: function (scope) {
			}
		};
	});