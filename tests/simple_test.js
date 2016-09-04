/* global describe, it */
/* jslint node: true, esnext: true */

'use strict';

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should();

const atts = require('../lib/attributes');
const types = require('../lib/types');

describe('attributes', () => {
  const md = atts.createAttributes({
    att1: {},
    att2: {
      type: 'string',
      setter(value, attribute) {
        this.att2x = value;
        return true;
      },
      getter(attribute) {
        return this.att2x;
      }
    },
    att3: {
      type: 'unsigned-integer',
      default: 77
    },
    nested: {
      attributes: {
        att1: {
          type: 'string',
          default: 'the default'
        }
      }
    }
  });

  describe('meta definition', () => {
    it('has name', () => assert.equal(md.att1.name, 'att1'));
    it('has default type', () => assert.equal(md.att1.type, types.getType('base')));
    it('has given type', () => assert.equal(md.att2.type, types.getType('string')));
    it('has given type attributes', () => assert.equal(md.att3.type.minValue, 0));
  });

  describe('set', () => {
    it('simple', () => {
      const object = {};

      atts.setAttributes(object, md, {
        att1: 'value1'
      });

      assert.equal(object.att1, 'value1');
      assert.equal(object.att3, 77);
    });

    it('unknown', () => {
      const object = {};

      atts.setAttributes(object, md, {
        att7: 'value1'
      });

      assert.isUndefined(object.att7);
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

    it('nested default', () => {
      const object = {};

      atts.setAttributes(object, md, {});

      assert.equal(object.nested.att1, 'the default');
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
      att1: 'value1',
      att2x: 'value2'
    };

    it('simple', () => {
      assert.equal(atts.getAttribute(object, md, 'att1'), 'value1');
    });

    it('with getter', () => {
      assert.equal(atts.getAttribute(object, md, 'att2'), 'value2');
    });
  });
});
