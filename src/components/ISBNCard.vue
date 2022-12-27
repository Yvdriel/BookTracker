<template>
    <q-card class="my-card q-mt-md" flat>
        <q-slide-transition>
            <div v-show="!loading">
                <div v-show="current.image_url" class="q-mt-sm">
                    <img class="overflow-hidden cover-image shadow-1" :src="current.image_url" />
                </div>

                <q-card-section class="text-center" v-show="current.title">
                    <div class="text-subtitle1 text-bold">{{ current.title }}</div>
                    <div class="text-center" v-show="current.title">{{ current.subtitle }}</div>
                </q-card-section>
                <q-separator inset />
                <q-card-section>
                    <div v-show="current.number_of_pages != 0"><span class="text-bold">Pages: </span>
                        {{ current.number_of_pages }}
                    </div>
                    <div 
                        class="text-bold" 
                        v-if="Object.entries(current.publishers).length"
                    >
                        Publishers:
                    </div>
                    <q-list v-if="current.publishers" dense>
                        <q-item class="items-center" v-for="publisher in current.publishers" :key="publisher">
                            <q-icon name="remove" /> {{ publisher }}
                        </q-item>
                    </q-list>
                </q-card-section>

            </div>
        </q-slide-transition>
        <q-card-section class="q-pt-none">
            <q-input outlined :label="`ISBN ${isbn_length}`" v-model="isbn" :rules="[
                (val) => /^[0-9]*$/.test(val) || 'Only numbers allowed',
                (val) => val.length == isbn_length || `This ISBN should have ${isbn_length} characters`,
            ]" />


            <p>9781847941831</p>
            <p>9781847941497</p>
            <div class="row">
                <div class="col-6 q-pr-xs">
                    <q-btn :loading="loading" class="book-button q-mt-md" color="primary" icon="book" label="Get book"
                        @click="getBookByISBN" />
                </div>
                <div class="col-6 q-pl-xs">
                    <q-btn v-if="!already_added && isbn.length == isbn_length && isbn == current.isbn"
                        :disable="!current.title" class="book-button q-mt-md" color="positive" icon="add"
                        label="Add book" @click="addCurrentBook" />
                    <q-btn v-if="already_added" class="book-button q-mt-md" color="negative" icon="remove"
                        label="Remove book" @click="removeCurrentBook" />
                </div>
            </div>

            <div v-if="already_added" class="text-center text-caption text-negative">
                This book has already been added!
            </div>

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

const isbn = ref<string>('');
const books_store = useBooksStore();

const current = computed(() => books_store.current);
const loading = computed(() => books_store.loading);
const already_added = computed(() => {
    return (books_store.books[isbn.value as keyof typeof books_store.books]
        && books_store.books[isbn.value as keyof typeof books_store.books]['title'] == current.value.title)
        ?? false
});

const getBookByISBN = () => {
    books_store.getBookByISBN(isbn.value);
};
const addCurrentBook = () => {
    books_store.addCurrentBook(isbn.value);
};
const removeCurrentBook = () => {
    books_store.removeCurrentBook(isbn.value);
};

</script>

<style scoped lang="sass">
.my-card
  width: 300px
  max-width: 300px
.book-button
    width: 100%
.cover-image
    max-width: 70%
    display: block
    margin: auto
</style>
