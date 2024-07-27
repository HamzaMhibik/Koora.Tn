<template>
  <div class="bodyy">
    <div class="container">
      <nav>
        <div class="div1">
          <div><router-link to="/dashboard" class="link1">dashboard</router-link></div>
          <div><router-link to="/AjoutAdmin" class="link1">Ajouter admin</router-link></div>
          <div><router-link to="/ContactA" class="link1">Contact</router-link></div>
        </div>
        <div><router-link to="/equipes" class="link"><img src="../../assets/group.png" class="icon">
            Equipes</router-link>
        </div>
        <div><router-link to="/stades" class="link"><img src="../../assets/stade.png" class="icon"> Stades</router-link>
        </div>
        <div><router-link to="/joueurs" class="link"><img src="../../assets/joueur.png" class="icon">
            Joueurs</router-link></div>
        <div><router-link to="/tournois" class="link"><img src="../../assets/tournoi.png" class="icon">
            Tournois</router-link></div>
        <div><router-link to="/defis" class="link"><img src="../../assets/defi.png" class="icon"> Défis</router-link>
        </div>
        <div><router-link to="/recrutements" class="link"><img src="../../assets/recruitment.png" class="icon">
            Recrutements</router-link></div>
        <div><router-link to="/commentairesS" class="link"><img src="../../assets/comment.png" class="icon">
            CommentairesS</router-link></div>
        <div><router-link to="/commentairesp" class="link"><img src="../../assets/comment.png" class="icon">
            CommentairesP</router-link></div>
        <div><router-link to="/reservation" class="link"><img src="../../assets/reservation.png" class="icon">
            reservation</router-link></div>
      </nav>
      <div class="content">
        <h2>Historique de reservations</h2>
        <table>
          <thead>
            <tr>
              <th>Equipe</th>
              <th>Satde</th>
              <th>Date de reservation</th>
              <th>Date de match</th>
<!--               <th>Etat</th>
 -->              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(reservation, index) in reservations" :key="index">
              <td>{{ reservation.equipe }}</td>
              <td>{{ reservation.nomStade }}</td>
              <td>{{ formatDate(reservation.dateReservation) }}</td>
              <td>{{ reservation.timeSlot }}</td>
              <!-- <td v-if="reservation.etatReservation">{{ reservation.etatReservation }}</td>
              <td v-else>Accepté</td> -->
              <td>
                <button @click="deleteReservation(reservation.id)">Supprimer</button> <!-- Bouton de suppression -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, storage, auth } from '../../firebase/firebase';

export default {
  data() {
    return {
      reservations: [],
    };
  },
  async mounted() {
    this.unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) { this.$router.push('/'); }
      else if (user.photoURL !== 'admin') { this.$router.push('/') }
    })
    this.fetcheReservation();
  },
  methods: {
    async fetcheReservation() {
      try {
        const querySnapshot = await getDocs(collection(db, 'historiquedereservation'));
        querySnapshot.forEach((doc) => {
          this.reservations.push({ id: doc.id, ...doc.data() });
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des reservations : ', error);
      }
    },
    formatDate(timestamp) {
      const date = timestamp.toDate();
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Intl.DateTimeFormat('fr-FR', options).format(date);
    },
    async deleteReservation(reservationId) {
      try {
        await deleteDoc(doc(db, 'historiquedereservation', reservationId));
        this.reservations = this.reservations.filter(reservation => reservation.id !== reservationId);
        Swal.fire({
          icon: 'success',
          title: 'Réservation supprimée',
          text: 'La réservation a été supprimée avec succès.',
        });
      } catch (error) {
        console.error('Erreur lors de la suppression de la réservation : ', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la suppression de la réservation. Veuillez réessayer.',
        });
      }
    }
  }
}

</script>
<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}

.bodyy {
  background-color: #e4e3e3;
  min-height: 100vh;
}

.content {
  padding: 10px;
}

/* Vos styles existants */
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

h2 {
  color: #333;
  font-family: Arial, sans-serif;
}

button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
}

button:hover {
  background-color: #d32f2f;
}

.link {
  color: white;
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 3px;
  transition: background-color 0.3s;
  display: block;
}

.link:hover {
  background-color: #555;
}

nav {
  background-color: rgb(148, 148, 148);
  width: 200px;
  position: fixed;
  margin-top: 10px;
  top: 0;
  left: 0;
  height: 100%;
  padding-top: 60px;
}

.link1 {
  color: white;
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 3px;
  display: block;
  margin-top: 10px;
}

.icon {
  width: 30px;
}


nav img {
  vertical-align: middle;
}

.router-link-exact-active {
  padding: 10px;
  background-color: #555;
}
</style>