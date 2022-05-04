import jsYaml from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yml': jsYaml.load,
  '.yaml': jsYaml.load,
};

export default (filetype) => parsers[filetype];
