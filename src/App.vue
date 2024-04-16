<script setup>
import cardsgroup from './components/cardsgroup.vue'
import cards from './data/carddesc.json'
import _ from 'lodash';
const teams = ["woom", "monogygote", "cyclas", "team", "null"];
const types = ["regulare", "alternate", "holo", "vintage"];
let groupsbyteam = [];
_.forEach(teams, function (team) {
  groupsbyteam.push({
    groupname: team,
    cards: _.filter(cards, function (card) { return card.team === team; })
  });
});

let groupbytype = [];
_.forEach(types, function (type) {
  groupbytype.push({
    groupname: type,
    cards: _.filter(cards, function (card) { return card.type === type; })
  });
});
</script>

<template>
  <header>
    <img src="./images/logo.png" />
  </header>
  <main>
    <div class="group" v-for="groupbyteam in groupsbyteam">
      <cardsgroup :group="groupbyteam" />
    </div>
  </main>
</template>

<style>
#app {
  display: flex;
  flex-flow: row wrap;
}

group {
  display: flex;
  flex-flow: row wrap;
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

main {
  div {
    display: flex;
    flex-flow: row wrap;
  }


  h1 {
    width: 100%;
    color: white;
  }

  img {
    max-width: 270px;
    padding: 20px;
  }
}
</style>
