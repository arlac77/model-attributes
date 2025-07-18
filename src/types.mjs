const types = {};

export function DeclareType(name, options) {
  options.name = name;
  types[name] = Object.assign(options, options.parent);
}

DeclareType("base", {
  parse(string, offset) {
    return [undefined, offset];
  },
  toString(value) {
    return value;
  }
});

DeclareType("blob", {
  parent: "base",
  description: "raw bytes"
});

DeclareType("string", {
  parent: "base"
});

DeclareType("boolean", {
  parent: "base"
});

DeclareType("number", {
  parent: "base",
  minValue: -Number.MAX_VALUE,
  maxValue: Number.MAX_VALUE
});

DeclareType("integer", {
  parent: "number",
  minValue: Number.MIN_SAFE_INTEGER,
  maxValue: Number.MAX_SAFE_INTEGER
});

DeclareType("unsigned-integer", {
  parent: "integer",
  minValue: 0,
  maxValue: Number.MAX_SAFE_INTEGER
});

DeclareType("ip-port", {
  parent: "unsigned-integer",
  description: "ip port number",
  maxValue: 65535
});

DeclareType("listen-socket", {
  parent: "string",
  description: "IPC listen address"
});

DeclareType("url", {
  parent: "string"
});

DeclareType("password", {
  parent: "string",
  private: true
});

DeclareType("hostname", {
  parent: "string",
  description: "fully qualified host name"
});

DeclareType("posix-path", {
  parent: "string",
  description: "posix filesystem path"
});

DeclareType("duration", {
  parent: "number",
  description: "time duration in seconds",
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
