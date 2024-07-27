<template>
  <div class="bodyy">
    <center>
      <h1>Compte</h1>
    </center>
    <div class="container">
      <div class="user-info-container">
        <form @submit.prevent="modifierInformations">
          <div class="user-info">
            <h2>Données personnelles</h2>
            <label for="nom">Nom complet:</label>
            <input type="text" id="nom" v-model="userInfo.nom"><br>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="userInfo.email" disabled class="disabled"><br>
            <label for="telephone">Telephone:</label>
            <input type="number" id="telephone" v-model="userInfo.telephone"><br>
            <h2>Données de stade</h2>
            <label for="stadiumName">Nom du Stade:</label>
            <input type="text" id="stadiumName" v-model="userInfo.stadiumName" disabled class="disabled"><br>
            <label for="adresse">Adresse:</label>
            <input type="text" id="adresse" v-model="userInfo.address"><br>
            <label for="description">Description:</label>
            <textarea id="description" v-model="userInfo.description"></textarea><br>
            <label for="reservationPrice">Prix de réservation:</label>
            <input type="text" id="reservationPrice" v-model="userInfo.reservationPrice"><br>
            <button class="enregistre" type="submit">Enregistrer</button>
          </div>
        </form>
        <button @click="resetPassword" class="mdp"><strong>Modifier mot de passe</strong></button><br>
      </div>
      <div class="images-container">
        <h2>Images de stade</h2>
        <div v-if="images.length === 0" class="no-images-message">Aucune image téléchargée.</div>
        <div v-else class="image-grid">
          <div class="image-item" v-for="(image, index) in images" :key="index">
            <img :src="image.url" alt="Uploaded Image">
            <button @click="deleteImage(image)" class="delete-button">Supprimer</button>
          </div>
        </div>
        <div class="ajouter">
          <h3>Ajouter une nouvelle photo</h3>
          <input type="file" ref="fileInput" @change="selectNewImage">
          <button v-if="newImage" @click="uploadNewImage">Enregistrer Nouvelle Image</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, storage, auth } from "../../firebase/firebase";
import {sendPasswordResetEmail } from 'firebase/auth';
import { ref, listAll, getDownloadURL, deleteObject, uploadBytes } from "firebase/storage";
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2'

export default {
  name: "imageApp",
  data() {
    return {
      images: [],
      email: '',
      userInfo: {},
      newImage: null,
    };
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
    await this.getUploadedImages();
  },
  methods: {
    async getUploadedImages() {
      const imagesRef = ref(storage, `Stades/${this.userInfo.stadiumName}/`);
      try {
        const res = await listAll(imagesRef);
        const promises = res.items.map(item => getDownloadURL(item).then(url => ({ url, name: item.name })));
        this.images = await Promise.all(promises);
      } catch (error) {
        console.error('Error getting uploaded images:', error);
      }
    },
    deleteImage(image) {
      if (this.images.length === 1) {
        Swal.fire({
          title: "Erreur",
          text: "Au moins une image doit être enregistrée.",
          icon: "error"
        });
        return;
      }

      Swal.fire({
        title: "Êtes-vous sûr?",
        text: "Vous ne pourrez pas revenir en arrière!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, supprimez-le!"
      }).then((result) => {
        if (result.isConfirmed) {
          const imageRef = ref(storage, `Stades/${this.userInfo.stadiumName}/` + image.name);
          deleteObject(imageRef)
            .then(() => {
              Swal.fire({
                title: "Supprimé!",
                text: "Votre fichier a été supprimé.",
                icon: "success"
              });
              console.log("Image supprimée avec succès!");
              this.getUploadedImages();
            })
            .catch(error => {
              console.error("Erreur lors de la suppression de l'image:", error);
            });
        }
      });
    },
    async getUserInfo() {
      const usersRef = collection(db, 'proprietaire');
      const q = query(usersRef, where("email", "==", this.email));
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.userInfo = { ...doc.data(), id: doc.id }; // Ajouter l'ID du document
        });
      } catch (error) {
        console.error('Error getting user info:', error);
      }
    },
    async modifierInformations() {
      Swal.fire({
        title: "enregsitré le changement?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Oui",
        denyButtonText: `Non`
      }).then((result) => {
        if (result.isConfirmed) {
          const userRef = doc(db, 'proprietaire', this.userInfo.id); // Utiliser l'ID du document
          updateDoc(userRef, this.userInfo);
          Swal.fire("changement enregsitré!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("changement annulé", "", "info");
        }
      });
    },
    selectNewImage(event) {
      this.newImage = event.target.files[0];
    },
    async uploadNewImage() {
      if (this.images.length === 6) {
        Swal.fire({
          title: "Erreur",
          text: "Le nombre maximum d'images a été atteint.",
          icon: "error"
        });
        return;
      }
      const storageRef = ref(storage, `Stades/${this.userInfo.stadiumName}/${this.newImage.name}`);
      try {
        await uploadBytes(storageRef, this.newImage);
        console.log("New image uploaded successfully!");
        this.newImage = null;
        this.$refs.fileInput.value = ''; // Reset the file input
        this.getUploadedImages();
        Swal.fire({
          title: "Enregistré",
          text: "Image enregistrée",
          icon: "success"
        });
      } catch (error) {
        console.error("Error uploading new image:", error);
      }
    },
    async resetPassword() {
      try {
        await sendPasswordResetEmail(auth, this.userInfo.email);
        Swal.fire('Un email pour modifier votre mot de passe a été envoyé à votre email.');
      } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email de réinitialisation de mot de passe:', error.message);
        Swal.fire('Erreur lors de l\'envoi de l\'email de réinitialisation de mot de passe. Veuillez réessayer plus tard.');
      }
    },
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

