<template>
  <div class="bodyy">
    <center>
      <br>
      <h1>{{ userInfo.stadiumName }}</h1>
      <br>
      <div class="stadium-info">
        <div class="info1">
          <div class="info">
            <p><strong>Nom de responsable:</strong> {{ userInfo.nom }}</p>
            <p><strong>ville :</strong> {{ userInfo.ville }}</p>
            <p><strong>Adresse:</strong> {{ userInfo.address }}</p>
          </div>
          <div class="info">
            <p><strong>nimrero de telephone:</strong> {{ userInfo.telephone }}</p>
            <p><strong>Prix de réservation:</strong> {{ userInfo.reservationPrice }}Dt</p>
            <div class="rating">
              <p v-if="averageRating"><strong>note de stade:</strong>
                <star-rating class="star" :rating="averageRating.toFixed(2)" :read-only="true" :increment="0.01"
                  :star-size="25" :show-rating="false" active-color="#fa8e01"></star-rating>
              </p>
              <p v-else><strong>note de stade:</strong> Pas encore noté</p>
            </div>
          </div>
        </div>
        <p><strong class="description">Description:</strong> {{ userInfo.description }}</p>
      </div>
      <div class="images-container">
        <h3>Images de Stade</h3>
        <Carousel :items-to-show="isMobile ? 0.5 : 2" :wrap-around="true">
          <Slide class="image-item" v-for="(image, index) in images" :key="index">
            <img :src="image.url" alt="Uploaded Image" />
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </center>
    <center>
      <div class="schedule">
        <h3>Emploi</h3>
        <div class="emploi">
          <table>
            <thead>
              <tr>
                <th>Jour</th>
                <th>16:00 - 17:00</th>
                <th>17:00 - 18:00</th>
                <th>18:00 - 19:00</th>
                <th>19:00 - 20:00</th>
                <th>20:00 - 21:00</th>
                <th>21:00 - 22:00</th>
                <th>22:00 - 23:00</th>
                <th>23:00 - 00:00</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="day in daysOfWeek" :key="day">
                <td class="tdj">{{ formatDate(getDateForDay(day)) }}</td>
                <template v-if="emploiDuTemps1[day]">
                  <td :class="{
                    'en-attente-User': EnAttentByUser(
                      day,
                      '16:00 - 17:00'
                    ),
                    'reserved-by-user': isReservedByUser(
                      day,
                      '16:00 - 17:00'
                    ),
                    'reserved-by-others': !isReservedByUser(
                      day,
                      '16:00 - 17:00'
                    ),
                    'empty-slot':
                      emploiDuTemps1[day]['16:00 - 17:00'] === 'vide',
                    'desactiver':
                      emploiDuTemps1[day]['16:00 - 17:00'] === 'Desactivé',
                    'en-attente':
                      emploiDuTemps1[day]['16:00 - 17:00'].endsWith(
                        '(en attente)'
                      ),
                  }" @click="reserveTimeSlot(day, '16:00 - 17:00')">
                    {{ emploiDuTemps1[day]["16:00 - 17:00"] }}
                  </td>
                  <td :class="{
                    'en-attente-User': EnAttentByUser(
                      day,
                      '17:00 - 18:00'
                    ),
                    'reserved-by-user': isReservedByUser(
                      day,
                      '17:00 - 18:00'
                    ),
                    'reserved-by-others': !isReservedByUser(
                      day,
                      '17:00 - 18:00'
                    ),
                    'empty-slot':
                      emploiDuTemps1[day]['17:00 - 18:00'] === 'vide',
                    'desactiver':
                      emploiDuTemps1[day]['17:00 - 18:00'] === 'Desactivé',
                    'en-attente':
                      emploiDuTemps1[day]['17:00 - 18:00'].endsWith(
                        '(en attente)'
                      ),
                  }" @click="reserveTimeSlot(day, '17:00 - 18:00')">
                    {{ emploiDuTemps1[day]["17:00 - 18:00"] }}
                  </td>
                  <td :class="{
                    'en-attente-User': EnAttentByUser(
                      day,
                      '18:00 - 19:00'
                    ),
                    'reserved-by-user': isReservedByUser(
                      day,
                      '18:00 - 19:00'
                    ),
                    'reserved-by-others': !isReservedByUser(
                      day,
                      '18:00 - 19:00'
                    ),
                    'empty-slot':
                      emploiDuTemps1[day]['18:00 - 19:00'] === 'vide',
                    'desactiver':
                      emploiDuTemps1[day]['18:00 - 19:00'] === 'Desactivé',
                    'en-attente':
                      emploiDuTemps1[day]['18:00 - 19:00'].endsWith(
                        '(en attente)'
                      ),
                  }" @click="reserveTimeSlot(day, '18:00 - 19:00')">
                    {{ emploiDuTemps1[day]["18:00 - 19:00"] }}
                  </td>
                  <td :class="{
                    'en-attente-User': EnAttentByUser(
                      day,
                      '19:00 - 20:00'
                    ),
                    'reserved-by-user': isReservedByUser(
                      day,
                      '19:00 - 20:00'
                    ),
                    'reserved-by-others': !isReservedByUser(
                      day,
                      '19:00 - 20:00'
                    ),
                    'empty-slot':
                      emploiDuTemps1[day]['19:00 - 20:00'] === 'vide',
                    'desactiver':
                      emploiDuTemps1[day]['19:00 - 20:00'] === 'Desactivé',
                    'en-attente':
                      emploiDuTemps1[day]['19:00 - 20:00'].endsWith(
                        '(en attente)'
                      ),
                  }" @click="reserveTimeSlot(day, '19:00 - 20:00')">
                    {{ emploiDuTemps1[day]["19:00 - 20:00"] }}
                  </td>
                  <td :class="{
                    'en-attente-User': EnAttentByUser(
                      day,
                      '20:00 - 21:00'
                    ),
                    'reserved-by-user': isReservedByUser(
                      day,
                      '20:00 - 21:00'
                    ),
                    'reserved-by-others': !isReservedByUser(
                      day,
                      '20:00 - 21:00'
                    ),
                    'empty-slot':
                      emploiDuTemps1[day]['20:00 - 21:00'] === 'vide',
                    'desactiver':
                      emploiDuTemps1[day]['20:00 - 21:00'] === 'Desactivé',
                    'en-attente':
                      emploiDuTemps1[day]['20:00 - 21:00'].endsWith(
                        '(en attente)'
                      ),
                  }" @click="reserveTimeSlot(day, '20:00 - 21:00')">
                    {{ emploiDuTemps1[day]["20:00 - 21:00"] }}
                  </td>
                  <td :class="{
                    'en-attente-User': EnAttentByUser(
                      day,
                      '21:00 - 22:00'
                    ),
                    'reserved-by-user': isReservedByUser(
                      day,
                      '21:00 - 22:00'
                    ),
                    'reserved-by-others': !isReservedByUser(
                      day,
                      '21:00 - 22:00'
                    ),
                    'empty-slot':
                      emploiDuTemps1[day]['21:00 - 22:00'] === 'vide',
                    'desactiver':
                      emploiDuTemps1[day]['21:00 - 22:00'] === 'Desactivé',
                    'en-attente':
                      emploiDuTemps1[day]['21:00 - 22:00'].endsWith(
                        '(en attente)'
                      ),
                  }" @click="reserveTimeSlot(day, '21:00 - 22:00')">
                    {{ emploiDuTemps1[day]["21:00 - 22:00"] }}
                  </td>
                  <td :class="{
                    'en-attente-User': EnAttentByUser(
                      day,
                      '22:00 - 23:00'
                    ),
                    'reserved-by-user': isReservedByUser(
                      day,
                      '22:00 - 23:00'
                    ),
                    'reserved-by-others': !isReservedByUser(
                      day,
                      '22:00 - 23:00'
                    ),
                    'empty-slot':
                      emploiDuTemps1[day]['22:00 - 23:00'] === 'vide',
                    'desactiver':
                      emploiDuTemps1[day]['22:00 - 23:00'] === 'Desactivé',
                    'en-attente':
                      emploiDuTemps1[day]['22:00 - 23:00'].endsWith(
                        '(en attente)'
                      ),
                  }" @click="reserveTimeSlot(day, '22:00 - 23:00')">
                    {{ emploiDuTemps1[day]["22:00 - 23:00"] }}
                  </td>
                  <td :class="{
                    'en-attente-User': EnAttentByUser(
                      day,
                      '23:00 - 00:00'
                    ),
                    'reserved-by-user': isReservedByUser(
                      day,
                      '23:00 - 00:00'
                    ),
                    'reserved-by-others': !isReservedByUser(
                      day,
                      '23:00 - 00:00'
                    ),
                    'empty-slot':
                      emploiDuTemps1[day]['23:00 - 00:00'] === 'vide',
                    'desactiver':
                      emploiDuTemps1[day]['23:00 - 00:00'] === 'Desactivé',
                    'en-attente':
                      emploiDuTemps1[day]['23:00 - 00:00'].endsWith(
                        '(en attente)'
                      ),
                  }" @click="reserveTimeSlot(day, '23:00 - 00:00')">
                    {{ emploiDuTemps1[day]["23:00 - 00:00"] }}
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </center>
    <div class="evaluation">
      <div class="rating-section">
        <h3 style="display: none;">Evaluer le terrain:</h3>
        <div class="rating-controls">
          <star-rating v-model:rating="note" :show-rating="false" active-color="#fa8e01" :star-size="35"></star-rating>
          <button @click="submitRating">Evaluer</button>
        </div>
        <div v-if="userInfo.usersrating && userInfo.usersrating.hasOwnProperty(equipe.nomEquipe)">
          <p class="note-equipe">
            Vous avez donné
            <span>{{ userInfo.usersrating[equipe.nomEquipe] }} etoiles</span>
            à cette stade.
          </p>
        </div>
      </div>
      <div class="comment-section">
        <h3>Commentaires</h3>
        <textarea rows="4" cols="50" placeholder="Laissez votre commentaire ici" v-model="newComment"></textarea><br />
        <button @click="submitComment()" class="button">Envoyer</button>
        <div class="comments-container">
          <div v-for="comment in comments" :key="comment.id" class="comment">
            <p class="comment-user">{{ comment.nomequipe }}:</p>
            <p>{{ comment.comment }}</p>
            <button v-if="comment.nomequipe == this.equipe.nomEquipe" @click="deleteComment(comment.id)"
              class="btn btn-danger">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* Styles pour la section de notation */
