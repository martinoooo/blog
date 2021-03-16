const fg = require('fast-glob');
const path = require('path');

module.exports = function() {
  const entries = {};

  const directories = fg.sync('*', {
    absolute: false,
    onlyDirectories: true,
    cwd: path.join(__dirname, '../src/pages'),
  });

  directories.forEach(directory => {
    const entry = fg.sync('index.tsx', {
      absolute: true,
      cwd: path.join(__dirname, '../src/pages/', directory),
    });
    entries[directory] = entry;
  });

  return entries;
};
