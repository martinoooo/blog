import * as log from './log';
import colors from 'colors';
import cmd from 'commander';
import { pkgs, build } from './utils';

cmd
  .option('-p, --package-name [package_name]', 'package name')
  .parse(process.argv);

console.log(cmd.packageName);
if (cmd.packageName && cmd.packageName !== true) {
  if (pkgs.includes(cmd.packageName)) {
    build(cmd.packageName);
  } else {
    log.error(
      cmd.packageName + colors.yellow(' 不存在') + '，请确认页面的名称',
    );
  }
} else {
  build();
}
