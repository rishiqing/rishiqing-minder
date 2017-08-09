angular.module('kityminderEditor')
	.service('util', function ($http) {
		var utf8_decode = function (utftext) {
			var string = "";
		    var i = 0;
		    var c = c1 = c2 = 0;

		    while ( i < utftext.length ) {

		        c = utftext.charCodeAt(i);

		        if (c < 128) {
		            string += String.fromCharCode(c);
		            i++;
		        }
		        else if((c > 191) && (c < 224)) {
		            c2 = utftext.charCodeAt(i+1);
		            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
		            i += 2;
		        }
		        else {
		            c2 = utftext.charCodeAt(i+1);
		            c3 = utftext.charCodeAt(i+2);
		            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
		            i += 3;
		        }

		    }
		    return string;
		}

		var convert_buffer_to_utf8 = function (buffer) {
			var s = String.fromCharCode.apply(null, new Uint8Array(buffer));
			return utf8_decode(s);
		}

		var downloadByUrl = function (url, fileName) {
			var a = document.createElement('a');//这里建一个a标签，用于下面下载图片
			a.href = url;
			a.setAttribute('download', fileName);
			a.target = '_blank';
			var e = document.createEvent('MouseEvents');
			e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			a.dispatchEvent(e);// 触发点击事件，开始下载
		}

		var downloadBase64 = function (_base64, fileName) {
			var base64 = _base64.split(',')[1];
			var base64Info = _base64.split(',')[0];
			var type = base64Info.split(';')[0].split(':');
			var bytes = window.atob(base64);
			var ab = new ArrayBuffer(bytes.length);
			var ia = new Uint8Array(ab);
			for (var i = 0; i < bytes.length; i++) {
				ia[i] = bytes.charCodeAt(i);
			}
			var image = new Blob([ab], { type: type });
			saveAs(image, fileName);
		}

		var downloadText = function (text, fileName) {
			var blob = new Blob([text]);
			saveAs(blob, fileName);
		}

		var readAsText = function (blob, callback) {
			var fileReader = new FileReader();
			fileReader.onload = function (e) {
            	if (callback) callback(null, e.target.result);
            }
			fileReader.readAsText(blob);
		}

		var readAsJson = function (blob, callback) {
			readAsText(blob, function (err, s) {
				if (err) {
					if (callback) callback(err);
					return;
				}
				if (s) {
					try {
						var json = JSON.parse(s);
						if (callback) callback(null, json);
					} catch (e) {
						if (callback) callback(e);
					}
				}
			});
		}

		var readAsDataURL = function (blob, callback) {
			var fileReader = new FileReader();
			var url = URL.createObjectURL(blob);
			fileReader.onload = function (e) {
				if (callback) callback(null, {
					base64: e.target.result,
					url: url
				});
			}
			fileReader.readAsDataURL(blob);
		}

		var xmind = function (blob, callback) {
			JSZip.loadAsync(blob).then(function (zip) {
				var content = zip.file('content.xml') || zip.file('/content.xml');
				return content.async('string');
			}).then(function (content) {
				if (callback) callback(null, content);
			})
		}

		var freemind = function (blob, callback) {
			readAsText(blob, function (err, content) {
				if (callback) callback(null, content);
			});
		}

		var openFileByUrl = function (url, contentType) {
			$http.get(url, { responseType: 'arraybuffer' })
			.then(function (result) {
				var data = result.data;				
				var blob = new Blob([data]);
				if (contentType === 'xmind') openXmind(blob);
				if (contentType === 'mm') openFreemind(blob);
			})
		}

		var openXmind = function (blob, preview) {
			xmind(blob, function (err, content) {
				var protocol = window.kityminder.data.getRegisterProtocol('xmind');
				protocol.decode(content).then(function (data) {
					if (preview) {
						window.editor.minder.importJson({ root: data });
					} else {
						window.editor.postMessage.sendCommand('upload_local', { root: data });
					}
            	});
			})
		}

		var openFreemind = function (blob, preview) {
			freemind(blob, function (err, content) {
				var protocol = window.kityminder.data.getRegisterProtocol('freemind');
				protocol.decode(content).then(function (data) {
					if (preview) {
						window.editor.minder.importJson({ root: data });
					} else {
						window.editor.postMessage.sendCommand('upload_local', { root: data });
					}
            	});
			})
		}

		var previewByUrl = function (url) {
			var _url = new URL(url);
			var pathname = _url.pathname;
			$http.get(url, { responseType: 'arraybuffer' })
			.then(function (result) {
				var blob = new Blob([result.data]);
				if (/\.xmind$/.test(pathname)) openXmind(blob, true);
				else if (/\.mm$/.test(pathname)) openFreemind(blob, true);
				else if (/\.km$/.test(pathname)) {
					readAsJson(blob, function (err, data) {
						window.editor.minder.importJson(data);
					});
				}
			})
		}

		return {
			convert_buffer_to_utf8: convert_buffer_to_utf8,
			downloadBase64: downloadBase64,
			downloadText: downloadText,
			readAsText: readAsText,
			readAsJson: readAsJson,
			readAsDataURL: readAsDataURL,
			readAsBase64: readAsDataURL,
			xmind: xmind,
			freemind: freemind,
			openFileByUrl: openFileByUrl,
			openFreemind: openFreemind,
			openXmind:openXmind,
			previewByUrl: previewByUrl
		}

	});