define(function (require, exports, module) {
	var tpl = require('./tpl');
	var freemindTpl = '<map version="1.0.1">\n'
					+ '<!-- To view this file, download free mind mapping software FreeMind from http://freemind.sourceforge.net -->\n'
    				+ '{{=freemindContent}}\n'
					+ '</map>';
	var topicTpl = '\n<node CREATED="{{=data.created}}" ID="ID_{{=data.id}}" MODIFIED="{{=data.created}}" '
					+ 'TEXT="{{=data.text}}" POSITION="{{=data.position}}">'
					+ '{{=childrenContent}}'
					+ '{{=priorityContent}}' // <icon BUILTIN="full-{data.priority}"/>
					+ '{{=imageContent}}'
					+ '</node>\n';
	var priorityTpl = '<icon BUILTIN="full-{{=data.priority}}"/>';
	var imageTpl = '<richcontent TYPE="NODE">'
        			+ '<html>'
          			+ '<head>'
            		+ '</head>'
            		+ '<body>'
                	+ '<img src="{{=data.image}}" width="{{=data.imageSize.width}}" height="{{=data.imageSize.height}}"/>'
            		+ '</body>'
        			+ '</html>'
    				+ '</richcontent>'

	return module.exports = function (_node) { // 这个地方必须写return ,不然会报错，操。
		var template = '';
		var _position = ['right', 'left'];
		var _id = 1;
		var _created = 1;
		var format = function (node, position) {
			var pt = '', it = '', ct = '', tt = ''; // pt = priorityTpl, it = imageTpl, ct = childrenTpl, t = topicTpl
			if (node.data.priority) {
				pt = tpl(priorityTpl, node);
			}
			if (node.data.image && !/^data\:/.test(node.data.image)) {
				it = tpl(imageTpl, node);
			}
			if (node.children && node.children.length) {
				node.children.forEach(function (child, index) {
					ct += format(child, _position[index % 2]);
				})
			}
			var text = node.data.text ? node.data.text : '';
			text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
			tt = tpl(topicTpl, {
				data: {
					created: _created++,
					id: _id++,
					text: text,
					position: position ? position : '',
				},
				childrenContent: ct,
				priorityContent: pt,
				imageContent: it
			})
			return tt + '\n';
		}
		var tp = format(_node);
		return tpl(freemindTpl, { freemindContent: tp });
	};
})