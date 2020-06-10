import test from "ava";
import { sast, gat, gast } from "./helper/util.mjs";

import { getType, createAttributes, mergeAttributes } from "model-attributes";

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

test(sast, {}, md, { att1: "value1" }, (t, object) => {
  t.is(object.att1, "value1");
  t.is(object.att3, 77);
});

test("unknown key", sast, {}, md, { att7: "value1" }, (t, object) =>
  t.is(object.att7, undefined)
);

test("with defaults", sast, {}, md, { att3: 17 }, (t, object) =>
  t.is(object.att3, 17)
);

test("use default", sast, {}, md, { att1: 17 }, (t, object) =>
  t.is(object.att3, 77)
);

test("keep old value", sast, { att3: 4711 }, md, {}, (t, object) =>
  t.is(object.att3, 4711)
);

test(
  "nested simple",
  sast,
  {},
  md,
  {
    nested: {
      att1: "value1"
    }
  },
  (t, object) => t.is(object.nested.att1, "value1")
);

test("nested default", sast, {}, md, {}, (t, object) => {
  t.is(object.nested.att1, "the default");
});

test(
  "nested empty",
  sast,
  {},
  createAttributes({
    data: {
      attributes: {}
    }
  }),
  {
    data: {
      a: 1,
      b: 2
    }
  },
  (t, object) =>
    t.deepEqual(object.data, {
      a: 1,
      b: 2
    })
);

test(
  "with setter",
  sast,
  {},
  md,
  {
    att2: "value2"
  },
  (t, object) => t.is(object.att2x, "value2")
);

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
  gast,
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
