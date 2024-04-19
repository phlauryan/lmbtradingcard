<script setup>
import { ref } from 'vue'
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
const holo = props.carda.type === "holo";
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
let fromCenter = ref(0)
//mouvement de la carte fonction de la sourie
function handleMouseMove(event) {
  if (window.matchMedia("(hover: hover)").matches) {
    let width = event.target.clientWidth
    let height = event.target.clientHeight

    transition.value = '';
    const x = event.layerX;
    const y = event.layerY;
    console.log('x: ' + x + " y: " + y);
    const cardsizex = width;/*278;*/
    const cardsizey = height;/*376;*/
    const middleX = cardsizex / 2;
    const middleY = cardsizey / 2;
    offsetX.value = ((x - middleX) / middleX) * 15;
    offsetY.value = ((y - middleY) / middleY) * 20;

    // set rotation
    rotateY.value = -1 * offsetX.value + 'deg';
    rotateX.value = offsetY.value + 'deg';

    glareX.value = x + 'px';
    glareY.value = y + 'px';

    shineX.value = (100 / width) * x + '%';
    shineY.value = (100 / height) * y + '%';

    fromCenter = (Math.abs(width / 2 - x) / (width / 2) + Math.abs(height / 2 - y) / (height / 2)) / 2
  }
}

if (!window.matchMedia("(hover: hover)").matches) {
  const accelerometer = new Accelerometer({ frequency: 60 });

  accelerometer.addEventListener("reading", (e) => {
    const x = accelerometer.x;
    const y = accelerometer.y;
    console.log('x: ' + x + " y: " + y);
    const cardsizex = width;/*278;*/
    const cardsizey = height;/*376;*/
    const middleX = cardsizex / 2;
    const middleY = cardsizey / 2;
    offsetX.value = ((x - middleX) / middleX) * 15;
    offsetY.value = ((y - middleY) / middleY) * 20;

    // set rotation
    rotateY.value = -1 * offsetX.value + 'deg';
    rotateX.value = offsetY.value + 'deg';

    glareX.value = x + 'px';
    glareY.value = y + 'px';

    shineX.value = (100 / width) * x + '%';
    shineY.value = (100 / height) * y + '%';
    console.log(`Acceleration along the X-axis ${accelerometer.x}`);
    console.log(`Acceleration along the Y-axis ${accelerometer.y}`);
    console.log(`Acceleration along the Z-axis ${accelerometer.z}`);


  });
  accelerometer.start();

}

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

.shiness {
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
  background-image: repeating-linear-gradient(var(--angle), hsla(283, 49%, 60%, 0.75) calc(var(--space)*1), hsla(2, 74%, 59%, 0.75) calc(var(--space)*2), hsla(53, 67%, 53%, 0.75) calc(var(--space)*3), hsla(93, 56%, 52%, 0.75) calc(var(--space)*4), hsla(176, 38%, 50%, 0.75) calc(var(--space)*5), hsla(228, 100%, 77%, 0.75) calc(var(--space)*6), hsla(283, 49%, 61%, 0.75) calc(var(--space)*7));
  background-position: center, 0% var(--posy), var(--posx) var(--posy), var(--posx) var(--posy);
  filter: brightness(calc((var(--hyp)* 0.3) + 0.5)) contrast(2) saturate(1.5);
  display: grid;
  grid-area: 1 / 1;
  opacity: 1;
  position: absolute;
}

.shine {
  /* --space: 5%;
    width: 330px;
    aspect-ratio: .714;
    border-radius: 4.55% / 3.5%;;
    background-image: repeating-linear-gradient(0deg, rgb(255, 119, 115) calc(var(--space)* 1), rgba(255, 237, 95, 1) calc(var(--space)* 2), rgba(168, 255, 95, 1) calc(var(--space)* 3), rgba(131, 255, 247, 1) calc(var(--space)* 4), rgba(120, 148, 255, 1) calc(var(--space)* 5), rgb(216, 117, 255) calc(var(--space)* 6), rgb(255, 119, 115) calc(var(--space)* 7));
    background-size: 200% 700%;
    background-position: 0% 50%;
    
    width: 330px;
    aspect-ratio: .714;
    background-image: url(https://res.cloudinary.com/simey/image/upload/Dev/PokemonCards/illusion.webp);
    background-size: 50%;
    background-position: center;

    position: absolute;
  opacity: 1;
  */
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
  /*background-image: url(./images/noir.png),
    repeating-linear-gradient( var(--angle), hsla(283, 49%, 60%, 0.75) calc(var(--space)*1), hsla(2, 74%, 59%, 0.75) calc(var(--space)*2), hsla(53, 67%, 53%, 0.75) calc(var(--space)*3), hsla(93, 56%, 52%, 0.75) calc(var(--space)*4), hsla(176, 38%, 50%, 0.75) calc(var(--space)*5), hsla(228, 100%, 77%, 0.75) calc(var(--space)*6), hsla(283, 49%, 61%, 0.75) calc(var(--space)*7) ),
          repeating-linear-gradient(var(--angle), #0e152e 0%, hsl(180, 10%, 60%) 3.8%, hsl(180, 29%, 66%) 4.5%, hsl(180, 10%, 60%) 5.2%, #0e152e 10%, #0e152e 12%),
          radial-gradient(farthest-corner circle at var(--mx) var(--my), rgba(0, 0, 0, .1) 12%, rgba(0, 0, 0, .15) 20%, rgba(0, 0, 0, .25) 120%);*/
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

  /*
width: 100%;
height: 100%;
position: absolute;
background-image: radial-gradient(farthest-corner ellipse at calc(((v-bind('shineX')) * 0.5) + 25%) calc(((v-bind('shineY')) * 0.5) + 25%), hsl(0, 0%, 100%) 5%, hsla(300, 100%, 11%, 0.6) 40%, hsl(0, 0%, 22%) 120%);
background-position: center center;
background-size: 400% 500%;
filter: brightness(calc((v-bind('fromCenter')* 0.3) + 0.5)) contrast(2.3) saturate(1);
mix-blend-mode: hard-light;*/
}

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