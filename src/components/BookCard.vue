<template>
  <div class="col-6 q-px-sm">
    <q-card class="my-card q-pt-sm q-my-md q-mx-auto">
      <img class="overflow-hidden cover-image shadow-1" :src="image_url" />
      <q-card-section>
        <div class="text-center text-subtitle1 text-bold">{{ title }}</div>
        <div class="text-center text-caption">{{ subtitle }}</div>
        <q-separator spaced />
        <div><span class="text-bold">Pages: </span>{{ number_of_pages }}</div>
        <div><span class="text-bold">ISBN: </span>{{ isbn }}</div>
      </q-card-section>

      <q-separator spaced />
      <div class="text-center text-bold">Quick Actions</div>
      <q-card-actions class="row justify-evenly">
        <q-btn no-caps color="positive" v-if="status != 'finished'" @click="updateStatus('finished')">Finished</q-btn>
        <q-btn no-caps color="primary" v-if="status != 'reading'" @click="updateStatus('reading')">Reading</q-btn>
        <q-btn no-caps color="secondary" v-if="status != ''" @click="updateStatus('')">Reset Status</q-btn>
        <q-btn no-caps flat color="negative" @click="promptDelete()">Delete</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { useBooksStore } from 'src/stores/books-store';
import { computed } from 'vue';
export interface BookCardProps {
    title: string,
    subtitle: string,
    image_url: string,
    number_of_pages: number,
    isbn: string,
}
const props = defineProps<BookCardProps>();

const $q = useQuasar();
const books_store = useBooksStore();
const status = computed(() => books_store.books[props.isbn as keyof typeof books_store.books].status);

const promptDelete = () => {
  $q.dialog({
        title: 'Confirm',
        message: 'Are you sure you wish to delete this book from your list?',
        cancel: true,
        persistent: false
      }).onOk(() => {
        books_store.removeCurrentBook(props.isbn);
      })
};
const updateStatus = (newStatus: string) => {
  books_store.books[props.isbn as keyof typeof books_store.books].status = newStatus;
};

</script>

<style scoped lang="sass">
.my-card
  min-width: 200px
  max-width: 300px
.book-button
    width: 100%
.cover-image
    max-width: 70%
    display: block
    margin: auto
</style>
