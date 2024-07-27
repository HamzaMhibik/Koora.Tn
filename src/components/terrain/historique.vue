<template>
  <div class="body">
    <center><h2>Historique des réservations</h2></center>
    <div class="filtre">
      <div>
        <label>Date de réservation:</label>
        <input type="date" v-model="selectedDate" @change="filterReservations" class="date-input">
      </div>
      <div>
        <label>Équipe:</label><br>
        <input type="text" v-model="selectedTeam" @input="filterReservations" class="team-input" placeholder="nom d'equipe">
      </div>
    </div>
    <div v-if="filteredReservations.length === 0">
      Aucune réservation trouvée.
    </div>
    <div v-else class="reservation-grid">
      <div v-for="(reservation, index) in filteredReservations" :key="index" class="reservation-item">
        <div class="reservation-details">
          <div class="reservation-date">{{ formatDate(reservation.dateReservation) }}</div>
          <div class="reservation-time">{{ reservation.timeSlot }}</div>
          <div class="reservation-stadium">{{ reservation.equipe }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from "../../firebase/firebase"; // Import db and storage from init.js
import { collection, query, where, getDocs } from 'firebase/firestore';
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      stade: '',
      reservations: [],
      selectedDate: null,
      selectedTeam: '',
    }
  },
  computed: {
    userDetails() {
      return this.$store.state.userDetails;
    },
    filteredReservations() {
      return this.reservations.filter(reservation => {
        const reservationDate = reservation.dateReservation.toDate();
        const selectedDate = new Date(this.selectedDate);
        const dateMatch = this.selectedDate ? reservationDate.toDateString() === selectedDate.toDateString() : true;
        const teamMatch = this.selectedTeam ? reservation.equipe.toLowerCase().includes(this.selectedTeam.toLowerCase()) : true;
        return dateMatch && teamMatch;
      });
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
    this.stade = this.userDetails?.displayName ?? '';
    this.fetchReservations();
  },
  methods: {
    async fetchReservations() {
      try {
        const q = query(collection(db, 'historiquedereservation'), where('nomStade', '==', this.stade));
        const querySnapshot = await getDocs(q);

        // Créer un tableau temporaire pour stocker les réservations
        const tempReservations = [];

        querySnapshot.forEach((doc) => {
          tempReservations.push(doc.data());
        });

        // Trier les réservations par date de réservation (du plus récent au plus ancien)
        tempReservations.sort((a, b) => b.dateReservation.toMillis() - a.dateReservation.toMillis());

        // Mettre à jour les réservations dans les données du composant
        this.reservations = tempReservations;
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique des réservations:', error);
      }
    },
    formatDate(timestamp) {
      const date = timestamp.toDate(); // Convertir Timestamp en objet Date
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Intl.DateTimeFormat('fr-FR', options).format(date);
    },
    filterReservations() {
      // La logique de filtrage est maintenant déplacée dans la propriété calculée 'filteredReservations'
    },
  },
}
</script>


<style scoped>
.reservation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ca8282;
  border-radius: 5px;
  margin-bottom: 20px;
  font-size: 16px;
  background-color: rgb(255, 255, 255);
}
label{
  font-size: 1.25rem;
}
.filtre {
  display: flex;
  gap: 20px;
}
template {
  background: #222831 !important;
}

.reservation-item {
  background-color: rgb(255, 255, 255);
  border: 1px solid #fcfcfc;
  border-radius: 5px;
}

.reservation-details {
  padding: 15px;
}

.reservation-date {
  font-weight: bold;
  font-size: 1.25rem;
}

.reservation-time {
  color: #3b3b3b;
  font-size: 1.25rem;
  font-weight: bold;

}

.reservation-stadium {
  color: #d70d0d;
  font-size: 1.25rem;
  font-weight: bold;

}

h2 {
  color: #00f2ff;
  margin-top: 15px;
}

@media (max-width: 768px) {
  .date-input {
    width: 100%;
  }
  .filtre{
    flex-direction: column;
  }
  h2 {
  margin-top: 0px;
}
}

.body {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-image: url('../../assets/back (9).jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>