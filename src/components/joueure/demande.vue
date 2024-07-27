<template>
  <div class="bodyy">
    <center>
      <h1>Demandes de recrutement</h1>
      <div class="filter-container">
        <div class="filtre">
          <label for="ville">Ville:</label>
          <select v-model="selectedVille" @change="filterDemandes">
            <option value="">Toutes les villes</option>
            <option v-for="ville in villes" :key="ville">{{ ville }}</option>
          </select>
        </div>
        <div class="filtre">
          <label for="poste">Poste:</label>
          <select v-model="selectedPoste" @change="filterDemandes">
            <option value="">Tous les postes</option>
            <option v-for="poste in postes" :key="poste">{{ poste }}</option>
          </select>
        </div>
        <div class="filtre">
          <label for="niveau">Niveau:</label>
          <select v-model="selectedNiveau" @change="filterDemandes">
            <option value="">Tous les niveaux</option>
            <option v-for="niveau in niveaux" :key="niveau">{{ niveau }}</option>
          </select>
        </div>
      </div><br><br>
      <div>
        <ul>
          <li v-for="demande in filteredDemandes" :key="demande.id" class="demande-item">
            <img :src="demande.logo" alt="Logo de l'équipe"><br>
            <span class="label">Nom de l'équipe :</span>{{ demande.equipename }}<br>
            <span class="label">Âge entre {{ demande.ageMin }} et {{ demande.ageMax }}</span><br>
            <span class="label">Poste :</span> {{ demande.poste }}<br>
            <span class="label">Niveau :</span> {{ demande.niveau }}<br>
            <span class="label">ville de l'équipe :</span> {{ demande.ville }}<br>
            <div class="contact-info">
              <center>
                <h3>Contacts</h3>
              </center>
              <span class="label">Email de l'équipe :</span> {{ demande.email }}<br>
              <span class="label">Numéro de l'équipe :</span> {{ demande.numero }}<br>
              <center><button @click="enregistrerJoueur(demande)" class="btn btn-secondary">postuler</button></center>
              <div v-if="message" class="message">{{ message }}</div>
            </div>
          </li>
        </ul>
      </div>
      <br><br>
      <br><br>
      <br><br>
    </center>
  </div>
</template>
<style scoped>
h1 {
  color: #01c4ce;
  text-align: center;
  font-family: 'poppins';
  position: relative;
  margin-top: 10px
}

.bodyy {
  min-height: 100vh;
  background-image: url('../../assets/back (9).jpg');
  background-size: cover;
  background-position: center;
}

select {
  width: 100%;
  border: none;
  outline: none;
  padding: 10px;
  font-family: "poppins";
  font-size: 16px;
  font-weight: 500;
  position: relative;
  appearance: none;
  border-radius: 4px;
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
  top: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
}

label {
  color: white;
  font-size: 1.25rem;
}

.select-icon i {
  color: #2E2F32;
}

/* Styles pour la liste de demandes */
.contact-info {
  text-align: center;
  margin: auto;
  max-width: 400px;
}

ul {
  list-style: none;
  padding: 0;
}

.label {
  font-weight: bold;
  color: black;
}

img {
  display: block;
  margin: 0 auto;
  max-width: 200px;
  margin-bottom: 10px;
}

.demande-item {
  background-color: #027c83;
  color: white;
  font-size: 1.25rem;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
  align-items: center;
  display: inline-block;
  width: calc(33.33% - 20px);
  margin-right: 20px;
  vertical-align: top;
}

.filter-container {
  display: flex;
  justify-content: center;
}

.filtre {
  margin: 20px;
}

@media screen and (max-width: 768px) {
  .filter-container {
    flex-direction: column;
    /* Pour afficher les éléments en colonne lorsque l'écran est petit */
  }
}

