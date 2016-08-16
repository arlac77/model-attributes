/* jslint node: true, esnext: true */
'use strict';

const types = {};

function DeclareType(name, options) {
	if (options.parent) {
		options.parent = types[options.parent];
		types[name] = Object.assign(options, options.parent);
	} else {
		types[name] = options;
	}
}

DeclareType('number', {});

DeclareType('unsigned-integer', {
	parent: 'number',
	min: 0
});

DeclareType('port', {
	parent: 'unsigned-integer',
	description: 'ip port number',
	max: 65535
});

DeclareType('duration', {
	description: 'time duration in seconds',
	toString(value) {
		return `${value}s`;
	}
});
