import path from 'path';
import fs from 'fs';
import getDiff from '../src/gendiff.js';

const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename);

test('json', () => {
  const fileName1 = getFixturePath('before.json');
  const fileName2 = getFixturePath('after.json');
  const expected = fs.readFileSync(getFixturePath('expected-stylish.txt'), 'utf8');

  expect(getDiff(fileName1, fileName2, 'stylish')).toBe(expected);
});
