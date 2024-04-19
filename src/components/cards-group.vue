<script setup>
import { reactive, computed } from 'vue'
import Card from './card-elmt.vue'
const props = defineProps({
  group: {
    type: Object,
    required: true
  },
  ori:{
    type: Object,
    required: true
  }
})

console.log('ori group ',props.ori)
</script>

<template>
  <h1>
    {{ group.groupname }}
  </h1>
  <div>
    <div class="card-wrap" v-for="cardb in group.cards" :key="cardb">
      <Card :carda="cardb" :ori="ori"/>
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