.bodyy {
  background-image: url('../../assets/back (9).jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.stadium-info {
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  background: #007e85;
  color: white;
}

h3 {
  color: #00c7d1;
  text-align: center;
  font-family: "poppins";
  position: relative;
}

/*----------------------------------------------------------------------description----------------------------------------------------------*/
h3 {
  font-size: 3rem;
}

.info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around
}

.description {
  margin-left: 42px;
  display: flex;
  flex-wrap: wrap;
}

.stadium-info p {
  margin-bottom: 10px;
  color: rgb(245, 248, 248);
  font-size: 1.15rem;
}

.stadium-info p strong {
  font-weight: bold;
}

.rating {
  color: #ff8000;
  /* Couleur jaune pour la note */
  font-size: 18px;
}

.rating p {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
}

.star {
  margin-top: -7px;
}

strong {
  color: #000000;
}

h1 {
  font-size: 4rem;
  color: #00d8e4;
  text-align: center;
  font-family: 'poppins';
  position: relative;
}

/* ---------------------------------------------------------------------image----------------------------------------------------------*/

.images-container {
  margin-top: -30px;
  background: #007e85;
  padding: 20px;
  border-radius: 10px;
}

.image-item img {
  margin: 20px;
  width: 800px;
  height: 500px;
  border-radius: 10px;
}