.bodyy {
  min-height: 100vh;
  background-image: url('../../assets/back (9).jpg');
  background-size: cover;
  background-position: center;
}

h1 {
  margin-top: 20px;
  color: rgb(0, 204, 255);
  font-weight: bold;
}

.container {
  display: flex;
  justify-content: space-between;
  max-width: 1500px;
  gap: 5px;
  margin: 0 auto;
  padding: 20px;
}

.user-info-container {
  flex: 1;
  background-color: #007E85;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 500px;
}


.images-container {
  flex: 1;
  background-color: #007E85;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-width: 1000px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.image-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.images-container h2 {
  color: #00f2ff;
  margin-bottom: 20px;
  margin-left: 20px;
}

img {
  width: 100%;
  height: 300px;
  border-radius: 8px;
}

.delete-button {
  background-color: #dd1304;
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px
}

.delete-button:hover {
  background-color: #7e1002;
}

.no-images-message {
  margin-top: 20px;
  font-style: italic;
  color: #999;
}

.ajouter {
  margin-top: 20px;
}

/* User Info Container */

.user-info-container h2 {
  color: #ff4800;
  margin-bottom: 20px;
  font-weight: bold;
}

.user-info-container label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

textarea,
.user-info-container input[type="number"],
.user-info-container input[type="text"],
.user-info-container input[type="email"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

textarea {
  min-height: 200px;
}

.user-info-container input[type="text"]:focus,
.user-info-container input[type="email"]:focus {
  outline: none;
  border-color: #007bff;
}
.enregistre{
  width: 100%;
  padding: 12px;
  background-color: #0764d4;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}


input[type="file"] {
  color: white;
}

.user-info-container button:hover {
  background-color: #2B3F57;
}

label {
  color: white;
}

.disabled {
  color: white;
}
.mdp{
  width: 100%;
  padding: 10px 20px;
  background-color: #01c070;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

/* Styles pour les écrans jusqu'à 768px de largeur */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
  }

  .images-container {
    min-width: 400px;
  }

  .user-info-container {
    margin-top: 20px;
    width: 110%;
  }

  .image-grid {
    grid-template-columns: 1fr;
  }

  .image-item {
    width: 100%;
  }

  .image-item img {
    width: 100%;
    height: 85%;
  }
}
</style>