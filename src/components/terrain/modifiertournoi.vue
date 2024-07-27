<template>
  <div class="bodyy">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <div class="container">
      <div v-if="tournoi" class="details-container">
        <center>
          <h2 class="title">{{ tournoi.nom_tournoi }}</h2>
          <img :src="logoUrl" alt="Logo du tournoi" class="logo">
        </center>
        <form @submit.prevent="updateTournoi">
          <center>
            <h2>Détails du Tournoi:</h2>
            <table>
              <tr>
                <td><label for="nomStade">Nom de Tournoi:</label></td>
                <td class="tdd"><input type="text" id="nomStade" v-model="tournoi.nom_tournoi" disabled
                    class="disabled"></td>
              </tr>
              <tr>
                <td><label for="dateDebut">Date de début:</label></td>
                <td class="tdd"><input type="date" id="dateDebut" v-model="tournoi.date_debut"></td>
              </tr>
              <tr>
                <td><label for="dateFin">Date de fin:</label></td>
                <td class="tdd"><input type="date" id="dateFin" v-model="tournoi.date_fin"></td>
              </tr>
              <tr>
                <td><label for="dateDebut">heure de début:</label></td>
                <td class="tdd"><input type="time" id="dateDebut" v-model="tournoi.heure_debut"></td>
              </tr>
              <tr>
                <td><label for="dateFin">description:</label></td>
                <td class="tdd"><textarea v-model="tournoi.description"></textarea></td>
              </tr>
              <tr>
                <td><label for="dateFin">Frais d'inscription:</label></td>
                <td class="tdd"><input type="number" id="dateFin" v-model="tournoi.frais_inscription"></td>
              </tr>
              <tr>
                <td><label for="dateFin">nombre max d'equipe:</label></td>
                <td class="tdd"><input type="number" id="dateFin" v-model="tournoi.nb_equipes_max"></td>
              </tr>
              <tr>
                <td><label for="dateFin">recompense:</label></td>
                <td class="tdd"><input type="text" id="dateFin" v-model="tournoi.recompense"></td>
              </tr>
            </table>
            <button type="submit" class="participer-btn">Enregistrer les modifications</button>
          </center>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { db, storage, auth } from "../../firebase/firebase";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
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
        const storageRef = ref(storage, `tournois/${nomStade}/${nomTournoi}/image1.png`);
        this.logoUrl = await getDownloadURL(storageRef);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'URL du logo:', error);
      }
    },
    async updateTournoi() {
      try {
        const docRef = doc(db, 'tournois', this.idTournoi);
        await updateDoc(docRef, this.tournoi);
        Swal.fire("Les modifications ont été enregistrées avec succès");
        this.$router.push('/MesTournois')
      } catch (error) {
        console.error('Erreur lors de la mise à jour du tournoi:', error);
        Swal.fire("Une erreur s'est produite lors de l'enregistrement des modifications");
      }
    }
  }
}
</script>
<style scoped>
table {
  border: 2px solid black;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #00686fad;
  border-radius: 20px;
}

h2 {
  color: #00eeff;
}

.logo {
  width: 200px;
  height: auto;
  margin-bottom: 20px;
  border-radius: 25%;
}

label {
  color: white;
}

.disabled {
  color: white
}

table {
  width: 100%;
}

td {
  padding: 10px;
}

.tdd {
  text-align: left;
}

textarea {
  width: 100%;
  height: 200px;
}

.disabled {
  color: white
}

input {
  width: 100%;
  max-width: 400px;
  padding: 10px 15px;
  margin: 10px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus {
  border-color: #007BFF;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}

.participer-btn {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

.participer-btn:hover {
  background-color: #0056b3;
}

.bodyy {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 20px;
  background-image: url('../../assets/back (9).jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

@media (max-width: 768px) {
  tr {
    display: flex;
    flex-direction: column;
  }
}
</style>