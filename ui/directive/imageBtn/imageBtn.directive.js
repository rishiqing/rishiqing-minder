angular.module('kityminderEditor')
    .directive('imageBtn', ['rModal', function(rModal) {
        return {
            restrict: 'E',
            templateUrl: 'ui/directive/imageBtn/imageBtn.html',
            scope: {
                minder: '=',
                editor: '='
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
                            },
                            editor: function () {
                                return $scope.editor;
                            }
                        }
                    });

                    imageModal.result.then(function(result) {
                        // console.log('result', result);
                        // console.log('base64 length', result.base64.length);
                        if (!result.url) {
                            minder.execCommand('image', '', '');
                        } else {
                            var url = result.base64 ? result.base64 : result.url;
                            minder.execCommand('image', url, result.title || '');
                        }
                        // 这个地方在setTimeout之后，再触发一次contentchange事件，是因为修改图片之后
                        // 系统触发的content事件时，数据还没有得到真正的修改，
                        // 导致获取到的数据是旧的，所以先在这里这样解决一下
                        setTimeout(function () {
                            minder.fire('contentchange');
                        }, 0);
                    });
                }
            }
        }
    }]);