@media screen and (max-width: 768px) {
  .demande-item {
    width: 100%;
    /* Sur les écrans plus petits, afficher un élément par ligne */
    margin-right: 0;
    /* Retirer la marge pour afficher un élément par ligne */
    margin-bottom: 20px;
  }
}
</style>
<script>
import { db } from "../../firebase/firebase";
import { auth } from "../../firebase/firebase";
import { collection, query, where, getDocs, getDoc, doc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2'


export default {
  name: 'ListeDemandesRecrutement',
  data() {
    return {
      demandes: [],
      storedEmail: '',
      // Ajouter des variables pour stocker les valeurs sélectionnées dans les filtres
      selectedVille: "",
      selectedPoste: "",
      selectedNiveau: "",
      joueure: '',
    }
  },
  computed: {
    userDetails() {
      return this.$store.state.userDetails;
    },
    filteredDemandes() {
      let filtered = this.demandes;
      if (this.selectedVille) {
        filtered = filtered.filter(demande => demande.ville === this.selectedVille);
      }
      if (this.selectedPoste) {
        filtered = filtered.filter(demande => demande.poste === this.selectedPoste);
      }
      if (this.selectedNiveau) {
        filtered = filtered.filter(demande => demande.niveau === this.selectedNiveau);
      }
      return filtered;
    },
    // Extraire les valeurs uniques pour chaque critère de filtrage
    villes() {
      return [...new Set(this.demandes.map(demande => demande.ville))];
    },
    postes() {
      return [...new Set(this.demandes.map(demande => demande.poste))];
    },
    niveaux() {
      return [...new Set(this.demandes.map(demande => demande.niveau))];
    }
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
    this.fetchJoueureByEmail(this.storedEmail)
  },
  async created() {
    try {
      const querySnapshot = await getDocs(collection(db, "recrutement"));
      querySnapshot.forEach(doc => {
        this.demandes.push({ ...doc.data(), id: doc.id });
      });
      console.log("Demandes de recrutement récupérées avec succès !");
    } catch (error) {
      console.error("Erreur lors de la récupération des demandes de recrutement :", error);
    }
  },
  methods: {
    async enregistrerJoueur(demande) {
      try {
        // Vérifier si le joueur a déjà postulé à cette demande
        const demandeRef = doc(db, "recrutement", demande.id);
        const demandeData = (await getDoc(demandeRef)).data();
        const joueurs = demandeData.joueurs || [];
        const joueurIndex = joueurs.findIndex(joueur => joueur.email === this.storedEmail);

        if (joueurIndex !== -1) {
          const confirmation = await Swal.fire({
            title: "Vous avez déjà postulé à cette demande. Voulez-vous annuler votre postulation?",
            showCancelButton: true,
            confirmButtonText: "Oui",
            cancelButtonText: "Non"
          });

          if (confirmation.isConfirmed) {
            joueurs.splice(joueurIndex, 1);
            await updateDoc(demandeRef, { joueurs: joueurs });
            demande.joueurs = joueurs;
            Swal.fire("Votre postulation a été annulée avec succès !", "", "success");
          }
        } else {
          // Si le joueur n'a pas encore postulé, procéder à l'enregistrement
          const result = await Swal.fire({
            title: "Postuler à cette demande?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Oui",
            denyButtonText: "Non"
          });

          if (result.isConfirmed) {
            const joueurData = this.joueure;
            joueurs.push(joueurData);

            // Mettre à jour la demande de recrutement avec la nouvelle liste de joueurs
            await updateDoc(demandeRef, { joueurs: joueurs });

            // Mettre à jour localement la liste de joueurs dans la demande
            demande.joueurs = joueurs;

            // Afficher un message de succès
            Swal.fire("Vous avez bien postulé à cette demande !", "", "success");
          } else if (result.isDenied) {
            // Afficher un message si la postulation est annulée
            Swal.fire("Postulation annulée", "", "info");
          }
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de la postulation du joueur :", error);
      }
    }
    ,

    async fetchJoueureByEmail(storedEmail) {
      try {
        console.log('joueure fetched succesfully')
        const q = query(collection(db, "joueures"), where("email", "==", storedEmail));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async doc => {
          this.joueure = { ...doc.data(), id: doc.id }; // Ajouter l'ID du document
        });
        console.log(this.joueure)
      } catch (error) {
        console.error("Erreur lors de la récupération de l'équipe : ", error);
      }
    },
  }
}

</script>
