/* global describe, it */
/* jslint node: true, esnext: true */

'use strict';

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should();

const atts = require('../attributes');

describe('attributes', () => {
  const md = {
    att1: {}
  };

  it('set simple', () => {
    const object = {};

    atts.setAttributes(object, md, {
      att1: 'value1'
    });

    assert.equal(object.att1, 'value1');
  });
});
