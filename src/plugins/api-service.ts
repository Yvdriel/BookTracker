import axios from 'axios';

const api_service = axios.create({
   baseURL: 'https://openlibrary.org/',
//    withCredentials: true,
//    headers: {
//        Accept: '*/*',
//        Authorization: 
//    }
});

export default api_service;