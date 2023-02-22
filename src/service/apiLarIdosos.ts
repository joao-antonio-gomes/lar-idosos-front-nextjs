import axios from 'axios';

export const apiLarIdosos = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_LARIDOSOS_URL
});
