<template>
  <div class="bodyy"><br>
    <div class="container">
      <h1>Compte joueur</h1>
      <form @submit.prevent="modifierDonnees">
        <img :src="logoUrl" alt="Logo de l'équipe">
        <ul>
          <li v-for="(user, index) in queryResult" :key="index">
            <label for="nom">Nom:</label>
            <input type="text" id="nom" v-model="user.nom" disabled style="color: black;">
            <label for="photo">Changer photo:</label>
            <input type="file" id="photo" @change="handlePhotoChange">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="user.email" disabled style="color: black;">
            <label for="age">Age:</label>
            <input type="number" id="age" v-model="user.age">
            <label for="telephone">Numéro de téléphone:</label>
            <input type="tel" id="telephone" v-model="user.telephone">
            <label for="poste">Poste:</label>
            <input type="text" id="poste" v-model="user.poste">
            <label for="ville">Ville:</label>
            <input type="text" id="ville" v-model="user.ville">
            <label for="niveau">Niveau:</label>
            <input type="text" id="niveau" v-model="user.niveau">
          </li>
        </ul>
        <button type="submit">Enregistrer</button>
      </form>
      <button @click="resetPassword" class="mdp"><strong>Modifier mot de passe</strong></button>
    </div>
  </div>
</template>
<style scoped>
.bodyy {
  min-height: 100vh;
  background-image: url('../../assets/back (9).jpg');
  background-size: cover;
  background-position: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #03767a;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #03dde9;
  text-align: center;
  font-family: 'poppins';
  position: relative;
}

form {
  width: 100%;
  color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="number"],
input[type="password"],
input[type="tel"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}

button[type="submit"] {
  width: 100%;
  padding: 10px;
  background-color: #029ae6;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}

img {
  display: block;
  margin: 0 auto;
  max-width: 200px;
  margin-bottom: 20px;
}
.mdp{
  text-align: center;
  padding: 10px 20px;
  background-color: #01c070;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
<script>
import { db, storage, auth } from "../../firebase/firebase";
import {sendPasswordResetEmail } from 'firebase/auth';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes, deleteObject, ref as storageRef } from "firebase/storage";
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      storedEmail: '',
      queryResult: [],
      logoUrl: '',
    }
  },
  computed: {
    userDetails() {
      return this.$store.state.userDetails;
    },
  },
  async mounted() {
    await new Promise((resolve) => {
      this.unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) { this.$router.push('/'); resolve(); }
        else if (user.photoURL !== 'joueur') { this.$router.push('/'); resolve(); }
        else if (!user.emailVerified) { Swal.fire('Valider votre email pour accede a cette page'); this.$router.push('/vericationemail'); resolve(); }
        else { this.user = user; resolve(); }
      });
    });
    this.storedEmail = this.userDetails?.email ?? '';
    await this.afficheDonnees();
  },
  methods: {
    async afficheDonnees() {
      if (!this.storedEmail) return;
      const usersRef = collection(db, 'joueures');
      const q = query(usersRef, where("email", "==", this.storedEmail));
      const querySnapshot = await getDocs(q);
      this.queryResult = [];
      querySnapshot.forEach(doc => {
        const userData = { ...doc.data(), id: doc.id };
        this.queryResult.push(userData);
        this.storedNom = userData.nom; // Stocker le nom de l'utilisateur
      });
      const storageRef = ref(storage, `joueurs/${this.storedNom}/photo`);
      this.logoUrl = await getDownloadURL(storageRef);
    },
    async modifierDonnees() {
      try {
        const userRef = doc(db, 'joueures', this.queryResult[0].id); // Utiliser l'ID du document
        await updateDoc(userRef, this.queryResult[0]);
        Swal.fire("Données mises à jour avec succès !");
      } catch (error) {
        console.error("Erreur lors de la mise à jour des données :", error);
      }
    },
    async handlePhotoChange(event) {
      const file = event.target.files[0];
      Swal.fire({
        title: "Changer votre photo?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Changer",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const image = event.target.files[0];
            const oldPhotoRef = ref(storage, `joueurs/${this.storedNom}/photo`);
            await deleteObject(oldPhotoRef).catch(() => { });
            const newPhotoStorageRef = ref(storage, `joueurs/${this.storedNom}/photo`);
            await uploadBytes(newPhotoStorageRef, image);
            const photoUrl = await getDownloadURL(newPhotoStorageRef);
            await updateDoc(doc(db, 'joueures', this.queryResult[0].id), {
              photoUrl: photoUrl
            });
            Swal.fire('logo change avec succe')
            this.logoUrl = photoUrl;
          } catch (error) {
            console.error("Erreur lors de la mise à jour de la photo :", error);
          }
        }
      });
    },
    async resetPassword() {
      try {
        await sendPasswordResetEmail(auth, this.user.email);
        Swal.fire('Un email pour modifier votre mot de passe a été envoyé à votre email.');
      } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email de réinitialisation de mot de passe:', error.message);
        Swal.fire('Erreur lors de l\'envoi de l\'email de réinitialisation de mot de passe. Veuillez réessayer plus tard.');
      }
    },
  }
}
</script>
