<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <div class="bodyy">
    <h1 v-if="page == 'page1'">Inscription</h1>
    <div v-if="page === 'page1'" class="page1">
      <form class="equipe" @submit.prevent="enregistrerEquipe">
        <div class="a3">
          <legend>Responsable d'équipe</legend>
          <div class="a3 grid_this">
            <div class="a3">
              <label for="nom_capitaine">Nom Complet</label>
              <input type="text" id="nom_capitaine" v-model="nom" required placeholder="Nom">
            </div>
            <div class="a3">
              <label class="hiden">eeee</label>
              <input type="text" id="nom_capitaine" v-model="prenom" required placeholder="Prenom">
            </div>
            <div class="a3 totlip">
              <div v-if="emailExistsError" class="error-message">
                L'e-mail est déjà utilisé. Veuillez choisir un e-mail différent.
              </div>
              <label for="email">Email :</label>
              <input type="email" id="email" v-model="email" required placeholder="Email">
            </div>
            <div class="a3">
              <label for="telephone">telephone :</label>
              <input type="number" id="telephone" v-model="telephone" required placeholder="Numero">
            </div>
            <div class="a3">
              <label for="mot_de_passe">Mot de passe :</label>
              <input type="password" id="mot_de_passe" v-model="password" required placeholder="password">
            </div>
            <div class="a3 totlip">
              <label for="confirmer_mot_de_passe">Confirmer :</label>
              <input type="password" id="confirmer_mot_de_passe" v-model="confirmerMotDePasse" required
                placeholder="confirmer">
              <div v-if="confirmerMotDePasse !== '' && confirmerMotDePasse !== password" class="check_pass">
                <p>Mot de passe ne corespoand pas</p>
              </div>
            </div>
            <legend>Equipe :</legend><br>
            <div class="a33">
              <label for="nom_capitaine">Nom d'équipe</label>
              <input type="text" id="nom_capitaine" v-model="nomEquipe" required placeholder="Nom equipe">
            </div>
            <div class="a3">
              <label>ville :</label>
              <select v-model="ville" required>
                <option value="">Choisir votre ville</option>
                <option value="Zarzis">Zarzis</option>
                <option value="Mednine">Mednine</option>
                <option value="Djerbe">Jerba</option>
                <option value="Gabes">Gabes</option>
                <option value="Sfax">Sfax</option>
              </select>
            </div>
          </div>
        </div>
        <div class="a3">
          <fieldset>
            <div class="joueurs">
              <div v-for="joueur in joueurs" :key="joueur.id" class="joueur">
                <label :for="'joueur_' + joueur.id">Nom du joueur {{ joueur.id }} :</label>
                <input :id="'joueur_' + joueur.id" type="text" v-model="joueur.nom" required placeholder="nom joueur">
              </div>
            </div>
          </fieldset>
          <label for="logo_equipe">Logo de l'équipe :</label>
          <input type="file" id="logo_equipe" ref="myfiles" accept=".png,.jpg" @change="handleLogoChange" required>
          <button type="submit">Enregistrer l'équipe</button>
          <div v-if="emailExistsError" class="error-message">
            L'e-mail est déjà utilisé. Veuillez choisir un e-mail différent.
          </div>
        </div>
      </form>
      <br>
    </div>
    <center>
      <div v-if="page === 'page2'" class="page2">
        <h1>Validation d'email</h1>
        <h3>email est {{ email }} et le mot de pass est {{ password }}</h3>
        <p>Un email a été envoyé à votre adresse email pour valider.</p>
        <p>Veuillez cliquer sur le lien pour valider votre email.</p>
        <button @click="envoyereamil()" class="btn btn-primary">Renvoyer l'email</button>
        <p>Si vous avez validé votre email, cliquez ici:</p>
        <button @click="verifievalidationAfterReload()" class="btn btn-success">Vérifie</button>
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

.bodyy {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-image: url('../../assets/back (9).jpg');
  background-size: cover;
  background-position: center;
  
}

