<template>
  <div class="bodyy">
    <h1>Inscription</h1>
    <div v-if="page === 'page1'" class="page1">
      <form @submit.prevent="createUser()">
        <legend>Responsable de terrain</legend>
        <div class="input-row">
          <div class="input-group2">
            <label for="name" required>Ecrire votre nom</label><br>
            <div class="input-group3">
              <input type="text" v-model="nom" class="form-control" required placeholder="Nom">
              <input type="text" v-model="prenom" class="form-control" required placeholder="Prenom">
            </div>
          </div>
          <div class="input-group">
            <label for="email" required>Ecrire votre email</label><br>
            <input type="email" id="email" v-model="email" required placeholder="email"><br>
          </div>
        </div><br>
        <div class="input-row">
          <div class="input-group">
            <label for="password" required>Ecrire votre mot de passe</label><br>
            <input type="password" id="password" v-model="password" required placeholder="mot de passe"><br>
          </div>
          <div class="input-group">
            <label for="confirmer_mot_de_passe">Confirmer le mot de passe :</label><br>
            <input type="password" id="confirmer_mot_de_passe" v-model="confirmerMotDePasse" required
              placeholder="Confirmer le mot de passe"><br>
            <div v-if="confirmerMotDePasse !== '' && confirmerMotDePasse !== password">Mot de passe de corespoand pas
            </div>
          </div>
        </div><br>
        <div class="input-row2">
          <div class="input-group">
            <label for="telephone" required>Ecrire votre nimero de telephone</label><br>
            <input type="number" id="telephone" v-model="telephone" required placeholder="telephone"><br>
          </div>
        </div>
        <legend>Terrain</legend>
        <div class="input-row">
          <div class="input-group">
            <label for="stadiumName" required>Nom du stade</label><br>
            <input type="text" id="stadiumName" v-model="stadiumName" required placeholder="Nom du stade"><br>
          </div>
          <div class="input-group">
            <label>ville :</label><br>
            <select v-model="ville" required><br>
              <option value="">Choisir votre ville</option>
              <option value="Zarzis">Zarzis</option>
              <option value="Mednine">Mednine</option>
              <option value="Djerbe">Jerba</option>
              <option value="Gabes">Gabes</option>
              <option value="Sfax">Sfax</option>
            </select><br><br>
          </div>
        </div><br>
        <div class="input-row">
          <div class="input-group">
            <label for="reservationPrice" required>Prix de réservation</label><br>
            <input type="number" id="reservationPrice" v-model="reservationPrice" required placeholder="Prix"><br>
          </div>
          <div class="input-group">
            <label for="address" required>Adresse</label>
            <input type="text" id="address" v-model="address" required placeholder="Adresse">
          </div>
        </div><br>
        <div class="input-row">
          <div class="input-group">
            <label for="description" required>Description</label>
            <textarea id="description" v-model="description" required placeholder="Description"></textarea><br>
          </div>
          <div class="input-group">
            <label for="name" required>selectionne les images de stade</label><br>
            <input type="file" ref="myfiles" accept=".png,.jpg" :multiple="true" required placeholder="Nom">
          </div>
        </div><br>
        <div class="input-row">
          <div class="input-group">
            <div class="alert danger-alert" v-if="erreremail">cette email est deja utilisé</div>
            <div class="alert danger-alert" v-if="errernom">cette nom de stade est deja utilisé</div>
          </div>
        </div><br>
        <center><input type="submit" value="VALIDER"></center>
      </form>
    </div>
    <div v-if="page === 'page2'" class="page2">
      <h1>Validation d'email</h1>
      <div>
        <p>Un email a été envoyé à votre adresse email pour valider.</p>
        <p>Veuillez cliquer sur le lien pour valider votre email.</p>
      </div>
      <button @click="envoyereamil()" class="btn btn-info">Renvoyer l'email</button>
      <div>
        <p>Si vous avez validé votre email, cliquez ici:</p><br>
        <center><button @click="verifievalidationAfterReload()" class="btn btn-info">Vérifie</button></center>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, db, auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

