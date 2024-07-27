<template>
  <div class="bodyy">
    <div v-if="equipe" class="container">
      <div class="logo-container">
        <h1>Compte Equipe</h1>
        <img :src="logoUrl" alt="Logo de l'équipe">
        <input type="file" @change="handleLogoChange" class="file-input">
      </div>
      <form class="form-container">
        <div>
          <h3>Informations :</h3>
          <label for="nomEquipe">Nom de l'équipe :</label>
          <input type="text" id="nomEquipe" v-model="equipe.nomEquipe" class="input-field" disabled><br>
          <label for="nomCapitaine">Nom du capitaine :</label>
          <input type="text" id="nomCapitaine" v-model="equipe.nomCapitaine" class="input-field"><br>
          <label for="email">Email: :</label>
          <input type="email" id="email" v-model="equipe.email" class="input-field" disabled><br>
          <label for="ville">Ville :</label>
          <input type="text" id="ville" v-model="equipe.ville" class="input-field"><br>
          <label for="telephone">Téléphone :</label>
          <input type="tel" id="telephone" v-model="equipe.telephone" class="input-field"><br>
        </div>
        <div>
          <h3>Liste des joueurs :</h3>
          <center>
            <tr v-for="(joueur, index) in equipe.joueurs" :key="index">
              <td><input type="text" v-model="equipe.joueurs[index]" class="input-field"></td>
              <td><button @click="supprimerJoueur(index)" class="delete-button">Supprimer</button></td>
            </tr>
            <tr>
              <td><input type="text" placeholder="Nouveau joueur" v-model="nouveauJoueur" class="input-field"></td>
              <td><button @click="ajouterJoueur" class="add-button">Ajouter</button></td>
            </tr>
          </center>
        </div>
      </form>
      <button @click="resetPassword" class="mdp"><strong>Modifier mot de passe</strong></button>
      <button type="submit" class="save-button" @click="modifierEquipe">Enregistrer</button> <br><br>
    </div>
    <div v-else>
      <p class="no-team-message">Aucune équipe enregistrée avec cet email.</p>
    </div>
  </div>
</template>

<script>
import { db, storage, auth } from "../../firebase/firebase";
import {sendPasswordResetEmail } from 'firebase/auth'; // Import des fonctionnalités Firebase version 9
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes, ref as storageRef, deleteObject } from "firebase/storage";
import Swal from 'sweetalert2';

