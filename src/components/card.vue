<script setup>
import { ref } from 'vue'
defineProps({
  visu: {
    type: String,
    required: true
  }
})


const rotateY = ref('0deg');
const rotateX = ref('14deg');
/*
console.log(event.clientX);
console.log(event.clientY);*/

/*
console.log(event.clientX);
console.log(event.clientY);*/
function handleMouseMove(event) {
  /* console.log('kkcccc   ', event);*/
  const x = event.layerX;
  const y = event.layerY;
  const cardsizex = 278;/*278;*/
  const cardsizey = 376;/*376;*/
  const middleX = cardsizex / 2;
  const middleY = cardsizey / 2;
  const offsetX = ((x - middleX) / middleX) * 45;
  const offsetY = ((y - middleY) / middleY) * 30;

  // set rotation
  rotateY.value = offsetX + 'deg';
  rotateX.value = -1 * offsetY + 'deg';
  console.log('rotation x:' + offsetX + ' y:' + offsetY);
};
function hoveroire() {
  rotateY.value = '0deg';
  rotateX.value = '0deg';
};
</script>

<template>
  <div @mouseleave="hoveroire" @mousemove="handleMouseMove">
    <img class="card" :src="visu" />
  </div>
</template>

<style scoped>
/*
a voir ombre ?. 

 .card-wrap::before {
    inset: 0.75rem;
    background: red;
    transform: translateZ(-49px);
  } */

.card {
  transition: cubic-bezier(0.25, 0.1, 0.25, 1.4) .15s;
  padding: 20px;
  /* box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3); */
  transform: rotateX(v-bind('rotateX')) rotateY(v-bind('rotateY'));
}

.card:hover {}
</style>