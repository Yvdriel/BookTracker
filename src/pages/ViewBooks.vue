<template>
    <q-page class="row items-center justify-evenly">
        <div v-for="book in books" :key="book"> {{ book }}</div>
    </q-page>
</template>

<script setup lang="ts">
import BookCard from 'src/components/BookCard.vue';
import { useBooksStore } from 'src/stores/books-store';
import { computed } from 'vue';

const books_store = useBooksStore();
const books = computed(() => books_store.books)

</script>

<style scoped lang="sass">
</style>
