import path from 'path';
import getDiff from '../src/gendiff.js';

const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename);

test('flat json', () => {
  const fileName1 = getFixturePath('sample1.json');
  const fileName2 = getFixturePath('sample2.json');
  const expected = [
    '{',
    '  - follow: false',
    '    host: hexlet.io',
    '  - proxy: 123.234.53.22',
    '  - timeout: 50',
    '  + timeout: 20',
    '  + verbose: true',
    '}',
  ].join('\n');

  expect(getDiff(fileName1, fileName2, 'json')).toBe(expected);
});

test('flat yaml', () => {
  const fileName1 = getFixturePath('sample1.yml');
  const fileName2 = getFixturePath('sample2.yaml');
  const expected = [
    '{',
    '  - follow: false',
    '    host: hexlet.io',
    '  - proxy: 123.234.53.22',
    '  - timeout: 50',
    '  + timeout: 20',
    '  + verbose: true',
    '}',
  ].join('\n');

  expect(getDiff(fileName1, fileName2, 'yaml')).toBe(expected);
});
