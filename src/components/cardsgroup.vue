<script setup>
import card from './card.vue'
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
    <div v-for="card in group.cards">
      <card :visu="card.visu" />
    </div>
  </div>
</template>
