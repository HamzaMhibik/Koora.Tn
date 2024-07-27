<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <div class="bodyy"><br>
    <center>
      <div v-if="tournoi" class="tournoi-container">
        <div class="tournoi-details">
          <center>
            <h1>{{ tournoi.nom_tournoi }}</h1>
            <img :src="logoUrl" alt="Logo du tournoi" class="logo">
          </center>
          <center>
            <h2>Détails du Tournoi:</h2>
            <table>
              <tr>
                <td>
                  <strong>Date de début:</strong>
                  <p> {{ tournoi.date_debut }}</p>
                </td>
                <td class="tdd">
                  <strong>Date de fin:</strong>
                  <p>{{ tournoi.date_fin }}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p><strong>Description:</strong> {{ tournoi.description }}</p>
                </td>
                <td class="tdd">
                  <strong>Catégorie:</strong>
                  <p>{{ tournoi.categorie }}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Recompense:</strong>
                  <p>{{ tournoi.recompense }}</p>
                </td>
                <td class="tdd">
                  <p><strong>Frais d'inscription:</strong> {{ tournoi.frais_inscription }} Dt</p>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Conditions spéciales:</strong>
                  <p> {{ tournoi.conditions_speciales }}</p>
                </td>
                <td class="tdd">
                  <p><strong>Nombre maximum:</strong><br> {{ tournoi.nb_equipes_max }} equipes</p>
                </td>
              </tr>
            </table>
          </center>
          <center>
          </center>
        </div>
        <h2 v-if="tournoi.equipes.length === tournoi.nb_equipes_max" class="nbmax">Nombre maximum d'équipes atteint
        </h2>
        <div class="listes">
          <div class="equipes">
            <h2>Équipes enregistrées :</h2>
            <div v-if="tournoi.equipes && tournoi.equipes.length > 0" class="equipes-container">
              <div class="equipe-card" v-for="(equipe, index) in tournoi.equipes" :key="index"
                @click="supprimerEquipe(index, equipe)">
                <p>Équipe N{{ index + 1 }}:</p>
                <h3><strong>{{ equipe }}</strong> </h3>
              </div>
            </div>
            <div v-else>
              <h3>Aucune equipe enregistre.</h3>
            </div>
          </div>
          <div class="equipes">
            <h2>Demandes de Participation :</h2>
            <div v-if="tournoi.demandep && tournoi.demandep.length > 0" class="equipes-container2">
              <div class="equipe-card2" v-for="(equipe, index) in tournoi.demandep" :key="index"
                @click="accepterEquipe(equipe)">
                <p>Équipe N{{ index + 1 }}:</p>
                <h3><strong>{{ equipe }}</strong> </h3>
              </div>
            </div>
            <div v-else>
              <h3>Aucune equipe enregistre.</h3>
            </div>
          </div>
          <div v-if="tournoi.equipes.length < tournoi.nb_equipes_max">
            <button @click="ajouteequipe" v-if="!isDateDebutPasse" class="participer-btn">Ajouter equipe</button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Chargement...</p>
      </div>
    </center>
  </div>
</template>

