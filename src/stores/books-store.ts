import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import api_service from 'src/plugins/api-service';
import { Notify } from 'quasar';

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: useLocalStorage('books', {}),
    current: {
      isbn: '',
      image_url: '',
      authors: {},
      title: '',
      subtitle: '',
      publishers: {},
      number_of_pages: 0,
    },
    loading: false,
  }),
  actions: {
    getBookByISBN(isbn: string) {
      this.loading = true;
      this.current = {
        isbn: '',
        image_url: '',
        authors: {},
        title: '',
        subtitle: '',
        publishers: {},
        number_of_pages: 0,
      };

      api_service.get('/isbn/' + isbn + '.json')
        .then((response) => {
          Notify.create({
            type: 'positive',
            message: 'Book found',
            position: 'top',
          });
          for (const [key, value] of Object.entries(response.data)) {
            if (typeof this.current[key] == 'undefined') continue;
            this.current[key] = value;
          }

          if (response.data.covers) {
            this.current.image_url = 'https://covers.openlibrary.org/b/id/' + response.data.covers[0] + '-L.jpg'
          }
          this.current.isbn = isbn;
        })
        .catch((error) => {
          if (error.response.status) {
            Notify.create({
              type: 'negative',
              message: 'Could not find book by ISBN',
              position: 'top',
              timeout: 10000,
              progress: true,
            });
          }
        })
        .finally(() => {
          setTimeout(() => {

            this.loading = false
          }, 300);
        })
    },
    addCurrentBook(isbn: string) {
      if (!this.books[isbn]) {
        this.books[isbn] = this.current;
      }
      Notify.create({
        type: 'positive',
        message: 'Book added',
        position: 'top',
      });
    },
    removeCurrentBook(isbn: string) {
      if (this.books[isbn]) {
        delete this.books[isbn];
      }
      Notify.create({
        type: 'negative',
        message: 'Book removed',
        position: 'top',
      });
    },
  },
});
