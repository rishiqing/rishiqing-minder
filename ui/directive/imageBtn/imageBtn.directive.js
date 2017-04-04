angular.module('kityminderEditor')
    .directive('imageBtn', ['rModal', function(rModal) {
        return {
            restrict: 'E',
            templateUrl: 'ui/directive/imageBtn/imageBtn.html',
            scope: {
                minder: '='
            },
            replace: true,
            link: function($scope) {
                var minder = $scope.minder;

                $scope.addImage = function() {

                    var image = minder.queryCommandValue('image');

                    var imageModal = rModal.open({
                        animation: true,
                        templateUrl: 'ui/dialog/image/image.tpl.html',
                        controller: 'image.ctrl',
                        size: 'md',
                        resolve: {
                            image: function() {
                                return image;
                            }
                        }
                    });

                    imageModal.result.then(function(result) {
                        console.log('imageModal', result);
                        if (!result.url) {
                            minder.execCommand('Image', '');
                        } else {
                            minder.execCommand('image', result.url, result.title || '');
                        }
                    });
                }
            }
        }
    }]);