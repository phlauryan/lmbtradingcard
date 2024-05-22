<script setup>
import { reactive, computed,defineEmits  } from 'vue'
import Card from './card-elmt.vue'
const emit = defineEmits(['childClickedG'])

const props = defineProps({
  group: {
    type: Object,
    required: true
  }
})

function handleChildClick(clientWidth, clientHeight,posx, posy,visu) {
      console.log('Received from child:', clientWidth, clientHeight,posx, posy,visu);
      // Appeler la fonction du parent avec les paramètres reçus
      emit('childClickedG', clientWidth, clientHeight,posx, posy,visu);
    }
</script>

<template>
  <h1>
    {{ group.groupname }}
  </h1>
  <div>
    <div class="card-wrap" v-for="cardb in group.cards" :key="cardb">
      <Card :carda="cardb" @childClicked="handleChildClick"/>
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