/* ---------------------------------------------------------------------emploi--------------------------------------------------------------*/
.schedule {
  color: rgb(255, 255, 255);
}

.emploi {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  background-color: #007e85;
}




.info p {
  margin: 5px 10px;
}

.schedule table {
  width: 100%;
  border-collapse: collapse;
}

.schedule th,
.schedule td {
  width: 100px;
  /* Définit une largeur fixe pour chaque cellule */
  height: 100px;
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
}


.tdj {
  padding: 0px;
  text-align: left;
}

.time-slot {
  background-color: #eeeef1;
  cursor: pointer;
  padding: 10px;
  margin: 0;
}

.time-slot:hover {
  background-color: #ddd;
}

.reserved-by-user {
  background-color: rgb(46, 221, 2);
  font-size: 1.2rem;
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding: 10px;
  color: #000000;
}

.reserved-by-others {
  background-color: rgb(255, 119, 0);
  font-size: 1.1rem;
  width: 100%;
  height: 100%;
  padding: 10px;
  color: #000000;
}

.desactiver {
  background-color: rgb(231, 1, 1);
  font-size: 1.1rem;
  width: 100%;
  height: 100%;
  padding: 10px;
  color: #000000;
}

.empty-slot {
  background-color: rgb(255, 255, 255);
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding: 10px;
  color: #000000;
}

