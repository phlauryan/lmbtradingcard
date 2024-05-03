<!-- components/About.vue -->
<template>


<header>
      <img class="logo" :src="logo">
    </header>
    <main>


  <div>
    <h1>Il y a une erreur sur une carte</h1>
      <p>n'hesitez pas a me contacter sur mes réseaux si vous constater une erreur sur une carte. Pour que je puisse les corriger</p>
    <h1>Il manque des joueurs / La photo d'une carte est pas flatteuse </h1>
      <p>Ces cartes ont été réalisé grâce au différentes photos prise lors de tournois.<br>
        Il manque beaucoup de personnes dû au manque de photo répondant aux critères permettant de réaliser une carte.<br>
        Si vous voulez m’aider à compléter cette collection vous pouvez m’envoyer les photos que vous avez ou même organiser un shooting avec votre équipe.<br>
         Si vous souhaitez faire ça voici les critères a respecter pour que je puisse utiliser ces photos :</p>
      <li>-	Le joueur ou la joueuse en tenu officiel </li>
      <li>-	Rien devant le joueur ou la joueuse</li>
      <li>-	Le joueur ou la joueuse visible entièrement avec son monocycle et le ballon (en train de dribler ou en train de shooter si le shoot n’est pas encore partie)</li>
      <li>-	Le visage du joueur ou de la joueuse bien visible</li>
      <li>-	Sur un terrain de basket (si possible en intérieur mais extérieur accepté)</li>
      <li>-	Une photo bien définie, avec le sujet suffisamment proche mais quand même une marge tout autours</li>
      <li>-	Si possible le nom, le prénom et le numéro du joueur ou de la joueuse en nom du fichier</li>
    <h1>Combien ça coute</h1>
      <p>Ce site, ainsi que les cartes physique que j’ai pu distribuer ont été réalisé avant tout pour le fun. Mais même si je n’aime pas monétiser mes projets, la production de tout cela coute cher (entre 2 et 3 euros par booster) et prend énormément de temps. Aussi si vous souhaitez m’aider à continuer ou me soutenir pour mes prochain projet vous pouvez me donner quelques euro, soit dans la vie, soit sur mon PayPal https://www.paypal.com/paypalme/flopynours/  Merci à vous 😊</p>
  </div>
  </main>
  <footer>
    <router-link to="/all-cards">retour</router-link>
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
  font-family: 'MaPolice';
  src: url("../font/olympiccarrierlaserital.ttf") format('truetype');
}
.logo {
  padding: 12px;
}

h1 {
  font-family: 'MaPolice', sans-serif;
  text-transform: uppercase;
  padding-top: 22px;
  padding-left: 22px;
}header {   
  position: sticky;
  top: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  width: 100%;
  line-height: 1.5;
  background-color: rgb(36, 36, 36);
}

</style>