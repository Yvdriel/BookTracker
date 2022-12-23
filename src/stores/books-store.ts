import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import axios from 'axios';

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: useLocalStorage('books', {}),
    current: {
      image_url: '',
      author: '',
      title: '',
    }
  }),
  actions: {
    getBookByISBN() {
      axios.get('').then((response) => {
        console.log(response.data);
      });
    },
  },
});
