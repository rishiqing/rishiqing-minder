angular.module('kityminderEditor')
	.directive('signBtn', function () {
		return {
			restrict: 'E',
			templateUrl: 'ui/directive/signBtn/signBtn.html',
			scope: {
				minder: '='
			},
			replace: true,
			link: function (scope) {

			}
		}
	});