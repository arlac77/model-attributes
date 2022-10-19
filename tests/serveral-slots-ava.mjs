import test from "ava";
import { sast } from "./helper/util.mjs";

import { createAttributes } from "model-attributes";

const md = createAttributes({
  dir: {
    type: "posix-path",
    description: "recording base directory",
    default: "/tmp"
  },
  recorders: {
    description: "well known recorders"
  }
});

test(sast, {}, md, { recorders: { r1: {}, r2: {} } }, (t, object) => {
  t.deepEqual(object.recorders, { r1: {}, r2: {} });
});
