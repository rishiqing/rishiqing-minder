define(function (require, exports, module) {
	var tpl = require('./tpl');

	var xmindTpl = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>'
					+ '<xmap-content xmlns="urn:xmind:xmap:xmlns:content:2.0" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xlink="http://www.w3.org/1999/xlink" timestamp="1407310121003" version="2.0">'
					+ '<sheet id="{{=id}}" timestamp="{{=timestamp}}">'
					+ '{{=topic}}'
        			+ '<title>画布 1</title>'
    				+ '</sheet>'
					+ '</xmap-content>';
	var revTpl = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>'
					+ '<xmap-revision-content xmlns="urn:xmind:xmap:xmlns:revision:1.0" xmlns:fo="http://www.w3.org/1999/XSL/Format"'
                    + 'xmlns:svg="http://www.w3.org/2000/svg" xmlns:xhtml="http://www.w3.org/1999/xhtml"'
                    + 'xmlns:xlink="http://www.w3.org/1999/xlink">'
    				+ '<sheet id="{{=id}}" timestamp="{{=timestamp}}" xmlns="urn:xmind:xmap:xmlns:content:2.0">'
        			+ '{{=topic}}'
        			+ '<title>画布 1</title>'
    				+ '</sheet>'
					+ '</xmap-revision-content>';
	var metaTpl = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>'
					+ '<meta xmlns="urn:xmind:xmap:xmlns:meta:2.0" version="2.0">'
    				+ '<Creator>'
        			+ '<Name>XMind</Name>'
        			+ '<Version>3.4.1.201401221918</Version>'
    				+ '</Creator>'
    				+ '<Thumbnail>'
        			+ '<Origin>'
            		+ '<X>209</X>'
            		+ '<Y>113</Y>'
        			+ '</Origin>'
        			+ '<BackgroundColor>#F3F4F9</BackgroundColor>'
    				+ '</Thumbnail>'
					+ '</meta>';
	var revisionsTpl = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>'
					+ '<xmap-revisions media-type="application/vnd.xmind.sheet" next-rev-num="2" resource-id="{{=id}}">'
    				+ '<revision creator-name="XMind" creator-version="3.4.1.201401221918"'
    				+ 'resource="Revisions/{{=id}}/rev-1-{{=timestamp}}.xml" rev-num="1"'
    				+ ' timestamp="{{=timestamp}}"/>'
					+ '</xmap-revisions>';
	var manifestTpl = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>'
					+ '<manifest xmlns="urn:xmind:xmap:xmlns:manifest:1.0">'
					+ '<file-entry full-path="content.xml" media-type="text/xml"/>'
					+ '<file-entry full-path="META-INF/" media-type=""/>'
					+ '<file-entry full-path="META-INF/manifest.xml" media-type="text/xml"/>'
					+ '<file-entry full-path="meta.xml" media-type="text/xml"/>'
					+ '<file-entry full-path="Revisions/" media-type=""/>'
					+ '<file-entry full-path="Revisions/{{=id}}/" media-type=""/>'
					+ '<file-entry full-path="Revisions/{{=id}}/rev-1-{{=timestamp}}.xml" media-type=""/>'
					+ '<file-entry full-path="Revisions/{{=id}}/revisions.xml" media-type=""/>'
					+ '<file-entry full-path="Thumbnails/" media-type=""/>'
					+ '<file-entry full-path="Thumbnails/thumbnail.png" media-type="image/png"/>'
					+ '</manifest>';
	var topicTpl = '<topic id="{{=data.id}}" structure-class="org.xmind.ui.map.clockwise" timestamp="{{=data.timestamp}}" {{=xlink}}>'
    				+ '<title>{{=data.text}}</title>'
    				+ '{{=markerRef}}'
    				+ '{{=image}}'
    				+ '{{=children}}'
    				+ '{{=notes}}'
					+ '</topic>';
	var notesTpl = '<notes><plain>{{=note}}</plain></notes>';
	var markerRef = '<marker-refs>'
        			+ '{{=markerId}}'
    				+ '</marker-refs>';
    var markerId = '<marker-ref marker-id="{{=markerId}}"/>';
	var imageTpl = '<xhtml:img svg:height="{{=data.imageSize.height}}" svg:width="{{=data.imageSize.width}}" xhtml:src="xap:{{=data.image}}"/>';
	var childrenTpl = '<children>'
        			+ '<topics type="attached">'
            		+ '{{=topic}}'
        			+ '</topics>'
    				+ '</children>';
   	var xlinkTpl = 'xlink:href="{{=link}}"';

    var progressList = ['task-start', 'task-oct', 'task-quarter', 'task-3oct',
        'task-half', 'task-5oct', 'task-3quar', 'task-7oct', 'task-done'];

    var getTimeAndId = function () {
    	var time = (new Date()).getTime();
    	return {
    		timestamp: time,
    		id: $.md5(time)
    	};
    }

	return module.exports = function (_node) {
		var template = '';
		var format = function (node) {
			var mt = '', it = '', ct = '', tt = '', xlt = '', nt = ''; // pt = markerTpl, it = imageTpl, ct = childrenTpl, t = topicTpl, xlt = xlinkTpl, nt = noteTpl
			var mdt = ''; // mdt = markerIdTpc
			var data = node.data;
			if (data.progress) {
				mdt += tpl(markerId, { markerId: progressList[data.progress - 1] });
			}
			if (data.priority) {
				mdt += tpl(markerId, { markerId: 'priority-' + data.priority })
			}
			if (mdt) mt = tpl(markerRef, { markerId: mdt });
			if (data.image && !/^data\:/.test(data.image)) {
				it = tpl(imageTpl, node);
			}
			if (data.hyperlink) {
				xlt = tpl(xlinkTpl, { link: data.hyperlink });
			}
			if (data.note) {
				nt = tpl(notesTpl, { note: data.note });
			}
			if (node.children && node.children.length) {
				var _ct = '';
				node.children.forEach(function (child) {
					_ct += format(child);
				});
				ct = tpl(childrenTpl, { topic: _ct });
			}

			var text = node.data.text ? node.data.text : '';
			text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
			var meta = getTimeAndId();
			tt = tpl(topicTpl, {
				data: {
					timestamp: meta.timestamp,
					id: meta.id,
					text: text
				},
				markerRef: mt,
				children: ct,
				image: it,
				xlink: xlt,
				notes: nt
			})
			return tt + '\n';

		}
		var tp = format(_node);
		var meta = getTimeAndId();
		var contentXml = tpl(xmindTpl, { topic: tp, id: meta.id, timestamp: meta.timestamp });
		var metaXml = tpl(metaTpl);
		var revisionsData = getTimeAndId();
		var revisionsXml = tpl(revisionsTpl, {
			id: meta.id,
			timestamp: revisionsData.timestamp
		});
		var revXml = tpl(revTpl, { topic: tp, id: meta.id, timestamp: meta.timestamp });
		var manifestXml = tpl(manifestTpl, {
			id: meta.id,
			timestamp: revisionsData.timestamp
		});
		return {
			contentXml: contentXml,
			metaXml: metaXml,
			manifestXml: manifestXml,
			meta: meta,
			revXml: revXml,
			revisionsXml: revisionsXml
		};
	};
});