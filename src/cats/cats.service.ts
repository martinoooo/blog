import { Injectable } from '@nestjs/common';
import fg = require('fast-glob');
import path = require('path');
import fs = require('fs');
// tslint:disable-next-line: no-var-requires
const axios = require('axios');
import { Base64 } from 'js-base64';
import { ACCESS_TOKEN } from '../config';

const BASE = 'https://api.github.com';
const GET_CONTENT = BASE + '/repos/martinoooo/blog/contents/';
const END = `?access_token=${ACCESS_TOKEN}`;

@Injectable()
export class CatsService {
  private entries = null;

  async findOne(name) {
    try {
      const { data } = await axios.get(GET_CONTENT + encodeURI(name) + END);
      return Base64.decode(data.content);
    } catch (error) {
      return error;
    }
  }

  async findList() {
    try {
      const { data: folders } = await axios.get(GET_CONTENT + 'articles' + END);

      const entries = [];
      for (const folder of folders) {
        const { data } = await axios.get(
          GET_CONTENT + encodeURI(folder.path) + END,
        );
        const children = data.map(n => ({
          name: n.name.replace('.md', ''),
          path: n.path,
        }));
        entries.push({
          name: folder.name,
          path: folder.path,
          children,
        });
      }
      return entries;
    } catch (error) {
      return error;
    }
  }
}
