angular.module('kityminderEditor')
    .controller('export.ctrl', function($scope, $modalInstance, util, minder) {
        $scope.typeList = [
            {
                name: 'PNG 图片',
                icon: 'icons4-png',
                type: 'png'
            }, {
                name: 'SVG 矢量图',
                icon: 'icons4-svg',
                type: 'svg'
            }, {
                name: 'Markdown 格式',
                icon: 'icons4-markdown',
                type: 'markdown'
            }, {
                name: 'Xmind 格式',
                icon: 'icons4-xmind',
                type: 'xmind'
            }, {
                name: 'Freemind格式',
                icon: 'icons4-freemind',
                type: 'freemind'
            }, {
                name: 'km 格式',
                icon: 'icons4-km',
                type: 'km'
            }
        ];

        $scope.export = function (type) {
            $modalInstance.close();
            var options;
            var _fileName = minder.getRoot().getText().replace(/\n/g, '') || '未命名';
            if (type === 'km') {
                util.downloadText(JSON.stringify(minder.exportJson()), _fileName + '.km');
                return;
            }
            if (type === 'freemind') {
                options = { 
                    download: true,
                    filename: _fileName + '.mm'
                };
            } else if (type === 'png') {
                options = {
                    width: 300,
                    height: 300
                };
            } else if (type === 'xmind') {
                options = {
                    filename: _fileName + '.xmind'
                };
            } else if (type === 'markdown') {
                options = {
                    filename: _fileName + '.md'
                };
            } else if (type === 'svg') {
                options = {
                    filename: _fileName + '.svg'
                };
            }
            minder.exportData(type, options).then(function (data) {
                if (type === 'png') {
                    util.downloadBase64(data, _fileName + '.png');
                } else if (type === 'freemind' || type === 'markdown' || type === 'svg') {
                    util.downloadText(data, options.filename);
                } else if (type === 'xmind') {
                    saveAs(data, options.filename); // saveAs 是一个公共方法，一个插件暴露出来的
                }
            });
            
        }
        
    });