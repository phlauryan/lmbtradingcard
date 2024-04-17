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
const glareY = ref('0px');
const glareX = ref('0px');
let offsetX= ref(0)
let offsetY= ref(0)
let transition = ref('cubic-bezier(0.25, 0.1, 0.25, 1.4) 1s');
/*
console.log(event.clientX);
console.log(event.clientY);*/

/*
console.log(event.clientX);
console.log(event.clientY);*/
function handleMouseMove(event) {
  transition='cubic-bezier(0.25, 0.1, 0.25, 1.4) .15s';
  /* console.log('kkcccc   ', event);*/
  const x = event.layerX;
  const y = event.layerY;
  const cardsizex = 278;/*278;*/
  const cardsizey = 376;/*376;*/
  const middleX = cardsizex / 2;
  const middleY = cardsizey / 2;
   offsetX = ((x - middleX) / middleX) * 45;
   offsetY = ((y - middleY) / middleY) * 30;

  // set rotation
  rotateY.value = offsetX + 'deg';
  rotateX.value = -1 * offsetY + 'deg';
  
  glareX.value = x +'px';
  glareY.value = y + 'px';
  console.log('rotation x:' + offsetX + ' y:' + offsetY);
};

function hoveroire() {
 /* transition='cubic-bezier(0.465, -0.360, 0.360, 0.910) .8s';
  rotateX.value = (offsetX*-0.5) + 'deg';
  rotateY.value = ((-1 * offsetY)*-0.5) + 'deg';*/
  transition='cubic-bezier(0.775, -0.555, 0.175, 1.650) 1s';
  rotateY.value = '0deg';
  rotateX.value = '0deg';
};

var scroll;
window.addEventListener('scroll', function (event) {
  window.clearTimeout(scroll);
  /*0rotateY.value = '0deg';*/
  transition='cubic-bezier(0.265, -0.375, 0.485, 0.800) .4s';
  rotateX.value = '30deg';
  scroll = setTimeout(function () {
    /*rotateY.value = '0deg';*/
    transition='cubic-bezier(0.240, 0.450, 0.465, 0.995) .4s';
  rotateX.value = '0deg';
  }, 200);
}, false);
</script>

<template>
  <div class="contenant" @mouseleave="hoveroire" @mousemove="handleMouseMove">
  <div class="rotate" >
    <img class="card" :src="visu" />
    <div class="card__glare"></div>
    </div></div>
</template>

<style scoped>
  img {
    max-width: 300px;
  }

/*
a voir ombre ?. 

 .card-wrap::before {
    inset: 0.75rem;
    background: red;
    transform: translateZ(-49px);
  } */

  .contenant {
    padding: 20px;
  }

.rotate {
  transition: v-bind('transition');
   /*box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3); */
 transform: rotateX(v-bind('rotateX')) rotateY(v-bind('rotateY'));
  /*transform: translate3d(0px, 0px, 0.01px);*/
}

.card__glare {

  transform: translateZ(1.41px);
  width: 100%;
  height: 100%;
  position: absolute;

  background-image: radial-gradient(
  farthest-corner circle at v-bind('glareX') v-bind('glareY'),
  hsla(0, 0%, 100%, 0.8) 10%,
  hsla(0, 0%, 100%, 0.65) 20%,
  hsla(0, 0%, 0%, 0.5) 90%
);

  opacity: .5;
  mix-blend-mode: overlay;

}


.card:hover {}
</style>