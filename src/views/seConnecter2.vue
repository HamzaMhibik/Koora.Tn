<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <div class="bodyy">
    <h1>Connexion</h1>
    <div class="boxy">
      <div v-if="typeCreation === 'joueur'">
        <form @submit.prevent="loginJoueur">
          <p class="title">{{ typeCreation }}</p>
          <div class="a3">
            <label>Email</label>
            <input type="email" v-model="email" required>
          </div>
          <div class="a3">
            <label>Mot de passe</label>
            <input type="password" v-model="password" required>
            <div class="alert alert-danger" v-if="errer">{{ errer }}</div><br>
          </div>
          <input type="submit" value="Se connecter">
          <p @click="mdpoublie()" class="mdp"><strong>mot de passe oublie?</strong></p>
          <p>Identifiant de test : 1tp742mzmx@elatter.com / ousama123</p>
        </form>
      </div>
      <div v-if="typeCreation === 'equipe'">
        <form @submit.prevent="loginEquipe">
          <p class="title">{{ typeCreation }}</p>
          <div class="a3">
            <label>Email</label>
            <input type="email" v-model="email" required>
          </div>
          <div class="a3">
            <label>Mot de passe</label>
            <input type="password" v-model="password" required>
            <div class="alert alert-danger" v-if="errer">{{ errer }}</div><br>
          </div>
          <input type="submit" value="Se connecter">
          <p @click="mdpoublie()" class="mdp"><strong>mot de passe oublie?</strong></p>
          <p>Identifiant de test : hzsf687ler@mailcurity.com / ahmed123</p>
        </form>
      </div>
      <div v-if="typeCreation === 'proprietaire'">
        <form @submit.prevent="loginProprietaire">
          <p class="title">{{ typeCreation }}</p>
          <div class="a3">
            <div class="a3">
              <label>Email</label>
              <input type="email" v-model="email" required>
            </div>
            <div class="a3">
              <label>Mot de passe</label>
              <input type="password" v-model="password" required>
              <div class="alert alert-danger" v-if="errer">{{ errer }}</div>
            </div>
            <input type="submit" value="Se connecter">
          </div>
          <p @click="mdpoublie()" class="mdp"><strong>mot de passe oublie?</strong></p>
          <p>Identifiant de test : dh3s5axy92@mailcurity.com / hamza123</p>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
  font-family: "poppins";
}

.title {
  text-align: center;
  font-size: 1.5rem;
  line-height: 2rem;
  text-transform: uppercase;
  color: #02c4ce;
  font-weight: 700;
}

.bodyy {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-image: url('../assets/back (16).jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
}

.boxy {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

h1 {
  color: #01858f;
  text-align: center;
  font-family: 'poppins';
  position: relative;
  margin-bottom: 20px;
}

form {
  border-radius: 0.75rem;
  background-color:#11263b;
  padding: 20px;
  color: rgba(243, 244, 246, 1);
}

.a3 {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  font-size: 1.25rem;
  display: block;
  color: rgba(156, 163, 175, 1);
}

input[type="email"],
input[type="password"] {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid rgba(55, 65, 81, 1);
  outline: 0;
  background-color: rgba(17, 24, 39, 1);
  padding: 0.75rem 1rem;
  color: rgba(243, 244, 246, 1);
}

input[type="submit"] {
  display: block;
  width: 100%;
  background: #007E85;
  padding: 0.75rem;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: .3s;
}

input[type="email"]:focus,
input[type="password"]:focus {
  border-color: rgba(167, 139, 250);
}

input[type="submit"]:hover {
  background: #00686f;
}

p {
  text-align: center;
  margin-top: 20px;
}

.mdp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9rem;
  line-height: 1rem;
  color: rgba(156, 163, 175, 1);
  margin: 8px 0 14px 0;
  cursor: pointer;
}

.mdp:hover {
  text-decoration: underline;
}

.bodyy {
  padding: 10px;
}

.kk {
  padding: 10px;
}

h2 {
  font-size: 1.5rem;
}

.boxy {
  padding: 10px;
}

form {
  padding: 10px;
}

.title {
  font-size: 1.2rem;
}

.a3 {
  gap: 10px;
}

input[type="email"],
input[type="password"] {
  font-size: 0.9rem;
  padding: 0.5rem;
}

input[type="submit"] {
  padding: 0.5rem;
  font-size: 0.9rem;
}

.mdp {
  font-size: 0.8rem;
}
</style>
<script>
import { auth, db } from "../firebase/firebase.js";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth'
export default {
  data() {
    return {
      typeCreation: null,
      email: '',
      password: '',
      errer: ''
    }
  },
  created() {
    this.typeCreation = this.$route.query.type;
  },
  methods: {
    async loginJoueur() {
      const usersRef = collection(db, 'joueures');
      const q = query(usersRef, where("email", "==", this.email));
      const resultat = await getDocs(q);
      if (resultat.size === 1) {
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            this.$router.push('/');
          })
          .catch(error => {
            this.errer = 'Mot de passe incorrect'
            console.error("Error signing in:", error);
          });
      } else {
        this.errer = "Il y'a pas de compte avec cette email "
      }
    },
    async loginEquipe() {
      const usersRef = collection(db, 'equipes');
      const q = query(usersRef, where("email", "==", this.email));
      const resultat = await getDocs(q);
      if (resultat.size === 1) {
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            this.$router.push('/');
          })
          .catch(error => {
            this.errer = 'Mot de passe incorrect'
            console.error("Error signing in:", error);
          });
      } else {
        this.errer = "Il y'a pas de compte avec cette email "
      }
    },
    async loginProprietaire() {
      const usersRef = collection(db, 'proprietaire');
      const q = query(usersRef, where("email", "==", this.email));
      const resultat = await getDocs(q);
      if (resultat.size === 1) {
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            this.$router.push('/');
          })
          .catch(error => {
            this.errer = 'Mot de passe incorrect'
            console.error("Error signing in:", error);
          });
      } else {
        this.errer = "Il y'a pas de compte avec cette email "
      }
    },
    mdpoublie() {
      this.$router.push('/password')
    }
  }
}
</script>