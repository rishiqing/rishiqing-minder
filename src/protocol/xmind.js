define(function (require, exports, module) {
	var data = window.kityminder.data;
	var Promise = window.kityminder.Promise;

    var progressList = ['task-start', 'task-oct', 'task-quarter', 'task-3oct',
        'task-half', 'task-5oct', 'task-3quar', 'task-7oct', 'task-done'];

    function processTopic (topic, obj) {
        obj.data = {
            text: topic.title
        };
        if (topic['xlink:href']) {
            obj.data.hyperlink = topic['xlink:href'];
            obj.data.hyperlinkTitle = '';
        }
        if (topic.notes && topic.notes.plain) {
            obj.data.note = topic.notes.plain;
        }
        if (topic.marker_refs && topic.marker_refs.marker_ref && topic.marker_refs.marker_ref.marker_id) {
            var marker_id = topic.marker_refs.marker_ref.marker_id;
            if (marker_id.indexOf('priority') === 0) {
                obj.data.priority = parseInt(marker_id.match(/\d+/)[0], 10);
            }
            if (progressList.indexOf(marker_id) >= 0) {
                obj.data.progress = progressList.indexOf(marker_id) + 1;
            }
        }
        if (topic.children && topic.children.topics) {
            var topics = topic.children.topics;
            if (!Array.isArray(topics)) topics = [topics];
            topics.forEach(function (wrap) {
                if (wrap.type === 'attached') {
                    if (!obj.children) obj.children = [];
                    var children = Array.isArray(wrap.topic) ? wrap.topic : [wrap.topic];
                    for (i in children) {
                        if (children[i]) {
                            obj.children.push({});
                            processTopic(children[i], obj.children[i]);
                        }
                    }
                }
            });
        }
    }

    function xml2km(xml) {
        var json = $.xml2json(xml);
        var result = {};
        processTopic(json.sheet.topic, result);
        return result;
    }

	data.registerProtocol("xmind", module.exports = {
        fileDescription: 'xmind 格式',
        fileExtension: '.xmind',
        dataType: 'text',

        decode: function(local) {
            return new Promise(function(resolve, reject) {
                try {
                    resolve(xml2km(local));
                } catch (e) {
                    reject(new Error('XML 文件损坏！'));
                }
            });
        },

        encode: function(json, km, options) {
            return new Promise(function (resolve, reject) {
                var xmindTpl = require('./tpl_xmind');
                var data = xmindTpl(json.root);
                // 生成 zip 文件
                var zip = new JSZip();
                zip.file('content.xml', data.contentXml);
                zip.file('meta.xml', data.metaXml);
                var metaInfoFolder = zip.folder('META-INF');
                metaInfoFolder.file('manifest.xml', data.manifestXml);
                var revisionsFolder = zip.folder('Revisions').folder(data.meta.id);
                revisionsFolder.file('rev-1-' + data.meta.timestamp + '.xml', data.revXml);
                revisionsFolder.file('revisions.xml', data.revisionsXml);
                zip.generateAsync({ type: "blob" }).then(function (content) {
                    resolve(content);
                });
            });
        }
    });
});