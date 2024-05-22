<script setup>
import cardsgroup from './cards-group.vue'
import cards from '../data/carddesc.json'
import _ from 'lodash';
import { ref } from 'vue'
import logo from '../images/logo.png'
let teams = [];
let types = [];
let par = ref("Par carte");
let subpar = ref("Par équipe");
const megacarteoriginalheight = ref("0");
const megacarteVisibility = ref("hidden");
const megacarteoriginalposx = ref("0px");
const megacarteoriginalposy = ref("0px");
_.forEach(cards, function (card) {
  teams.push(card.team);
  types.push(card.type);
});
teams = _.uniq(teams);
types = _.uniq(types);
let groupbyteam = [];
_.forEach(teams, function (team) {
  groupbyteam.push({
    groupname: team,
    cards: _.filter(cards, function (card) { return card.team === team; }).sort((a, b) => a.type.localeCompare(b.type))
  });
});

let groupbytype = [];
_.forEach(types, function (type) {
  groupbytype.push({
    groupname: type,
    cards: _.filter(cards, function (card) { return card.type === type; }).sort((a, b) => b.team.localeCompare(a.team))
  });
});

let groupstoshow = ref(groupbyteam);

function changeby() {
  if (par.value == "Par carte") {
    par.value = "Par équipe";
    subpar.value = "Par carte";
    groupstoshow.value = groupbytype;
  } else {
    par.value = "Par carte";
    subpar.value = "Par équipe";
    groupstoshow.value = groupbyteam;
  }
}
const imgback = ref("./images/back.png");
const imgvisu = ref("./images/back.png");
const rotate = ref("0deg");
function handleChildClickG(clientWidth, clientHeight, posx, posy,visu) {
  megacarteoriginalheight.value = clientHeight + "px";
  megacarteoriginalposx.value = posx + "px";
  megacarteoriginalposy.value = posy + "px";
  imgvisu.value=visu;
  console.log(' moueif:', clientWidth, clientHeight, clientHeight + "px", posx, posy,visu);
  megacarteVisibility.value = "visible";
  rotate.value = "360deg";
}


</script>

<template>
  <header>
    <img class="logo" :src="logo">
  </header>
  <div class="subheader">
    <div class="button" @click="changeby">{{ par }}</div>
    <div class="buttonsub" @click="changeby">{{ subpar }}</div>
  </div>
  <main>
    <div class="contenantmegacarte">
      <div ref="divrotatemegacarte" class="rotatemegacarte">
        <img class="cardmegacarte" :src="imgvisu" />
        <img class="cardmegaback" :src="imgback" />
      </div>
    </div>
    <div class="group" v-for="grouptoshow in groupstoshow">
      <cardsgroup :group="grouptoshow" @childClickedG="handleChildClickG" />
    </div>
  </main>
  <footer>
    <router-link to="/about"> Il manque des joueurs ? · Combien ça coute ?</router-link>
  </footer>
</template>

<style>
div.contenantmegacarte {

  perspective: 800px;
  transform-style: preserve-3d;
  position: fixed;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: v-bind('megacarteVisibility');
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-name: megaparitionCont;
  animation-timing-function: ease-in-out;
}
.rotatemegacarte{
  transition: transform 2s;
  animation-timing-function: ease-in-out;
  transform-style: preserve-3d;
  transform: rotateY(v-bind('rotate'))
}
@keyframes megaparitionCont {
  from {
    top:  v-bind('megacarteoriginalposx');
    left: v-bind('megacarteoriginalposy');
  }

  to {
    top: 50%;
    left: 50%;    
   /* transform: translate(-50%, -50%);*/
  }
}
.cardmegacarte, .cardmegaback {
  position: absolute;  
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-name: megaparition;
  animation-timing-function: ease-in-out;
  height: v-bind('megacarteoriginalheight');
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
} 
.cardmegaback {
  transform: rotateY(180deg);
}

@keyframes megaparition {
  from {
  }

  to {
    height: 72vh;
  }
}

/* 
@media (max-width: 500px) {
  .cardmegacarte {
    width: 90vw;
    padding-top: 11vh;
  }
}

@media not (max-width: 500px) {
  .cardmegacarte {
    height: 72vh;
    padding-top: 11vh;
  }
} */

