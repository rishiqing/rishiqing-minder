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

			}
		};
	});