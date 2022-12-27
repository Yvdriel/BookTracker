<template>
    <q-page>
        <div class="row" v-for="(books, index) in books_by_status" :key="index" :class="find_background_status(index)">
          <div class="col-12 text-h4 text-center text-capitalize">{{ index }}</div>
          <BookCard v-for="(value, index) in books" :key="index" v-bind="value" :isbn="index" />
          <div class="col-12">
            <q-separator />
          </div>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import BookCard from 'src/components/BookCard.vue';
import { BackgroundStatusses } from 'src/components/models';
import { useBooksStore } from 'src/stores/books-store';
import { computed, ref } from 'vue';

const books_store = useBooksStore();
const background_statusses = ref<BackgroundStatusses[]>([
  {
    status: 'reading',
    color: 'bg-cyan-3'
  },
  {
    status: 'finished',
    color: 'bg-green-12'
  },
]);
const find_background_status = (status: string) => {
  const obj = background_statusses.value.find(o => o.status == status);
  return obj?.color ?? '';
};
// const books = computed(() => books_store.books)

const books_by_status = computed(() => books_store.getBooksByStatus());
console.log(books_by_status.value);
</script>

<style scoped lang="sass">
</style>
