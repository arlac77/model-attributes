[![npm](https://img.shields.io/npm/v/model-attributes.svg)](https://www.npmjs.com/package/model-attributes)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/arlac77/model-attributes)
[![Build Status](https://secure.travis-ci.org/arlac77/model-attributes.png)](http://travis-ci.org/arlac77/model-attributes)
[![bithound](https://www.bithound.io/github/arlac77/model-attributes/badges/score.svg)](https://www.bithound.io/github/arlac77/model-attributes)
[![codecov.io](http://codecov.io/github/arlac77/model-attributes/coverage.svg?branch=master)](http://codecov.io/github/arlac77/model-attributes?branch=master)
[![Coverage Status](https://coveralls.io/repos/arlac77/model-attributes/badge.svg)](https://coveralls.io/r/arlac77/model-attributes)
[![Code Climate](https://codeclimate.com/github/arlac77/model-attributes/badges/gpa.svg)](https://codeclimate.com/github/arlac77/model-attributes)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/model-attributes/badge.svg)](https://snyk.io/test/github/arlac77/model-attributes)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/model-attributes.svg?style=flat-square)](https://github.com/arlac77/model-attributes/issues)
[![Stories in Ready](https://badge.waffle.io/arlac77/model-attributes.svg?label=ready&title=Ready)](http://waffle.io/arlac77/model-attributes)
[![Dependency Status](https://david-dm.org/arlac77/model-attributes.svg)](https://david-dm.org/arlac77/model-attributes)
[![devDependency Status](https://david-dm.org/arlac77/model-attributes/dev-status.svg)](https://david-dm.org/arlac77/model-attributes#info=devDependencies)
[![docs](http://inch-ci.org/github/arlac77/model-attributes.svg?branch=master)](http://inch-ci.org/github/arlac77/model-attributes)
[![downloads](http://img.shields.io/npm/dm/model-attributes.svg?style=flat-square)](https://npmjs.org/package/model-attributes)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

model-attributes
==========
attribute meta description

```javascript
const ma = require('model-attributes');

const attributes = ma.createAttributes({
  att1: {},
  att2: { datault: 2}
});

const object = {};

ma.setAttributes(object, attributes, {
  att1: 'value1'
});

console.log(object.att1); // value1
console.log(object.att2); // 2
```

# API Reference

* <a name="setAttributes"></a>

## setAttributes(dest, atts, src, cb, prefix) ⇒
Copies attribute values from a source object into a destination object.

**Kind**: global function  
**Returns**: void  

| Param | Type | Description |
| --- | --- | --- |
| dest | <code>Object</code> | target object to be modified |
| atts | <code>Object</code> | attribute definitions to be used |
| src | <code>Object</code> | origin of the data to be copied |
| cb | <code>function</code> | callback to be executed for each copied value |
| prefix | <code>String</code> | name prefix used for all attributes |


* <a name="getAttribute"></a>

## getAttribute(object, atts, path) ⇒ <code>Any</code>
Delivers a attribute value for a given attribute name

**Kind**: global function  
**Returns**: <code>Any</code> - attribute value  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | to query |
| atts | <code>Object</code> | attribute definitions to be used |
| path | <code>String</code> | attribute name |


* * *

install
=======

With [npm](http://npmjs.org) do:

```shell
npm install model-attributes
```

license
=======

BSD-2-Clause
=======