export default {
  name: "imageApp",
  data() {
    return {
      erreremail: false,
      errernom: false,
      images: [],
      ville: '',
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      password: '',
      confirmerMotDePasse: '',
      stadiumName: '',
      reservationPrice: null,
      description: '',
      address: '',
      nbvote: 0,
      sovote: 0,
      errorMessage: '',
      usersrating: {},
      page: 'page1',
      emploiDuTemps1: {
        lundi: {
          "16:00 - 17:00": "vide",
          "17:00 - 18:00": "vide",
          "18:00 - 19:00": "vide",
          "19:00 - 20:00": "vide",
          "20:00 - 21:00": "vide",
          "21:00 - 22:00": "vide",
          "22:00 - 23:00": "vide",
          "23:00 - 00:00": "vide",
        },
        mardi: {
          "16:00 - 17:00": "vide",
          "17:00 - 18:00": "vide",
          "18:00 - 19:00": "vide",
          "19:00 - 20:00": "vide",
          "20:00 - 21:00": "vide",
          "21:00 - 22:00": "vide",
          "22:00 - 23:00": "vide",
          "23:00 - 00:00": "vide",
        },
        mercredi: {
          "16:00 - 17:00": "vide",
          "17:00 - 18:00": "vide",
          "18:00 - 19:00": "vide",
          "19:00 - 20:00": "vide",
          "20:00 - 21:00": "vide",
          "21:00 - 22:00": "vide",
          "22:00 - 23:00": "vide",
          "23:00 - 00:00": "vide",
        },
        jeudi: {
          "16:00 - 17:00": "vide",
          "17:00 - 18:00": "vide",
          "18:00 - 19:00": "vide",
          "19:00 - 20:00": "vide",
          "20:00 - 21:00": "vide",
          "21:00 - 22:00": "vide",
          "22:00 - 23:00": "vide",
          "23:00 - 00:00": "vide",
        },
        vendredi: {
          "16:00 - 17:00": "vide",
          "17:00 - 18:00": "vide",
          "18:00 - 19:00": "vide",
          "19:00 - 20:00": "vide",
          "20:00 - 21:00": "vide",
          "21:00 - 22:00": "vide",
          "22:00 - 23:00": "vide",
          "23:00 - 00:00": "vide",
        },
        samedi: {
          "16:00 - 17:00": "vide",
          "17:00 - 18:00": "vide",
          "18:00 - 19:00": "vide",
          "19:00 - 20:00": "vide",
          "20:00 - 21:00": "vide",
          "21:00 - 22:00": "vide",
          "22:00 - 23:00": "vide",
          "23:00 - 00:00": "vide",
        },
        dimanche: {
          "16:00 - 17:00": "vide",
          "17:00 - 18:00": "vide",
          "18:00 - 19:00": "vide",
          "19:00 - 20:00": "vide",
          "20:00 - 21:00": "vide",
          "21:00 - 22:00": "vide",
          "22:00 - 23:00": "vide",
          "23:00 - 00:00": "vide",
        },
      } // Nouvel objet pour stocker l'emploi du temps
    }
  },
  methods: {
    async createUser() {
      console.log('zzzz')
      try {
        const equipeQuerySnapshot = await getDocs(query(collection(db, "proprietaire"), where("stadiumName", "==", this.stadiumName)));
        console.log(equipeQuerySnapshot)
        if (!equipeQuerySnapshot.empty) {
          this.errernom = true
          throw new Error("Le nom d'équipe est déjà utilisé. Veuillez choisir un autre nom d'équipe.");
        }
        const emailQuerySnapshot = await getDocs(query(collection(db, "proprietaire"), where("email", "==", this.email)));
        console.log(emailQuerySnapshot)
        if (!emailQuerySnapshot.empty) {
          this.erreremail = true
          throw new Error("Email already in use. Please choose a different email.");
        }
        console.log('etape1')
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        if (!userCredential) {
          return;
        }
        console.log('etape2')
        const user = userCredential.user; // Access the user object from UserCredential
        await updateProfile(user, {
          displayName: this.stadiumName,
          photoURL: 'proprietaire',
        });
        console.log('etape3')
        await sendEmailVerification(user);

        const fileInput = this.$refs.myfiles;
        if (!fileInput) {
          throw new Error("File input reference is null or undefined.");
        }

        const files = fileInput.files;
        if (!files.length) {
          throw new Error("No files selected.");
        }

        const imagesRef1 = ref(storage, `Stades/${this.stadiumName}/`);
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const fileName = `image_${i + 1}.png`;
          const storageRef = ref(imagesRef1, fileName);
          await uploadBytes(storageRef, file);
        }
        console.log('etape4')
        const colRef = collection(db, 'proprietaire');
        const dataObj = {
          nom: this.nom + ' ' + this.prenom,
          email: this.email,
          password: this.password,
          stadiumName: this.stadiumName,
          reservationPrice: this.reservationPrice,
          description: this.description,
          address: this.address,
          telephone: this.telephone,
          emploiDuTemps1: this.emploiDuTemps1,
          ville: this.ville,
          nbvote: this.nbvote,
          sovote: parseInt(this.sovote),
          usersrating: this.usersrating,
          verifier: false,
        };
        console.log('etape5')
        await addDoc(colRef, dataObj);
        this.page = 'page2';
      } catch (error) {
        console.error("Error during user creation:", error);
      }
    },
    async envoyereamil() {
      try {
        const user = auth.currentUser;
        if (user) {
          await sendEmailVerification(user);
          console.log("L'e-mail de vérification a été renvoyé avec succès.");
        } else {
          console.error("Aucun utilisateur n'est actuellement connecté.");
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail de vérification:", error);
      }
    },
    async verifievalidationAfterReload() {
      try {
        await auth.signOut();
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;
        if (user) {
          await user.reload();
          if (user.emailVerified) {
            const usersRef = collection(db, 'proprietaire');
            const emailQuery = query(usersRef, where('email', '==', user.email));
            const emailSnapshot = await getDocs(emailQuery);
            emailSnapshot.forEach(async (docSnapshot) => {
              const docRef = doc(db, 'proprietaire', docSnapshot.id);
              await updateDoc(docRef, { verifier: true });
            });
            this.$router.push('/');
          } else {
            console.log("L'e-mail de l'utilisateur n'est pas vérifié.");
          }
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'e-mail après reconnexion:", error);
      }
    }
  },
  async envoyereamil() {
    try {
      const user = auth.currentUser; // Récupérer l'utilisateur actuellement connecté
      if (user) {
        // Renvoyer l'e-mail de vérification
        await sendEmailVerification(user);
        console.log("L'e-mail de vérification a été renvoyé avec succès.");
      } else {
        console.error("Aucun utilisateur n'est actuellement connecté.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'e-mail de vérification:", error);
    }
  },
  async verifievalidationAfterReload() {
    try {
      await auth.signOut(); // Déconnecte l'utilisateur
      const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
      const user = userCredential.user;
      if (user) {
        await user.reload(); // Recharge les informations de l'utilisateur pour obtenir la dernière vérification de l'e-mail
        if (user.emailVerified) {
          const usersRef = collection(db, 'proprietaire');
          const emailQuery = query(usersRef, where('email', '==', user.email));
          const emailSnapshot = await getDocs(emailQuery);
          emailSnapshot.forEach(async (docSnapshot) => {
            const docRef = doc(db, 'proprietaire', docSnapshot.id);
            await updateDoc(docRef, { verifier: true });
          });
          this.$router.push('/');
        } else {
          console.log("L'e-mail de l'utilisateur n'est pas vérifié.");
          // Afficher un message à l'utilisateur ou prendre une autre action appropriée
        }
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'e-mail après reconnexion:", error);
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
  font-family: "poppins";
}

.page1 {
  width: 60%;
  background-color: #00686f;
  padding: 30px;
  border-radius: 0.5rem;
}

.page2 {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #00686f;
  width: 35%;
  padding: 20px;
  height: 300px;
}

.btn {
  padding: 10px;
}

label {
  font-size: 1.25rem;
  font-weight: bold;
}

input[type="file"] {
  width: 100%;
  padding: 1rem 2rem;
  cursor: pointer;
  border: 1px dashed rgb(255, 255, 255);
}

input[type='tel'],
input[type="text"],
input[type="email"],
input[type="number"],
input[type="password"],
select {
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid rgba(55, 65, 81, 1);
  outline: 0;
  background-color: rgba(17, 24, 39, 1);
  padding: 0.75rem 1rem;
  color: rgba(243, 244, 246, 1);
}

input:focus {
  border-color: rgba(167, 139, 250);
}

h1 {
  font-size: 3rem;
  color: #01adb6;
  font-weight: 600;
  font-family: "poppins" bold;
}

legend {
  font-size: 2rem;
  color: #01adb6;
  font-weight: 600;
  font-family: "poppins" bold;
}

button[type="submit"],
input[type='submit'] {
  display: block;
  width: 50%;
  background: #007E85;
  padding: 0.75rem;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: .3s;
}

textarea {
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid rgba(55, 65, 81, 1);
  outline: 0;
  background-color: rgba(17, 24, 39, 1);
  padding: 0.75rem 1rem;
  color: rgba(243, 244, 246, 1);
}

textarea:focus {
  border-color: rgba(167, 139, 250);
}

button[type="submit"]:hover,
input[type='submit']:focus {
  background: #00686f;
}

.input-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.input-row2 {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 50%;
}

.input-group {
  flex: 1;
}

.input-group2 {
  flex: 1;
}

.input-group3 {
  display: flex;
  align-items: center;
}

.alert {
  padding: 20px;
  background-color: rgb(247, 129, 145);
  color: red;
}

input::-webkit-input-placeholder {
  color: #afaeae;
}

.bodyy {
  color: white;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('../../assets/back (9).jpg');
  background-size: cover;
  background-position: center;
}

.labelname {
  color: black;
}

@media screen and (max-width: 768px) {
  .input-group {
    flex-basis: 100%;
  }

  .input-row2 {
    width: 100%;
  }

  h1 {
    font-size: 2.5rem;
    margin: 10px 0px;
  }

  legend {
    font-size: 1.5rem;
  }

  .page1 {
    display: flex;
    justify-content: center;
    width: 90%;
    padding: 10px;
    border: none;
    padding: 0;
  }

  form {
    margin-top: 10px;
    width: 90%;
  }
}
</style>