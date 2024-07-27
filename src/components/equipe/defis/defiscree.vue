<template>
  <div class="bodyy">
    <div class="links">
      <div class="link"><router-link to="/defispropose">Defis proposé</router-link> </div>
      <div class="link"><router-link to="/defiscree">Defis créé</router-link></div>
      <div class="link"><router-link to="/defierEquipe">Defier un Equipe</router-link></div>
    </div>
    <h2>Défis Créés</h2>
    <div v-if="defis.length === 0">
      <p class="defisp">Il n'y a pas de défis créés pour le moment.</p>
    </div>
    <div v-else class="defi-list">
      <div v-for="(defi, index) in defis" :key="index" class="defi-item">
        <div class="defi-header">
          <p>Vous avez défié <strong class="equipe-name">{{ defi.equipe2 }}</strong> pour match a:</p>
          <h4>Stade: <strong class="match-details">{{ defi.stade }}</strong><br>
            Date: <strong class="match-details">{{ defi.dateMatch }}</strong> <br>
            Heure: <strong class="match-details">{{ defi.heureMatch }}</strong></h4>
        </div>
        <div class="defi-body">
          <p class="message">Message:<strong>{{ defi.message }}</strong> </p>
          <p class="etat">État:<strong class="match-details">{{ defi.etat }}</strong> </p><br>
          <div v-if="defi.etat === 'en attent'" class="defi-actions">
            <center><button class="btn" @click="supprimerDefi(defi.id)">Annule le defis </button></center>
          </div>
          <p v-if="defi.etat === 'accepté'" class="acceptation"><strong class="equipe-name">{{ defi.equipe2 }}</strong>
            ont accepté votre
            defi et votre match est reservé </p>
          <p v-if="defi.etat === 'refusé'" class="acceptation"><strong class="equipe-name">{{ defi.equipe2 }}</strong>
            ont refusé votre
            defi</p>
          <p v-if="defi.etat === 'annulé'" class="acceptation"> Defi annulé car le creneau a etais reservé par un
            autre equipe</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.defisp {
  color: white;
}

h2 {
  color: #00c7d1;
  text-align: center;
  font-family: 'poppins';
  position: relative;
}

.bodyy {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  background-image: url('../../../assets/back (9).jpg');
  background-size: cover;
  background-position: center;
  padding: 20px;
}

.acceptation {
  font-size: 1.25rem;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.title {
  text-align: center;
  margin-bottom: 30px;
}

.defi-list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: space-around;
  padding: 0;
  gap: 10px;
}

.defi-item {
  background-color: #007E85;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 30%;
  box-sizing: border-box;
}

.defi-header {
  margin-bottom: 10px;
}

.equipe-name {
  font-size: 20px;
  margin: 0;
  color: #ffd001;
}

.match-details {
  font-size: 1.25rem;
  color: #ffffff;
  margin: 5px 0 0;
}

.message {
  margin: 0 0 10px;
}

.etat {
  margin: 0;
}

.defi-actions {
  display: flex;
  justify-content: center;
}

.btn {
  color: white;
  background-color: #a40303;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.defisp {
  font-size: 1.5rem;
  color: white;
}

.refuse {
  background-color: #0872f3;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}

.accepte {
  background-color: #08f320;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.defis {
  margin-top: 30px;
  padding: 20px;
}

.links {
  display: flex;
  justify-content: space-around;
  background-color: #f0f0f0;
  padding: 10px;
}

.link {
  margin: 0 10px;
}

.link a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.link a:hover {
  color: #007bff;
}

@media only screen and (max-width: 600px) {
  .defi-item {
    background-color: #007E85;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 95%;
    box-sizing: border-box;
  }
}
</style>


<script>
import { db, auth } from "../../../firebase/firebase";
import { query, collection, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      storedEmail: '',
      equipe: '',
      defis: [],
      week: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
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
    this.storedEmail = this.userDetails?.email ?? '';
    await this.fetchEquipeByEmail(this.storedEmail);
    await this.fetchDefis(); // Wait for fetchEquipeByEmail to complete before fetching defis
  },
  methods: {
    async fetchEquipeByEmail(storedEmail) {
      try {
        const q = query(collection(db, "equipes"), where("email", "==", storedEmail));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async doc => {
          this.equipe = { ...doc.data(), id: doc.id }; // Ajouter l'ID du document
        });
      } catch (error) {
        console.error("Erreur lors de la récupération d'équipe : ", error);
      }
    },
    async fetchDefis() {
      try {
        const q = query(collection(db, "defis"), where("equipe1", "==", this.equipe.nomEquipe));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
          this.defis.push({ ...doc.data(), id: doc.id }); // Ajouter l'ID du document
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des défis : ", error);
      }
    },
    async supprimerDefi(defiId) {
      Swal.fire({
        title: "annule le defis ?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Oui",
        denyButtonText: `Non`
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            const defiRef = doc(db, "defis", defiId);
            deleteDoc(defiRef);
            this.defis = this.defis.filter(defi => defi.id !== defiId);
            Swal.fire({
              title: "Annulé",
              text: "Defi annule!",
              icon: "info"
            });
          } catch (error) {
            console.error("Erreur lors de la suppression du défi : ", error);
          }
        } else if (result.isDenied) {
        }
      });

    },
    async defier() {
      this.$router.push('/defierEquipe')
    }

  }
}
</script>