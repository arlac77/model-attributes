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

DeclareType('unsigned-integer', {
	parent: 'base',
	minValue: 0
});

DeclareType('ip-port', {
	parent: 'unsigned-integer',
	description: 'ip port number',
	maxValue: 65535
});

DeclareType('duration', {
	parent: 'base',
	description: 'time duration in seconds',
	toString(value) {
		return `${value}s`;
	}
});

module.exports.getType = function (name) {
	return types[name];
};
