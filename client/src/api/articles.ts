import axios from 'axios';

export const getArticleList = () => {
  return axios.get('/api/articles/list').then(({ data: { data } }) => data);
};

export const getArticle = (folder: string, name: string) => {
  return axios
    .get('/api/article', {
      params: {
        folder,
        name,
      },
    })
    .then(({ data: { data } }) => data);
};
