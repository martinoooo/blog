export interface ISelectArticle {
  folder: string;
  name: string;
}

export interface IFolders {
  name: string;
  path: string;
  children: IFolder[];
}

export interface IFolder {
  name: string;
  path: string;
}
