angular.module('kityminderEditor')
    .directive('hyperLink', ['rModal', function(rModal) {
        return {
            restrict: 'E',
            templateUrl: 'ui/directive/hyperLink/hyperLink.html',
            scope: {
                minder: '='
            },
            replace: true,
            link: function($scope) {
                var minder = $scope.minder;

                $scope.addHyperlink = function() {
                    var link = minder.queryCommandValue('HyperLink');
                    var hyperlinkModal = rModal.open({
                        animation: false,
                        templateUrl: 'ui/dialog/hyperlink/hyperlink.tpl.html',
                        controller: 'hyperlink.ctrl',
                        size: 'md',
                        resolve: {
                            link: function() {
                                return link;
                            }
                        }
                    });

                    hyperlinkModal.result.then(function(result) {
                        if (!result.url) {
                            minder.execCommand('HyperLink', null);
                        } else {
                            minder.execCommand('HyperLink', result.url, result.title || '');
                        }
                    });
                }
            }
        }
    }]);