.page1 {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page2 {
  margin-top: 100px;
  background-color: #00686f;
  padding: 100px 50px;
}

.joueurs {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.joueur {
  width: 49.2%;
}

h1 {
  font-size: 3rem;
  color: #01adb6;
  font-weight: 600;
  font-family: "poppins" bold;
}

.btn {
  padding: 10px 20px;
}

.totlip {
  width: 100%;
  position: relative;
}

.check_pass,
.error-message {
  position: absolute;
  width: 100%;
  padding: 10px;

  border-radius: 2px;
  top: 0;
  font-weight: 400;
  font-family: "poppins";
  right: -80%;
  z-index: 10;
}

.check_pass::after,
.error-message::after {
  content: '';
  display: block;
  position: absolute;
  border: 10px solid transparent;
  left: 10%;
  top: 100%;
  transform: translate(-50%, 0);
  border-top-width: 8px;
}

.check_pass {
  background: yellow;
  color: black;
}

.check_pass::after {
  border-top-color: yellow;
}

.error-message {
  background: red;
  top: -10px;
  color: #ffff;
}

.error-message::after {

  border-top-color: red;
}

.to_top {
  top: -40px;
}

.select-icon {
  cursor: pointer;
  border-radius: 4rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  width: 40px;

  height: 40px;
  position: absolute;
  right: 0;
  top: 0px;
  display: flex;
  justify-content: center;
  z-index: 10;
  align-items: center;
}

.grid_this {
  width: 100%;
  display: grid !important;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.select-icon i {

  color: #ffffff;
}

input[type="file"] {
  width: 100%;
  padding: 1rem 2rem;
  cursor: pointer;

  border: 1px dashed rgba(55, 65, 81, 1);
}

.boxy {
  display: flex;
  width: 100%;
  justify-content: space-between;

  gap: 20px;
  padding: 20px;
}

.hiden {
  color: #00686f;
}

form {
  width: 50%;
  height: 80%;
  border-radius: 0.75rem;
  background-color: #00686f;
  padding: 20px;
  color: rgba(243, 244, 246, 1);
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  gap: 20px;
}

.a3 {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.a33 {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input[type="text"],
input[type="email"],
input[type="number"],
input[type="password"],
select {
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

#joueurs {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 15px;
  border: 1px solid;
  border-color: rgba(167, 139, 250);
  border-radius: 4px;
}

input:focus {
  border-color: rgba(167, 139, 250);
}

legend {
  color: #03d7e2;
  font-weight: 600;
  font-family: "poppins" bold;
}

button[type="submit"] {
  display: block;
  width: 100%;
  background: #007E85;
  padding: 0.75rem;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: .3s;
}

button[type="submit"]:hover {
  background: #00686f;
}

@media screen and (max-width: 768px) {
  .grid_this {
    grid-template-columns: repeat(1, 1fr);
  }

  h1 {
    font-size: 2.5rem;
    margin: 10px 0px;
  }

  .input-group {
    flex-basis: 100%;
  }

  .input-row2 {
    width: 100%;
  }

  legend {
    font-size: 1.5rem;
  }

  .page1 {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 10px;
    border: none;
    padding: 0;
  }

  form {
    margin-top: 10px;
    width: 90%;
  }

  .joueur {
    width: 100%;
  }

  .a33 {
    margin-top: -40px;
  }
}
</style>
<script>
import { auth, db, storage } from "../../firebase/firebase"; // Import db and storage from init.js
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { ref, uploadBytes } from "firebase/storage";
export default {
  name: 'helpComp',
  data() {
    return {
      nomEquipe: '',
      nom: '',
      prenom: '',
      email: '',
      password: "",
      confirmerMotDePasse: "",
      telephone: '',
      ville: '',
      joueurs: Array.from({ length: 6 }, (_, index) => ({ id: index + 1, nom: '' })),
      logoEquipe: null,
      emailExistsError: false, // Nouvelle propriété pour suivre l'état de l'erreur d'e-mail existant
      passwordMismatchError: false,
      nomEquipeExistsError: false,
      page: 'page1' // Nouvelle propriété pour suivre l'état de l'erreur de correspondance des mots de passe
    }
  },
  async mounted() {
  },

  methods: {
    async enregistrerEquipe() {
      try {
        // Vérifier si les mots de passe saisis et confirmés correspondent
        if (this.password !== this.confirmerMotDePasse) {
          this.passwordMismatchError = true;
          throw new Error("Les mots de passe ne correspondent pas.");
        }
        //
        const equipeQuerySnapshot = await getDocs(query(collection(db, "equipes"), where("nomEquipe", "==", this.nomEquipe)));
        if (!equipeQuerySnapshot.empty) {
          this.nomEquipeExistsError = true
          // Le nom d'équipe est déjà utilisé, gérer l'erreur
          throw new Error("Le nom d'équipe est déjà utilisé. Veuillez choisir un autre nom d'équipe.");
        }

        // Check if the email is already in use
        const emailQuerySnapshot = await getDocs(query(collection(db, "equipes"), where("email", "==", this.email)));
        if (!emailQuerySnapshot.empty) {
          // Email is already in use, handle the error
          this.emailExistsError = true; // Définir l'état de l'erreur d'e-mail existant sur true
          throw new Error("Email already in use. Please choose a different email.");
        }

        // Email is not in use, proceed with registering the team
        // Reset the email exists error state
        this.emailExistsError = false;

        // Register the team
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password)
        if (!userCredential) {
          return
        }
        const user = userCredential.user; // Access the user object from UserCredential
        await updateProfile(user, {
          displayName: this.nomEquipe,
          photoURL: 'equipe',
        });
        await sendEmailVerification(user);
        const equipeRef = await addDoc(collection(db, "equipes"), {
          nomEquipe: this.nomEquipe,
          nomCapitaine: this.nom + ' ' + this.prenom,
          email: this.email,
          ville: this.ville,
          joueurs: this.joueurs.map(joueur => joueur.nom),
          telephone: this.telephone
        });
        const files = this.$refs.myfiles.files;
        const imagesRef1 = ref(storage, `logos/`);
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const storageRef = ref(imagesRef1, this.nomEquipe);
          uploadBytes(storageRef, file);
        }
        this.page = 'page2';
      } catch (error) {
        this.emailExistsError = true;
        console.error("Error registering the team: ", error);
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
