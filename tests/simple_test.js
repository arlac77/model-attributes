/* global describe, it */
/* jslint node: true, esnext: true */

'use strict';

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should();

const {
  getType, createAttributes, mergeAttributes, setAttributes, getAttribute, getAttributes
} = require('../dist/attributes');

describe('attributes', () => {
  const md = createAttributes({
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
    it('has default type', () => assert.equal(md.att1.type, getType('base')));
    it('has given type', () => assert.equal(md.att2.type, getType('string')));
    it('has given type attributes', () => assert.equal(md.att3.type.minValue, 0));
    it('has given type name', () => assert.equal(md.att3.type.name, 'unsigned-integer'));

    describe('merge attributes', () => {
      const md2 = createAttributes({
        nested: {
          attributes: {
            att2: {
              type: 'string',
              default: 'the default'
            }
          }
        }
      });

      const ma = mergeAttributes(md2, md);
      it('has nested attributes', () => assert.deepEqual(Object.keys(ma.nested.attributes), ['att1', 'att2']));
    });
  });

  describe('set', () => {
    it('simple', () => {
      const object = {};

      setAttributes(object, md, {
        att1: 'value1'
      });

      assert.equal(object.att1, 'value1');
      assert.equal(object.att3, 77);
    });

    it('unknown', () => {
      const object = {};

      setAttributes(object, md, {
        att7: 'value1'
      });

      assert.isUndefined(object.att7);
    });

    describe('with defaults', () => {
      it('normal set', () => {
        const object = {};

        setAttributes(object, md, {
          att3: 17
        });

        assert.equal(object.att3, 17);
      });

      it('use default', () => {
        const object = {};

        setAttributes(object, md, {
          att1: 17
        });

        assert.equal(object.att3, 77);
      });

      it('keep old value', () => {
        const object = {
          att3: 4711
        };

        setAttributes(object, md, {});

        assert.equal(object.att3, 4711);
      });
    });

    it('nested simple', () => {
      const object = {};

      setAttributes(object, md, {
        nested: { 
          att1: 'value1'
        }
      });

      assert.equal(object.nested.att1, 'value1');
    });

    it('nested default', () => {
      const object = {};

      setAttributes(object, md, {});

      assert.equal(object.nested.att1, 'the default');
    });

    it('nested empty', () => {
      const md = createAttributes({
        data: {
          attributes: {}
        }
      });

      const object = {};

      setAttributes(object, md, {
        data: {
          a: 1,
          b: 2
        }
      });

      assert.deepEqual(object.data, {
        a: 1,
        b: 2
      });
    });

    it('with setter', () => {
      const object = {};

      setAttributes(object, md, {
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
      assert.equal(getAttribute(object, md, 'att1'), 'value1');
    });

    it('with getter', () => {
      assert.equal(getAttribute(object, md, 'att2'), 'value2');
    });

    it('multiple', () => {
      assert.deepEqual(getAttributes(object, md), {
        att1: 'value1',
        att2: 'value2'
      });
    });
  });
});
