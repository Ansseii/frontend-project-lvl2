import fs from 'fs';
import _ from 'lodash';

const readFile = (filepath) => JSON.parse(fs.readFileSync(filepath, 'utf8'));

const statuses = {
  new: '+',
  removed: '-',
  identity: ' ',
};

const buildDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();

  return keys.reduce((acc, key) => {
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      acc.push({ status: 'removed', key, value: obj1[key] });
    } else if (!_.has(obj1, key) && _.has(obj2, key)) {
      acc.push({ status: 'new', key, value: obj2[key] });
    } else if (obj1[key] !== obj2[key]) {
      acc.push({ status: 'removed', key, value: obj1[key] });
      acc.push({ status: 'new', key, value: obj2[key] });
    } else {
      acc.push({ status: 'identity', key, value: obj1[key] });
    }
    return acc;
  }, []);
};

const buildFormattedDiff = (diffs) => {
  const formatted = diffs
    .map(({ status, key, value }) => `  ${statuses[status]} ${key}: ${value}`)
    .join('\n');

  return `{\n${formatted}\n}`;
};

export default (filepath1, filepath2) => {
  const obj1 = readFile(filepath1);
  const obj2 = readFile(filepath2);
  const diff = buildDiff(obj1, obj2);

  return buildFormattedDiff(diff);
};
