<script setup>
import cardsgroup from './components/cards-group.vue'
import cards from './data/carddesc.json'
import _ from 'lodash';
import { ref } from 'vue'
let teams = [];
let types = [];
_.forEach(cards, function (card) {
  teams.push(card.team);
  types.push(card.type);
});
teams = _.uniq(teams);
types = _.uniq(types);
let groupsbyteam = [];
_.forEach(teams, function (team) {
  groupsbyteam.push({
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

let groupstoshow=ref(groupsbyteam);

function byteam(){
  console.log("team");
  groupstoshow.value=groupsbyteam;
}

function bytype(){
  console.log("type");
  groupstoshow.value=groupbytype;
}
</script>

<template>
  <header>
    <img class="logo" src="./images/logo.png" />
  </header>
  <div class="subheader">
    <div class="booster">
     <img src="./images/booster.png">
    </div>
    <div>Grouper par</div>
    <div>
      <div class="button" @click="byteam">Equipes</div>
      <div class="button" @click="bytype">Cartes</div>
    </div>
  </div>
  <main>
    <div class="group" v-for="grouptoshow in groupstoshow">
      <cardsgroup :group="grouptoshow"/>
    </div>
  </main>
</template>

<style>
.booster{
  visibility: hidden;
  perspective: 800px;
  transform-style: preserve-3d;
  img{
    transform: rotateX(28deg) rotateY(-22deg) rotateZ(25deg);
    position:fixed;
    width: 300px;
  }
  top: 50%;
  left: 50%;;
  z-index: 999;
}

* {
  padding: 0;
  margin: 0;
}
@font-face {
  font-family: 'MaPolice';
  src: url("./font/olympiccarrierlaserital.ttf") format('truetype');
}

.logo {
  padding: 12px;
}

h1 {
  font-family: 'MaPolice', sans-serif;
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
  
  .subheader div{
    font-size: 20px;
  }
  h1{
    font-size: 25px;
  }
  #app {
    justify-content: center;
  }

  group {
    justify-content: center;
  }

  main {
    h1{
      text-align: center;
    }
    div {
    justify-content: center;
    }
  }
}
@media not (max-width: 500px) {

  .subheader div{
    font-size: 50px;
  }
  h1{
    font-size: 60px;
  }
  #app {
    justify-content: left;
  }

  group {
    justify-content: left;
  }

  main {
    h1{
      text-align: left;
    }
    div {
    justify-content: left;
    }
  }
}

body {
  background-color: rgb(57, 60, 65);
}

header {
  display: flex;
  justify-content: center;
  width: 100%;
  line-height: 1.5;
  background-color: rgb(36, 36, 36);
}

  

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
