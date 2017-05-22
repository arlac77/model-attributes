'use strict';

import test from 'ava';

import {
  getType, createAttributes, mergeAttributes, setAttributes, getAttribute, getAttributes
}
from '../src/attributes';

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

test('has name', t => t.is(md.att1.name, 'att1'));
test('has default type', t => t.is(md.att1.type, getType('base')));
test('has given type', t => t.is(md.att2.type, getType('string')));
test('has given type attributes', t => t.is(md.att3.type.minValue, 0));
test('has given type name', t => t.is(md.att3.type.name, 'unsigned-integer'));

test('merge attributes', t => {
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
  t.deepEqual(Object.keys(ma.nested.attributes), ['att1', 'att2']);
});

test('set simple', t => {
  const object = {};

  setAttributes(object, md, {
    att1: 'value1'
  });

  t.is(object.att1, 'value1');
  t.is(object.att3, 77);
});

test('set unknown', t => {
  const object = {};

  setAttributes(object, md, {
    att7: 'value1'
  });

  t.is(object.att7, undefined);
});

test('set with defaults', t => {
  const object = {};

  setAttributes(object, md, {
    att3: 17
  });

  t.is(object.att3, 17);
});

test('set use default', t => {
  const object = {};

  setAttributes(object, md, {
    att1: 17
  });

  t.is(object.att3, 77);
});

test('set keep old value', t => {
  const object = {
    att3: 4711
  };

  setAttributes(object, md, {});

  t.is(object.att3, 4711);
});

test('set nested simple', t => {
  const object = {};

  setAttributes(object, md, {
    nested: { 
      att1: 'value1'
    }
  });

  t.is(object.nested.att1, 'value1');
});

test('set nested default', t => {
  const object = {};

  setAttributes(object, md, {});

  t.is(object.nested.att1, 'the default');
});

test('set nested empty', t => {
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

  t.deepEqual(object.data, {
    a: 1,
    b: 2
  });
});

test('set with setter', t => {
  const object = {};

  setAttributes(object, md, {
    att2: 'value2'
  });

  t.is(object.att2x, 'value2');
});

test('get simple', t => {
  const object = {
    att1: 'value1',
    att2x: 'value2'
  };

  t.is(getAttribute(object, md, 'att1'), 'value1');
});

test('get with getter', t => {
  const object = {
    att1: 'value1',
    att2x: 'value2'
  };

  t.is(getAttribute(object, md, 'att2'), 'value2');
});

test('get multiple', t => {
  const object = {
    att1: 'value1',
    att2x: 'value2'
  };

  t.deepEqual(getAttributes(object, md), {
    att1: 'value1',
    att2: 'value2'
  });
});
