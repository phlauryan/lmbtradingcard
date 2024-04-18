<script setup>
import { reactive, computed } from 'vue'
import Card from './card-elmt.vue'
defineProps({
  group: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <h1>
    {{ group.groupname }}

  </h1>
  <div>
    <div class="card-wrap" v-for="card in group.cards" :key="card">
      <Card :visu="card.visu" />
    </div>
  </div>
</template>

<style>
/*
a voir ombre ?. 

 .card-wrap::before {
    inset: 0.75rem;
    background: red;
    transform: translateZ(-49px);
  } */
</style>