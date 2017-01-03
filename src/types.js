/* jslint node: true, esnext: true */
'use strict';

const types = {};

export function DeclareType(name, options) {
	const parent = types[options.parent] || types.base;

	types[name] = Object.assign(options, options.parent);

	Object.defineProperty(options, 'name', {
		value: name
	});
}

DeclareType('base', {
	parse(string, offset) {
			return [undefined, offset];
		},
		toString(value) {
			return value;
		}
});

DeclareType('blob', {
	parent: 'base',
	description: 'raw bytes'
});

DeclareType('string', {
	parent: 'base'
});

DeclareType('boolean', {
	parent: 'base'
});

DeclareType('number', {
	parent: 'base'
});

DeclareType('integer', {
	parent: 'number'
});

DeclareType('unsigned-integer', {
	parent: 'integer',
	minValue: 0
});

DeclareType('ip-port', {
	parent: 'unsigned-integer',
	description: 'ip port number',
	maxValue: 65535
});

DeclareType('url', {
	parent: 'string'
});

DeclareType('hostname', {
	parent: 'string',
	description: 'fully qualified host name'
});

DeclareType('posix-path', {
	parent: 'string',
	description: 'posix filesystem path'
});

DeclareType('duration', {
	parent: 'number',
	description: 'time duration in seconds',
	parse(string, offset) {
		return [parseFloat(string), offset];
	},
	toString(value) {
		return `${value}s`;
	}
});

export function getType(name) {
	return types[name];
}
