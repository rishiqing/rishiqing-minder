angular.module('kityminderEditor')
	.directive('relationBtn', function () {
		return {
			restrict: 'E',
			templateUrl: 'ui/directive/relationBtn/relationBtn.html',
			scope: {
				minder: '='
			},
			replace: true,
			link: function (scope) {

			}
		};
	});