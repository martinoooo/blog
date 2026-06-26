import axios from 'axios';
import { Base64 } from 'js-base64';
import { ACCESS_TOKEN, GET_CONTENT } from '../config';

export class CatsService {
  private entries = null;

  async findOne(name: string) {
    const { data } = await axios.get(GET_CONTENT + encodeURI(name), {
      headers: { Authorization: `token ${ACCESS_TOKEN}` },
    });
    return Base64.decode(data.content);
  }

  async findList() {
    const { data: folders } = await axios.get(GET_CONTENT + 'articles', {
      headers: { Authorization: `token ${ACCESS_TOKEN}` },
    });

    const entries = [];
    for (const folder of folders) {
      const { data } = await axios.get(GET_CONTENT + encodeURI(folder.path), {
        headers: { Authorization: `token ${ACCESS_TOKEN}` },
      });
      const children = data.map((n: { name: string; path: string }) => ({
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
  }
}
