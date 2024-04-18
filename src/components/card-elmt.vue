<script setup>
import { ref } from 'vue'
defineProps({
  visu: {
    type: String,
    required: true
  }
})

/* mouvement a l'affichage de la page*/
const rotateY = ref('12deg');
const rotateX = ref('14deg');
let transition = ref('cubic-bezier(0.775, -0.555, 0.175, 1.650) 1s');
setTimeout(function () {
  rotateY.value = '-12deg';
  rotateX.value = '-14deg';
}, 500);
setTimeout(function () {
  rotateY.value = '0deg';
  rotateX.value = '0deg';
}, 1000);


const glareY = ref('0px');
const glareX = ref('0px');

let shineX = ref('0%')
let shineY = ref('0%')
let offsetX = ref(0)
let offsetY = ref(0)

//mouvement de la carte fonction de la sourie
function handleMouseMove(event) {
  transition.value = '';
  const x = event.layerX;
  const y = event.layerY;
  const cardsizex = 278;/*278;*/
  const cardsizey = 376;/*376;*/
  const middleX = cardsizex / 2;
  const middleY = cardsizey / 2;
  offsetX.value = ((x - middleX) / middleX) * 25;
  offsetY.value = ((y - middleY) / middleY) * 30;

  // set rotation
  rotateY.value = -1 * offsetX.value + 'deg';
  rotateX.value = offsetY.value + 'deg';

  glareX.value = x + 'px';
  glareY.value = y + 'px';

  shineX.value = x + '%';
  shineY.value = y + '%';
};

//mouvement quand je sort de la carte
function hoveroire() {
  transition.value = 'cubic-bezier(0.775, -0.555, 0.175, 1.650) 1s';
  rotateY.value = '0deg';
  rotateX.value = '0deg';
};

//mouvement lors du scroll
const startY = ref(0);
var scroll;
window.addEventListener('scroll', function (event) {
  let direction = 1;
  var scrollY = window.scrollY
  if (scrollY > startY.value) {
    direction = 1;
  } else {
    direction = -1;
  }
  startY.value = scrollY;

  window.clearTimeout(scroll);
  transition.value = 'cubic-bezier(0.265, -0.375, 0.485, 0.800) .4s';
  rotateX.value = (10 * direction) + 'deg';
  scroll = setTimeout(function () {
    transition.value = 'cubic-bezier(0.775, -0.555, 0.175, 1.650) .75s';
    rotateX.value = '0deg';
  }, 100);
}, false);

</script>

<template>
  <div class='padding'>
    <div class="contenant" @mouseleave="hoveroire" @mousemove="handleMouseMove">
      <div class="rotate">
        <img class="card" :src="visu" />
        <div class="shine"></div>
        <div class="card__glare"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  max-width: 300px;
}

/*
  0 100% pointer
.shine {

width: 100%;
height: 100%;
position: absolute;
background-image: radial-gradient(farthest-corner ellipse at calc(((v-bind('shineX')) * 0.5) + 25%) calc(((v-bind('shineY')) * 0.5) + 25%), hsl(0, 0%, 100%) 5%, hsla(300, 100%, 11%, 0.6) 40%, hsl(0, 0%, 22%) 120%);
background-position: center center;
background-size: 400% 500%;
filter: brightness(calc(v-bind('x')*0.2) + 0.4)) contrast(.85) saturate(1.1);
mix-blend-mode: hard-light;
}

*/
/*
.shadow {
  width: 100%;
  height: 100%;
  inset: 0.75rem;
  background: red;
  position: absolute;
  transform: translateZ(2px);
}*/

.padding {
  padding: 20px;
}

.contenant {
  perspective: 800px;
  transform-style: preserve-3d;
}

.rotate {
  transition: v-bind('transition');
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
  transform: rotateX(v-bind('rotateX')) rotateY(v-bind('rotateY'));
  /*transform: translate3d(0px, 0px, 0.01px);*/
}

.card__glare {
  transform: translateZ(1.41px);
  width: 100%;
  height: 100%;
  position: absolute;

  background-image: radial-gradient(farthest-corner circle at v-bind('glareX') v-bind('glareY'),
      hsla(0, 0%, 100%, 0.8) 10%,
      hsla(0, 0%, 100%, 0.65) 20%,
      hsla(0, 0%, 0%, 0.5) 90%);

  opacity: .75;
  mix-blend-mode: overlay;

}
</style>