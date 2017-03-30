// 新写一个rModal, 用来重写 bootstrap modal dom结构部分
angular.module('kityminderEditor')
	.factory('rModal', function ($modal) {
		return {
			open: function (modalOptions) {
				var options = angular.extend({
					animation: false,
					windowTemplateUrl: 'ui/bootstrap/rModal/rModal.tpl.html',
					backdropClass: 'r-modal-backdrop'
				}, modalOptions);
				return $modal.open(options)
			}
		};
	})
	.directive('rModalClose', function () {
		return {
			restrict: 'E',
			templateUrl: 'ui/bootstrap/rModal/rModalClose.tpl.html',
			replace: true,
			link: function () {

			}
		};
	})
