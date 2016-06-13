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
    att1: {},
    att2: {
      setter(value, attribute) {
          this.att2x = value;
          return true;
        },
        getter(attribute) {
          return this.att2x;
        }
    },
    nested: {
      attributes: {
        att1: {}
      }
    }
  };

  describe('set', () => {
    it('simple', () => {
      const object = {};

      atts.setAttributes(object, md, {
        att1: 'value1'
      });

      assert.equal(object.att1, 'value1');
    });

    it('nested simple', () => {
      const object = {};

      atts.setAttributes(object, md, {
        nested: { 
          att1: 'value1'
        }
      });

      assert.equal(object.nested.att1, 'value1');
    });

    it('with setter', () => {
      const object = {};

      atts.setAttributes(object, md, {
        att2: 'value2'
      });

      assert.equal(object.att2x, 'value2');
    });
  });

  describe('get', () => {
    const object = {
      'att1': 'value1',
      'att2x': 'value2'
    };

    it('simple', () => {
      assert.equal(atts.getAttribute(object, md, 'att1'), 'value1');
    });

    it('with getter', () => {
      assert.equal(atts.getAttribute(object, md, 'att2'), 'value2');
    });
  });
});
