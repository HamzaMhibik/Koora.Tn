<template>
  <div class="bodyy">
    <h1>Inscription</h1>
    <div v-if="page === 'page1'" class="page1">
      <form @submit.prevent="signUp()">
        <legend>Joueur</legend>
        <div class="input-row">
          <div class="input-group2">
            <label for="name" required>Ecrire votre nom</label><br>
            <div class="input-group3">
              <input type="text" v-model="nom" class="form-control" placeholder="Nom" required>
              <input type="text" v-model="prenom" class="form-control" placeholder="Prenom" required>
            </div>
          </div>
          <div class="input-group">
            <label>Email :</label>
            <input type="email" v-model="email" required  placeholder="Nom">
          </div>
        </div><br>
        <div class="input-row">
          <div class="input-group">
            <label>Mot de passe :</label>
            <input type="password" v-model="password" required  placeholder="mot de passe">
          </div>
          <div class="input-group">
            <label>Confirmer le mot de passe :</label>
            <input type="password" id="confirmer_mot_de_passe" v-model="confirmerMotDePasse" required  placeholder="confirmer">
            <div v-if="confirmerMotDePasse !== '' && confirmerMotDePasse !== password" class="error-message">Mot de
              passe ne correspond pas</div>
          </div>
        </div><br>
        <div class="input-row">
          <div class="input-group">
            <label>Téléphone :</label>
            <input type="tel" v-model="telephone" required  placeholder="telephone">
          </div>
          <div class="input-group">
            <label>Ville :</label>
            <select v-model="ville" required >
              <option value="">Choisir votre ville</option>
              <option value="zarzis">Zarzis</option>
              <option value="mednine">Mednine</option>
              <option value="jerbe">Jerba</option>
              <option value="gabes">Gabes</option>
              <option value="sfax">Sfax</option>
            </select>
          </div>
        </div><br>
        <div class="input-row">
          <div class="input-group">
            <label>Âge :</label>
            <input type="text" v-model="age" required  placeholder="Age">
          </div>
          <div class="input-group">
            <label>Niveau :</label>
            <select v-model="niveau" required >
              <option value="">Choisir votre Niveau</option>
              <option value="debutant">Débutant</option>
              <option value="intermediaire">Intermédiaire</option>
              <option value="professionnel">Professionnel</option>
            </select>
          </div>
        </div><br>
        <div class="input-row">
          <div class="input-group">
            <label>Poste :</label>
            <select v-model="poste" required>
              <option value="">Sélectionner un poste</option>
              <option value="gardien">Gardien</option>
              <option value="defenseur">Défenseur</option>
              <option value="milieu">Milieu</option>
              <option value="attaquant">Attaquant</option>
            </select>
          </div>
          <div class="input-group">
            <label for="image_joueur">Image du joueur :</label>
            <input type="file" ref="myfiles" id="image_joueur" accept=".png,.jpg" @change="handleImageChange" required>
          </div>
        </div>
        <br><br>
        <center><input type="submit" value="Créer le joueur"></center>
        <div v-if="errorMessage1" class="alert alert-danger">Cette email est déjà utilisée par un autre utilisateur
        </div>
        <div v-if="errorMessage2" class="alert alert-danger">{{ errorMessage2 }}</div>
      </form>
      <br>
    </div>
    <center>
      <div v-if="page === 'page2'">
        <h1>Validation d'email</h1>
        <h3>email est {{ email }} et le mot de pass est {{ password }}</h3>
        <p>Un email a été envoyé à votre adresse email pour valider.</p>
        <p>Veuillez cliquer sur le lien pour valider votre email.</p>
        <button @click="envoyereamil()">Renvoyer l'email</button>
        <p>Si vous avez validé votre email, cliquez ici:</p>
        <button @click="verifievalidationAfterReload()">Vérifie</button>
      </div>
    </center>
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

.page1 {
  background-color: #00686f;
  padding: 30px;
  border-radius: 0.5rem;
  margin-top: 20px;
}

.page2 {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #00686f;
  width: 35%;
  padding: 20px;
  height: 300px;
}

.btn {
  padding: 10px;
}

label {
  font-size: 1.25rem;
  font-weight: bold;
}

