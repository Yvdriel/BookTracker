<template>
    <q-card class="my-card">
        <img v-show="current.image_url" :src="current.image_url">

        <q-card-section>
            <div class="text-h6" v-show="current.title">{{ current.title }}</div>
            <div class="text-subtitle2" v-show="current.author">by {{ current.author }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <q-input 
                outlined 
                :label="`ISBN ${isbn_length}`"
                mask="##########" 
                v-model="isbn" 
                :rules="[
                    (val) => /^[0-9]*$/.test(val) || 'Only numbers allowed',
                    (val) => val.length == isbn_length || `This ISBN should have ${isbn_length} characters`,
                ]" 
            />
            <q-btn class="book-button q-mt-md" color="primary" icon="book" label="Get book" />
        </q-card-section>
    </q-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useBooksStore } from 'src/stores/books-store';

export interface ISBNCardProps {
  isbn_length: number;
}
withDefaults(defineProps<ISBNCardProps>(), {
  isbn_length: 10,
});

const isbn = ref();
const books_store = useBooksStore();

const current = computed(() => books_store.current);



</script>

<style scoped lang="sass">
.my-card
  width: 250px
  max-width: 250px
.book-button
    width: 100%
</style>
