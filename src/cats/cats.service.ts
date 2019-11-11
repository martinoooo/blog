import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import fg = require('fast-glob');
import path = require('path');
import fs = require('fs');

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  findOne(folder, name) {
    const entries = fg.sync(
      path.join(__dirname, '../../', 'articles', folder, name),
    );
    const file = fs.readFileSync(entries[0], 'utf8');
    return file;
  }

  findList() {
    const entries = {};

    const directories = fg.sync('*', {
      absolute: false,
      onlyDirectories: true,
      cwd: path.join(__dirname, '../../', 'articles'),
    });

    directories.forEach(directory => {
      const entry = fg.sync('*', {
        absolute: false,
        cwd: path.join(__dirname, '../../', 'articles', directory),
      });
      entries[directory] = entry;
    });

    return entries;
  }
}
