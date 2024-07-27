<template>
  <div class="body">
    <center>
      <h2>Historique des réservations</h2>
    </center>
    <div class="filtre">
      <div>
        <label>Date de reservation:</label>
        <input type="date" v-model="selectedDate" @change="filterReservations" class="date-input">
      </div>
      <div>
        <label>Stade:</label>
        <input type="text" v-model="selectedStadium" @input="filterReservations" class="date-input"
          placeholder="nom de stade">
      </div>
    </div>
    <div v-if="reservations.length === 0">
      Aucune réservation trouvée.
    </div>
    <div v-else class="reservation-grid">
      <div v-for="(reservation, index) in filteredReservations" :key="index" class="reservation-item">
        <div class="reservation-details">
          <div class="reservation-date">{{ formatDate(reservation.dateReservation) }}</div>
          <div class="reservation-time">{{ reservation.timeSlot }}</div>
          <div class="reservation-stadium">{{ reservation.nomStade }}</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { db, auth } from "../../firebase/firebase"; // Import db and storage from init.js
import { collection, query, where, getDocs } from 'firebase/firestore';
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      equipe: '',
      logoUrl: '',
      reservations: [],
      selectedStadium: '',
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
        const stadiumMatch = this.selectedStadium ? reservation.nomStade.toLowerCase().includes(this.selectedStadium.toLowerCase()) : true;
        return dateMatch && stadiumMatch;
      });
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
    this.equipe = this.userDetails?.displayName ?? '';
    this.fetchReservations();
  },
  methods: {
    async fetchReservations() {
      try {
        const q = query(collection(db, 'historiquedereservation'), where('equipe', '==', this.equipe));
        const querySnapshot = await getDocs(q);

        const tempReservations = [];

        querySnapshot.forEach((doc) => {
          tempReservations.push(doc.data());
        });

        tempReservations.sort((a, b) => b.dateReservation.toMillis() - a.dateReservation.toMillis());

        this.reservations = tempReservations;
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique des réservations:', error);
      }
    },
    formatDate(timestamp) {
      const date = timestamp.toDate();
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Intl.DateTimeFormat('fr-FR', options).format(date);
    },
  },
}
</script>

<style scoped>
.body {
  background-image: url('../../assets/back (9).jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
}

h2 {
  color: #00e2ee;
  font-size: 2.5rem;
}

/* Styles for input */
.date-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ca8282;
  border-radius: 5px;
  margin-bottom: 20px;
  font-size: 16px;
  background-color: rgb(255, 255, 255);
}

.filtre {
  display: flex;
  gap: 20px;
}

/* Rest of your styles */
.reservation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.reservation-item {
  background-color: #ffffff;
  border: 1px solid #fcfcfc;
  border-radius: 5px;
}

.reservation-details {
  padding: 15px;
}

.reservation-date {
  font-size: 1.25rem;
  font-weight: bold;
  color: rgb(0, 0, 0);
}

.reservation-time {
  color: #e83131;
  font-weight: bold;
  font-size: 1.15rem;
}

label {
  color: white;
  font-size: 1.15rem;
}

.reservation-stadium {
  color: #0099ff;
  font-weight: bold;
  font-size: 1.25rem;
}

@media only screen and (max-width: 770px) {
  .date-input {
    width: 100%;
  }

  .filtre {
    flex-direction: column;
  }
}
</style>