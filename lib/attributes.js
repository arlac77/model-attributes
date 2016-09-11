/* jslint node: true, esnext: true */
'use strict';

const types = require('./types');

function setAttributes(dest, atts, src = {}, cb = (ca, path, value) => {}, prefix = '') {
	Object.keys(atts).forEach(name => {
		const ca = atts[name];

		if (ca.attributes) {
			if (dest[name] === undefined) {
				// TODO create default
				if (Object.keys(ca.attributes).length === 0) {
					dest[name] = src[name];
					return;
				}
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

function getAttribute(object, atts, path) {
	const ca = atts[path];
	if (ca) {
		if (ca.getter) {
			return ca.getter.call(object, ca);
		}
	}

	return object[path];
}

module.exports.getAttributes = function (object, atts, options = {}) {
	const result = {};

	Object.keys(atts).forEach(name => {
		const value = getAttribute(object, atts, name);
		if (value !== undefined) {
			result[name] = value;
		}
	});

	return result;
};

module.exports.createAttributes = function (definitions) {
	Object.keys(definitions).forEach(name => {
		const d = definitions[name];
		d.name = name;
		d.type = types.getType(d.type) || types.getType('base');
	});
	return definitions;
};

function mergeAttributes(atts, b) {
	Object.keys(atts).forEach(name => {
		const ca = atts[name];

		const bn = b[name];

		if (ca.attributes && bn) {
			console.log(`merge: ${name}`);
			Object.assign(ca.attributes, bn.attributes);
		}
	});

	return Object.assign(atts, b);
}

module.exports.mergeAttributes = mergeAttributes;

module.exports.setAttributes = setAttributes;
module.exports.getAttribute = getAttribute;
