import type { IFolders } from '../definetions';

const mdModules = import.meta.glob<string>('../../articles/*/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export const getArticleList = (): IFolders[] => {
  const map = new Map<string, { name: string; path: string }[]>();

  for (const filePath of Object.keys(mdModules)) {
    const parts = filePath.replace(/.*\/articles\//, '').split('/');
    const folder = parts[0];
    const fileName = parts[1];

    if (!map.has(folder)) map.set(folder, []);
    map.get(folder)!.push({
      name: fileName.replace('.md', ''),
      path: `articles/${folder}/${fileName}`,
    });
  }

  return Array.from(map.entries()).map(([name, children]) => ({
    name,
    path: name,
    children: children.sort((a, b) => a.name.localeCompare(b.name)),
  }));
};

export const getArticle = (name: string): string => {
  const key = `../../${name}`;
  return mdModules[key] || '# 文章未找到';
};