.en-attente {
  background-color: rgb(255, 119, 0);
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding: 10px;
}

.en-attente-User {
  background-color: #0177d8;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding: 10px;
}

.body {
  background: #2B3F57;
}

/* Amélioration de la section évaluation */
.evaluation {
  width: 90%;
  background-color: #007e85;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  margin-left: 90px
}

/*--------------------------------------------------------------------------------- Section de notation ------------------------------------------------------------- */
.ratingsection {
  margin-top: 20px;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.vue-star-rating-rating-text {
  display: none;
  color: #007e85
}

.ratingsection p {
  font-size: 18px;
  margin-bottom: 10px;
}

.rating-controls {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.rating-controls button {
  margin-left: 20px;
  padding: 8px 20px;
  font-size: 16px;
  border: none;
  background-color: #025cbb;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.rating-controls button:hover {
  background-color: #0056b3;
}

.ratingsection .noteequipe {
  font-weight: bold;
  color: #28a745;
  /* couleur verte pour les notes */
}

.note-equipe {
  font-size: 1.25rem;
  font-weight: bold;
}

/* ---------------------------------------------------------------Section de commentaires------------------------------------------------ */
.comment-section {
  margin-top: 20px;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.comment-section h3 {
  margin-bottom: 10px;
  color: #333;
}

.comment-section textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.comment-section button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.comment-section .buttonc:hover {
  background-color: #0056b3;
}

.comments-container {
  margin-top: 10px;
  padding: 20px;
}

.comment {
  margin-top: 10px;
  border: #007E85 solid 2px;
  padding: 20px;
}

.comment-user {
  font-size: 1.25rem;
  font-weight: bold;
  color: #0056b3;
}

.comment p {
  font-size: 1.25rem;
}

.comment button {
  background-color: rgb(173, 1, 1);
}

.comment button:hover {
  background-color: rgb(255, 0, 0);
}

/* -------------------------------------------------------------------------------------*/
@media only screen and (max-width: 800px) {
  .stadium-info {
    width: 100%;
  }

  .image-item img {
    height: 300px;
    margin: 0;
    width: auto;
  }

  .description {
    margin-left: 0px;
  }

  .info {
    display: block;
  }

  .h {
    width: 100%;
  }

  .evaluation {
    width: 100%;
    margin-left: 0px;
  }

  .comment-section {
    margin-left: -20px;
    width: 111%;
  }

  .comment-section h3 {
    margin-left: 0%;
  }

  .comment-section textarea {
    width: 110%;
    margin-left: -18px;
  }

  .comments-container {
    width: 100%;
  }

  .buttonc {
    margin-left: 37%;
  }

  .comment {
    padding: 10px 0px;
    display: block;
    margin-left: -45px;
    width: 130%
      /* Afficher chaque commentaire sur une nouvelle ligne */
  }

  .ratingsection {
    width: 100%;
  }

  .image-row {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    justify-content: space-around
  }

  td {
    font-size: 1rem;
  }

  th {
    font-weight: 100;
  }

  h3 {
    font-size: 1.5rem
  }

  h1 {
    font-size: 2.2rem
  }

  .comment button {
    padding: 5px 10px
  }
}
</style>

<script>
import { db, storage, auth } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import StarRating from 'vue-star-rating'
export default {
  name: "StadiumInfoAndSchedule",
  components: {
    Carousel,
    Slide,
    Navigation,
    StarRating
  },
  data() {
    return {
      note: "",
      images: [],
      newComment: "",
      comments: null,
      storedEmail: "",
      nomStade: null,
      userInfo: {},
      emploiDuTemps1: {},
      daysOfWeek: [
        "lundi",
        "mardi",
        "mercredi",
        "jeudi",
        "vendredi",
        "samedi",
        "dimanche",
      ],
      equipe: "",
      isMobile: window.innerWidth <= 760
    };
  },
  created() {
    this.nomStade = this.$route.query.stade;
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  },
  computed: {
    userDetails() {
      return this.$store.state.userDetails;
    },
    averageRating() {
      if (this.userInfo.nbvote > 0) {
        return this.userInfo.sovote / this.userInfo.nbvote;
      } else {
        return 0; // Ou toute autre valeur par défaut que vous préférez
      }
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
    this.storedEmail = this.userDetails?.email ?? "";
    await this.getUserInfo();
    await this.fetchCommentsByEmail(this.nomStade); // Correction du nom de la méthode ici
    await this.fetchEquipeByEmail(this.storedEmail);
    await this.getUploadedImages();
    await this.getEmploiDuTemps1();
    setInterval(this.checkMidnight, 1000 * 60);
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 760;
    },
    async checkMidnight() {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        await this.updateScheduleDaily(); // Appeler la méthode pour mettre à jour l'emploi du temps
      }
    },
    isReservedByUser(day, timeSlot) {
      return (
        this.emploiDuTemps1[day][timeSlot] === `${this.equipe.nomEquipe}`
      );
    },
    EnAttentByUser(day, timeSlot) {
      return (
        this.emploiDuTemps1[day][timeSlot] ===
        `${this.equipe.nomEquipe}(en attente)`
      );
    },
    async submitRating() {
      if (!this.note) {
        Swal.fire("Choisir une note avant");
      }
      else {
        try {
          const usersRef = collection(db, "proprietaire");
          const q = query(usersRef, where("stadiumName", "==", this.nomStade));
          const querySnapshot = await getDocs(q); // Attendre la résolution de la requête

          if (
            this.userInfo.usersrating &&
            this.userInfo.usersrating.hasOwnProperty(this.equipe.nomEquipe)
          ) {
            // Si l'équipe a déjà donné une note, récupérer l'ancienne note
            const oldNote = this.userInfo.usersrating[this.equipe.nomEquipe];

            // Afficher la boîte de dialogue de confirmation
            const result = await Swal.fire({
              title: "Changer votre note?",
              showDenyButton: true,
              showCancelButton: false,
              confirmButtonText: "Oui",
              denyButtonText: `Non`,
            });

            if (result.isConfirmed) {
              const newTotalVotes =
                this.userInfo.sovote - oldNote + parseInt(this.note);
              const updatedUserRating = {
                ...this.userInfo.usersrating,
                [this.equipe.nomEquipe]: parseInt(this.note),
              };

              querySnapshot.forEach(async (doc) => {
                const stadeDocRef = doc.ref;

                try {
                  // Mettre à jour les données de l'utilisateur avec les nouvelles valeurs
                  await updateDoc(stadeDocRef, {
                    sovote: newTotalVotes,
                    usersrating: updatedUserRating,
                  });

                  // Mettre à jour les données locales
                  this.userInfo.sovote = newTotalVotes;
                  this.userInfo.usersrating = updatedUserRating;
                } catch (error) {
                  console.error(
                    error
                  );
                }
              });
            }
          } else {
            const result = await Swal.fire({
              title: `Donne une note ${this.note} a cette stade`,
              showDenyButton: true,
              showCancelButton: false,
              confirmButtonText: "Oui",
              denyButtonText: `Non`,
            });

            if (result.isConfirmed) {
              const newTotalVotes = this.userInfo.sovote + parseInt(this.note);
              const newVoteCount = this.userInfo.nbvote + 1;

              querySnapshot.forEach(async (doc) => {
                const stadeDocRef = doc.ref;

                try {
                  // Mettre à jour les données de l'utilisateur avec les nouvelles valeurs
                  await updateDoc(stadeDocRef, {
                    nbvote: newVoteCount,
                    sovote: newTotalVotes,
                    [`usersrating.${this.equipe.nomEquipe}`]: parseInt(this.note),
                  });

                  // Mettre à jour les données locales
                  this.userInfo.nbvote = newVoteCount;
                  this.userInfo.sovote = newTotalVotes;

                  console.log("Évaluation enregistrée avec succès.");
                } catch (error) {
                  console.error(
                    "Erreur lors de la mise à jour de l'évaluation :",
                    error
                  );
                }
              });

              Swal.fire("Merci pour votre note", "", "success");
            }
          }
        } catch (error) {
          console.error(
            "Erreur lors de l'enregistrement de l'évaluation :",
            error
          );
        }
      }

    },
    async getUploadedImages() {
      const imagesRef = ref(storage, `Stades/${this.nomStade}/`);
      try {
        const res = await listAll(imagesRef);
        const promises = res.items.map((item) =>
          getDownloadURL(item).then((url) => ({ url, name: item.name }))
        );
        this.images = await Promise.all(promises);
      } catch (error) {
        console.error("Error getting uploaded images:", error);
      }
    },
    formatDate(date) {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return date.toLocaleDateString("fr-FR", options);
    },
    getDateForDay(day) {
      const today = new Date();
      const nextSevenDays = [0, 1, 2, 3, 4, 5, 6].map((offset) => {
        const date = new Date(today);
        date.setDate(today.getDate() + offset);
        return date;
      });
      const dayIndex = this.daysOfWeek.indexOf(day);
      const targetDate = nextSevenDays[dayIndex];
      return targetDate;
    },
    async fetchEquipeByEmail(storedEmail) {
      try {
        const q = query(
          collection(db, "equipes"),
          where("email", "==", storedEmail)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          this.equipe = { ...doc.data(), id: doc.id }; // Ajouter l'ID du document
        });
      } catch (error) {
        console.error("Erreur lors de la récupération de l'équipe : ", error);
      }
    },
    async getUserInfo() {
      const usersRef = collection(db, "proprietaire");
      const q = query(usersRef, where("stadiumName", "==", this.nomStade));
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.userInfo = doc.data();
        });
      } catch (error) {
        console.error("Error getting user info:", error);
      }
    },
    async getEmploiDuTemps1() {
      const usersRef = collection(db, "proprietaire");
      const q = query(usersRef, where("stadiumName", "==", this.nomStade));
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.emploiDuTemps1 = doc.data().emploiDuTemps1;
        });
      } catch (error) {
        console.error("Error getting emploi du temps:", error);
      }
    },
    countReservations(teamName) {
      let count = 0;
      for (let day in this.emploiDuTemps1) {
        for (let slot in this.emploiDuTemps1[day]) {
          if (
            this.emploiDuTemps1[day][slot] === teamName ||
            this.emploiDuTemps1[day][slot] === `${teamName}(en attente)`
          ) {
            count++;
          }
        }
      }
      return count;
    },
    async reserveTimeSlot(day, timeSlot) {
      var currentDate = new Date();
      if (day === "lundi") {
        currentDate.setDate(currentDate.getDate());
      } else if (day === "mardi") {
        currentDate.setDate(currentDate.getDate() + 1);
      } else if (day === "mercredi") {
        currentDate.setDate(currentDate.getDate() + 2);
      } else if (day === "jeudi") {
        currentDate.setDate(currentDate.getDate() + 3);
      } else if (day === "vendredi") {
        currentDate.setDate(currentDate.getDate() + 4);
      } else if (day === "samedi") {
        currentDate.setDate(currentDate.getDate() + 5);
      } else {
        currentDate.setDate(currentDate.getDate() + 6);
      }

      const reservationData = {
        dateReservation: new Date(), // Date actuelle
        equipe: this.equipe.nomEquipe,
        timeSlot: currentDate.toLocaleDateString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }) + " " + timeSlot,
        nomStade: this.nomStade,
        etat: "en attente",
      };

      // Vérifiez si le créneau est déjà réservé par la même équipe (cas d'annulation)
      if (
        this.emploiDuTemps1[day][timeSlot] === `${this.equipe.nomEquipe}` ||
        this.emploiDuTemps1[day][timeSlot] === `${this.equipe.nomEquipe}(en attente)`
      ) {
        Swal.fire({
          title: "Annuler votre demande ?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Oui",
          denyButtonText: "Non",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const q = query(
                collection(db, "proprietaire"),
                where("stadiumName", "==", this.nomStade)
              );
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                const stadeDocRef = doc.ref; // Obtenez la référence du document
                try {
                  updateDoc(stadeDocRef, {
                    [`emploiDuTemps1.${day}.${timeSlot}`]: "vide",
                  });
                  // Mise à jour des données locales
                  this.emploiDuTemps1[day][timeSlot] = "vide";
                  console.log(`Réservation annulée pour le créneau horaire ${timeSlot} du jour ${day}.`);
                  // Rafraîchir l'affichage en forçant la réassignation des données
                  this.emploiDuTemps1 = { ...this.emploiDuTemps1 };
                  // Mise à jour de l'état de la réservation dans l'historique
                  updateDoc(reservationRef, { etatReservation: "annulé" });
                  Swal.fire({
                    title: "Annulation!",
                    text: "Reservation annulée!",
                    icon: "success",
                  });
                } catch (error) {
                  console.error("Erreur lors de l'annulation de la réservation:", error);
                }
              });
            } catch (error) {
              console.error("Erreur lors de la récupération des documents:", error);
            }
          }
        });
      } else if (this.emploiDuTemps1[day][timeSlot] === "vide") {
        // Vérifiez si l'utilisateur a déjà 3 réservations dans l'emploi du temps (cas de réservation)
        const currentReservations = this.countReservations(this.equipe.nomEquipe);
        if (currentReservations >= 3) {
          Swal.fire({
            title: "Limite atteinte",
            text: "Vous avez déjà 3 réservations. Veuillez contacter le responsable du terrain si vous souhaitez réserver d'autres créneaux.",
            icon: "error",
          });
          return;
        }

        // Si le créneau est vide
        Swal.fire({
          title: "Réserver ce créneau ?",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "Réserver",
          denyButtonText: "Non",
        }).then(async (result) => {
          if (result.isConfirmed) {
            if (!this.nomStade) {
              console.error("Nom du stade manquant.");
              return;
            }
            try {
              const q = query(
                collection(db, "proprietaire"),
                where("stadiumName", "==", this.nomStade)
              );
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                const stadeDocRef = doc.ref; // Obtenez la référence du document
                try {
                  updateDoc(stadeDocRef, {
                    [`emploiDuTemps1.${day}.${timeSlot}`]: `${this.equipe.nomEquipe}(en attente)`,
                  });
                  // Mise à jour des données locales
                  this.emploiDuTemps1[day][timeSlot] = `${this.equipe.nomEquipe}(en attente)`;
                  console.log(`Créneau horaire ${timeSlot} du jour ${day} réservé.`);
                  // Rafraîchir l'affichage en forçant la réassignation des données
                  this.emploiDuTemps1 = { ...this.emploiDuTemps1 };
                  // Enregistrement de la réservation dans l'historique
                  const historiqueRef = collection(db, "historiquedereservation");
                  addDoc(historiqueRef, reservationData);
                  Swal.fire({
                    title: "Reservation effectuée!",
                    text: "Attende l'acceptation de responsable de terrain",
                    icon: "success",
                  });
                } catch (error) {
                  console.error("Erreur lors de la réservation du créneau horaire:", error);
                }
              });
            } catch (error) {
              console.error("Erreur lors de la récupération des documents:", error);
            }
          }
        });
      } else {
        // Si le créneau est réservé par une autre équipe
        console.error(`Le créneau horaire ${timeSlot} du jour ${day} est déjà réservé.`);
      }
    },
    async submitComment() {
      if (!this.newComment) {
        Swal.fire("Commentaire vide");
      } else {
        try {
          const commentRef = addDoc(collection(db, "comments"), {
            nomstade: this.nomStade,
            comment: this.newComment,
            nomequipe: this.equipe.nomEquipe,
          });
          if (commentRef) {
            this.newComment = "";
            // Actualiser les commentaires après avoir ajouté un nouveau
            this.fetchCommentsByEmail(this.nomStade);
          }
        } catch (error) {
          console.error(
            "Erreur lors de l'enregistrement du commentaire : ",
            error
          );
        }
      }
    },

    // Dans votre composant
    async fetchCommentsByEmail(nomStade) {
      try {
        const q = query(
          collection(db, "comments"),
          where("nomstade", "==", nomStade)
        );
        const querySnapshot = await getDocs(q);
        this.comments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des commentaires :",
          error
        );
      }
    },
    async deleteComment(commentId) {
      try {
        // Supprimer le commentaire avec l'ID donné de la collection dans Firestore
        await deleteDoc(doc(db, "comments", commentId));

        // Actualiser les commentaires après avoir supprimé le commentaire
        this.fetchCommentsByEmail(this.nomStade);

        Swal.fire("Commentaire supprimé", "", "success");
      } catch (error) {
        console.error("Erreur lors de la suppression du commentaire :", error);
        Swal.fire(
          "Erreur",
          "Une erreur s'est produite lors de la suppression du commentaire.",
          "error"
        );
      }
    },
    async updateScheduleDaily() {
      for (let i = 0; i < this.daysOfWeek.length; i++) {
        const currentDay = this.daysOfWeek[i];
        const nextDay = this.daysOfWeek[i + 1];

        // Vérifiez si c'est le dernier jour de la semaine
        if (nextDay) {
          // Obtenez les données du jour suivant
          const nextDayData = this.emploiDuTemps1[nextDay];

          // Mettez à jour les données du jour actuel avec les données du jour suivant
          this.emploiDuTemps1[currentDay] = { ...nextDayData };

          // Mettez à jour dans la base de données si nécessaire
          await this.updateScheduleInDatabase(currentDay);

          console.log(
            `Données du jour ${currentDay} mises à jour avec les données du jour ${nextDay}.`
          );
        } else {
          // Si c'est le dernier jour, initialisez les données
          this.emploiDuTemps1[currentDay] = this.initializeScheduleDay();
          await this.updateScheduleInDatabase(currentDay);

          console.log(`Données du jour ${currentDay} initialisées.`);
        }
      }
    },

    async updateScheduleInDatabase(day) {
      // Mettez à jour les données dans la base de données Firebase
      const q = query(
        collection(db, "proprietaire"),
        where("stadiumName", "==", this.nomStade)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const stadeDocRef = doc.ref;
        try {
          updateDoc(stadeDocRef, {
            [`emploiDuTemps1.${day}`]: this.emploiDuTemps1[day],
          });
        } catch (error) {
          console.error(
            "Erreur lors de la mise à jour des données du jour dans la base de données :",
            error
          );
        }
      });
    },

    getCurrentDayOfWeek() {
      const currentDate = new Date();
      return this.daysOfWeek[currentDate.getDay() - 1];
    },

    clearSchedule(day) {
      // Effacer les données du jour spécifié
      return new Promise(async (resolve, reject) => {
        try {
          const q = query(
            collection(db, "proprietaire"),
            where("stadiumName", "==", this.nomStade)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const stadeDocRef = doc.ref;
            try {
              updateDoc(stadeDocRef, {
                [`emploiDuTemps1.${day}`]: { ...this.initializeScheduleDay() },
              });
              console.log(`Données de l'emploi du temps pour ${day} effacées.`);
              resolve();
            } catch (error) {
              console.error(
                "Erreur lors de l'effacement des données du jour :",
                error
              );
              reject(error);
            }
          });
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des données du stade :",
            error
          );
          reject(error);
        }
      });
    },
    initializeScheduleDay() {
      // Initialise les données de l'emploi du temps pour une journée
      return {
        "16:00 - 17:00": "vide",
        "17:00 - 18:00": "vide",
        "18:00 - 19:00": "vide",
        "19:00 - 20:00": "vide",
        "20:00 - 21:00": "vide",
        "21:00 - 22:00": "vide",
        "22:00 - 23:00": "vide",
        "23:00 - 00:00": "vide",
      };
    },
  },
};
</script>