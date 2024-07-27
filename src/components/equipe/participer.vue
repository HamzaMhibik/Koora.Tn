<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <div class="bodyy"><br><br>
    <center>
      <div v-if="tournoi" class="tournoi-container">
        <div class="tournoi-details">
          <h1 class="title">{{ tournoi.nom_tournoi }}</h1>
          <center>
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
                  <strong>stade:</strong><p> {{ tournoi.nomstade }}</p>
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
                  <p><strong>Frais d'inscription:</strong> {{ tournoi.frais_inscription }}Dt</p>
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
            <p style="font-size: 1.25rem; color: white;text-align: left;"><strong style="color: black;">Description:</strong> {{ tournoi.description }}</p>
          </center>
        </div>
        <h2 v-if="tournoi.equipes.length === tournoi.nb_equipes_max" class="nbmax">Nombre maximum d'équipes atteint
        </h2>
        <div class="listes">
          <div class="equipes">
            <h2>Équipes enregistrées :</h2>
            <div v-if="tournoi.equipes && tournoi.equipes.length > 0" class="equipes-container">
              <div class="equipe-card" v-for="(equipe, index) in tournoi.equipes" :key="index">
                <p>Équipe N{{ index + 1 }}:</p>
                <h3><strong>{{ equipe }}</strong> </h3>
              </div>
            </div>
            <div v-else>
              <h3>Aucune equipe enregistre.</h3>
            </div>
          </div>
          <div v-if="!isEquipeRegistered && !isEquipeInDemandep && tournoi.equipes.length < tournoi.nb_equipes_max">
            <button @click="participer()" v-if="!isDateDebutPasse" class="participer-btn">Participer</button>
          </div>
          <div v-if="isEquipeInDemandep">
            <p class="message">Votre demande de participation est en cours.</p>
            <button @click="participer()" v-if="!isDateDebutPasse" class="participer-btn">Annuler demande</button>
          </div>
          <div v-if="isEquipeRegistered">
            <p class="message">Votre équipe est déjà inscrite à ce tournoi.</p>
            <button @click="participer()" v-if="!isDateDebutPasse" class="participer-btn">Annuler participation</button>
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
  margin-top: 35px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 20px;
  background-color: #007e85bb
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
  max-width: 600px;
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
.message{
  font-size: 1.25rem;
  font-weight: bold;
  color: black;
}
h1{
  color: #00d2dd;
}
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
    background:none;
    margin-top: -100px;
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
import { doc, getDoc, query, collection, where, getDocs, updateDoc } from 'firebase/firestore';
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
      user: null,
      unsubscribe: null,
      usertype: null,
      verifie: null
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
    isEquipeInDemandep() {
      return this.tournoi?.demandep?.includes(this.equipe.nomEquipe) ?? false;
    },
    isEquipeRegistered() {
      return this.tournoi?.equipes?.includes(this.equipe.nomEquipe) ?? false;
    }
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
    this.storedEmail = this.userDetails?.email ?? '';
    this.fetchEquipeByEmail(this.storedEmail)
  },
  methods: {
    voir() {
      this.$router.push({ path: 'reserver', query: { stade: this.tournoi.nomstade } });
    },
    async fetchEquipeByEmail(storedEmail) {
      try {
        const q = query(collection(db, "equipes"), where("email", "==", storedEmail));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async doc => {
          this.equipe = { ...doc.data(), id: doc.id }; // Ajouter l'ID du document
        });
      } catch (error) {
        console.error("Erreur lors de la récupération de l'équipe : ", error);
      }
    },
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
    async participer() {
      try {
        const docRef = doc(db, 'tournois', this.idTournoi);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const tournoiData = docSnap.data();

          if (tournoiData.demandep && tournoiData.demandep.includes(this.equipe.nomEquipe)) {
            Swal.fire({
              title: "Annuler la demande de participation ?",
              showDenyButton: true,
              showCancelButton: false,
              confirmButtonText: "Oui",
              denyButtonText: `Non`
            }).then((result) => {
              if (result.isConfirmed) {
                const demandesExistantes = tournoiData.demandep.filter(equipe => equipe !== this.equipe.nomEquipe);
                updateDoc(docRef, { demandep: demandesExistantes });
                this.tournoi.demandep = demandesExistantes;
              }
            });
          } else {
            Swal.fire({
              title: "Demander à participer à ce tournoi ?",
              showDenyButton: true,
              showCancelButton: false,
              confirmButtonText: "Oui",
              denyButtonText: `Non`
            }).then((result) => {
              if (result.isConfirmed) {
                const demandesExistantes = tournoiData.demandep || [];
                demandesExistantes.push(this.equipe.nomEquipe);
                updateDoc(docRef, { demandep: demandesExistantes });
                this.tournoi.demandep = demandesExistantes;
                Swal.fire("Demande enregistrée", "", "success");
              }
            });
          }
        } else {
        }
      } catch (error) {
        console.error("Erreur lors de la gestion de la participation de l'équipe au tournoi :", error);
      }
    }

  }
}
</script>