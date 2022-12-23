<template>
    <q-page class="row items-center justify-evenly">
        <ISBNCard />
        <ISBNCard :isbn_length="12" />
    </q-page>
</template>

<script setup lang="ts">
import ISBNCard from 'src/components/ISBNCard.vue';
import { ref } from 'vue';

</script>

<style scoped lang="sass">
</style>
