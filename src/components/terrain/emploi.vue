<template>
  <div class="emploi-du-temps-container">
    <div class="bodyy">
      <h1>Emploi</h1>
      <div class="emploi">
        <table>
          <thead>
            <tr>
              <th>Jour</th>
              <th v-for="timeSlot in timeSlots" :key="timeSlot">{{ timeSlot }}</th>
              <th>Action</th> <!-- Ajout du titre de la colonne pour l'action -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="day in daysOfWeek" :key="day">
              <td>{{ formatDate(getDateForDay(day)) }}</td>
              <template v-if="emploiDuTemps1[day]">
                <td v-for="timeSlot in timeSlots" :key="timeSlot" class="ptab" :class="getStateClass(day, timeSlot)"
                  @click="reserver(day, timeSlot)">
                  {{ emploiDuTemps1[day][timeSlot] }}
                </td>
              </template>
              <template v-else>
                <td colspan="8">Aucune donnée d'emploi du temps disponible pour ce jour.</td>
              </template>
              <td>
                <button @click="toggleReservation(day)">{{ emploiDuTemps1[day] &&
                  Object.values(emploiDuTemps1[day]).every(slot =>
                    slot === 'Desactivé') ? 'Activer réservation' : 'Désactiver réservation' }}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div><br><br><br><br>
    </div>
  </div>
</template>

<style scoped>
.emploi {
  display: flex;
  overflow-x: auto;
  background: #00646941;
}

td {
  color: #fff
}

h1 {
  color: #00edfa;
  text-align: center;
  font-family: 'poppins';
  position: relative;
}

