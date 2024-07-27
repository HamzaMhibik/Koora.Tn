<template>
  <div class="bodyy">
    <div class="container">
      <nav>
        <div class="div1">
          <div><router-link to="/dashboard" class="link1">dashboard</router-link></div>
          <div><router-link to="/AjoutAdmin" class="link1">Ajouter admin</router-link></div>
          <div><router-link to="/ContactA" class="link1">Contact</router-link></div>
        </div>
        <div><router-link to="/equipes" class="link"><img src="../../assets/group.png" class="icon">
            Equipes</router-link>
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
      <div class="content">
        <form @submit.prevent="signUp()">
          <center>
            <legend>Ajoute Admin</legend>
            <label>Nom complet :</label><br>
            <input type="text" v-model="username" required><br>
            <label>Email :</label><br>
            <input type="email" v-model="email" required><br>
            <label>Mot de passe :</label><br>
            <input type="password" v-model="password" required><br>
            <label>Confirmer le mot de passe :</label><br>
            <input type="password" id="confirmer_mot_de_passe" v-model="confirmerMotDePasse" required><br>
            <div v-if="confirmerMotDePasse !== '' && confirmerMotDePasse !== password" class="error-message">Mot
              de
              passe ne correspond pas</div><br>
            <label>Téléphone :</label><br>
            <input type="tel" v-model="telephone" required><br>
            <label>Ville :</label><br>
            <select v-model="ville" required><br>
              <option value="zarzis">Zarzis</option>
              <option value="mednine">Mednine</option>
              <option value="jerbe">Jerba</option>
              <option value="gabes">Gabes</option>
              <option value="sfax">Sfax</option>
            </select>
            <br><br>
            <input type="submit" value="Ajouter">
            <div v-if="errorMessage1" class="alert alert-danger">Cette email est déjà utilisée par un autre
              Admin
            </div>
            <div v-if="errorMessage2" class="alert alert-danger">{{ errorMessage2 }}</div>
          </center>
        </form>
        <br><br><br><br><br><br><br>
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

.bodyy {
  background-color: #e4e3e3;
  min-height: 100vh;
}

.container {
  padding-left: 200px;
  display: flex;
  flex-wrap: wrap;
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-left: 30%;
  padding: 20px;
  background-color: rgb(255, 255, 255)
}

.router-link-exact-active {
  padding: 10px;
  background-color: #555;
}

form {
  width: 70%;
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

label {
  font-size: 1.25rem
}

input[type='tel'],
input[type="text"],
input[type="email"],
input[type="number"],
input[type="password"],
select {
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

input:focus {
  border-color: rgba(167, 139, 250);
}

legend {
  color: #00c44e;
  font-weight: 600;
  font-family: "poppins" bold;
  font-size: 2.5rem
}

button[type="submit"],
input[type='submit'] {
  display: block;
  width: 75%;
  background: #007E85;
  padding: 0.75rem;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: .3s;
}

button[type="submit"]:hover,
input[type='submit']:focus {
  background: #00686f;
}

.input-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.input-group {
  flex: 1;
}

.error-message {
  color: red;
}
</style>
<script>
import { auth, db } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmerMotDePasse: '',
      telephone: '',
      ville: '',
    }
  },
  async mounted() {
    this.unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) { this.$router.push('/'); }
      else if (user.photoURL !== 'admin') { this.$router.push('/') }
    })
    await this.$store.dispatch('fetchUserDetails');
  },
  methods: {
    async signUp() {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        if (!userCredential) {
          return
        }
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: this.username,
          photoURL: 'admin',
        });
        await sendEmailVerification(user);
        await addDoc(collection(db, "admin"), {
          nom: this.username,
          email: this.email,
          ville: this.ville,
          telephone: this.telephone,
        });
      } catch (error) {
        this.errorMessage1 = error;
      }
    },
  }
}
</script>