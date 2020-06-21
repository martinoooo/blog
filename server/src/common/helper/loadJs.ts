import hbs = require('hbs');
import fg = require('fast-glob');
import path = require('path');

export default () => {
  const entries = fg.sync(
    path.join(__dirname, '../../../..', 'client/dist/manifest.json'),
    { dot: true },
  );

  const config = require(entries[0]);

  hbs.registerHelper('load_js', file => {
    const src = config[file];
    if (src) {
      let scriptStr = `<script src="${src}" charset="utf-8"`;
      scriptStr += '></script>';
      return new hbs.SafeString(scriptStr);
    }
    return new hbs.SafeString('');
  });

  hbs.registerHelper('add_manifest', file => {
    const scriptStr = `<script>window.manifest = ${JSON.stringify(
      config,
    )}</script>`;
    return new hbs.SafeString(scriptStr);
  });
};
