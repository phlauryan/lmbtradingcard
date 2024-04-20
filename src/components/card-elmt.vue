<script setup>
import { ref,  reactive, computed} from 'vue'
import TWEEN from '@tweenjs/tween.js';
const props = defineProps({
  carda: {
    type: Object,
    required: true
  }
})

//rotateCoef -1 to 1
let rotatecoef = ref({x:0 ,y:0});

var tweenrotateXCoef = new TWEEN.Tween(rotatecoef.value)
var tweenrotateXCoef3 = new TWEEN.Tween(rotatecoef.value)
var tweenrotateXCoef2 = new TWEEN.Tween(rotatecoef.value)

/* mouvement a l'affichage de la page*/
tweenrotateXCoef3.to({x:0.6,y:0.9}, 500).easing(TWEEN.Easing.Cubic.Out).chain(tweenrotateXCoef2.to({x:0,y:0}, 1000).easing(TWEEN.Easing.Bounce.Out))
tweenrotateXCoef3.start()



//test
const anglesdevicemax=20;
const getRawOrientation = function(e) {
  if ( !e ) {
    return { alpha: 0, beta: 0, gamma: 0 };
  } else {
    return { alpha: e.alpha, beta: e.beta, gamma: e.gamma };
  }
};

let baseOrientation = getRawOrientation();

function getOrientationObject (e) {
  const orientation = getRawOrientation(e);
  return {
    absolute: orientation,
    relative: { 
      alpha: orientation.alpha - baseOrientation.alpha, 
      beta: orientation.beta - baseOrientation.beta, 
      gamma: orientation.gamma - baseOrientation.gamma
    }
  }
}
let rip=ref({
  absolute: getRawOrientation(),
    relative: { 
      alpha: 0, 
      beta: 0, 
      gamma: 0
    }
});
let firstReading = true;




window.addEventListener("deviceorientation", handleOrientation, false);


 function handleOrientation (e) {

    if ( firstReading ) {
      firstReading = false;
      baseOrientation = getRawOrientation(e);
    }

    rip = getOrientationObject(e);
    const beta =rip.relative.beta;
    const gamma = rip.relative.gamma;
    if(beta > anglesdevicemax){
      beta=anglesdevicemax;
    }
    if(gamma > anglesdevicemax){
      gamma=anglesdevicemax;
    }
    const xcalc= rotatecoef.value={x:(beta/anglesdevicemax),y:(gamma/anglesdevicemax) };

  };


//fintest





function maFrame(time) {
  /*console.log('xxxxxxxx : '+rotatecoef.value.x);
  console.log('yyyyyyyyy : '+rotatecoef.value.y);
  console.log('xxxxxxxx : '+event.layerX);
  console.log('yyyyyyyy : '+event.layerY);
  console.log('rotateXDeg : '+rotateXDeg.value);
  console.log('rotateYDeg : '+rotateYDeg.value);
  console.log('glareX : '+glareX.value);
  console.log('glareY : '+glareY.value);
  console.log('shineX : '+shineX.value);
  console.log('shineY : '+shineY.value);
  console.log('fromCenter : '+fromCenter.value);;*/
  TWEEN.update(time)
  window.requestAnimationFrame(maFrame)
};
window.requestAnimationFrame(maFrame)

const visu = props.carda.visu;
const holo = props.carda.type === "holo" ||props.carda.type === "auto";

//a rendre dynamique ?
const width = 340;
const height = 470;

//angles max sur les deux axe que peuvent prendre les carte (-1 1) 
const decalageMaxXDeg =15;
const decalageMaxYDeg =20;

//rotateDeg -decalageMaxDeg to decalageMaxYDeg
const rotateXDeg = computed(() => {
  return (rotatecoef.value.y * decalageMaxYDeg)+'deg';
})
const rotateYDeg = computed(() => {
  return -1* (rotatecoef.value.x * decalageMaxXDeg)+'deg';
})
//glare 0 to 100
const glareX = computed(() => {
  return ((rotatecoef.value.x +1)/2 * width)+'px';
})
const glareY = computed(() => {
  return ((rotatecoef.value.y+1)/2 * height)+'px';
})
//shine 0 to 100
const shineX = computed(() => {
  return ((rotatecoef.value.x+1)/2 * 100)+'%';
})
const shineY = computed(() => {
  return ((rotatecoef.value.y+1)/2 * 100)+'%';
})
//0 to 1
const fromCenter = computed(() => {
  return (Math.abs(rotatecoef.value.x) + Math.abs(rotatecoef.value.y))/2;
})

//mouvement de la carte fonction de la sourie
function handleMouseMove(event) {
  if (window.matchMedia("(hover: hover)").matches) {
    const middleX = event.target.clientWidth / 2;
    const middleY = event.target.clientHeight / 2;   
    rotatecoef.value= {x:((event.layerX - middleX) / middleX),y: ((event.layerY - middleY) / middleY)};
  }
}

//mouvement quand je sort de la carte
function hoveroire() {
  if (window.matchMedia("(hover: hover)").matches) {
 tweenrotateXCoef.stop(); 
 tweenrotateXCoef = new TWEEN.Tween(rotatecoef.value)
 tweenrotateXCoef.to({x:0,y:0}, 1000).easing(TWEEN.Easing.Bounce.Out)
 tweenrotateXCoef.startFromCurrentValues();
  }
};

//mouvement lors du scroll
const startY = ref(0);
var scroll;
if (window.matchMedia("(hover: hover)").matches) {
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

  tweenrotateXCoef.stop();
  tweenrotateXCoef2.stop();
  rotatecoef.value= {x:0,y:(0.5*direction)};

  scroll = setTimeout(function () {
    tweenrotateXCoef.stop();
    tweenrotateXCoef2.stop();
    tweenrotateXCoef = new TWEEN.Tween(rotatecoef.value)
    tweenrotateXCoef.to({x:0,y: 0}, 1000).easing(TWEEN.Easing.Bounce.Out)
    tweenrotateXCoef.startFromCurrentValues();
  }, 300);
}, false);
}
</script>

<template>
  {{rip.relative.beta}}
  <div class='padding'>
    <div class="contenant" @mouseleave="hoveroire" @mousemove="handleMouseMove">
      <div ref="divrotate" class="rotate">
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
  --hyp: v-bind('fromCenter');
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