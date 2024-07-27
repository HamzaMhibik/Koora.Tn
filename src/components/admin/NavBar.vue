<template>
  <nav>
    <router-link to="/dashboard" class="link">dashboard</router-link>
    <router-link to="/equipes" class="link">Equipes</router-link>
    <router-link to="/stades" class="link">Stades</router-link>
    <router-link to="/joueurs" class="link">Joueurs</router-link>
    <router-link to="/tournois" class="link">Tournois</router-link>
    <router-link to="/defis" class="link">Défis</router-link>
    <router-link to="/recrutements" class="link">Recrutements</router-link>
    <router-link to="/commentairesS" class="link">CommentairesS</router-link>
    <router-link to="/commentairesp" class="link">CommentairesP</router-link>
    <router-link to="/reservation" class="link">reservation</router-link>
  </nav>
</template>
<style scoped>
.link {
  color: white;
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 3px;
  transition: background-color 0.3s;
  display: block;
}

.link:hover {
  background-color: #555;
}

nav {
  background-color: rgb(4, 80, 80);
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  padding-top: 60px;
}
</style>
