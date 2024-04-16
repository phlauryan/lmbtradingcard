<script setup>
defineProps({
  visu: {
    type: String,
    required: true
  }
})
</script>

<template>
  <img :src="visu" />
  test {{ visu }}
</template>
