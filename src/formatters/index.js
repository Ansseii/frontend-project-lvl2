import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = { stylish, plain, json };

export default (diff, format) => {
  if (_.has(formatters, format)) {
    return formatters[format](diff);
  }
  throw new Error(`Unknown output format: ${format}`);
};
