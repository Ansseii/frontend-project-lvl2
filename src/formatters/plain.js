import _ from 'lodash';

const toString = (data) => {
  if (_.isPlainObject(data)) {
    return '[complex value]';
  }
  if (_.isString(data)) {
    return `'${data}'`;
  }
  return data;
};

const buildPropertyPath = (ancestors) => ancestors.join('.');

const lineFormat = {
  new: ({ value }, { ancestors }) => `Property '${buildPropertyPath(ancestors)}' was added with value: ${toString(value)}`,
  removed: (obj, { ancestors }) => `Property '${buildPropertyPath(ancestors)}' was removed`,
  ancestor: ({ children }, { ancestors, format }) => format(children, ancestors),
  modified: ({ oldValue, newValue }, { ancestors }) => `Property '${buildPropertyPath(ancestors)}' was updated. From ${toString(oldValue)} to ${toString(newValue)}`,
};

const buildLine = (obj, options) => lineFormat[obj.type](obj, options);

export default (diff) => {
  const format = (objects, ancestors) => objects
    .filter(({ type }) => type !== 'unmodified')
    .map((obj) => buildLine(obj, { ancestors: [...ancestors, obj.key], format }))
    .join('\n');

  return format(diff, []);
};
