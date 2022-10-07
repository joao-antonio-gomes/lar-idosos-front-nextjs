import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://54.80.199.217/api/',
});