export default {
  name: 'EquipeEnregistree',
  data() {
    return {
      emailstored: '',
      equipe: null,
      nouveauJoueur: '',
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
        else if (user.photoURL !== 'equipe') { this.$router.push('/'); resolve(); }
        else if (!user.emailVerified) { Swal.fire('Valider votre email pour accede a cette page'); this.$router.push('/vericationemail'); resolve(); }
        else { this.user = user; resolve(); }
      });
    });
    this.emailstored = this.userDetails?.email ?? '';
    await this.fetchEquipeByEmail(this.emailstored);
  },
  methods: {
    async fetchEquipeByEmail(email) {
      try {
        const q = query(collection(db, "equipes"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async doc => {
          this.equipe = { ...doc.data(), id: doc.id };
          const storageRef = ref(storage, `logos/Tottenham.png`);
          this.logoUrl = await getDownloadURL(storageRef);
        });
      } catch (error) {
        console.error("Erreur lors de la récupération de l'équipe : ", error);
      }
    },
    async ajouterJoueur(event) {
      event.preventDefault(); // Empêcher la soumission du formulaire par défaut
      if (this.nouveauJoueur !== '') {
        this.equipe.joueurs.push(this.nouveauJoueur);
        this.nouveauJoueur = ''; // Réinitialiser le champ du nouveau joueur
        try {
          // Mettre à jour la base de données Firestore pour refléter le changement
          const equipeRef = doc(db, 'equipes', this.equipe.id);
          await updateDoc(equipeRef, {
            joueurs: this.equipe.joueurs
          });
          // Afficher une alerte pour indiquer que le joueur a été ajouté avec succès
          Swal.fire({
            title: "Joueur ajouté",
            text: "Le joueur a été ajouté avec succès.",
            icon: "success"
          });
        } catch (error) {
          console.error("Erreur lors de l'ajout du joueur :", error);
          // Afficher une alerte en cas d'erreur
          Swal.fire({
            title: "Erreur",
            text: "Une erreur s'est produite lors de l'ajout du joueur.",
            icon: "error"
          });
        }
      }
    },

    async modifierEquipe() {
      try {
        // Vérifier si l'équipe a été modifiée avant de demander confirmation

        // Afficher une alerte pour demander la confirmation avant d'enregistrer les changements
        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`
        }).then((result) => {
          if (result.isConfirmed) {
            // Enregistrer les changements dans la base de données Firestore
            const equipeRef = doc(db, 'equipes', this.equipe.id); // Utiliser l'ID du document
            updateDoc(equipeRef, this.equipe);
            // Afficher une alerte pour indiquer que les changements ont été enregistrés avec succès
            Swal.fire("Saved!", "", "success");
          } else if (result.isDenied) {
            // Afficher une alerte pour indiquer que les changements n'ont pas été enregistrés
            Swal.fire("Changes are not saved", "", "info");
          }
        });

      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'équipe :", error);
      }
    },
    equipeModifiee() {
      // Vérifie si l'équipe a été modifiée
      // Ici, vous pouvez implémenter la logique pour vérifier si des changements ont été apportés à l'équipe
      // Par exemple, vérifier si les joueurs ont été modifiés ou d'autres champs ont été modifiés
      // Pour l'exemple, je vais simplement vérifier si la longueur du tableau de joueurs a changé
      return this.equipe.joueurs.length !== this.equipe.joueurs.length;
    },
    async supprimerJoueur(index) {
      try {
        // Supprimer le joueur de this.equipe.joueurs
        this.equipe.joueurs.splice(index, 1);

        // Mettre à jour la base de données Firestore pour refléter le changement
        const equipeRef = doc(db, 'equipes', this.equipe.id);
        await updateDoc(equipeRef, {
          joueurs: this.equipe.joueurs
        });

        // Afficher une notification de succès
        Swal.fire({
          title: "Joueur supprimé",
          text: "Le joueur a été supprimé avec succès.",
          icon: "success"
        });
      } catch (error) {
        console.error("Erreur lors de la suppression du joueur :", error);
        // Afficher une notification d'erreur en cas d'échec
        Swal.fire({
          title: "Erreur",
          text: "Une erreur s'est produite lors de la suppression du joueur.",
          icon: "error"
        });
      }
    },
    async handleLogoChange(event) {
      const file = event.target.files[0];
      const Swal = require('sweetalert2');
      try {
        // Vérifier s'il existe une ancienne image
        if (this.logoUrl) {
          // Créer une référence à l'ancienne image dans Firebase Storage
          const oldLogoRef = storageRef(storage, `logos/${this.equipe.nomEquipe}`);
          // Supprimer l'ancienne image
          await deleteObject(oldLogoRef);
        }

        // Créer une référence unique pour le nouveau fichier logo dans Firebase Storage
        const logoStorageRef = storageRef(storage, `logos/${this.equipe.nomEquipe}`);

        // Téléversez le nouveau fichier dans le stockage
        await uploadBytes(logoStorageRef, file);

        // Mettre à jour l'URL du logo affiché dans l'interface utilisateur
        this.logoUrl = await getDownloadURL(logoStorageRef);

        // Mettre à jour également l'URL du logo dans la base de données Firestore
        await updateDoc(doc(db, 'equipes', this.equipe.id), {
          logoUrl: this.logoUrl
        });

        Swal.fire({
          title: "Logo changé!",
          text: "Le logo a été changé avec succès.",
          icon: "success"
        });
      } catch (error) {
        console.error("Erreur lors de la mise à jour du logo :", error);
        Swal.fire({
          title: "Erreur",
          text: "Une erreur s'est produite lors de la mise à jour du logo.",
          icon: "error"
        });
      }
    },
    async resetPassword() {
      try {
        await sendPasswordResetEmail(auth, this.equipe.email);
        Swal.fire('Un email pour modifier votre mot de passe a été envoyé à votre email.');
      } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email de réinitialisation de mot de passe:', error.message);
        Swal.fire('Erreur lors de l\'envoi de l\'email de réinitialisation de mot de passe. Veuillez réessayer plus tard.');
      }
    },
  }
}
</script>
<style scoped>
.bodyy {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 100vh;
  background-image: url('../../assets/back (9).jpg');
  background-size: cover;
  background-position: center;
}

img {
  width: 250px;
}

* {
  box-sizing: 0;
}

h3,
h1 {
  color: #00cfda;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #007e8556;
  width: 50%;
}

.logo-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-container {
  padding: 20px;
  display: flex;
  text-align: center;
  justify-content: space-between;
  gap: 100px;
  width: 100%;
  color: #fff;
}

.file-input {
  margin-top: 10px;
}

.input-field {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.add-button,
.save-button {
  padding: 10px 20px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.add-button:hover,
.save-button:hover {
  background-color: #314a65;
}

.no-team-message {
  text-align: center;
  margin-top: 20px;
  font-style: italic;
  color: #dc3545;
}

.delete-button {
  background-color: #fd0202;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #970101;
  /* Changer la couleur de fond au survol */
}
.mdp{
  padding: 10px 20px;
  background-color: #01c070;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}
@media only screen and (max-width: 600px) {
  .form-container {
    width: 100%;
    justify-content: none;
    flex-direction: column;
    gap: 20px;
  }

  .container {
    width: 100%;
  }

  .input-field {
    width: calc(100% - 20px);
    /* Réduire la largeur des champs de saisie */
  }
}

.label {
  color: #fff;
}
</style>