<template>
  <div class="bodyy">
    <nav>
      <div class="div1">
        <div><router-link to="/dashboard" class="link1">dashboard</router-link></div>
        <div><router-link to="/AjoutAdmin" class="link1">Ajouter admin</router-link></div>
        <div><router-link to="/ContactA" class="link1">Contact</router-link></div>
      </div>
      <div><router-link to="/equipes" class="link"><img src="../../assets/group.png" class="icon"> Equipes</router-link>
      </div>
      <div><router-link to="/stades" class="link"><img src="../../assets/stade.png" class="icon"> Stades</router-link>
      </div>
      <div><router-link to="/joueurs" class="link"><img src="../../assets/joueur.png" class="icon">
          Joueurs</router-link></div>
      <div><router-link to="/tournois" class="link"><img src="../../assets/tournoi.png" class="icon">
          Tournois</router-link></div>
      <div><router-link to="/defis" class="link"><img src="../../assets/defi.png" class="icon"> Défis</router-link>
      </div>
      <div><router-link to="/recrutements" class="link"><img src="../../assets/recruitment.png" class="icon">
          Recrutements</router-link></div>
      <div><router-link to="/commentairesS" class="link"><img src="../../assets/comment.png" class="icon">
          CommentairesS</router-link></div>
      <div><router-link to="/commentairesp" class="link"><img src="../../assets/comment.png" class="icon">
          CommentairesP</router-link></div>
      <div><router-link to="/reservation" class="link"><img src="../../assets/reservation.png" class="icon">
          reservation</router-link></div>
    </nav>
    <div class="container">
      <div class="container2">
        <h1>Repondre</h1>
        <form @submit.prevent="envoyerReponse">
          <label for="message">Reponse :</label>
          <textarea v-model="message" required></textarea>
          <center><button type="submit">Envoyer</button></center>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "../../firebase/firebase";
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      message: '',
      email: this.$route.query.email,
      name: this.$route.query.nom
    }
  },
  async mounted() {
    this.unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) { this.$router.push('/'); }
      else if (user.photoURL !== 'admin') { this.$router.push('/') }
    })
  },
  methods: {
    async envoyerReponse() {
      try {
        const templateParams = {
          to_email: this.email,
          name: this.name,
          message: this.message,
        };
        await emailjs.send(
          'service_tnkuxle',   
          'template_kr01gtn', 
          templateParams,
          'HojifnuwxgbcKpcLi'
        );
        Swal.fire("Email envoyé avec succès!");
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'email:", error);
        Swal.fire("Erreur lors de l'envoi de l'email.");
      }
    }
  }
}
</script>
<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}

.bodyy {
  background-color: #e4e3e3;
  min-height: 100vh;
}

.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* Pour espacer les cartes horizontalement */
  margin-top: 20px;
  /* Ajoute un espace en haut */
}

.card {
  width: calc(33.33% - 20px);
  /* Pour que chaque carte occupe environ un tiers de la largeur, en tenant compte de l'espace entre les cartes */
  margin-bottom: 20px;
  /* Ajoute un espace en bas de chaque carte */
}


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
  background-color: rgb(148, 148, 148);
  width: 200px;
  position: fixed;
  margin-top: 10px;
  top: 0;
  left: 0;
  height: 100%;
  padding-top: 60px;
}
.link1 {
  color: white;
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 3px;
  display: block;
  margin-top: 10px;
}

.icon {
  width: 30px;
}


nav img {
  vertical-align: middle;
}

.router-link-exact-active {
  padding: 10px;
  background-color: #555;
}
.container2 {
  width: 600px;
  height: 500px;
  margin: 50px auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-left: 310px;
}

h1 {
  text-align: center;
}

form {
  margin-top: 20px;
}

label,
input,
textarea {
  display: block;
  margin-bottom: 10px;
}

input {
  width: 100%;
  height: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

textarea {
  width: 100%;
  height: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 3px;
}

button:hover {
  background-color: #0056b3;
}
</style>