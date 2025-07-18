import { getType } from "./types.mjs";
export { getType };

function _setAttributes(
  object,
  dest,
  atts,
  src = {},
  cb = (ca, path, value) => {},
  prefix = ""
) {
  for (const [name, ca] of Object.entries(atts)) {
    if (ca.attributes !== undefined) {
      if (dest[name] === undefined) {
        // TODO create default
        if (Object.keys(ca.attributes).length === 0) {
          dest[name] = src[name];
          continue;
        }
        dest[name] = {};
      }
      _setAttributes(
        object,
        dest[name],
        ca.attributes,
        src[name],
        cb,
        prefix + name + "."
      );
      continue;
    }

    const value = src[name];

    if (ca.set !== undefined) {
      if (ca.set.call(object, value, ca)) {
        cb(ca, prefix + name, value || ca.default);
      }
    } else {
      const currentValue = dest[name];
      if (value === undefined) {
        if (currentValue === undefined && ca.default !== undefined) {
          dest[name] = ca.default;
          cb(ca, prefix + name, ca.default);
        }
      } else {
        if (currentValue !== value) {
          dest[name] = value;
          cb(ca, prefix + name, value);
        }
      }
    }
  }
}

/**
 * Copies attribute values from a source object into a destination object.
 * @param {Object} dest target object to be modified
 * @param {Object} atts attribute definitions to be used
 * @param {Object} src origin of the data to be copied
 * @param {function} cb callback to be executed for each copied value
 * @param {string} prefix name prefix used for all attributes
 * @return {void}
 */
export function setAttributes(dest, atts, src, cb, prefix) {
  _setAttributes(dest, dest, atts, src, cb, prefix);
}

/**
 * Delivers a attribute value for a given attribute name
 * @param {Object} object to query
 * @param {Object} atts attribute definitions to be used
 * @param {string} path attribute name
 * @return {Any} attribute value
 */
export function getAttribute(object, atts, path) {
  const ca = atts[path];
  if (ca !== undefined) {
    if (ca.getter !== undefined) {
      return ca.getter.call(object, ca);
    }
  }

  return object[path];
}

/**
 * Retrive attribute values from an object.
 * @param {Object} object attribute value source
 * @param {Object} attributes
 * @return {Object} values
 */
export function getAttributes(object, attributes) {
  const result = {};

  Object.keys(attributes).forEach(name => {
    const value = getAttribute(object, attributes, name);
    if (value !== undefined) {
      result[name] = value;
    }
  });

  return result;
}

/**
 * Create attributes from its definition.
 * @param {Object} definitions
 * @return {Object} attributes
 */
export function createAttributes(definitions) {
  for (const [name, d] of Object.entries(definitions)) {
    d.name = name;
    if (d.attributes === undefined) {
      d.type = getType(d.type) || getType("base");
    }
  }
  return definitions;
}

export function prepareAttributesDefinitions(definitions) {
  return createAttributes(definitions);
}

/**
 * Merge attribute definitions.
 * @param {Object} dest attribute definitions to be used also the merge target
 * @param {Object} atts attribute definitions to be used
 * @return {Object} merged definitions (dest)
 */
export function mergeAttributes(dest, atts) {
  for (const [name, ca] of Object.entries(atts)) {
    if (ca.attributes !== undefined) {
      const bn = dest[name];

      if (bn !== undefined) {
        Object.assign(ca.attributes, bn.attributes);
      }
    }
  }

  return Object.assign(dest, atts);
}

export function mergeAttributeDefinitions(dest, atts) {
  return mergeAttributes(dest, atts);
}
