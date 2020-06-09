import colors from 'colors';
const log = console.log;

export const start = msg => log(colors.green(colors.bold('start') + ' ' + msg));
export const info = msg =>
  log(colors.bgBlue.black(colors.bold(' info ')) + ' ' + msg);
export const success = msg =>
  log(colors.bgGreen.black(colors.bold(' success ')) + ' ' + msg);
export const warn = msg =>
  log(colors.bgYellow.black(colors.bold(' warn ')) + ' ' + msg);
export const error = msg => log(colors.red('X') + ' ' + msg);
export const br = () => log();
export const sh = cmd => log(colors.yellow('$') + ' ' + cmd);
