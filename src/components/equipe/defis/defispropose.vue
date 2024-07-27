<template>
  <div class="bodyy">
    <div class="links">
      <div class="link"><router-link to="/defispropose">Défis proposés</router-link></div>
      <div class="link"><router-link to="/defiscree">Défis créés</router-link></div>
      <div class="link"><router-link to="/defierEquipe">Défier une équipe</router-link></div>
    </div>
    <div class="container">
      <h2 class="">Défis Proposés</h2>
      <center><br><br>
        <p v-if="defis2.length === 0" class="defisp">Vous n'avez pas de défis pour le moment.</p>
      </center>
      <div :class="{ 'defi-list': true, 'single-item': defis2.length === 1 }">
        <div v-for="(defi, index) in defis2" :key="index" class="defi-item">
          <div>
            <div class="defi-header">
              <p class="class"><strong class="equipe-name">{{ defi.equipe1 }}</strong> Vous ont défié pour un match à :
              </p>
              <h4>
                Stade: <strong class="match-details">{{ defi.stade }}</strong><br>
                Ville: <strong class="match-details">{{ defi.ville }}</strong><br>
                Date: <strong class="match-details">{{ defi.dateMatch }}</strong><br>
                Heure: <strong class="match-details">{{ defi.heureMatch }}</strong>
              </h4>
            </div>
            <div class="defi-body">
              <p class="message"><strong>Message :</strong> {{ defi.message }}</p>
              <p class="etat"><strong>État :</strong> {{ defi.etat }}</p><br>
              <p v-if="defi.etat == 'annulé'" class="class" style="color: rgb(158, 4, 4);">Créneau non disponible</p>
              <div v-if="defi.etat === 'en attent' && !isChallengeActive(defi)" class="defi-actions">
                <button @click="accepterDefi(defi.id)" class="accepte">Accepter</button>
                <button @click="refuserDefi(defi.id)" class="refuse">Refuser</button>
              </div>
              <p v-if="defi.etat === 'en attent' && isChallengeActive(defi)" class="challenge-past-message">La période
                pour accepter le défi est passée.</p>
              <div v-if="defi.etat == 'accepté'">
                <p class="acceptation">Vous avez accepté le défi de <strong class="equipe-name">{{ defi.equipe1
                    }}</strong> et le match est bien réservé.</p>
              </div>
              <div v-if="defi.etat == 'refusé'">
                <p class="acceptation">Vous avez refusé le défi.</p>
              </div>
              <center><button @click="supprimerDefi(defi.id)" class="supprimer">Supprimer</button></center>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db, auth } from "../../../firebase/firebase";
