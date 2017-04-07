define(function(require, exports, module) {

    function NodeRuntime() {
        var runtime = this;
        var minder = this.minder;
        var hotbox = this.hotbox;
        var fsm = this.fsm;

        var main = hotbox.state('main');

        var buttons = [
            // '前移:Alt+Up:ArrangeUp',
            '插入子主题:Tab|Insert:AppendChildNode',
            '插入同级主题:Enter:AppendSiblingNode',
            // '后移:Alt+Down:ArrangeDown',
            
            '插入父主题:Shift+Tab|Shift+Insert:AppendParentNode',
            '分隔线::Divider',
            '复制:Ctrl+C:copy',
            '剪切:Ctrl+X:cut',
            '粘贴:Ctrl+V:paste',
            '删除:Delete|Backspace:RemoveNode'
        ];

        var AppendLock = 0;

        buttons.forEach(function(button) {
            var parts = button.split(':');
            var label = parts.shift();
            var key = parts.shift();
            var command = parts.shift();
            main.button({
                position: 'bottom',
                label: label,
                key: key,
                command: command,
                action: function() {
                    if (command === 'Divider') return;
                    if (command.indexOf('Append') === 0) {
                        AppendLock++;
                        minder.execCommand(command, '分支主题');

                        // provide in input runtime
                        function afterAppend () {
                            if (!--AppendLock) {
                                runtime.editText();
                            }
                            minder.off('layoutallfinish', afterAppend);
                        }
                        minder.on('layoutallfinish', afterAppend);
                    } else {
                        minder.execCommand(command);
                        fsm.jump('normal', 'command-executed');
                    }
                },
                enable: function() {
                    return minder.queryCommandState(command) != -1;
                },
                render: function(format, option) {
                    if (option.command === 'Divider') {
                        return '<span class="divider"></span>';
                    } else {
                        return format('<span class="l">{label}</span> <span class="s">{key}</span>', {
                            label: option.label,
                            key: option.key && option.key.split('|')[0]
                        });
                    }
                }
            });
        });

        // main.button({
        //     position: 'bottom',
        //     label: '导入节点',
        //     key: 'Alt + V',
        //     enable: function() {
        //         var selectedNodes = minder.getSelectedNodes();
        //         return selectedNodes.length == 1;
        //     },
        //     action: importNodeData,
        //     next: 'idle'
        // });

        // main.button({
        //     position: 'bottom',
        //     label: '导出节点',
        //     key: 'Alt + C',
        //     enable: function() {
        //         var selectedNodes = minder.getSelectedNodes();
        //         return selectedNodes.length == 1;
        //     },
        //     action: exportNodeData,
        //     next: 'idle'
        // });

        // function importNodeData() {
        //     minder.fire('importNodeData');
        // }

        // function exportNodeData() {
        //     minder.fire('exportNodeData');
        // }

        //main.button({
        //    position: 'ring',
        //    key: '/',
        //    action: function(){
        //        if (!minder.queryCommandState('expand')) {
        //            minder.execCommand('expand');
        //        } else if (!minder.queryCommandState('collapse')) {
        //            minder.execCommand('collapse');
        //        }
        //    },
        //    enable: function() {
        //        return minder.queryCommandState('expand') != -1 || minder.queryCommandState('collapse') != -1;
        //    },
        //    beforeShow: function() {
        //        if (!minder.queryCommandState('expand')) {
        //            this.$button.children[0].innerHTML = '展开';
        //        } else {
        //            this.$button.children[0].innerHTML = '收起';
        //        }
        //    }
        //})
    }

    return module.exports = NodeRuntime;
});
