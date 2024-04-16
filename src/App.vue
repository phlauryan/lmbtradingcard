<script setup>
import card from './components/card.vue'
import cards from './data/carddesc.json'
import _ from 'lodash';
const teams = ["woom", "monogygote", "cyclas", "team", "null"];
let groupbyteam = [];
_.forEach(teams, function (team) {
  groupbyteam.push({
    groupname: team,
    cards: _.filter(cards, function (card) { return card.team === team; })
  });
});

</script>

<template>
  <header>
    <img src="./images/logo.png" />
  </header>
  <main>
    <h1>
      team 1
    </h1>
    <tbody>
      <tr>
        <td v-for="card in cards">
          <card :visu="card.visu" />
          {{ card.team }}
        </td>
      </tr>
    </tbody>

  </main>
</template>

<style scoped>
* {
  background-color: rgb(57, 60, 65);
}

header {
  line-height: 1.5;
}

main {
  img {
    max-width: 170px;
    padding: 20px;
  }
}
</style>