import { query, collection, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      storedEmail: '',
      equipe: '',
      defis2: [],
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
    await this.fetchDefis2();
  },
  methods: {
    isChallengeActive(defi) {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      const creationDate = defi.dateCreation.toDate();
      creationDate.setHours(0, 0, 0, 0);
      return currentDate < creationDate || currentDate > creationDate;
    },
    async accepterDefi(defiId) {
      Swal.fire({
        title: "Accepter le défi ?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Accepter",
        denyButtonText: ""
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const defiRef = doc(db, "defis", defiId);
            await updateDoc(defiRef, {
              etat: "accepté"
            });

            // Mettre à jour l'état dans la liste locale
            const index = this.defis2.findIndex(defi => defi.id === defiId);
            if (index !== -1) {
              this.defis2[index].etat = "accepté";
            }

            // Récupérer le défi correspondant à defiId
            const defi = this.defis2.find(defi => defi.id === defiId);
            if (defi) {
              const q = query(collection(db, 'proprietaire'), where("stadiumName", "==", defi.stade));
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach(async doc => {
                const stadeDocRef = doc.ref;
                try {
                  // Vérifier si le créneau est vide ou non avant de le réserver
                  const emploiDuTemps = doc.data().emploiDuTemps1[this.week[defi.index]][defi.heureMatch];
                  if (emploiDuTemps === 'vide') {
                    // Réserver le créneau
                    await updateDoc(stadeDocRef, {
                      [`emploiDuTemps1.${this.week[defi.index]}.${defi.heureMatch}`]: `Defi:${defi.equipe1} vs ${defi.equipe2} (en attente)`
                    });
                  } else {
                    // Créneau non disponible, mettre à jour l'état du défi en "annulé"
                    await updateDoc(defiRef, {
                      etat: "annulé"
                    });
                    // Mettre à jour l'état dans la liste locale
                    this.defis2[index].etat = "annulé";
                    console.log('Créneau non disponible');
                    Swal.fire("Créneau non disponible", "", "error");
                  }
                } catch (error) {
                  console.error('Erreur lors de la réservation du créneau horaire:', error);
                }
              });
            }
          } catch (error) {
            console.error("Erreur lors de l'acceptation du défi : ", error);
          }
          Swal.fire("Défi accepté!", "", "success");
        }
      });
    }



    ,
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
    async fetchDefis2() {
      try {
        const q = query(collection(db, "defis"), where("equipe2", "==", this.equipe.nomEquipe));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
          this.defis2.push({ ...doc.data(), id: doc.id }); // Ajouter l'ID du document
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des défis : ", error);
      }
    },
    async refuserDefi(defiId) {
      Swal.fire({
        title: "Êtes-vous sûr de vouloir refuser ce défi ?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Refuser",
        denyButtonText: `Annuler`
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const defiRef = doc(db, "defis", defiId);
            await updateDoc(defiRef, {
              etat: "refusé"
            });
            // Mettre à jour l'état dans la liste locale des défis où votre équipe est l'équipe 2
            const index = this.defis2.findIndex(defi => defi.id === defiId);
            if (index !== -1) {
              this.defis2[index].etat = "refusé";
            }
          } catch (error) {
            console.error("Erreur lors du refus du défi : ", error);
          }
          Swal.fire("Défi refusé!", "", "info");
        }
      });
    },
    async supprimerDefi(defiId) {
      Swal.fire({
        title: "Êtes-vous sûr de vouloir supprimer ce défi ?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Supprimer",
        denyButtonText: `Annuler`
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const defiRef = doc(db, "defis", defiId);
            await deleteDoc(defiRef);
            // Mettre à jour la liste locale pour supprimer le défi
            this.defis2 = this.defis2.filter(defi => defi.id !== defiId);
            Swal.fire("Défi supprimé!", "", "success");
          } catch (error) {
            console.error("Erreur lors de la suppression du défi : ", error);
            Swal.fire("Erreur lors de la suppression du défi", "", "error");
          }
        }
      });
    }
  }
}
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  router-link {
    padding: 8px;
  }
}

h2 {
  color: #00c7d1;
  text-align: center;
  font-family: 'Poppins';
  position: relative;
}

.bodyy {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  background-image: url('../../../assets/back (9).jpg');
  background-size: cover;
  background-position: center;
  padding: 20px;
  min-height: 100vh;
}

.acceptation {
  font-size: 1.5rem;
}

.container {
  max-width: 1200px;
  /* Adjusted max-width for larger containers */
  margin: 0 auto;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  padding: 8px 16px;
  font-size: 1.5rem;
}

.defi-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  list-style: none;
  padding: 0;
  justify-content: center;
}

.defi-item {
  background-color: #007E85;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex: 0 1 calc(33.333% - 20px);
}

.defi-header {
  margin-bottom: 10px;
}

.class {
  font-size: 1.35rem;
  font-weight: bold;
}

.equipe-name {
  font-size: 1.4rem;
  margin: 0;
  color: #ffd001;
}

.match-details {
  font-size: 1.25rem;
  color: #ffffff;
  margin: 5px 0 0;
}

.defisp {
  font-size: 1.5rem;
  color: white;
}

.message {
  margin: 0 0 10px;
  font-size: 1.25rem;
}

.etat {
  margin: 0;
  font-size: 1.25rem;
}

.defi-actions {
  display: flex;
  justify-content: center;
}

.btn {
  background-color: #f30808;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.refuse {
  background-color: #797878;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}

.accepte {
  background-color: #07c721;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.supprimer {
  background-color: #c40909;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;
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

@media only screen and (max-width: 380px) {
  .kk {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
  }

  .link {
    font-size: 1rem;
    padding: 8px;
  }
}

@media only screen and (max-width: 600px) {
  .defi-item {
    flex: 0 1 calc(100% - 20px);
  }
}

@media only screen and (min-width: 601px) and (max-width: 900px) {
  .defi-item {
    flex: 0 1 calc(50% - 20px);
  }
}
</style>