<!-- components/About.vue -->

<template>
  <header>
    <img class="logo" src="../images/logo.png">
  </header>
  <main>
    <div class="text">
      <h1>Il y a une erreur sur une carte</h1>
      <div>n'hesitez pas a me contacter sur mes réseaux ou mon mail si vous constatez une erreur sur une carte. Pour que
        je puisse les
        corriger <a href="mailto:lmbtradingcards@gmail.com">lmbtradingcards@gmail.com</a></div>
      <h1>Il manque des joueurs / La photo d'une carte n'est pas flatteuse </h1>
      <div>
        Ces cartes ont été réalisé grâce au différentes photos prise lors de tournois.<br>
        Il manque beaucoup de personnes dû au manque de photo répondant aux critères permettant de réaliser une
        carte.<br>
        Si vous voulez m’aider à compléter cette collection vous pouvez m’envoyer les photos que vous avez ou même
        organiser un shooting avec votre équipe.<br>
        Si vous souhaitez faire ça voici les critères a respecter pour que je puisse utiliser ces photos :
      </div>
      <div class="list">
        - Le joueur ou la joueuse en tenu officiel <br>
        - Rien devant le joueur ou la joueuse<br>
        - Le joueur ou la joueuse visible entièrement avec son monocycle et le ballon (en train de dribler ou en train
        de shooter si le shoot n’est pas encore partie)<br>
        - Le visage du joueur ou de la joueuse bien visible<br>
        - Sur un terrain de basket (si possible en intérieur mais extérieur accepté)<br>
        - Une photo bien définie, avec le sujet suffisamment proche mais quand même une marge tout autours<br>
        - Si possible le nom, le prénom et le numéro du joueur ou de la joueuse en nom du fichier<br>
        - M'envoyer les photo sans compression et avec la qualité maximal, par exemple avec un lien de drive<br>
      </div>
      <h1>Combien ça coute</h1>
      <div>
        Ce site, ainsi que les cartes physique que j’ai pu distribuer ont été réalisé avant tout pour le fun.<br>
        Mais, même si je n’aime pas monétiser mes projets, la production de tout cela coute cher (entre 2 et 3 euros par
        booster, et je pense en distribuer une centaine) et prend énormément de temps.<br>
        Aussi si vous souhaitez m’aider à continuer ou me soutenir pour mes prochains projets vous pouvez me donner
        quelques euro, soit dans la vie, soit sur mon PayPal <a
          href="https://www.paypal.com/paypalme/flopynours/">paypal.com/paypalme/flopynours/</a> <br>
        Merci à vous 😊
      </div>
      <h1>Me contacter</h1>
      <div><a href="mailto:lmbtradingcards@gmail.com">lmbtradingcards@gmail.com</a></div>
    </div>
  </main>
  <footer>
    <router-link to="/">retour</router-link>
  </footer>
</template>

<script>
export default {
  name: 'About',
}
</script>
<style>
* {
  padding: 0;
  margin: 0;

  color: white;
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

.text {
  padding: 30px;
  display: block;

  div {
    display: block;
    padding: 10px;
  }

  p {

    padding: 10px;
  }

  .list {

    padding-left: 20px;
  }

  h1 {
    padding: 0px;
    font-family: 'MaPolice', sans-serif;
    text-transform: uppercase;
  }

  @media (max-width: 500px) {

    h1 {
      font-size: 24px;
    }
  }

  @media not (max-width: 500px) {

    h1 {
      font-size: 45px;
    }

  }


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
</style>