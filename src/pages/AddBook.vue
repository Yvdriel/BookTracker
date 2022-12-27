<template>
    <q-page class="row items-center justify-evenly">
        <!-- <ISBNCard />
        <ISBNCard :isbn_length="12" /> -->
        <ISBNCard :isbn_length="13" />
    </q-page>
</template>

<script setup lang="ts">
import ISBNCard from 'src/components/ISBNCard.vue';

</script>

<style scoped lang="sass">
</style>
