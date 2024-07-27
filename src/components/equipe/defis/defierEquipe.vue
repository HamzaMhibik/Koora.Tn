<template>
  <div class="bodyy">
    <div class="links">
      <div class="link"><router-link to="/defispropose">Defis proposé</router-link> </div>
      <div class="link"><router-link to="/defiscree">Defis créé</router-link></div>
      <div class="link"><router-link to="/defierEquipe">Defier un Equipe</router-link></div>
    </div>
    <center>
      <h2 class="">Defier un Equipe</h2>
    </center>
    <div class="container">
      <form @submit.prevent="enregistreDefie" class="form">
        <div>
          <label for="ville">Ville :</label>
          <input id="ville" v-model="equipe1.ville" @change="filterTeamsAndStadiums" class="form-control" required
            disabled>
        </div>
        <div class="form-group">
          <label for="equipe2">Choisir l'équipe à défier :</label>
          <select id="equipe2" v-model="equipe2" class="form-control" required>
            <option v-for="equipe in equipes" :key="equipe.id" :value="equipe.nomEquipe">{{ equipe.nomEquipe }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="stade">Choisir le stade :</label>
          <select id="stade" v-model="stade" class="form-control" required>
            <option value="">Sélectionner un stade</option>
            <option v-for="stade in stades" :key="stade.id" :value="stade.stadiumName">{{ stade.stadiumName }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="date">Date du match :</label>
          <select v-model="date" class="form-control" required>
            <option value="">Sélectionner une date</option>
            <option v-for="option, index in generateDates()" :key="option.value" :value="option.value + '_' + index">{{
              option.text }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="date">heure du match :</label>
          <select v-model="time" class="time">
            <option value="">Choisir l'heure de match</option>
            <option value="16:00 - 17:00">16:00 - 17:00</option>
            <option value="17:00 - 18:00">17:00 - 18:00</option>
            <option value="18:00 - 19:00">18:00 - 19:00</option>
            <option value="19:00 - 20:00">19:00 - 20:00</option>
            <option value="20:00 - 21:00">20:00 - 21:00</option>
            <option value="21:00 - 22:00">21:00 - 22:00</option>
            <option value="22:00 - 23:00">22:00 - 23:00</option>
            <option value="23:00 - 00:00">23:00 - 00:00</option>
          </select>
        </div>
        <div class="form-group">
          <label for="message">Message :</label>
          <textarea id="message" cols="30" rows="5" v-model="message" class="form-control"
            placeholder="laisser un message pour l'equipe adversair"></textarea>
        </div>
        <center><button type="submit" class="btn btn-primary">Défier</button></center>
      </form>
    </div>
  </div>
</template>
<script>
import { db, auth } from "../../../firebase/firebase";
import { query, collection, where, getDocs, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      storedEmail: '',
      cities: ['Zarzis', 'Mednine', 'Jerbe', 'Gabes', 'Sfax'], // Liste des villes disponibles
      allTeams: [], // Toutes les équipes
      allStadiums: [], // Tous les stades
      equipes: [], // Équipes filtrées par la ville sélectionnée
      stades: [],
      equipe1: '',
      equipe2: '', // Initialiser avec la valeur par défaut
      stade: '',
      message: '',
      date: '',
      time: '',
      today: '',
      futureDate: '',
      week: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
      user: null,
    }
  },
  created() {
    this.equipe2 = this.$route.query.nomEquipe;
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
    this.fetchEquipeByEmail(this.storedEmail);
    this.fetchStades();
    this.fetchEquipes();
  },
  methods: {
    async fetchEquipeByEmail(storedEmail) {
      try {
        const q = query(collection(db, "equipes"), where("email", "==", storedEmail));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async doc => {
          this.equipe1 = { ...doc.data(), id: doc.id };
        });
        this.equipesLoaded = true;
      } catch (error) {
        console.error("Erreur lors de la récupération de l'équipe : ", error);
      }
    },
    async fetchEquipes() {
      try {
        const querySnapshot = await getDocs(collection(db, "equipes"));
        querySnapshot.forEach(doc => {
          this.equipes.push({ ...doc.data(), id: doc.id });
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des équipes : ", error);
      }
    },
    async fetchStades() {
      try {
        const querySnapshot = await getDocs(collection(db, "proprietaire"));
        querySnapshot.forEach(doc => {
          this.stades.push({ ...doc.data(), id: doc.id });
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des stades : ", error);
      }
    },
    async enregistreDefie() {
      // Vérifier si la date et l'heure ont été sélectionnées
      if (!this.date || !this.time) {
        Swal.fire("Veuillez sélectionner la date et l'heure du match.", "", "error");
        return;
      }

      // Vérifier si le créneau est disponible
      const selectedDateTime = `${this.date.split('_')[0]}_${this.time}`;
      const stade = this.stades.find(stade => stade.stadiumName === this.stade);

      if (!stade) {
        Swal.fire("Stade non trouvé.", "", "error");
        return;
      }

      // Check if the selected time slot is available
      const emploiDuTemps = stade.emploiDuTemps1[this.week[parseInt(this.date.split('_')[1])]][this.time];
      if (emploiDuTemps !== 'vide') {
        Swal.fire("Le créneau sélectionné n'est pas disponible.", "", "error");
        return;
      }

      Swal.fire({
        title: `Defier ${this.equipe2} ?`,
        showCancelButton: true,
        confirmButtonText: "Defier",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const data = {
              equipe1: this.equipe1.nomEquipe,
              equipe2: this.equipe2,
              stade: this.stade,
              ville: this.equipe1.ville,
              dateMatch: this.date.split('_')[0],
              dateCreation: new Date(),
              index: parseInt(this.date.split('_')[1]),
              heureMatch: this.time,
              message: this.message,
              etat: 'en attent'
            };
            await addDoc(collection(db, "defis"), data);
            this.equipe2 = '';
            this.stade = '';
            this.date = '';
            this.time = '';
            this.message = '';
            Swal.fire("Défi envoyé", "", "success");
            this.$router.push('/defierEquipe');
          } catch (error) {
            console.error("Erreur lors de l'enregistrement du défi:", error);
            Swal.fire("Une erreur s'est produite. Veuillez réessayer.", "", "error");
          }
        }
      });
    },
    generateDates() {
      const dates = [];
      const today = new Date(); // Obtenez la date d'aujourd'hui
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i); // Ajoutez i jours à la date d'aujourd'hui
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('fr-FR', options); // Formattez la date
        dates.push({ value: `${formattedDate}_${i}`, text: formattedDate }); // Ajoutez la date au tableau
      }
      return dates;
    },
    filterTeamsAndStadiums() {
      // Réinitialiser les listes d'équipes et de stades
      this.equipes = [];
      this.stades = [];

      // Filtrer les équipes et les stades en fonction de la ville sélectionnée
      const filteredTeams = this.allTeams.filter(team => team.ville === this.equipe1.ville);
      const filteredStadiums = this.allStadiums.filter(stadium => stadium.ville === this.equipe1.ville);

      // Mettre à jour les listes d'équipes et de stades
      this.equipes = filteredTeams;
      this.stades = filteredStadiums;
    }, async fetchEquipes() {
      try {
        const querySnapshot = await getDocs(collection(db, "equipes"));
        querySnapshot.forEach(doc => {
          this.allTeams.push({ ...doc.data(), id: doc.id });
        });
        // Mettre à jour les équipes en fonction de la ville sélectionnée
        this.filterTeamsAndStadiums();
      } catch (error) {
        console.error("Erreur lors de la récupération des équipes : ", error);
      }
    },

    async fetchStades() {
      try {
        const querySnapshot = await getDocs(collection(db, "proprietaire"));
        querySnapshot.forEach(doc => {
          this.allStadiums.push({ ...doc.data(), id: doc.id });
        });
        // Mettre à jour les stades en fonction de la ville sélectionnée
        this.filterTeamsAndStadiums();
      } catch (error) {
        console.error("Erreur lors de la récupération des stades : ", error);
      }
    },

  }
}
</script>
<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #01767c;
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
  transition: color 0.3s ease;
  /* Ajout de transition pour un effet fluide lors du survol */
}

.link a:hover {
  color: #ff6600;
  /* Changement de couleur au survol */
}

label {
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
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 20px;
  background-image: url('../../../assets/back (9).jpg');
  background-size: cover;
  background-position: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-control,
.time {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-primary {
  background-color: #0480fc;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.defis {
  margin-top: 30px;
  padding: 20px;
}

select {
  font-size: 1.1rem;
}

label {
  font-size: 1.1rem;

}

@media only screen and (max-width: 380px) {
  .bodyy {
    padding: 10px;
  }

  .kk h3 {
    font-size: 1.3rem;
  }

  .link {
    font-size: 1.1rem;
    margin-right: 5px;
    padding: 8px;
  }

  .container {
    max-width: 100%;
    margin: 0 auto;
  }

  label {
    font-size: 1.1rem;
    color: #fff;
  }

  .form-control {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .btn-primary {
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #677583;
    color: #fff;
    cursor: pointer;
  }
}
</style>