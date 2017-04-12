define(function (require, exports, module) {
	var interpolate = function (text, scope) {
		var fn = new Function('scope', 'return scope.' + text + ';');
		return fn.call(this, scope);
	}

	var format = function (template, args) {
		var text = String(template);
		return text.replace(/\{\{=([\s\S]+?)\}\}/g, function (match, _interpolate) {
			return interpolate(_interpolate, args);
		})
	}
	return module.exports = format; // 这个地方必须写return ,不然会报错，操。
})