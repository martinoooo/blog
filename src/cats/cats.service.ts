import { Injectable } from '@nestjs/common';
import fg = require('fast-glob');
import path = require('path');
import fs = require('fs');

@Injectable()
export class CatsService {
  private entries = null;

  findOne(folder, name) {
    const entries = fg.sync(
      path.join(__dirname, '../../', 'articles', folder, name + '.md'),
    );
    const file = fs.readFileSync(entries[0], 'utf8');
    return file;
  }

  findList() {
    if (!this.entries) {
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
        entries[directory] = entry.map(file => file.replace('.md', ''));
      });

      this.entries = entries;
    }
    return this.entries;
  }
}
