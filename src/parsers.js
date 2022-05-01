import jsYaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: jsYaml.load,
};

export default (filetype) => parsers[filetype];
