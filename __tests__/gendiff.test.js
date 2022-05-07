import path from 'path';
import fs from 'fs';
import getDiff from '../src/gendiff.js';

const getFixturePath = (filename, extension) => path.join(process.cwd(), '__fixtures__', `${filename}${extension}`);

const extensions = ['.json', '.yml'];
const formatters = ['stylish', 'plain'];

describe.each(extensions)('diff for extension: %s', (extension) => {
  test.each(formatters)('test formatter: %s', (formatter) => {
    const expected = fs.readFileSync(getFixturePath(`expected-${formatter}`, '.txt'), 'utf8');
    const fileName1 = getFixturePath('before', extension);
    const fileName2 = getFixturePath('after', extension);

    expect(getDiff(fileName1, fileName2, formatter)).toBe(expected);
  });
});
