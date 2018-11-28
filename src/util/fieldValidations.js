const emailRegex = require("email-regex");

exports.isNumber = value => typeof value === "number";

exports.isString = value => typeof value === "string";

exports.isBoolean = value =>
  exports.isNumber(value) || typeof value === "boolean";

exports.isUndefined = value => typeof value === "undefined";

exports.isPattern = (value, pattern) =>
  exports.isString(value) && value.match(pattern);

exports.isPositiveNumber = value => exports.isNumber(value) && value >= 0;

exports.isRequiredText = value => exports.isString(value) && value.length > 0;
exports.isOptionalText = value =>
  exports.isUndefined(value) || (exports.isString(value) && value.length === 0);

exports.isPhone = value =>
  exports.isPattern(
    value,
    /[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]/
  );

exports.isEmail = value =>
  exports.isString(value) && emailRegex({ exact: true }).test(value);

exports.isPostalCode = value =>
  exports.isPattern(value, /[A-Z][0-9][A-Z][0-9][A-Z][0-9]/g);
