/* global describe, it */
/* jslint node: true, esnext: true */

'use strict';

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should();

const atts = require('../lib/attributes');

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
    att3: {
      default: 77
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
      assert.equal(object.att3, 77);
    });

    describe('with defaults', () => {
      it('normal set', () => {
        const object = {};

        atts.setAttributes(object, md, {
          att3: 17
        });

        assert.equal(object.att3, 17);
      });

      it('use default', () => {
        const object = {};

        atts.setAttributes(object, md, {
          att1: 17
        });

        assert.equal(object.att3, 77);
      });

      it('keep old value', () => {
        const object = {
          att3: 4711
        };

        atts.setAttributes(object, md, {});

        assert.equal(object.att3, 4711);
      });
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
