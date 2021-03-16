import { readdirSync } from 'fs';
import path from 'path';
import * as log from './log';
import config from '../webpack/webpack.dev';
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

export const pkgs = readdirSync(path.resolve(__dirname, '../src/pages'));

export function build(name?) {
  log.start('开始构建' + (name ? name : '全部pages'));

  let webConfig;
  if (name) {
    const libPath = path.resolve(
      path.resolve(__dirname, '../src/pages'),
      name,
      'index.tsx',
    );

    webConfig = { ...config, entry: { [name]: libPath } };
  } else {
    webConfig = { ...config };
  }
  var compiler = webpack(webConfig);
  new WebpackDevServer(compiler, config.devServer);
}
