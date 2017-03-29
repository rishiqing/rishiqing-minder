angular.module('kityminderEditor')
	.directive('palletBtn', function () {
		return {
			restrict: 'E',
			templateUrl: 'ui/directive/palletBtn/palletBtn.html',
			scope: {
				minder: '='
			},
			replace: true,
			link: function (scope) {
				
			}
		};
	});