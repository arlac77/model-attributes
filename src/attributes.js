/* jslint node: true, esnext: true */
'use strict';

import {
	getType
}
from './types';

function _setAttributes(object, dest, atts, src = {}, cb = (ca, path, value) => {}, prefix = '') {
	Object.keys(atts).forEach(name => {
		const ca = atts[name];

		if (ca.attributes !== undefined) {
			if (dest[name] === undefined) {
				// TODO create default
				if (Object.keys(ca.attributes).length === 0) {
					dest[name] = src[name];
					return;
				}
				dest[name] = {};
			}
			_setAttributes(object, dest[name], ca.attributes, src[name], cb, prefix + name + '.');
			return;
		}

		const value = src[name];

		if (ca.setter !== undefined) {
			if (ca.setter.call(object, value, ca)) {
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

function setAttributes(dest, atts, src, cb, prefix) {
	return _setAttributes(dest, dest, atts, src, cb, prefix);
}

function getAttribute(object, atts, path) {
	const ca = atts[path];
	if (ca) {
		if (ca.getter !== undefined) {
			return ca.getter.call(object, ca);
		}
	}

	return object[path];
}

function getAttributes(object, atts, options = {}) {
	const result = {};

	Object.keys(atts).forEach(name => {
		const value = getAttribute(object, atts, name);
		if (value !== undefined) {
			result[name] = value;
		}
	});

	return result;
}

function createAttributes(definitions) {
	Object.keys(definitions).forEach(name => {
		const d = definitions[name];
		d.name = name;
		if (d.attributes === undefined) {
			d.type = getType(d.type) || getType('base');
		}
	});
	return definitions;
}

function mergeAttributes(atts, b) {
	Object.keys(atts).forEach(name => {
		const ca = atts[name];

		if (ca.attributes !== undefined) {
			const bn = b[name];

			if (bn !== undefined) {
				Object.assign(ca.attributes, bn.attributes);
			}
		}
	});

	return Object.assign(b, atts);
}

export {
	getType,
	createAttributes, mergeAttributes, setAttributes, getAttributes,
	getAttribute
};
