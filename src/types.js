/* jslint node: true, esnext: true */
'use strict';

const types = {};

function DeclareType(name, options) {
	options.name = name;
	if (options.parent) {
		options.parent = types[options.parent];
		types[name] = Object.assign(options, options.parent);
	} else {
		types[name] = options;
	}
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

function getType(name) {
	return types[name];
}

export {
	getType
};
