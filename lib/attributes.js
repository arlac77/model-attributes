/* jslint node: true, esnext: true */
'use strict';

const types = require('./types');

function setAttributes(dest, atts, src = {}, cb = (ca, path, value) => {}, prefix = '') {
	Object.keys(atts).forEach(name => {
		const ca = atts[name];

		if (ca.attributes) {
			if (dest[name] === undefined) {
				dest[name] = {};
			}
			setAttributes(dest[name], ca.attributes, src[name], cb, prefix + name + '.');
			return;
		}

		const value = src[name];

		if (ca.setter) {
			if (ca.setter.call(dest, value, ca)) {
				cb(ca, prefix + name, value || ca.default);
			}
		} else {
			const currentValue = dest[name];
			if (value === undefined) {
				if (currentValue === undefined && ca.default !== undefined) {
					dest[name] = ca.default;
					cb(ca, prefix + name, ca.default);
				}
			} else {
				if (currentValue !== value) {
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

module.exports.createAttributes = function (definitions) {
	Object.keys(definitions).forEach(name => {
		const d = definitions[name];
		d.name = name;
		d.type = types.getType(d.type) || types.getType('base');
	});
	return definitions;
};
