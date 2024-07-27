<template>
    <div class="bodyy">
        <div v-if="!user">
            <div class="container">
                <h1>Contactez-nous</h1>
                <form @submit.prevent="envoyerMessage1">
                    <label for="nom">Nom :</label>
                    <input type="text" v-model="nom" required>
                    <label for="email">Email :</label>
                    <input type="email" v-model="email" required>
                    <label for="message">Message :</label>
                    <textarea v-model="message" required></textarea>
                    <center><button type="submit">Envoyer</button></center>
                </form>
            </div>
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        </div>
        <div v-else>
            <div class="container">
                <h1>Contactez-nous</h1>
                <form @submit.prevent="envoyerMessage2">
                    <label for="message">Message :</label>
                    <textarea v-model="message" required></textarea>
                    <center><button type="submit">Envoyer</button></center>
                </form>
            </div>
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        </div>
    </div>
</template>
<script>
import { auth, db } from "../firebase/firebase";
import { collection, addDoc } from 'firebase/firestore';
export default {
    data() {
        return {
            nom: '',
            email: '',
            message: '',
            user: null
        }
    },
    computed: {
        userDetails() {
            return this.$store.state.userDetails;
        },
    },
    async mounted() {
        this.unsubscribe = auth.onAuthStateChanged(user => {
            this.user = user;
        })
    },
    methods: {
        async envoyerMessage1() {
            try {
                const messageref = await addDoc(collection(db, "message"), {
                    nom: this.nom,
                    email: this.email,
                    message: this.message
                });
            } catch (error) {
                this.errorMessage1 = error;
            }
        },
        async envoyerMessage2() {
            try {
                const messageref = await addDoc(collection(db, "message"), {
                    nom: this.userDetails.displayName,
                    email: this.userDetails.email,
                    message: this.message
                });
            } catch (error) {
                this.errorMessage1 = error;
            }
        }
    }
}
</script>
<style scoped>
.bodyy {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    background-image: url('../assets/back (9).jpg');
    background-size: cover;
    background-position: center;
}

.container {
    max-width: 600px;
    margin: 50px auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
}

form {
    margin-top: 20px;
}

label,
input,
textarea {
    display: block;
    margin-bottom: 10px;
}

input{
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

textarea {
    width: 100%;
    height: 150px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 3px;
}

button:hover {
    background-color: #0056b3;
}
</style>