<style scoped>
.bodyy {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-image: url('../../assets/back (9).jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.tournoi-container {
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 20px;
  background: #007e85e7;
  border-radius: 20px;
}

.listes {
  flex: 1;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

strong {
  color: black;
}

.tournoi-details {
  flex: 1;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main {
  background-color: #2B3F57;
}

.container {
  background: #8cc4f8;
  max-width: 1400px;
}

.title {
  width: 100%;
}

.title h2 {
  color: #007E85;
  text-align: center;
  font-family: 'poppins';

  position: relative;
}

.logo {
  display: block;
  margin: 0 auto;
  max-width: 300px;
}

.details-container {
  max-width: 800px;
  border-radius: 8px;
}

table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
}

td {
  font-size: 1.25rem;
  color: white;
}

.tdd {
  border-left: solid 5px black;
}

.participer-btn {
  display: block;
  width: 30%;
  padding: 10px 20px;
  background-color: rgb(0, 128, 75);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.participer-btn:hover {
  background-color: #4CAF50;
  /* Vert foncé */
}

.equipes-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  cursor: pointer;
  gap: 20px;
  /* Ajout de cette ligne pour ajouter de l'espace entre les cartes */
}

.equipes-container2 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  margin-top: 20px;
  cursor: pointer;
  gap: 20px;
  /* Ajout de cette ligne pour ajouter de l'espace entre les cartes */
}

.equipe-card {
  flex-basis: calc(50% - 20px);
  background-color: #038cfc;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.equipe-card2 {
  flex-basis: calc(50% - 20px);
  background-color: rgb(3, 219, 129);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

h1,
h2 {
  color: #9e0303;
}

@media (max-width: 768px) {
  .tournoi-container {
    flex-direction: column;
    /* Modifier la disposition en colonne */
    align-items: center;
    /* Centrer les éléments */
    width: 100%;
  }

  .tournoi-details,
  .listes {
    max-width: 100%;
    /* Utiliser la largeur maximale de l'écran */
  }

  .equipes-container {
    display: grid;
    grid-template-columns: repeat(3, minmax(160px, 1fr));
    margin-top: 20px;
    cursor: pointer;
    margin-left: -10px;
    gap: 5px;
  }

  .participer-btn {
    width: 70%;
  }

  .equipe-card {
    flex: 1;
  }
}
</style>

<script>
import { db, storage, auth } from "../../firebase/firebase";
import { doc, getDoc, updateDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from "firebase/storage";
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      idTournoi: '',
      tournoi: null,
      logoUrl: null,
      storedEmail: '',
      equipe: '',
    }
  },
  async created() {
    this.idTournoi = this.$route.query.id;
    await this.getTournoi();
  },
  computed: {
    userDetails() {
      return this.$store.state.userDetails;
    },
    isDateDebutPasse() {
      // Vérifier si la date de début est passée
      if (this.tournoi) {
        const dateDebut = new Date(this.tournoi.date_debut);
        const currentDate = new Date();
        return currentDate > dateDebut;
      }
      return false;
    }
  },
  async mounted() {
    await new Promise((resolve) => {
      this.unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) { this.$router.push('/'); resolve(); }
        else if (user.photoURL !== 'proprietaire') { this.$router.push('/'); resolve(); }
        else if (!user.emailVerified) { Swal.fire('Valider votre email pour accede a cette page'); this.$router.push('/vericationemail'); resolve(); }
        else { this.user = user; resolve(); }
      });
    });
    this.storedEmail = this.userDetails?.email ?? '';
  },
  methods: {
    async getTournoi() {
      try {
        const docRef = doc(db, 'tournois', this.idTournoi);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.tournoi = docSnap.data();
          await this.getLogoUrl(this.tournoi.nom_tournoi, this.tournoi.nomstade);
        } else {
          console.log('Aucun document trouvé !');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du tournoi:', error);
      }
    },
    async getLogoUrl(nomTournoi, nomStade) {
      try {
        const storageRef = ref(storage, `tournois/${nomStade}/${nomTournoi}/image1.png`); // Update the path to match the actual path in Firebase Storage
        this.logoUrl = await getDownloadURL(storageRef);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'URL du logo:', error);
      }
    },
    async ajouteequipe() {
      const docRef = doc(db, 'tournois', this.idTournoi);
      const docSnap = await getDoc(docRef);
      const { value: equipe } = await Swal.fire({
        confirmButtonText: "Enregistrer",
        showCancelButton: true,
        title: "Enregistrer une équipe",
        input: "text",
        inputLabel: "Entrez le nom de l'équipe à ajouter",
        inputPlaceholder: "nom de l'équipe"
      });
      if (equipe) {
        const tournoiData = docSnap.data();
        const equipesExistantes = tournoiData.equipes || [];
        // Ajouter le nom de l'équipe à la liste existante d'équipes du tournoi
        equipesExistantes.push(equipe);
        // Mettre à jour le document 'tournoi' dans la base de données avec la nouvelle liste d'équipes
        await updateDoc(docRef, { equipes: equipesExistantes });
        // Réassigner tournoi.equipes pour déclencher la mise à jour de l'affichage
        this.tournoi.equipes = equipesExistantes;
        Swal.fire(`${equipe} ajouté avec succès`);
        Swal.fire("Participation effectuée", "", "success");
      }
    },
    async supprimerEquipe(index, equipe) {
      const equipeData = await this.fetchEquipeByNom(equipe); // Récupérer les données de l'équipe
      if (equipeData) { // Vérifier si les données de l'équipe sont disponibles
        Swal.fire({
          title: "Supprimer cette equipe de tournoi?",
          html: `
        <h2>${equipeData.nomEquipe}</h2>
        Nom de responsable:<strong>${equipeData.nomCapitaine}</strong><br>
        Numero de telephone:<strong>${equipeData.telephone}</strong><br>
        Ville d'equipe:<strong>${equipeData.ville}</strong><br>`,
          showCancelButton: true,
          confirmButtonText: "Supprimer",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const equipeSupprimee = this.tournoi.equipes.splice(index, 1)[0];
            const docRef = doc(db, 'tournois', this.idTournoi);
            await updateDoc(docRef, { equipes: this.tournoi.equipes });
            Swal.fire(`${equipeSupprimee} supprimée avec succès`);
          }
        });
      } else {
        Swal.fire({
          title: "Supprimer cette equipe de tournoi?",
          text: "Cet équipe est ajouté par vous",
          showCancelButton: true,
          confirmButtonText: "Supprimer",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const equipeSupprimee = this.tournoi.equipes.splice(index, 1)[0];
            const docRef = doc(db, 'tournois', this.idTournoi);
            await updateDoc(docRef, { equipes: this.tournoi.equipes });
            Swal.fire(`${equipeSupprimee} supprimée avec succès`);
          }
        });
      }
    },


    async accepterEquipe(equipe) {
      const docRef = doc(db, 'tournois', this.idTournoi);
      const tournoiData = this.tournoi; // Déplacer la déclaration ici
      const equipeData = await this.fetchEquipeByNom(equipe)
      Swal.fire({
        title: "accepter la demande?",
        html: `
          <h2>${equipeData.nomEquipe}</h2>
          Nom de responsable:<strong>${equipeData.nomCapitaine}</strong><br>
          Numero de telephone:<strong>${equipeData.telephone}</strong><br>
          Ville d'equipe:<strong>${equipeData.ville}</strong><br>`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Accepter",
        denyButtonText: `Supprimer`
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Récupérer les équipes existantes
          const equipesExistantes = tournoiData.equipes || [];

          // Ajouter l'équipe acceptée à la liste des équipes
          equipesExistantes.push(equipe);

          // Mettre à jour le document 'tournoi' dans la base de données avec la nouvelle liste d'équipes
          await updateDoc(docRef, {
            equipes: equipesExistantes,
            demandep: tournoiData.demandep.filter(demande => demande !== equipe) // Supprimer l'équipe de la liste de demandes
          });

          // Réassigner tournoi.equipes pour déclencher la mise à jour de l'affichage
          this.tournoi.equipes = equipesExistantes;

          // Supprimer l'équipe acceptée de la liste locale de demandes
          this.tournoi.demandep = this.tournoi.demandep.filter(demande => demande !== equipe);

          Swal.fire(`${equipe} ajouté avec succès à la liste des équipes`);
        } else if (result.isDenied) {
          // Supprimer la demande de l'équipe de la liste de demandes
          await updateDoc(docRef, {
            demandep: tournoiData.demandep.filter(demande => demande !== equipe)
          });

          this.tournoi.demandep = this.tournoi.demandep.filter(demande => demande !== equipe);

          Swal.fire(`${equipe} supprimée de la liste des demandes`);
        }
      });
    },
    async fetchEquipeByNom(nom) {
      try {
        const q = query(collection(db, "equipes"), where("nomEquipe", "==", nom));
        const querySnapshot = await getDocs(q);
        let equipeData = null; // Variable pour stocker les données de l'équipe
        querySnapshot.forEach(doc => {
          equipeData = doc.data(); // Stocker les données de l'équipe
        });
        console.log(equipeData); // Afficher les données de l'équipe pour vérification
        return equipeData; // Renvoyer les données de l'équipe
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'équipe:", error);
        return null; // En cas d'erreur, renvoyer null
      }
    }
  }
}
</script>