.bodyy {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  background-image: url('../../assets/back (9).jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}

.reserve {
  background-color: rgb(3, 180, 24);
  font-size: 1.3rem;
  font-weight: bold;

}

.vide {
  color: black;
  font-weight: bold;
  background-color: #ffffff;
  font-size: 1.2rem
}

.Desactivé {
  background-color: rgb(212, 3, 3);
  font-size: 1.3rem;
  font-weight: bold;
}

.en-attente {
  background-color: rgb(3, 96, 202);
  font-size: 1.3rem;
  font-weight: bold;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* Ajout de cette ligne */
}

th,
td {
  border: 1px solid #ddd;
  text-align: center;
  padding: 10px;
  width: 10%;
  /* Exemple de largeur fixe */
}

th {
  background-color: #f9f9f9;
}

button {
  padding: 12px 24px;
  background-color: #007E85;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 10px;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

button span {
  vertical-align: middle;
}

.ptab {
  cursor: pointer;
  padding: 20px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media only screen and (max-width: 600px) {

  h1::before,
  h1::after {
    width: 25%;
  }

  .kk {
    padding: 10px;
  }
}
</style>


<script>
import { db, auth } from "../../firebase/firebase";
import { collection, getDocs, query, where, updateDoc, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2'

export default {
  name: "EmploiDuTemps1",
  data() {
    return {
      emploiDuTemps1: {},
      email: '',
      equipe: '',
      daysOfWeek: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
      timeSlots: ['16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00', '21:00 - 22:00', '22:00 - 23:00', '23:00 - 00:00'],
      user: null,
      unsubscribe: null,
      usertype: null,
      verifie: null
    };
  }, computed: {
    userDetails() {
      return this.$store.state.userDetails;
    },
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
    this.email = this.userDetails?.email ?? '';
    this.stade = this.userDetails?.displayName ?? '';
    this.getEmploiDuTemps();
  },
  methods: {
    getStateClass(day, timeSlot) {
      const state = this.emploiDuTemps1[day][timeSlot];
      if (state === 'vide') {
        return 'vide';
      }
      else if (state === 'Desactivé') {
        return 'Desactivé';
      }
      else if (state.endsWith('(en attente)')) {
        return 'en-attente';
      }
      else {
        return 'reserve';
      }
    },
    async getEmploiDuTemps() {
      const usersRef = collection(db, 'proprietaire');
      const q = query(usersRef, where("email", "==", this.email));
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
          this.emploiDuTemps1 = doc.data().emploiDuTemps1;
        });
      } catch (error) {
        console.error('Error getting emploi du temps:', error);
      }
    },
    async toggleReservation(day) {
      if (this.emploiDuTemps1[day] && Object.values(this.emploiDuTemps1[day]).every(slot => slot === 'Desactivé')) {
        await this.enableReservation(day);
      } else {
        await this.disableReservation(day);
      }
    },
    async enableReservation(day) {
      const confirmation = await Swal.fire({
        title: 'activer la réservation pour ce jour ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Activer',
        cancelButtonText: 'Annuler',
      });

      if (confirmation.isConfirmed) {
        try {
          const q = query(collection(db, 'proprietaire'), where("email", "==", this.email));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(doc => {
            const stadeDocRef = doc.ref;
            try {
              updateDoc(stadeDocRef, {
                [`emploiDuTemps1.${day}`]: Object.fromEntries(this.timeSlots.map(slot => [slot, 'vide']))
              });

              this.emploiDuTemps1[day] = Object.fromEntries(this.timeSlots.map(slot => [slot, 'vide']));
              console.log(`Journée ${day} activée pour la réservation.`);
              Swal.fire('Réservation activée pour cette journée !', '', 'success');
            } catch (error) {
              console.error("Erreur lors de l'activation de la réservation pour la journée:", error);
              Swal.fire('Erreur', "Une erreur s'est produite lors de l'activation de la réservation pour la journée.", 'error');
            }
          });
        } catch (error) {
          console.error('Erreur lors de l\'activation de la réservation pour la journée:', error);
          Swal.fire('Erreur', "Une erreur s'est produite lors de l'activation de la réservation pour la journée.", 'error');
        }
      }
    },
    async disableReservation(day) {
      const confirmation = await Swal.fire({
        title: 'Désactiver la réservation pour ce jour ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Désactiver',
        cancelButtonText: 'Annuler',
      });
      if (confirmation.isConfirmed) {
        try {
          const q = query(collection(db, 'proprietaire'), where("email", "==", this.email));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(doc => {
            const stadeDocRef = doc.ref;
            try {
              updateDoc(stadeDocRef, {
                [`emploiDuTemps1.${day}`]: Object.fromEntries(this.timeSlots.map(slot => [slot, 'Desactivé']))
              });
              this.emploiDuTemps1[day] = Object.fromEntries(this.timeSlots.map(slot => [slot, 'Desactivé']));
              console.log(`Journée ${day} désactivée pour la réservation.`);
              Swal.fire('Réservation désactivée pour cette journée !', '', 'success');
            } catch (error) {
              console.error("Erreur lors de la désactivation de la réservation pour la journée:", error);
              Swal.fire('Erreur', "Une erreur s'est produite lors de la désactivation de la réservation pour la journée.", 'error');
            }
          });
        } catch (error) {
          console.error('Erreur lors de la désactivation de la réservation pour la journée:', error);
          Swal.fire('Erreur', "Une erreur s'est produite lors de la désactivation de la réservation pour la journée.", 'error');
        }
      }
    },
    getDateForDay(day) {
      const today = new Date();
      const nextSevenDays = [0, 1, 2, 3, 4, 5, 6].map(offset => {
        const date = new Date(today);
        date.setDate(today.getDate() + offset);
        return date;
      });
      const dayIndex = this.daysOfWeek.indexOf(day);
      const targetDate = nextSevenDays[dayIndex];
      return targetDate;
    },
    formatDate(date) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('fr-FR', options);
    },
    async reserver(day, timeSlot) {
      if (this.emploiDuTemps1[day] && this.emploiDuTemps1[day][timeSlot] === 'Desactivé') {
        const activationConfirmation = await Swal.fire({
          title: "créneau désactivé",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: "activer",
          cancelButtonText: "annuler",
          reverseButtons: false
        });

        if (activationConfirmation.isConfirmed) {
          try {
            const q = query(collection(db, 'proprietaire'), where("email", "==", this.email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(doc => {
              const stadeDocRef = doc.ref;
              try {
                updateDoc(stadeDocRef, {
                  [`emploiDuTemps1.${day}.${timeSlot}`]: 'vide'
                });
                this.emploiDuTemps1[day][timeSlot] = 'vide';
              } catch (error) {
                console.error("Erreur lors de l'activation de la réservation:", error);
                Swal.fire('Erreur', "Une erreur s'est produite lors de l'activation de la réservation.", 'error');
              }
            });
          } catch (error) {
            console.error('Erreur lors de l\'activation de la réservation:', error);
            Swal.fire('Erreur', "Une erreur s'est produite lors de l'activation de la réservation.", 'error');
          }
        }
        return;
      }
      if (this.emploiDuTemps1[day] && this.emploiDuTemps1[day][timeSlot].endsWith("(en attente)")) {
        const reservationPart = this.emploiDuTemps1[day][timeSlot].substring(0, this.emploiDuTemps1[day][timeSlot].indexOf("(en attente)")).trim();
        await this.fetchEquipeByNom(reservationPart);
        if (this.equipe) {
          const changeConfirmation = await Swal.fire({
            html: `
                <h2>${this.equipe.nomEquipe}</h2>
                Nom de responsable:<strong>${this.equipe.nomCapitaine}</strong><br>
                Numero de telephone:<strong>${this.equipe.telephone}</strong><br>
                Ville d'equipe:<strong>${this.equipe.ville}</strong><br>`,
            title: "Accepte cette reservation ?",
            icon: 'question',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Accepte",
            denyButtonText: "Supprime",
          });
          if (changeConfirmation.isConfirmed) {
            try {
              const q = query(collection(db, 'proprietaire'), where("email", "==", this.email));
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach(doc => {
                const stadeDocRef = doc.ref;
                try {
                  updateDoc(stadeDocRef, {
                    [`emploiDuTemps1.${day}.${timeSlot}`]: this.emploiDuTemps1[day][timeSlot].replace("(en attente)", "").trim()
                  });
                  this.emploiDuTemps1[day][timeSlot] = this.emploiDuTemps1[day][timeSlot].replace("(en attente)", "").trim();
                  Swal.fire('Réservation acceptée', '', 'success');
                  return;
                } catch (error) {
                  console.error("Erreur lors de l'acceptation de la réservation:", error);
                  Swal.fire('Erreur', "Une erreur s'est produite lors de l'acceptation de la réservation.", 'error');
                }
              });
            } catch (error) {
              console.error('Erreur lors de l\'acceptation de la réservation:', error);
              Swal.fire('Erreur', "Une erreur s'est produite lors de l'acceptation de la réservation.", 'error');
            }
          } else if (changeConfirmation.isDenied) {
            try {
              const q = query(collection(db, 'proprietaire'), where("email", "==", this.email));
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach(doc => {
                const stadeDocRef = doc.ref;
                try {
                  updateDoc(stadeDocRef, {
                    [`emploiDuTemps1.${day}.${timeSlot}`]: 'vide'
                  });
                  this.emploiDuTemps1[day][timeSlot] = 'vide';
                  Swal.fire('Réservation supprimée', '', 'success');
                  return;
                } catch (error) {
                  console.error("Erreur lors de la suppression de la réservation:", error);
                  Swal.fire('Erreur', "Une erreur s'est produite lors de la suppression de la réservation.", 'error');
                }
              });
            } catch (error) {
              console.error('Erreur lors de la suppression de la réservation:', error);
              Swal.fire('Erreur', "Une erreur s'est produite lors de la suppression de la réservation.", 'error');
            }
          }
        } else {
          const changeConfirmation = await Swal.fire({
            title: "Accepte cette reservation ?",
            icon: 'question',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Accepte",
            denyButtonText: "Supprime",
          });
          if (changeConfirmation.isConfirmed) {
            try {
              const q = query(collection(db, 'proprietaire'), where("email", "==", this.email));
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach(doc => {
                const stadeDocRef = doc.ref;
                try {
                  updateDoc(stadeDocRef, {
                    [`emploiDuTemps1.${day}.${timeSlot}`]: this.emploiDuTemps1[day][timeSlot].replace("(en attente)", "").trim()
                  });
                  this.emploiDuTemps1[day][timeSlot] = this.emploiDuTemps1[day][timeSlot].replace("(en attente)", "").trim();
                  Swal.fire('Réservation acceptée', '', 'success');
                  return;
                } catch (error) {
                  console.error("Erreur lors de l'acceptation de la réservation:", error);
                  Swal.fire('Erreur', "Une erreur s'est produite lors de l'acceptation de la réservation.", 'error');
                }
              });
            } catch (error) {
              console.error('Erreur lors de l\'acceptation de la réservation:', error);
              Swal.fire('Erreur', "Une erreur s'est produite lors de l'acceptation de la réservation.", 'error');
            }
          } else if (changeConfirmation.isDenied) {
            try {
              const q = query(collection(db, 'proprietaire'), where("email", "==", this.email));
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach(doc => {
                const stadeDocRef = doc.ref;
                try {
                  updateDoc(stadeDocRef, {
                    [`emploiDuTemps1.${day}.${timeSlot}`]: 'vide'
                  });
                  this.emploiDuTemps1[day][timeSlot] = 'vide';
                  Swal.fire('Réservation supprimée', '', 'success');
                  return;
                } catch (error) {
                  console.error("Erreur lors de la suppression de la réservation:", error);
                  Swal.fire('Erreur', "Une erreur s'est produite lors de la suppression de la réservation.", 'error');
                }
              });
            } catch (error) {
              console.error('Erreur lors de la suppression de la réservation:', error);
              Swal.fire('Erreur', "Une erreur s'est produite lors de la suppression de la réservation.", 'error');
            }
          }
        }
      } else if (this.emploiDuTemps1[day] && this.emploiDuTemps1[day][timeSlot] !== 'vide') {
        await this.fetchEquipeByNom(this.emploiDuTemps1[day][timeSlot]);
        if (this.equipe) {
          const changeConfirmation = await Swal.fire({
            title: "Créneau réservé par",
            html: `
                <h2>${this.equipe.nomEquipe}</h2>
                Nom de responsable:<strong>${this.equipe.nomCapitaine}</strong><br>
                Numero de telephone:<strong>${this.equipe.telephone}</strong><br>
                Ville d'equipe:<strong>${this.equipe.ville}</strong><br>`,
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: "Annuler",
            denyButtonText: "Supprimer",
            reverseButtons: true
          });

          if (!changeConfirmation.isConfirmed && !changeConfirmation.isDenied) {
            return;
          } else if (changeConfirmation.isDenied) {
            try {
              const q = query(collection(db, 'proprietaire'), where("email", "==", this.email));
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach(doc => {
                const stadeDocRef = doc.ref;
                try {
                  updateDoc(stadeDocRef, {
                    [`emploiDuTemps1.${day}.${timeSlot}`]: 'vide'
                  });
                  this.emploiDuTemps1[day][timeSlot] = 'vide';
                  Swal.fire('Réservation supprimée avec succès !', '', 'success');
                  return;
                } catch (error) {
                  console.error("Erreur lors de la suppression de la réservation:", error);
                  Swal.fire('Erreur', "Une erreur s'est produite lors de la suppression de la réservation.", 'error');
                }
              });
            } catch (error) {
              console.error('Erreur lors de la suppression de la réservation:', error);
              Swal.fire('Erreur', "Une erreur s'est produite lors de la suppression de la réservation.", 'error');
            }
          }
        } else {
          const changeConfirmation = await Swal.fire({
            title: `Créneau réservé par vous sous le nom de  ${this.emploiDuTemps1[day][timeSlot]}`,
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: "Annuler",
            denyButtonText: "Supprimer",
            reverseButtons: true
          });

          if (!changeConfirmation.isConfirmed && !changeConfirmation.isDenied) {
            return;
          } else if (changeConfirmation.isDenied) {
            try {
              const q = query(collection(db, 'proprietaire'), where("email", "==", this.email));
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach(doc => {
                const stadeDocRef = doc.ref;
                try {
                  updateDoc(stadeDocRef, {
                    [`emploiDuTemps1.${day}.${timeSlot}`]: 'vide'
                  });
                  this.emploiDuTemps1[day][timeSlot] = 'vide';
                  Swal.fire('Réservation supprimée avec succès !', '', 'success');
                  return;
                } catch (error) {
                  console.error("Erreur lors de la suppression de la réservation:", error);
                  Swal.fire('Erreur', "Une erreur s'est produite lors de la suppression de la réservation.", 'error');
                }
              });
            } catch (error) {
              console.error('Erreur lors de la suppression de la réservation:', error);
              Swal.fire('Erreur', "Une erreur s'est produite lors de la suppression de la réservation.", 'error');
            }
          }
        }
      } else {
        const confirmation = await Swal.fire({
          title: "Réserver ce créneau ?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Réserver",
          denyButtonText: `Désactiver la réservation`
        });

        if (confirmation.isConfirmed) {
          const { value: equipe } = await Swal.fire({
            title: "Reservation",
            input: "text",
            inputLabel: "Entrez le nom de l'équipe qui va réserver ce créneau",
            inputPlaceholder: "Entrez le nom de l'équipe"
          });

          if (equipe) {
            try {
              var currentDate = new Date();
              if (day === 'lundi') {
                currentDate.setDate(currentDate.getDate());
              } else if (day === 'mardi') {
                currentDate.setDate(currentDate.getDate() + 1);
              } else if (day === 'mercredi') {
                currentDate.setDate(currentDate.getDate() + 2);
              } else if (day === 'jeudi') {
                currentDate.setDate(currentDate.getDate() + 3);
              } else if (day === 'vendredi') {
                currentDate.setDate(currentDate.getDate() + 4);
              } else if (day === 'samedi') {
                currentDate.setDate(currentDate.getDate() + 5);
              } else {
                currentDate.setDate(currentDate.getDate() + 6);
              }
              const reservationData = {
                dateReservation: new Date(), // Date actuelle
                equipe: equipe,
                timeSlot: currentDate.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ' ' + timeSlot,
                nomStade: this.stade,
                etat: 'accepté'
              };
              const q = query(collection(db, 'proprietaire'), where("email", "==", this.email));
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach(doc => {
                const stadeDocRef = doc.ref;
                try {
                  updateDoc(stadeDocRef, {
                    [`emploiDuTemps1.${day}.${timeSlot}`]: `${equipe}`
                  });
                  this.emploiDuTemps1[day][timeSlot] = `${equipe}`;
                  Swal.fire(`Créneau horaire ${timeSlot} du jour ${day} réservé pour l'équipe ${equipe} !`, '', 'success');
                } catch (error) {
                  Swal.fire('Erreur', "Une erreur s'est produite lors de la réservation.", 'error');
                }
              });
              const historiqueRef = collection(db, 'historiquedereservation');
              addDoc(historiqueRef, reservationData);
            } catch (error) {
              console.error('Erreur lors de la réservation:', error);
              Swal.fire('Erreur', "Une erreur s'est produite lors de la réservation.", 'error');
            }
          }
        } else if (confirmation.isDenied) {
          try {
            const q = query(collection(db, 'proprietaire'), where("email", "==", this.email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(doc => {
              const stadeDocRef = doc.ref;
              try {
                updateDoc(stadeDocRef, {
                  [`emploiDuTemps1.${day}.${timeSlot}`]: 'Desactivé'
                });
                this.emploiDuTemps1[day][timeSlot] = 'Desactivé';
              } catch (error) {
                console.error("Erreur lors de la désactivation de la réservation:", error);
                Swal.fire('Erreur', "Une erreur s'est produite lors de la désactivation de la réservation.", 'error');
              }
            });
          } catch (error) {
            console.error('Erreur lors de la désactivation de la réservation:', error);
            Swal.fire('Erreur', "Une erreur s'est produite lors de la désactivation de la réservation.", 'error');
          }
        }
      }
    },
    async fetchEquipeByNom(nom) {
      try {
        this.equipe = null; // Réinitialisation de this.equipe
        const q = query(collection(db, "equipes"), where("nomEquipe", "==", nom));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async doc => {
          this.equipe = doc.data();
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'équipe:", error);
      }
    }
  }
}
</script>
