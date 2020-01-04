import axios from 'axios';
import { ISelectArticle } from '../definetions';

export const getArticleList = () => {
  return axios.get('/api/articles/list').then(({ data: { data } }) => data);
};

export const getArticle = (name: string) => {
  return axios
    .get('/api/article', { params: { name } })
    .then(({ data: { data } }) => data);
};
