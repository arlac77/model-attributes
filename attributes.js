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

		const value = src[name];

		if (ca.setter) {
			if (ca.setter.call(dest, value, ca)) {
				cb(ca, prefix + name, value || ca.default);
			}
		} else {
			if (value === undefined) {
				if (dest[name] === undefined && ca.default !== undefined) {
					dest[name] = ca.default;
					cb(ca, prefix + name, ca.default);
				}
			} else {
				if (dest[name] !== value) {
					dest[name] = value;
					cb(ca, prefix + name, value);
				}
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
