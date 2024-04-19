<script setup>
import { ref,  reactive, computed} from 'vue'
const props = defineProps({
  carda: {
    type: Object,
    required: true
  }
})
/*
function maFrame() {
code frame
window.requestAnimationFrame(maFrame)
};
window.requestAnimationFrame(maFrame)
*/


const visu = props.carda.visu;
const holo = props.carda.type === "holo" ||props.carda.type === "auto";

let rotateXCoef = ref(0)
let rotateYCoef = ref(0)
//a rendre dynamique
const width = 340;
const height = 470;
const decalageMaxXDeg =15;
const decalageMaxYDeg =20;
//rotateCoef -1 to 1
//rotateDeg -decalageMaxDeg to decalageMaxYDeg
//glare 0 to 100
//shine 0to 100
const rotateXDeg = computed(() => {
  return (rotateYCoef.value * decalageMaxYDeg)+'deg';
})
const rotateYDeg = computed(() => {
  return -1* (rotateXCoef.value * decalageMaxXDeg)+'deg';
})
const glareX = computed(() => {
  return ((rotateXCoef.value +1)/2 * width)+'px';
})
const glareY = computed(() => {
  return ((rotateYCoef.value+1)/2 * height)+'px';
})
const shineX = computed(() => {
  return ((rotateXCoef.value+1)/2 * 100)+'%';
})
const shineY = computed(() => {
  return ((rotateYCoef.value+1)/2 * 100)+'%';
})
const fromCenter = computed(() => {
  return Math.abs(rotateXCoef) + Math.abs(rotateYCoef)
})

/* mouvement a l'affichage de la page*/
rotateYCoef.value = 0.6;
 rotateYCoef.value = 0.9;
let transition = ref('cubic-bezier(0.775, -0.555, 0.175, 1.650) 1s');
setTimeout(function () {
  rotateYCoef.value = -0.6;
 rotateYCoef.value = -0.9;
}, 500);
setTimeout(function () {
  rotateYCoef.value = 0;
 rotateYCoef.value = 0; 
}, 1000);




//mouvement de la carte fonction de la sourie
function handleMouseMove(event) {
  if (window.matchMedia("(hover: hover)").matches) {
    
  transition.value = '';

    const middleX = event.target.clientWidth / 2;
    const middleY = event.target.clientHeight / 2;

    rotateXCoef.value = ((event.layerX - middleX) / middleX) ;
    rotateYCoef.value = ((event.layerY - middleY) / middleY) ;
    
  }

  console.log('xxxxxxxx : '+event.layerX);
  
  console.log('yyyyyyyy : '+event.layerY);
  console.log('rotateXDeg : '+rotateXDeg.value);
console.log('rotateYDeg : '+rotateYDeg.value);
console.log('glareX : '+glareX.value);
console.log('glareY : '+glareY.value);
console.log('shineX : '+shineX.value);
console.log('shineY : '+shineY.value);
console.log('fromCenter : '+fromCenter.value);
console.log('rotateXCoef : '+rotateXCoef.value);
console.log('rotateYCoef : '+rotateYCoef.value);
}


//mouvement quand je sort de la carte
function hoveroire() {
  transition.value = 'cubic-bezier(0.775, -0.555, 0.175, 1.650) 1s';
  rotateYCoef.value = 0;
 rotateXCoef.value = 0; 
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
  rotateYCoef.value = (0.5 * direction) ;
  scroll = setTimeout(function () {
    transition.value = 'cubic-bezier(0.775, -0.555, 0.175, 1.650) .75s';
    rotateYCoef.value = 0;
  }, 100);
}, false);



</script>

<template>
  <div class='padding'>
    <div class="contenant" @mouseleave="hoveroire" @mousemove="handleMouseMove">
      <div class="rotate">
        <img class="card" :src="visu" />
        <div v-if="holo" class="shine"></div>
        <div class="card__glare"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  max-width: 300px;
}

.shine {
  --space: 5%;
  --angle: 133deg;
  --imgsize: 50%;
  --posy: v-bind('shineY');
  --posx: v-bind('shineX');
  --my: v-bind('shineY');
  --mx: v-bind('shineX');
  --hyp: 0;
  width: 100%;
  aspect-ratio: .714;
  mix-blend-mode: color-dodge;
   background-image: url(./images/noir.png),
    repeating-linear-gradient(0deg, rgb(255, 119, 115) calc(var(--space)* 1), rgba(255, 237, 95, 1) calc(var(--space)* 2), rgba(168, 255, 95, 1) calc(var(--space)* 3), rgba(131, 255, 247, 1) calc(var(--space)* 4), rgba(120, 148, 255, 1) calc(var(--space)* 5), rgb(216, 117, 255) calc(var(--space)* 6), rgb(255, 119, 115) calc(var(--space)* 7)),
    repeating-linear-gradient(var(--angle), #0e152e 0%, hsl(180, 10%, 60%) 3.8%, hsl(180, 29%, 66%) 4.5%, hsl(180, 10%, 60%) 5.2%, #0e152e 10%, #0e152e 12%),
    radial-gradient(farthest-corner circle at var(--mx) var(--my), rgba(0, 0, 0, .1) 12%, rgba(0, 0, 0, .15) 20%, rgba(0, 0, 0, .25) 120%);
  background-blend-mode: exclusion, hue, hard-light, exclusion;
  background-size: var(--imgsize), 200% 700%, 300%, 200%;
  background-position: center, 0% var(--posy), var(--posx) var(--posy), var(--posx) var(--posy);
  filter: brightness(calc((var(--hyp)* 0.3) + 0.5)) contrast(2) saturate(1.5);
  -webkit-filter: brightness(calc((var(--hyp)* 0.3) + 0.5)) contrast(2) saturate(1.5);
  display: grid;
  grid-area: 1 / 1;
  opacity: 1;
  position: absolute;
}

.padding {
  padding: 20px;
}

.contenant {
  perspective: 800px;
  transform-style: preserve-3d;
}

.rotate {
/*  transition: v-bind('transition');*/
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
  transform: rotateX(v-bind('rotateXDeg')) rotateY(v-bind('rotateYDeg'));
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