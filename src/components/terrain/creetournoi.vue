<template>
  <div class="bodyy">
    <div><br>
      <h3>Creer Tournoi</h3>
      <form @submit.prevent="enregistrerTournoi" class="container">
        <div class="div1">
          <label for="nom_tournoi">Nom du tournoi :</label>
          <input type="text" v-model="nom_tournoi" required><br>

          <label for="date_debut">Date de début du tournoi :</label>
          <input type="date" v-model="date_debut" required><br>

          <label for="heure_debut">Heure de début du tournoi :</label>
          <input type="time" v-model="heure_debut" required><br>

          <label for="date_fin">Date de fin du tournoi :</label><br>
          <input type="date" v-model="date_fin" required><br><br>

          <label for="categorie">Catégorie du tournoi :</label><br>
          <select v-model="categorie" required>
            <option value="amateur">Amateur</option>
            <option value="professionnel">Professionnel</option>
            <option value="mixte">Mixte</option>
          </select><br>

          <label for="description">Description du tournoi :</label><br>
          <textarea v-model="description" rows="4" cols="50" required></textarea>
          <label for="frais_inscription">Frais d'inscription par équipe :</label>
          <input type="number" v-model="frais_inscription" required>
        </div>
        <div class="div2">
          <label for="nb_equipes_max">Nombre d'équipes maximum autorisées :</label>
          <input type="number" v-model="nb_equipes_max" required>

          <label for="nom_tournoi">Recompense de tournoi :</label><br>
          <textarea v-model="recompense" rows="4" cols="50" required></textarea><br>

          <label for="conditions_speciales">Conditions spéciales :</label><br>
          <textarea v-model="conditions_speciales" rows="4" cols="50"></textarea>

          <label for="image">Image du tournoi :</label><br>
          <input type="file" ref="myfiles" accept=".png,.jpg">

          <input type="submit" value="Créer Tournoi">
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.div1 {
  flex: 1;
  background-color: #007e8585;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.div2 {
  flex: 1;
  background-color: #007e8583;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

h3 {
  color: #02f2ff;
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
}

label {
  font-weight: bold;
  color: #ffffff;
  /* Changer la couleur du texte du label */
}

input[type="password"],
input[type="text"],
input[type="tel"],
input[type="number"],
input[type="file"],
input[type="time"],
input[type="date"],
select,
textarea {
  width: 100%;
  padding: 12px;
  /* Ajuster la taille du padding */
  margin-bottom: 20px;
  /* Augmenter l'espacement entre les champs */
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="submit"] {
  width: 100%;
  background-color: #5f8fc3;
  color: #fff;
  padding: 15px;
  /* Ajuster la taille du padding */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  /* Augmenter la taille de la police */
}

input[type="submit"]:hover {
  background-color: #0056b3;
}

/* Responsive pour les écrans jusqu'à 380px de large */
@media only screen and (max-width: 680px) {
  .container {
    display: flex;
    flex-direction: column;
  }

  h3 {
    font-size: 18px;
    /* Ajustement de la taille de la police */
    margin-bottom: 10px;
    /* Ajustement de l'espacement en bas */
  }

  /* Ajustement de la largeur des lignes décoratives du titre */
  h3::before,
  h3::after {
    width: 20%;
    /* Ajustement de la largeur */
  }

  /* Ajustement de la taille des champs de saisie */
  input[type="text"],
  input[type="date"],
  input[type="time"],
  input[type="number"],
  select,
  textarea {
    width: 100%;
    /* Ajuster la largeur à 100% */
    padding: 10px;
    /* Ajuster la taille du padding */
    margin-bottom: 10px;
    /* Ajuster l'espacement entre les champs */
  }

  /* Ajustement de la taille du bouton de soumission */
  input[type="submit"] {
    width: 100%;
    padding: 15px;
    /* Ajuster la taille du padding */
    font-size: 16px;
    /* Ajuster la taille de la police */
  }
}
</style>

<script>
import { storage, db, auth } from "../../firebase/firebase";
import { collection, addDoc, where, query, getDocs } from 'firebase/firestore'; // Import firestore functions for querying
import { ref, uploadBytes } from "firebase/storage";
import Swal from 'sweetalert2'

export default {
  name: 'CreationTournoi',
  data() {
    return {
      nom_tournoi: '',
      date_debut: '',
      heure_debut: '',
      date_fin: '',
      heure_fin: '',
      categorie: '',
      description: '',
      recompense: '',
      frais_inscription: '',
      nb_equipes_max: '',
      conditions_speciales: '',
      email: '',
      numberOfFiles: 0,
      equipes: [],
      images: [],
      userInfo: {}, // Ajoutez cette ligne
      nomstade: '',
      ville: '',
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
        else if (user.photoURL !== 'proprietaire') { this.$router.push('/'); resolve(); }
        else if (!user.emailVerified) { Swal.fire('Valider votre email pour accede a cette page'); this.$router.push('/vericationemail'); resolve(); }
        else { this.user = user; resolve(); }
      });
    });
    this.email = this.userDetails?.email ?? '';
    await this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      const usersRef = collection(db, 'proprietaire');
      const q = query(usersRef, where("email", "==", this.email));
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.userInfo = { ...doc.data(), id: doc.id };
          this.nomstade = this.userInfo.stadiumName;
          this.ville = this.userInfo.ville
        });
      } catch (error) {
        console.error('Error getting user info:', error);
      }
    },

    async enregistrerTournoi() {
      await this.getUserInfo();
      Swal.fire({
        title: "Cree le tournoi ?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "OUI",
        denyButtonText: `Non`
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            const files = this.$refs.myfiles.files;
            const tournoiRef = addDoc(collection(db, "tournois"), {
              nom_tournoi: this.nom_tournoi,
              date_debut: this.date_debut,
              heure_debut: this.heure_debut,
              date_fin: this.date_fin,
              heure_fin: this.heure_fin,
              categorie: this.categorie,
              description: this.description,
              frais_inscription: this.frais_inscription,
              nb_equipes_max: this.nb_equipes_max,
              conditions_speciales: this.conditions_speciales,
              email: this.email,
              recompense: this.recompense,
              nomstade: this.nomstade,
              equipes: this.equipes,
              ville: this.ville
            });

            const imagesRef1 = ref(storage, `tournois/${this.nomstade}/${this.nom_tournoi}`);
            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              const storageRef = ref(imagesRef1, `image${this.numberOfFiles + i + 1}.png`);
              uploadBytes(storageRef, file);
            }
            console.log("Tournoi enregistré!", tournoiRef.id);
            this.$router.push('/MesTournois');
            // Redirection or other actions after saving
          } catch (error) {
            console.error("Erreur lors de l'enregistrement du tournoi : ", error);
          }
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Tournois non creé", "", "info");
        }
      });

    },


  }
}
</script>
