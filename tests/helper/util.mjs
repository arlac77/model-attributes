import {
  setAttributes,
  getAttribute,
  getAttributes
} from "model-attributes";

export function sast(t, object, def, key, expected) {
  setAttributes(object, def, key);
  expected(t, object);
}

sast.title = (providedTitle = "", object, def, key, expected) =>
  `setAttributes ${providedTitle} ${JSON.stringify(
    object
  )} ${key} ${JSON.stringify(def)}`.trim();

export function gat(t, object, def, key, expected) {
  t.is(getAttribute(object, def, key), expected);
}

gat.title = (providedTitle = "", object, def, key, expected) =>
  `getAttribute ${providedTitle} ${JSON.stringify(
    object
  )} ${key} ${JSON.stringify(def)}`.trim();

export function gast(t, object, def, expected) {
  t.deepEqual(getAttributes(object, def), expected);
}

gast.title = (providedTitle = "", object, def, expected) =>
  `getAttributes ${providedTitle} ${JSON.stringify(object)} ${JSON.stringify(
    def
  )}`.trim();
