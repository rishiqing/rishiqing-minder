angular.module('kityminderEditor')
	.service('util', function () {
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

		var downloadBase64 = function (_base64, fileName) {
			var a = document.createElement('a');//这里建一个a标签，用于下面下载图片
			a.href = _base64;
			a.setAttribute('download', fileName);
			a.target = '_blank';
			var e = document.createEvent('MouseEvents');
			e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			a.dispatchEvent(e);// 触发点击事件，开始下载
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

		return {
			convert_buffer_to_utf8: convert_buffer_to_utf8,
			downloadBase64: downloadBase64,
			readAsText: readAsText,
			readAsJson: readAsJson,
			readAsDataURL: readAsDataURL,
			readAsBase64: readAsDataURL
		}

	});