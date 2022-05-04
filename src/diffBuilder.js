import _ from 'lodash';

const buildDiff = (before, after) => {
  const keys = _.union(_.keys(before), _.keys(after)).sort();

  return keys.map((key) => {
    const valBefore = before[key];
    const valAfter = after[key];

    if (_.has(before, key) && !_.has(after, key)) {
      return { type: 'removed', key, value: valBefore };
    }
    if (!_.has(before, key) && _.has(after, key)) {
      return { type: 'new', key, value: valAfter };
    }
    if (_.isPlainObject(valBefore) && _.isPlainObject(valAfter)) {
      return { type: 'ancestor', key, children: buildDiff(valBefore, valAfter) };
    }
    if (_.isEqual(valBefore, valAfter)) {
      return { type: 'unmodified', key, value: valBefore };
    }

    return {
      type: 'modified', key, oldValue: valBefore, newValue: valAfter,
    };
  });
};

export default buildDiff;
