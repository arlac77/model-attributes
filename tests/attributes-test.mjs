import test from "ava";

import {
  getType,
  createAttributes,
  mergeAttributes,
  setAttributes,
  getAttribute,
  getAttributes
} from "model-attributes";

const md = createAttributes({
  att1: {
    mandatory: true,
    private: true
  },
  att2: {
    type: "string",
    setter(value) {
      this.att2x = value;
      return true;
    },
    getter() {
      return this.att2x;
    }
  },
  att3: {
    type: "unsigned-integer",
    default: 77
  },
  nested: {
    attributes: {
      att1: {
        type: "string",
        default: "the default"
      }
    }
  }
});

test("has name", t => t.is(md.att1.name, "att1"));

test("has mandatory", t => t.true(md.att1.mandatory));
test("has private", t => t.true(md.att1.private));
test("has default type", t => t.is(md.att1.type, getType("base")));
test("has given type", t => t.is(md.att2.type, getType("string")));
test("has given type attributes min value", t =>
  t.is(md.att3.type.minValue, 0));
test("has given type attributes max value", t =>
  t.is(md.att3.type.maxValue, Number.MAX_SAFE_INTEGER));
test("has given type name", t => t.is(md.att3.type.name, "unsigned-integer"));

test("merge attributes", t => {
  const md2 = createAttributes({
    nested: {
      attributes: {
        att2: {
          type: "string",
          default: "the default"
        }
      }
    }
  });
  const ma = mergeAttributes(md2, md);
  t.deepEqual(Object.keys(ma.nested.attributes), ["att1", "att2"]);
});

test("set simple", t => {
  const object = {};

  setAttributes(object, md, {
    att1: "value1"
  });

  t.is(object.att1, "value1");
  t.is(object.att3, 77);
});

test("set unknown", t => {
  const object = {};

  setAttributes(object, md, {
    att7: "value1"
  });

  t.is(object.att7, undefined);
});

test("set with defaults", t => {
  const object = {};

  setAttributes(object, md, {
    att3: 17
  });

  t.is(object.att3, 17);
});

test("set use default", t => {
  const object = {};

  setAttributes(object, md, {
    att1: 17
  });

  t.is(object.att3, 77);
});

test("set keep old value", t => {
  const object = {
    att3: 4711
  };

  setAttributes(object, md, {});

  t.is(object.att3, 4711);
});

test("set nested simple", t => {
  const object = {};

  setAttributes(object, md, {
    nested: {
      att1: "value1"
    }
  });

  t.is(object.nested.att1, "value1");
});

test("set nested default", t => {
  const object = {};

  setAttributes(object, md, {});

  t.is(object.nested.att1, "the default");
});

test("set nested empty", t => {
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

test("set with setter", t => {
  const object = {};

  setAttributes(object, md, {
    att2: "value2"
  });

  t.is(object.att2x, "value2");
});

function gat(t, object, def, key, expected) {
  t.is(getAttribute(object, def, key), expected);
}

gat.title = (providedTitle = "", object, def, key, expected) =>
  `getAttribute ${providedTitle} ${JSON.stringify(
    object
  )} ${key} ${JSON.stringify(def)}`.trim();

function gats(t, object, def, expected) {
  t.deepEqual(getAttributes(object, def), expected);
}

gats.title = (providedTitle = "", object, def, expected) =>
  `getAttributes ${providedTitle} ${JSON.stringify(object)} ${JSON.stringify(
    def
  )}`.trim();

test(
  "simple",
  gat,
  {
    att1: "value1",
    att2x: "value2"
  },
  md,
  "att1",
  "value1"
);

test(
  "with getter",
  gat,
  {
    att1: "value1",
    att2x: "value2"
  },
  md,
  "att2",
  "value2"
);

test(
  gats,
  {
    att1: "value1",
    att2x: "value2"
  },
  md,
  {
    att1: "value1",
    att2: "value2"
  }
);