input[type="file"] {
  width: 100%;
  padding: 1rem 2rem;
  cursor: pointer;
  border: 1px dashed rgb(255, 255, 255);
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

h1 {
  font-size: 3rem;
  margin-top: 20px;
  color: #01adb6;
  font-weight: 600;
  font-family: "poppins" bold;
}

legend {
  font-size: 2rem;
  color: #01adb6;
  font-weight: 600;
  font-family: "poppins" bold;
}

button[type="submit"],
input[type='submit'] {
  display: block;
  width: 50%;
  background: #007E85;
  padding: 0.75rem;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: .3s;
}

textarea {
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

textarea:focus {
  border-color: rgba(167, 139, 250);
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

.input-row2 {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 50%;
}

.input-group {
  flex: 1;
}



.input-group3 {
  display: flex;
  align-items: center;
}

.error-message {
  color: red;
}

input::-webkit-input-placeholder {
  color: #ffffff;
}

.bodyy {
  color: white;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('../../assets/back (9).jpg');
  background-size: cover;
  background-position: center;
}

.labelname {
  color: black;
}

@media screen and (max-width: 768px) {
  .input-group {
    flex-basis: 100%;
  }

  .input-row2 {
    width: 100%;
  }

  .page1 {
    width: 95%;
    border: none;
    padding: 0;
    display: flex;
    justify-content: center;
    border-radius: 0.5rem;
  }
  form{
    width: 90%;
  }
}
</style>

<script>
import { auth, db, storage } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes } from "firebase/storage";

export default {
  data() {
    return {
      nom: '',
      prenom: '',
      email: '',
      password: '',
      confirmerMotDePasse: '',
      telephone: '',
      age: '',
      ville: '',
      poste: '',
      niveau: '',
      imageJoueur: null,
      errorMessage1: '',
      errorMessage2: '',
      page: 'page1',
      emailVerified: false // Nouvelle propriété pour stocker l'état de l'e-mail vérifié
    }
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
          displayName: this.nom+' '+this.prenom,
          photoURL: 'joueur',
        });
        await sendEmailVerification(user);

        const joueureRef = await addDoc(collection(db, "joueures"), {
          nom: this.nom+' '+this.prenom,
          email: this.email,
          age: this.age,
          ville: this.ville,
          poste: this.poste,
          niveau: this.niveau,
          telephone: this.telephone,
        });
        const files = this.$refs.myfiles.files;
        const imagesRef1 = ref(storage, `joueurs/${this.nom+' '+this.prenom}/`);
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const storageRef = ref(imagesRef1, `photo`);
          uploadBytes(storageRef, file);
        }
        this.page = 'page2';
      } catch (error) {
        this.errorMessage1 = error;
      }
    },
    async envoyereamil() {
      try {
        const user = auth.currentUser; // Récupérer l'utilisateur actuellement connecté
        if (user) {
          // Renvoyer l'e-mail de vérification
          await sendEmailVerification(user);
          console.log("L'e-mail de vérification a été renvoyé avec succès.");
        } else {
          console.error("Aucun utilisateur n'est actuellement connecté.");
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail de vérification :", error);
        this.errorMessage2 = error.message;
      }
    },
    verifievalidationAfterReload() {
      auth.signOut() // Déconnecte l'utilisateur
        .then(() => {
          // Reconnecte l'utilisateur avec ses identifiants
          return signInWithEmailAndPassword(auth, this.email, this.password);
        })
        .then(async (userCredential) => {
          const user = userCredential.user;
          if (user) {
            // L'utilisateur est connecté, vérifie si son e-mail est vérifié
            await user.reload(); // Recharge les informations de l'utilisateur pour obtenir la dernière vérification de l'e-mail
            if (user.emailVerified) {
              console.log('L\'e-mail de l\'utilisateur est vérifié.');
              this.$router.push('/')
              // Rediriger l'utilisateur vers une autre page ou effectuer une autre action
            } else {
              console.log('L\'e-mail de l\'utilisateur n\'est pas vérifié.');
              // Afficher un message à l'utilisateur ou prendre une autre action appropriée
            }
          }
        })
        .catch(error => {
          console.error('Erreur lors de la vérification de l\'e-mail après reconnexion:', error);
        });
    }
  }
}
</script>
