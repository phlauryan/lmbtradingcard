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
    cards: _.filter(cards, function (card) { return card.type === type; }).sort((a, b) => a.team.localeCompare(b.team))
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
  <subheader>
	<div class="button" @click="byteam">Equipe</div>
	<div class="button" @click="bytype">Type de carte</div>
  </subheader>
  <main>
    <div class="group" v-for="grouptoshow in groupstoshow">
      <cardsgroup :group="grouptoshow"/>
    </div>
  </main>
</template>

<style>
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

.button {    
  text-align: center;
  font-family: 'MaPolice', sans-serif;
  text-transform: uppercase;
  background-color: rgb(51, 53, 56);
  width: 100%;
  color: white;
}

h1 {
  font-family: 'MaPolice', sans-serif;
  text-transform: uppercase;
  font-size: 60px;
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
  
  .button{
    font-size: 20px;
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

  .button{
    font-size: 50px;
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

subheader {
  display: flex;
  justify-content: center;
  width: 100%;
  line-height: 1.5;
  background-color: rgb(51, 53, 56);
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
