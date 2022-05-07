import fs from 'fs';
import path from 'path';
import build from './formatters/index.js';
import getParser from './parsers.js';
import buildDiff from './diffBuilder.js';

const toObject = (filepath) => {
  const filetype = path.extname(filepath);
  const parse = getParser(filetype);
  const content = fs.readFileSync(filepath, 'utf8');

  return parse(content);
};

export default (filepath1, filepath2, formatter = 'stylish') => {
  const obj1 = toObject(filepath1);
  const obj2 = toObject(filepath2);
  const diff = buildDiff(obj1, obj2);

  return build(diff, formatter);
};
