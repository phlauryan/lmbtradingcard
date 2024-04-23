import { ref, onMounted, onUnmounted } from 'vue'

export function useOrientation() {
  const rotatecoef = ref(0)

  
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


function handleOrientation (e) {
  if ( firstReading ) {
      firstReading = false;
      baseOrientation = getRawOrientation(e);
    }
    
    rip = getOrientationObject(e);
    let beta =rip.relative.beta;
    let gamma = rip.relative.gamma;
    if(beta > anglesdevicemax){
      beta=anglesdevicemax;
    }
    if(gamma > anglesdevicemax){
      gamma=anglesdevicemax;
    }
    rotatecoef.value={x:(gamma/anglesdevicemax),y:(beta/anglesdevicemax) };
  };

  
  onMounted(() => window.addEventListener('deviceorientation', handleOrientation, false))
  onUnmounted(() => window.removeEventListener('deviceorientation', handleOrientation))

  
  return rotatecoef
}