[![Build Status](https://secure.travis-ci.org/arlac77/model-attributes.png)](http://travis-ci.org/arlac77/model-attributes)
[![codecov.io](http://codecov.io/github/arlac77/model-attributes/coverage.svg?branch=master)](http://codecov.io/github/arlac77/model-attributes?branch=master)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Dependency Status](https://david-dm.org/arlac77/model-attributes.svg)](https://david-dm.org/arlac77/model-attributes)
[![devDependency Status](https://david-dm.org/arlac77/model-attributes/dev-status.svg)](https://david-dm.org/arlac77/model-attributes#info=devDependencies)
[![docs](http://inch-ci.org/github/arlac77/model-attributes.svg?branch=master)](http://inch-ci.org/github/arlac77/model-attributes)
[![downloads](http://img.shields.io/npm/dm/model-attributes.svg?style=flat-square)](https://npmjs.org/package/model-attributes)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/model-attributes.svg?style=flat-square)](https://github.com/arlac77/model-attributes/issues)
[![Greenkeeper](https://badges.greenkeeper.io/arlac77/model-attributes.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/model-attributes/badge.svg)](https://snyk.io/test/github/arlac77/model-attributes)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![minified size](https://badgen.net/bundlephobia/min/model-attributes)](https://bundlephobia.com/result?p=model-attributes)
[![npm](https://img.shields.io/npm/v/model-attributes.svg)](https://www.npmjs.com/package/model-attributes)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/arlac77/model-attributes)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# model-attributes

attribute meta description

<!-- skip-example -->

```javascript
const { createAttributes } from 'model-attributes';

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

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [model-attributes](#model-attributes)
-   [setAttributes](#setattributes)
    -   [Parameters](#parameters)
-   [getAttribute](#getattribute)
    -   [Parameters](#parameters-1)
-   [getAttributes](#getattributes)
    -   [Parameters](#parameters-2)
-   [createAttributes](#createattributes)
    -   [Parameters](#parameters-3)
-   [mergeAttributes](#mergeattributes)
    -   [Parameters](#parameters-4)

## model-attributes

## setAttributes

Copies attribute values from a source object into a destination object.

### Parameters

-   `dest` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** target object to be modified
-   `atts` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** attribute definitions to be used
-   `src` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** origin of the data to be copied
-   `cb` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** callback to be executed for each copied value
-   `prefix` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** name prefix used for all attributes

Returns **[undefined](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)** 

## getAttribute

Delivers a attribute value for a given attribute name

### Parameters

-   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** to query
-   `atts` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** attribute definitions to be used
-   `path` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** attribute name

Returns **Any** attribute value

## getAttributes

Retrive attribute values from an object

### Parameters

-   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** attribute value source
-   `attributes` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** values

## createAttributes

Create attributes from its definition

### Parameters

-   `definitions` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** attributes

## mergeAttributes

Merge attribute definitions

### Parameters

-   `dest` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** attribute definitions to be used also the merge target
-   `atts` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** attribute definitions to be used

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** merged definitions (dest)

# install

With [npm](http://npmjs.org) do:

```shell
npm install model-attributes
```

# license

# BSD-2-Clause