.booster {
  visibility: hidden;
  perspective: 800px;
  transform-style: preserve-3d;

  img {
    transform: rotateX(28deg) rotateY(-22deg) rotateZ(25deg);
    position: fixed;
    width: 300px;
  }

  top: 50%;
  left: 50%;
  ;
  z-index: 999;
}

* {
  padding: 0;
  margin: 0;
}

footer {
  font-family: 'MaPolice', sans-serif;
  text-align: center;
  color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: rgb(36, 36, 36);
  z-index: 99;
}

@font-face {
  font-family: 'MaPoliceRaye';
  src: url("../font/olympiccarrierlaserital.ttf") format('truetype');
}

@font-face {
  font-family: 'MaPolice';
  src: url("../font/olympiccarrier.ttf") format('truetype');
}

.logo {
  padding: 12px;
}

h1 {
  font-family: 'MaPoliceRaye', sans-serif;
  text-transform: uppercase;
  padding-top: 22px;
  padding-left: 22px;
}

#app {
  display: flex;
  flex-flow: row wrap;
}

group {
  display: flex;
  flex-flow: row wrap;
}

@media (max-width: 500px) {
  footer {
    font-size: 15px;
    padding: 7px;
  }

  h1 {
    font-size: 25px;
  }

  #app {
    justify-content: center;
  }

  group {
    justify-content: center;
  }

  main {
    h1 {
      text-align: center;
    }

    div {
      justify-content: center;
    }
  }
}

@media not (max-width: 500px) {
  footer {
    font-size: 30px;
    padding: 10px;
  }

  h1 {
    font-size: 60px;
  }

  #app {
    justify-content: left;
  }

  group {
    justify-content: left;
  }

  main {
    h1 {
      text-align: left;
    }

    div {
      justify-content: center;
    }
  }
}

body {
  background-color: rgb(57, 60, 65);
}

header {
  position: sticky;
  top: 0;
  z-index: 2000;
  display: flex;
  justify-content: center;
  width: 100%;
  line-height: 1.5;
  background-color: rgb(36, 36, 36);
}

.button {
  cursor: pointer;
  position: fixed;
  right: 0;
  z-index: 1000;
  font-family: 'MaPolice', sans-serif;
  text-transform: uppercase;
  color: rgb(51, 53, 56);
  width: auto;
  background-color: white;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 12% 100%);
}

.buttonsub {
  cursor: pointer;
  position: fixed;
  right: 0;
  z-index: 999;
  font-family: 'MaPolice', sans-serif;
  text-transform: uppercase;
  color: white;
  width: auto;
  background-color: rgb(153, 153, 153);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 12% 100%);
}

@media (max-width: 500px) {
  .button {
    top: 110px;
    font-size: 14px;
    padding-top: 5px;
    padding-left: 30px;
    padding-right: 10px;
    padding-bottom: 5px;
  }


  .buttonsub {
    top: 133px;
    font-size: 11px;
    padding-top: 5px;
    padding-left: 30px;
    padding-right: 10px;
    padding-bottom: 5px;
  }

}

@media not (max-width: 500px) {
  .button {
    top: 105px;
    font-size: 40px;
    padding-top: 10px;
    padding-left: 40px;
    padding-right: 10px;
    padding-bottom: 10px;
  }

  .buttonsub {
    top: 155px;
    font-size: 20px;
    padding-top: 17px;
    padding-left: 40px;
    padding-right: 10px;
    padding-bottom: 10px;
  }

}

.subheader:hover {
  /*.button {
  color:  white;
  background-color:rgb(153, 153, 153);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 28% 100%); 
  border-top: 5px solid rgb(153, 153, 153);
  border-bottom: 5px solid rgb(153, 153, 153);
}*/

  .buttonsub {
    color: rgb(51, 53, 56);
    background-color: white;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 12% 100%);
    /*border-top: 5px solid white;
  border-bottom: 5px solid white;*/
  }
}

/*
.subheader {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  width: 100%;
  background-color: rgb(51, 53, 56);
  div{
    
  justify-content: center;
  display: flex;
      
    text-align: center;
    font-family: 'MaPolice', sans-serif;
    text-transform: uppercase;
    background-color: rgb(51, 53, 56);
    width: 100%;
    color: white;
  }
}
*/
main {
  div {
    display: flex;
    flex-flow: row wrap;
  }


  h1 {
    width: 100%;
    color: white;
  }




  .card-wrap {

    display: grid;
    place-content: center;
    inset: 0;
  }


}
</style>
