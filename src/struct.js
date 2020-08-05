/**
 * A personal data.
 * @typedef PropertiesHash
 * @type {object}
 * @property {string} id an ID.
 * @property {string} name your name.
 * @property {number} age your age.
 */

/**
 * @param {PropertiesHash} arg The struct.
 * @returns {string} The concatenated data.
 */
function foo(arg) {
  // arg.id++;
  return `${arg.id}/${arg.name}/${arg.age}`;
}

export default foo;
