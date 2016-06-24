/* jslint node: true, esnext: true */
'use strict';


function setAttributes(dest, atts, src = {}, cb = (ca, path, value) => {}, prefix = '') {
	Object.keys(atts).forEach(name => {
		const ca = atts[name];
		ca.name = name;

		if (ca.attributes) {
			if (dest[name] === undefined) {
				dest[name] = {};
			}
			setAttributes(dest[name], ca.attributes, src[name], cb, prefix + name + '/');
			return;
		}

		const value = src[name] || ca.default;

		if (ca.setter) {
			if (ca.setter.call(dest, value, ca)) {
				cb(ca, prefix + name, value);
			}
		} else {
			if (dest[name] !== value && value !== undefined) {
				dest[name] = value;
				cb(ca, prefix + name, value);
			}
		}
	});
}

module.exports.setAttributes = setAttributes;

module.exports.getAttribute = function (object, atts, path) {
	const ca = atts[path];
	if (ca) {
		if (ca.getter) {
			return ca.getter.call(object, ca);
		}
	}

	return object[path];
};

/*
'duration' : {
	description: 'time duration in seconds',

	parse(value) {
		return value;
},
	toString(value) {
		return value instanceof String && value.matches(/s$/) ? value : `${value}s`;
	}
}
*/
