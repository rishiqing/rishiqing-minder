angular.module('kityminderEditor').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ui/directive/appendNode/appendNode.html',
    "<div class=\"km-btn-group\"><div class=\"km-btn-item\" ng-disabled=\"minder.queryCommandState('AppendParentNode') === -1\" ng-click=\"minder.queryCommandState('AppendParentNode') === -1 || execCommand('AppendParentNode')\" tooltip-placement=\"bottom\" tooltip=\"{{ 'appendparentnode' | lang:'ui/command' }}\"><i class=\"icons2-add_father\"></i></div><div class=\"km-btn-item\" ng-disabled=\"minder.queryCommandState('AppendSiblingNode') === -1\" ng-click=\"minder.queryCommandState('AppendSiblingNode') === -1 ||execCommand('AppendSiblingNode')\" tooltip-placement=\"bottom\" tooltip=\"{{ 'appendsiblingnode' | lang:'ui/command' }}\"><i class=\"icons2-add_sibling\"></i></div><div class=\"km-btn-item\" ng-disabled=\"minder.queryCommandState('AppendChildNode') === -1\" ng-click=\"minder.queryCommandState('AppendChildNode') === -1 || execCommand('AppendChildNode')\" tooltip-placement=\"bottom\" tooltip=\"{{ 'appendchildnode' | lang:'ui/command' }}\"><i class=\"icons2-add_child\"></i></div></div>"
  );


  $templateCache.put('ui/directive/arrange/arrange.html',
    "<div class=\"km-btn-group arrange-group\"><div class=\"km-btn-item arrange-up\" ng-disabled=\"minder.queryCommandState('ArrangeUp') === -1\" ng-click=\"minder.queryCommandState('ArrangeUp') === -1 || minder.execCommand('ArrangeUp')\" title=\"{{ 'arrangeup' | lang:'ui/command' }}\"><i class=\"km-btn-icon\"></i> <span class=\"km-btn-caption\">{{ 'arrangeup' | lang:'ui/command' }}</span></div><div class=\"km-btn-item arrange-down\" ng-disabled=\"minder.queryCommandState('ArrangeDown') === -1\" ng-click=\"minder.queryCommandState('ArrangeDown') === -1 || minder.execCommand('ArrangeDown');\" title=\"{{ 'arrangedown' | lang:'ui/command' }}\"><i class=\"km-btn-icon\"></i> <span class=\"km-btn-caption\">{{ 'arrangedown' | lang:'ui/command' }}</span></div></div>"
  );


  $templateCache.put('ui/directive/colorPanel/colorPanel.html',
    "<div class=\"bg-color-wrap\"><span class=\"quick-bg-color\" ng-click=\"minder.queryCommandState('background') === -1 || minder.execCommand('background', bgColor)\" ng-disabled=\"minder.queryCommandState('background') === -1\"></span> <span color-picker class=\"bg-color\" set-color=\"setDefaultBg()\" ng-disabled=\"minder.queryCommandState('background') === -1\"><span class=\"caret\"></span></span> <span class=\"bg-color-preview\" ng-style=\"{ 'background-color': bgColor }\" ng-click=\"minder.queryCommandState('background') === -1 || minder.execCommand('background', bgColor)\" ng-disabled=\"minder.queryCommandState('background') === -1\"></span></div>"
  );


  $templateCache.put('ui/directive/expandLevel/expandLevel.html',
    "<div class=\"btn-group-vertical\" dropdown is-open=\"isopen\"><button type=\"button\" class=\"btn btn-default expand\" title=\"{{ 'expandtoleaf' | lang:'ui' }}\" ng-class=\"{'active': isopen}\" ng-click=\"minder.execCommand('ExpandToLevel', 9999)\"></button> <button type=\"button\" class=\"btn btn-default expand-caption dropdown-toggle\" title=\"{{ 'expandtoleaf' | lang:'ui' }}\" dropdown-toggle><span class=\"caption\">{{ 'expandtoleaf' | lang:'ui' }}</span> <span class=\"caret\"></span> <span class=\"sr-only\">{{ 'expandtoleaf' | lang:'ui' }}</span></button><ul class=\"dropdown-menu\" role=\"menu\"><li ng-repeat=\"level in levels\"><a href ng-click=\"minder.execCommand('ExpandToLevel', level)\">{{ 'expandtolevel' + level | lang:'ui/command' }}</a></li></ul></div>"
  );


  $templateCache.put('ui/directive/fileBtn/fileBtn.html',
    "<div class=\"km-btn-group dropdown file-btn\" is-open=\"isopen\" dropdown><div class=\"km-btn-primary dropdown-toggle\" dropdown-toggle ng-class=\"{'active': isopen}\"><span>{{ 'file' | lang:'ui' }}</span></div><ul class=\"dropdown-menu\"><li ng-click=\"new()\"><a href=\"javascript:;\">{{ 'new' | lang:'ui/file_dropdown' }}</a></li><li ng-click=\"openInFile()\"><a href=\"javascript:;\">{{ 'openInFile' | lang:'ui/file_dropdown' }}</a></li><li><a for=\"upload-km\" href=\"javascript:;\">{{ 'uploadLocal' | lang:'ui/file_dropdown' }} <input type=\"file\" id=\"upload-km\" name=\"upload-km\" class=\"upload-km\" accept=\".km\" onchange=\"angular.element(this).scope().uploadImage()\"></a></li><li class=\"divider\"></li><li ng-click=\"save()\"><a href=\"javascript:;\">{{ 'save' | lang:'ui/file_dropdown' }}</a></li><li ng-click=\"saveAs()\"><a href=\"javascript:;\">{{ 'saveAs' | lang:'ui/file_dropdown' }}</a></li><li class=\"divider\"></li><li ng-click=\"export('png')\" ng-if=\"kity.Browser.safari == undefined\"><a href=\"javascript:;\">{{ 'exportPNG' | lang:'ui/file_dropdown' }}</a></li><li ng-click=\"export('freemind')\"><a href=\"javascript:;\">{{ 'exportFreemind' | lang:'ui/file_dropdown' }}</a></li></ul></div>"
  );


  $templateCache.put('ui/directive/fontOperator/fontOperator.html',
    "<div class=\"font-operator km-btn-group\"><div class=\"dropdown font-size-list\" dropdown><div class=\"dropdown-toggle current-font-item\" dropdown-toggle ng-disabled=\"minder.queryCommandState('fontsize') === -1\"><a href class=\"current-font-size\">{{ minder.queryCommandValue('fontsize') || '字号' }}</a></div><div class=\"add-and-subtract\" ng-disabled=\"minder.queryCommandState('fontsize') === -1\"><span class=\"caret\" ng-click=\"addAndSubtract(1)\" style=\"transform: rotate(180deg)\"></span> <span class=\"caret\" ng-click=\"addAndSubtract(-1)\"></span></div><ul class=\"dropdown-menu font-list\"><li ng-repeat=\"f in fontSizeList\" class=\"font-item-wrap\"><a ng-click=\"minder.execCommand('fontsize', f)\" class=\"font-item\" ng-class=\"{ 'font-item-selected' : f == minder.queryCommandValue('fontsize') }\" ng-style=\"{'font-size': f + 'px'}\">{{ f }}</a></li></ul></div><div class=\"km-btn-item-second font-color-wrap\" ng-disabled=\"minder.queryCommandState('forecolor') === -1\" tooltip-placement=\"bottom\" tooltip=\"{{ 'forecolor' | lang:'ui' }}\"><i class=\"icons2-font_color\" ng-click=\"minder.queryCommandState('forecolor') === -1 || minder.execCommand('forecolor', foreColor)\"></i> <span color-picker class=\"font-color\" set-color=\"setDefaultColor()\" ng-disabled=\"minder.queryCommandState('forecolor') === -1\"><span class=\"caret\"></span></span> <span class=\"font-color-preview\" ng-style=\"{ 'background-color': foreColor }\" ng-click=\"minder.queryCommandState('forecolor') === -1 || minder.execCommand('forecolor', foreColor)\" ng-disabled=\"minder.queryCommandState('forecolor') === -1\"></span></div><div class=\"km-btn-item\" tooltip-placement=\"bottom\" tooltip=\"{{ 'bold' | lang:'ui' }}\" ng-click=\"minder.queryCommandState('bold') === -1 || minder.execCommand('bold')\" ng-class=\"{'font-bold-selected' : minder.queryCommandState('bold') == 1}\" ng-disabled=\"minder.queryCommandState('bold') === -1\"><i class=\"icons2-font_bold\"></i></div><div class=\"km-btn-item\" tooltip-placement=\"bottom\" tooltip=\"{{ 'italic' | lang:'ui' }}\" ng-click=\"minder.queryCommandState('italic') === -1 || minder.execCommand('italic')\" ng-class=\"{'font-italics-selected' : minder.queryCommandState('italic') == 1}\" ng-disabled=\"minder.queryCommandState('italic') === -1\"><i class=\"icons2-font_italic\"></i></div></div>"
  );


  $templateCache.put('ui/directive/fullScreen/fullScreen.html',
    "<div class=\"full-screen\"><div ng-click=\"toggleIcon()\" ng-class=\"{'icons2-full_screen_out': out, 'icons2-full_screen_in': in}\"></div></div>"
  );


  $templateCache.put('ui/directive/hyperLink/hyperLink.html',
    "<div class=\"km-btn-group\" is-open=\"isopen\"><div class=\"km-btn-item\" tooltip-placement=\"bottom\" tooltip=\"{{ 'link' | lang:'ui' }}\" ng-class=\"{'active': isopen}\" ng-click=\"minder.queryCommandState('HyperLink') === -1 || addHyperlink()\" ng-disabled=\"minder.queryCommandState('HyperLink') === -1\"><i class=\"icons2-link\"></i></div></div>"
  );


  $templateCache.put('ui/directive/imageBtn/imageBtn.html',
    "<div class=\"km-btn-group\" is-open=\"isopen\"><div class=\"km-btn-item\" tooltip-placement=\"bottom\" tooltip=\"{{ 'image' | lang:'ui' }}\" ng-class=\"{'active': isopen}\" ng-click=\"minder.queryCommandState('Image') === -1 || addImage()\" ng-disabled=\"minder.queryCommandState('Image') === -1\"><i class=\"icons2-image\"></i></div></div>"
  );


  $templateCache.put('ui/directive/kityminderEditor/kityminderEditor.html',
    "<div class=\"minder-editor-container\"><div class=\"toolbar\" toolbar=\"minder\" editor=\"editor\" ng-if=\"minder\"></div><div search-box minder=\"minder\" ng-if=\"minder\"></div><div class=\"minder-editor\"></div><div note-editor minder=\"minder\" ng-if=\"minder\"></div><div class=\"note-previewer\" note-previewer ng-if=\"minder\"></div><div class=\"navigator\" navigator minder=\"minder\" ng-if=\"minder\"></div></div>"
  );


  $templateCache.put('ui/directive/kityminderViewer/kityminderViewer.html',
    "<div class=\"minder-editor-container\"><div class=\"minder-viewer\"></div><div class=\"note-previewer\" note-previewer ng-if=\"minder\"></div><div class=\"navigator\" navigator minder=\"minder\" ng-if=\"minder\"></div></div>"
  );


  $templateCache.put('ui/directive/layout/layout.html',
    "<div class=\"readjust-layout\"><a ng-click=\"minder.queryCommandState('resetlayout') === -1 || minder.execCommand('resetlayout')\" class=\"btn-wrap\" ng-disabled=\"minder.queryCommandState('resetlayout') === -1\"><span class=\"btn-icon reset-layout-icon\"></span> <span class=\"btn-label\">{{ 'resetlayout' | lang: 'ui/command' }}</span></a></div>"
  );


  $templateCache.put('ui/directive/navigator/navigator.html',
    "<div class=\"nav-bar\"><div class=\"nav-btn zoom-in\" ng-click=\"minder.execCommand('zoomIn')\" title=\"{{ 'zoom-in' | lang : 'ui' }}\" ng-class=\"{ 'active' : getZoomRadio(zoom) == 0 }\"><div class=\"icons3-plus_2x\"></div></div><div class=\"zoom-pan\"><div class=\"origin\" ng-click=\"minder.execCommand('zoom', 100);\"></div><div class=\"indicator\" ng-style=\"{\n" +
    "             'transform': 'translate(' + getWidth(zoom) + 'px, 1px)',\n" +
    "             'transition': 'transform 200ms'\n" +
    "             }\"></div></div><div class=\"nav-btn zoom-out\" ng-click=\"minder.execCommand('zoomOut')\" title=\"{{ 'zoom-out' | lang : 'ui' }}\" ng-class=\"{ 'active' : getZoomRadio(zoom) == 1 }\"><div class=\"icons3-subtract_2x\"></div></div><div class=\"nav-btn hand\" ng-click=\"minder.execCommand('hand')\" title=\"{{ 'hand' | lang : 'ui' }}\" ng-class=\"{ 'active' : minder.queryCommandState('hand') == 1 }\"><div class=\"icons3-move_2x\"></div></div><div class=\"nav-btn camera\" ng-click=\"minder.execCommand('camera', minder.getRoot(), 600);\" title=\"{{ 'camera' | lang : 'ui' }}\"><div class=\"icons3-camera_2x\"></div></div></div>"
  );


  $templateCache.put('ui/directive/noteBtn/noteBtn.html',
    "<div class=\"km-btn-group\" is-open=\"isopen\"><div class=\"km-btn-item\" tooltip-placement=\"bottom\" tooltip=\"{{ 'note' | lang:'ui' }}\" ng-class=\"{'active': isopen}\" ng-click=\"minder.queryCommandState('note') === -1 || addNote()\" ng-disabled=\"minder.queryCommandState('note') === -1\"><i class=\"icons2-remark\"></i></div></div>"
  );


  $templateCache.put('ui/directive/noteEditor/noteEditor.html',
    "<div class=\"km-note\" ng-init=\"noteEditorOpen = false\" ng-show=\"noteEditorOpen\"><div class=\"header\"><h3 class=\"title\">备注</h3><i class=\"close-note-editor icon-close\" ng-click=\"closeNoteEditor()\"></i></div><div class=\"body\"><div ng-show=\"noteEnabled\" ui-codemirror=\"{ onLoad: codemirrorLoaded }\" ng-model=\"noteContent\" ui-codemirror-opts=\"{\n" +
    "                gfm: true,\n" +
    "                breaks: true,\n" +
    "                lineWrapping : true,\n" +
    "                mode: 'gfm',\n" +
    "                dragDrop: false,\n" +
    "                lineNumbers:true\n" +
    "             }\"></div><p ng-show=\"!noteEnabled\" class=\"km-note-tips\">请选择节点编辑备注</p></div></div>"
  );


  $templateCache.put('ui/directive/notePreviewer/notePreviewer.html',
    "<div id=\"previewer-content\" ng-show=\"showNotePreviewer\" ng-style=\"previewerStyle\" ng-bind-html=\"noteContent\"></div>"
  );


  $templateCache.put('ui/directive/operation/operation.html',
    "<div class=\"km-btn-group operation-group\"><div class=\"km-btn-item edit-node\" ng-disabled=\"minder.queryCommandState('text') === -1\" ng-click=\"minder.queryCommandState('text') === -1 || editNode()\" title=\"{{ 'editnode' | lang:'ui/command' }}\"><i class=\"km-btn-icon\"></i> <span class=\"km-btn-caption\">{{ 'editnode' | lang:'ui/command' }}</span></div><div class=\"km-btn-item remove-node\" ng-disabled=\"minder.queryCommandState('RemoveNode') === -1\" ng-click=\"minder.queryCommandState('RemoveNode') === -1 || minder.execCommand('RemoveNode');\" title=\"{{ 'removenode' | lang:'ui/command' }}\"><i class=\"km-btn-icon\"></i> <span class=\"km-btn-caption\">{{ 'removenode' | lang:'ui/command' }}</span></div></div>"
  );


  $templateCache.put('ui/directive/palletBtn/palletBtn.html',
    "<div class=\"km-btn-group dropdown r-dropdown pallet-btn\" dropdown><div class=\"km-btn-item dropdown-toggle\" tooltip-placement=\"bottom\" tooltip-append-to-body=\"true\" dropdown-toggle tooltip=\"{{ 'pallet' | lang:'ui' }}\" ng-class=\"{'active': isopen}\"><i class=\"icons2-pallet\"></i></div><div class=\"dropdown-menu r-dropdown-menu\"><div class=\"r-dropdown-header\">{{ 'pallet' | lang:'ui' }}</div><div class=\"r-dropdown-body\"><template-list minder=\"minder\" class=\"inline-directive\"></template-list><theme-list minder=\"minder\"></theme-list></div></div></div>"
  );


  $templateCache.put('ui/directive/priorityEditor/priorityEditor.html',
    "<ul class=\"km-priority tool-group\" ng-disabled=\"commandDisabled\"><li class=\"km-priority-item tool-group-item\" ng-repeat=\"p in priorities\" ng-click=\"commandDisabled || minder.execCommand('priority', p)\" ng-class=\"{ active: commandValue == p }\" title=\"{{ getPriorityTitle(p) }}\"><div class=\"km-priority-icon tool-group-icon priority-{{p}}\"></div></li></ul>"
  );


  $templateCache.put('ui/directive/progressEditor/progressEditor.html',
    "<ul class=\"km-progress tool-group\" ng-disabled=\"commandDisabled\"><li class=\"km-progress-item tool-group-item\" ng-repeat=\"p in progresses\" ng-click=\"commandDisabled || minder.execCommand('progress', p)\" ng-class=\"{ active: commandValue == p }\" title=\"{{ getProgressTitle(p) }}\"><div class=\"km-progress-icon tool-group-icon progress-{{p}}\"></div></li></ul>"
  );


  $templateCache.put('ui/directive/relationBtn/relationBtn.html',
    "<div class=\"km-btn-group\" is-open=\"isopen\"><div class=\"km-btn-item\" tooltip-placement=\"bottom\" tooltip=\"{{ 'add-relation' | lang:'ui' }}\" ng-class=\"{'active': isopen}\"><i class=\"icons2-add_relation\"></i></div></div>"
  );


  $templateCache.put('ui/directive/resourceEditor/resourceEditor.html',
    "<div class=\"resource-editor\"><div class=\"input-group\"><input class=\"form-control\" type=\"text\" ng-model=\"newResourceName\" ng-required ng-keypress=\"$event.keyCode == 13 && addResource(newResourceName)\" ng-disabled=\"!enabled\"> <span class=\"input-group-btn\"><button class=\"btn btn-default\" ng-click=\"addResource(newResourceName)\" ng-disabled=\"!enabled\">添加</button></span></div><div class=\"resource-dropdown clearfix\" id=\"resource-dropdown\"><ul class=\"km-resource\" ng-init=\"resourceListOpen = false\" ng-class=\"{'open': resourceListOpen}\"><li ng-repeat=\"resource in used\" ng-disabled=\"!enabled\" ng-blur=\"blurCB()\"><label style=\"background: {{resourceColor(resource.name)}}\"><input type=\"checkbox\" ng-model=\"resource.selected\" ng-disabled=\"!enabled\"> <span>{{resource.name}}</span></label></li></ul><div class=\"resource-caret\" click-anywhere-but-here=\"resourceListOpen = false\" is-active=\"resourceListOpen\" ng-click=\"resourceListOpen = !resourceListOpen\"><span class=\"caret\"></span></div></div></div>"
  );


  $templateCache.put('ui/directive/searchBox/searchBox.html',
    "<div id=\"search\" class=\"search-box clearfix\" ng-show=\"showSearch\"><div class=\"input-group input-group-sm search-input-wrap\"><input type=\"text\" id=\"search-input\" class=\"form-control search-input\" ng-model=\"keyword\" ng-keydown=\"handleKeyDown($event)\" aria-describedby=\"basic-addon2\"> <span class=\"input-group-addon search-addon\" id=\"basic-addon2\" ng-show=\"showTip\" ng-bind=\"'第 ' + curIndex + ' 条，共 ' + resultNum + ' 条'\"></span></div><div class=\"btn-group btn-group-sm prev-and-next-btn\" role=\"group\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"doSearch(keyword, 'prev')\"><span class=\"glyphicon glyphicon-chevron-up\"></span></button> <button type=\"button\" class=\"btn btn-default\" ng-click=\"doSearch(keyword, 'next')\"><span class=\"glyphicon glyphicon-chevron-down\"></span></button></div><div class=\"close-search\" ng-click=\"exitSearch()\"><span class=\"glyphicon glyphicon-remove\"></span></div></div>"
  );


  $templateCache.put('ui/directive/searchBtn/searchBtn.html',
    "<div class=\"btn-group-vertical\" dropdown is-open=\"isopen\"><button type=\"button\" class=\"btn btn-default search\" title=\"{{ 'search' | lang:'ui' }}\" ng-class=\"{'active': isopen}\" ng-click=\"enterSearch()\"></button> <button type=\"button\" class=\"btn btn-default search-caption dropdown-toggle\" ng-click=\"enterSearch()\" title=\"{{ 'search' | lang:'ui' }}\"><span class=\"caption\">{{ 'search' | lang:'ui' }}</span> <span class=\"sr-only\">{{ 'search' | lang:'ui' }}</span></button></div>"
  );


  $templateCache.put('ui/directive/selectAll/selectAll.html',
    "<div class=\"btn-group-vertical\" dropdown is-open=\"isopen\"><button type=\"button\" class=\"btn btn-default select\" title=\"{{ 'selectall' | lang:'ui' }}\" ng-class=\"{'active': isopen}\" ng-click=\"select['all']()\"></button> <button type=\"button\" class=\"btn btn-default select-caption dropdown-toggle\" title=\"{{ 'selectall' | lang:'ui' }}\" dropdown-toggle><span class=\"caption\">{{ 'selectall' | lang:'ui' }}</span> <span class=\"caret\"></span> <span class=\"sr-only\">{{ 'selectall' | lang:'ui' }}</span></button><ul class=\"dropdown-menu\" role=\"menu\"><li ng-repeat=\"item in items\"><a href ng-click=\"select[item]()\">{{ 'select' + item | lang:'ui' }}</a></li></ul></div>"
  );


  $templateCache.put('ui/directive/signBtn/signBtn.html',
    "<div class=\"km-btn-group dropdown r-dropdown sign-btn\" dropdown><div class=\"km-btn-item dropdown-toggle\" tooltip-placement=\"bottom\" tooltip-append-to-body=\"true\" tooltip=\"{{ 'sign' | lang:'ui' }}\" dropdown-toggle ng-class=\"{'active': isopen}\"><i class=\"icons2-add_sign\"></i></div><div class=\"dropdown-menu r-dropdown-menu\"><div class=\"r-dropdown-header\">{{ 'sign' | lang:'ui' }}</div><div class=\"r-dropdown-body\"><priority-editor minder=\"minder\"></priority-editor><progress-editor minder=\"minder\"></progress-editor></div></div></div>"
  );


  $templateCache.put('ui/directive/styleOperator/styleOperator.html',
    "<div class=\"style-operator\"><a ng-click=\"minder.queryCommandState('clearstyle') === -1 || minder.execCommand('clearstyle')\" class=\"btn-wrap clear-style\" ng-disabled=\"minder.queryCommandState('clearstyle') === -1\"><span class=\"btn-icon clear-style-icon\"></span> <span class=\"btn-label\">{{ 'clearstyle' | lang: 'ui' }}</span></a><div class=\"s-btn-group-vertical\"><a class=\"s-btn-wrap\" href ng-click=\"minder.queryCommandState('copystyle') === -1 || minder.execCommand('copystyle')\" ng-disabled=\"minder.queryCommandState('copystyle') === -1\"><span class=\"s-btn-icon copy-style-icon\"></span> <span class=\"s-btn-label\">{{ 'copystyle' | lang: 'ui' }}</span></a> <a class=\"s-btn-wrap paste-style-wrap\" href ng-click=\"minder.queryCommandState('pastestyle') === -1 || minder.execCommand('pastestyle')\" ng-disabled=\"minder.queryCommandState('pastestyle') === -1\"><span class=\"s-btn-icon paste-style-icon\"></span> <span class=\"s-btn-label\">{{ 'pastestyle' | lang: 'ui' }}</span></a></div></div>"
  );


  $templateCache.put('ui/directive/templateList/templateList.html',
    "<div class=\"temp-panel\"><ul class=\"temp-list\"><li ng-repeat=\"(key, templateObj) in templateList\" class=\"temp-item-wrap\"><a ng-click=\"minder.execCommand('template', key);\" class=\"temp-item {{key}}\" tooltip-placement=\"bottom\" tooltip=\"{{ key | lang: 'template' }}\" ng-class=\"{ 'temp-item-selected' : key == minder.queryCommandValue('template') }\"></a></li></ul></div>"
  );


  $templateCache.put('ui/directive/themeList/themeList.html',
    "<div class=\"theme-panel\"><ul class=\"theme-list\"><li ng-repeat=\"key in themeKeyList\" ng-class=\"{'theme-item-selected': minder.queryCommandValue('theme') == key}\" class=\"theme-item-wrap\"><a ng-click=\"minder.execCommand('theme', key);\" class=\"theme-item\" ng-style=\"getThemeThumbStyle(key)\" title=\"{{ key | lang: 'theme'; }}\">{{ key | lang: 'theme'; }}</a></li></ul></div>"
  );


  $templateCache.put('ui/directive/toolbar/toolbar.html',
    "<file-btn minder=\"minder\" editor=\"editor\"></file-btn><span class=\"vertical-divider\"></span><undo-redo editor=\"editor\"></undo-redo><span class=\"vertical-divider\"></span><append-node minder=\"minder\"></append-node><span class=\"vertical-divider\"></span><hyper-link minder=\"minder\"></hyper-link><image-btn minder=\"minder\"></image-btn><note-btn minder=\"minder\"></note-btn><sign-btn minder=\"minder\"></sign-btn><span class=\"vertical-divider\"></span><pallet-btn minder=\"minder\"></pallet-btn><span class=\"vertical-divider\"></span><font-operator minder=\"minder\" class=\"inline-directive\"></font-operator>"
  );


  $templateCache.put('ui/directive/topTab/topTab.html',
    "<tabset><tab heading=\"{{ 'idea' | lang: 'ui/tabs'; }}\" ng-click=\"toggleTopTab('idea')\" select=\"setCurTab('idea')\"><undo-redo editor=\"editor\"></undo-redo><append-node minder=\"minder\"></append-node><arrange minder=\"minder\"></arrange><operation minder=\"minder\"></operation><hyper-link minder=\"minder\"></hyper-link><image-btn minder=\"minder\"></image-btn><note-btn minder=\"minder\"></note-btn><priority-editor minder=\"minder\"></priority-editor><progress-editor minder=\"minder\"></progress-editor><resource-editor minder=\"minder\"></resource-editor></tab><tab heading=\"{{ 'appearence' | lang: 'ui/tabs'; }}\" ng-click=\"toggleTopTab('appearance')\" select=\"setCurTab('appearance')\"><template-list minder=\"minder\" class=\"inline-directive\"></template-list><theme-list minder=\"minder\"></theme-list><layout minder=\"minder\" class=\"inline-directive\"></layout><style-operator minder=\"minder\" class=\"inline-directive\"></style-operator><font-operator minder=\"minder\" class=\"inline-directive\"></font-operator></tab><tab heading=\"{{ 'view' | lang: 'ui/tabs'; }}\" ng-click=\"toggleTopTab('view')\" select=\"setCurTab('view')\"><expand-level minder=\"minder\"></expand-level><select-all minder=\"minder\"></select-all><search-btn minder=\"minder\"></search-btn></tab></tabset>"
  );


  $templateCache.put('ui/directive/undoRedo/undoRedo.html',
    "<div class=\"km-btn-group\"><div class=\"km-btn-item\" ng-disabled=\"editor.history.hasUndo() == false\" ng-click=\"editor.history.hasUndo() == false || editor.history.undo();\" tooltip-placement=\"bottom\" tooltip=\"{{ 'undo' | lang:'ui' }}\"><i class=\"icons2-revoke\"></i></div><div class=\"km-btn-item\" ng-disabled=\"editor.history.hasRedo() == false\" ng-click=\"editor.history.hasRedo() == false || editor.history.redo()\" tooltip-placement=\"bottom\" tooltip=\"{{ 'redo' | lang:'ui' }}\"><i class=\"icons2-redo\"></i></div></div>"
  );


  $templateCache.put('ui/dialog/hyperlink/hyperlink.tpl.html',
    "<div class=\"hyper-link-dialog r-modal-shadow\"><div class=\"r-modal-header\"><h3 class=\"r-modal-title\">链接</h3><r-modal-close></r-modal-close></div><div class=\"r-modal-body\"><form><div class=\"form-group\" id=\"link-url-wrap\" ng-class=\"{true: 'has-success', false: 'has-error'}[urlPassed]\"><label for=\"link-url\">链接地址：</label><input type=\"text\" class=\"form-control\" ng-model=\"url\" ng-blur=\"urlPassed = R_URL.test(url)\" ng-focus=\"this.value = url\" ng-keydown=\"shortCut($event)\" id=\"link-url\" placeholder=\"必填：以 http(s):// 或 ftp:// 开头\"></div><div class=\"form-group\" ng-class=\"{'has-success' : titlePassed}\"><label for=\"link-title\">提示文本：</label><input type=\"text\" class=\"form-control\" ng-model=\"title\" ng-blur=\"titlePassed = true\" id=\"link-title\" placeholder=\"选填：鼠标在链接上悬停时提示的文本\"></div></form></div><div class=\"r-modal-footer\"><button class=\"btn r-btn-danger pull-left\" ng-click=\"deleteCurrent()\">移除已有链接</button> <button class=\"btn r-btn-secondary-outline\" ng-click=\"cancel()\">取消</button> <button class=\"btn r-btn-primary\" ng-click=\"ok()\">确定</button></div></div>"
  );


  $templateCache.put('ui/dialog/imExportNode/imExportNode.tpl.html',
    "<div class=\"modal-header\"><h3 class=\"modal-title\">{{ title }}</h3></div><div class=\"modal-body\"><textarea type=\"text\" class=\"form-control single-input\" rows=\"8\" ng-keydown=\"shortCut($event);\" ng-model=\"value\" ng-readonly=\"type === 'export'\">\n" +
    "    </textarea></div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"ok()\" ng-disabled=\"type === 'import' && value == ''\">OK</button> <button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button></div>"
  );


  $templateCache.put('ui/dialog/image/image.tpl.html',
    "<div class=\"image-dialog r-modal-shadow\"><div class=\"r-modal-header\"><h3 class=\"r-modal-title\">图片</h3><r-modal-close></r-modal-close></div><div class=\"r-modal-body\"><tabset><tab heading=\"图片搜索\"><form class=\"form-inline\"><div class=\"form-group\"><label for=\"search-keyword\">关键词：</label><input type=\"text\" class=\"form-control\" ng-model=\"data.searchKeyword2\" id=\"search-keyword\" placeholder=\"请输入搜索的关键词\"></div><button class=\"btn r-btn-primary\" ng-click=\"searchImage()\">百度一下</button></form><div class=\"search-result\" id=\"search-result\"><ul><li ng-repeat=\"image in list\" id=\"{{ 'img-item' + $index }}\" ng-class=\"{'selected' : isSelected}\" ng-click=\"selectImage($event)\"><img id=\"{{ 'img-' + $index }}\" ng-src=\"{{ image.src || '' }}\" alt=\"{{ image.title }}\" onerror=\"this.parentNode.removeChild(this)\"> <span>{{ image.title }}</span></li></ul></div></tab><tab heading=\"外链图片\"><form><div class=\"form-group\" ng-class=\"{true: 'has-success', false: 'has-error'}[urlPassed]\"><label for=\"image-url\">链接地址：</label><input type=\"text\" class=\"form-control\" ng-model=\"data.url\" ng-blur=\"urlPassed = data.R_URL.test(data.url)\" ng-focus=\"this.value = data.url\" ng-keydown=\"shortCut($event)\" id=\"image-url\" placeholder=\"必填：以 http(s):// 开头\"></div><div class=\"form-group\" ng-class=\"{'has-success' : titlePassed}\"><label for=\"image-title\">提示文本：</label><input type=\"text\" class=\"form-control\" ng-model=\"data.title\" ng-blur=\"titlePassed = true\" id=\"image-title\" placeholder=\"选填：鼠标在图片上悬停时提示的文本\"></div><div class=\"form-group\"><label for=\"image-preview\">图片预览：</label><img class=\"image-preview\" id=\"image-preview\" ng-src=\"{{ data.url }}\" alt=\"{{ data.title }}\"></div></form></tab><tab heading=\"上传图片\" active=\"true\"><form><div class=\"form-group\"><input type=\"file\" name=\"upload-image\" id=\"upload-image\" class=\"upload-image\" accept=\".jpg,.JPG,jpeg,JPEG,.png,.PNG,.gif,.GIF\" onchange=\"angular.element(this).scope().uploadImage()\"><label for=\"upload-image\" class=\"btn r-btn-primary\">上传文件</label></div><div class=\"form-group\" ng-class=\"{'has-success' : titlePassed}\"><label for=\"image-title\">提示文本：</label><input type=\"text\" class=\"form-control\" ng-model=\"data.title\" ng-blur=\"titlePassed = true\" id=\"image-title\" placeholder=\"选填：鼠标在图片上悬停时提示的文本\"></div><div class=\"form-group\"><label for=\"image-preview\">图片预览：</label><img class=\"image-preview\" id=\"image-preview\" ng-src=\"{{ data.url }}\" title=\"{{ data.title }}\" alt=\"{{ data.title }}\"></div></form></tab></tabset></div><div class=\"r-modal-footer\"><button class=\"btn r-btn-danger pull-left\" ng-click=\"deleteCurrent()\">移除已有图片</button> <button class=\"btn r-btn-secondary-outline\" ng-click=\"cancel()\">取消</button> <button class=\"btn r-btn-primary\" ng-click=\"ok()\">确定</button></div></div>"
  );


  $templateCache.put('ui/bootstrap/rModal/rModal.tpl.html',
    "<div class=\"r-modal\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\"><div class=\"r-modal-content\" modal-transclude ng-click=\"close($event)\"></div></div>"
  );


  $templateCache.put('ui/bootstrap/rModal/rModalClose.tpl.html',
    "<button class=\"r-modal-close\" ng-click=\"$dismiss()\"><i class=\"icon-close\"></i></button>"
  );

}]);
