define(function (require, exports, module) {
	var data = window.kityminder.data;
	var Promise = window.kityminder.Promise;

    var progressList = ['task-start', 'task-oct', 'task-quarter', 'task-3oct',
        'task-half', 'task-5oct', 'task-3quar', 'task-7oct', 'task-done'];

    function processXmlTopic (topic, obj) {
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
                            processXmlTopic(children[i], obj.children[i]);
                        }
                    }
                }
            });
        }
    }

    // 新版的xmind支持直接解压出json数据
    function processJsonTopic(topic, obj) {
        var data = {
            text: topic.title
        };
        obj.data = data;
        if (topic.href) {
            data.hyperlink = topic.href;
            data.hyperlinkTitle = '';
        }
        if (topic.notes && topic.notes.plan && topic.notes.plan.content) {
            data.note = topic.notes.plan.content;
        }
        if (topic.markers && topic.markers.length) {
            topic.markers.forEach(function(marker) {
                if (marker.markerId.indexOf('priority') === 0) {
                    data.priority = parseInt(marker.markerId.match(/\d+/)[0], 10);
                    return;
                }
                if (marker.markerId.indexOf('task') === 0) {
                    if (progressList.indexOf(marker.markerId) >= 0) {
                        data.progress = progressList.indexOf(marker.markerId) + 1;
                    }
                }
            })
        }
        if (
            topic.children
            && topic.children.attached
            && topic.children.attached.length
        ) {
            obj.children = [];
            topic.children.attached.forEach(function(child, index) {
                obj.children.push({})
                processJsonTopic(child, obj.children[index])
            });
        }
    }

    function xml2km(xml) {
        var json = $.xml2json(xml);
        var result = {};
        processXmlTopic(json.sheet.topic, result);
        return result;
    }

    function json2km(json) {
        if (!Array.isArray(json)) json = [json];
        var result = {};
        // 如果只有一个画布
        if (json.length === 1) {
            processJsonTopic(json[0].rootTopic, result);
        } else {
            result.data = {
                text: '多画布 xmind'
            };
            result.children = [];
            for (var index in json) {
                if (json[index]) {
                    var child = {};
                    result.children.push(child);
                    child.data = {
                        text: json[index].title
                    };
                    var rootTopic = json[index].rootTopic;
                    if (rootTopic) {
                        var child_child = {};
                        child.children = [child_child];
                        processJsonTopic(rootTopic, child_child);
                    }
                }
            }
        }
        return result;
    }

	data.registerProtocol("xmind", module.exports = {
        fileDescription: 'xmind 格式',
        fileExtension: '.xmind',
        dataType: 'text',

        decode: function(data) {
            return new Promise(function(resolve, reject) {
                try {
                    if (data.type === 'xml') {
                        resolve(xml2km(data.content));
                    }
                    if (data.type === 'json') {
                        resolve(json2km(data.content));
                    }
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