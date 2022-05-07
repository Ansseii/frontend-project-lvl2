import _ from 'lodash';

const getDelimiter = (depth) => {
  const indent = ' '.repeat(depth * 4);
  return `\n${indent}`;
};

const toString = (data, depth) => {
  if (_.isPlainObject(data)) {
    const delimiter = getDelimiter(depth);
    const keys = _.sortBy(_.keys(data));
    const lines = keys.map((key) => {
      const updatedVal = toString(data[key], depth + 1);

      return `    ${key}: ${updatedVal}`;
    });

    return ['{', ...lines, '}'].join(delimiter);
  }

  return data;
};

const lineFormat = {
  new: ({ key, value }, { depth }) => `  + ${key}: ${toString(value, depth)}`,
  removed: ({ key, value }, { depth }) => `  - ${key}: ${toString(value, depth)}`,
  ancestor: ({ key, children }, { depth, format }) => `    ${key}: ${format(children, depth)}`,
  unmodified: ({ key, value }, { depth }) => `    ${key}: ${toString(value, depth)}`,
  modified: ({ key, oldValue, newValue }, { depth }) => [
    `  - ${key}: ${toString(oldValue, depth)}`,
    `  + ${key}: ${toString(newValue, depth)}`,
  ],
};

const buildLine = (obj, options) => lineFormat[obj.type](obj, options);

export default (diff) => {
  const format = (objects, depth) => {
    const delimiter = getDelimiter(depth);
    const formattedLines = objects.flatMap((obj) => buildLine(obj, { depth: depth + 1, format }));
    return ['{', ...formattedLines, '}'].join(delimiter);
  };

  return format(diff, 0);
};
