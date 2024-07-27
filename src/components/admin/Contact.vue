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
                <div><router-link to="/stades" class="link"><img src="../../assets/stade.png" class="icon">
                        Stades</router-link>
                </div>
                <div><router-link to="/joueurs" class="link"><img src="../../assets/joueur.png" class="icon">
                        Joueurs</router-link></div>
                <div><router-link to="/tournois" class="link"><img src="../../assets/tournoi.png" class="icon">
                        Tournois</router-link></div>
                <div><router-link to="/defis" class="link"><img src="../../assets/defi.png" class="icon">
                        Défis</router-link>
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
            <div class="container2">
                <h1>Liste des Messages</h1>
                <ul>
                    <li v-for="message in messages" :key="message.id">
                        <strong>Nom :</strong> {{ message.nom }} <br>
                        <strong>Email :</strong> {{ message.email }} <br>
                        <strong>Message :</strong> {{ message.message }}
                        <div class="buttons">
                            <button @click="supprimerMessage(message.id)" class="btn btn-danger">Supprimer</button>
                            <button class="btn btn-success" @click="Repondre(message)">Repondre</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { db, auth } from "../../firebase/firebase";
import { collection, getDocs } from 'firebase/firestore';

export default {
    data() {
        return {
            messages: []
        }
    },
    async mounted() {
        this.unsubscribe = auth.onAuthStateChanged(user => {
            if (!user) { this.$router.push('/'); }
            else if (user.photoURL !== 'admin') { this.$router.push('/') }
        })
        this.fetchMessages();
    },
    methods: {
        async fetchMessages() {
            try {
                const messageSnapshot = await getDocs(collection(db, "message"));
                messageSnapshot.forEach(doc => {
                    this.messages.push({ id: doc.id, ...doc.data() });
                });
            } catch (error) {
                console.error("Error fetching messages: ", error);
            }
        },
        async supprimerMessage(messageId) {
            try {
                await deleteDoc(doc(db, "message", messageId));
                this.messages = this.messages.filter(message => message.id !== messageId);
                console.log("Message supprimé avec succès");
            } catch (error) {
                console.error("Error deleting message: ", error);
            }
        },
        Repondre(message) {
            this.$router.push({ path: 'Repondre', query: { email: message.email, nom: message.nom } });
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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /* Pour espacer les cartes horizontalement */
    margin-top: 20px;
    /* Ajoute un espace en haut */
}

.card {
    width: calc(33.33% - 20px);
    /* Pour que chaque carte occupe environ un tiers de la largeur, en tenant compte de l'espace entre les cartes */
    margin-bottom: 20px;
    /* Ajoute un espace en bas de chaque carte */
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

.router-link-exact-active {
    padding: 10px;
    background-color: #555;
}

nav img {
    vertical-align: middle;
}

.container2 {
    max-width: 800px;
    margin: 50px auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    border-bottom: 1px solid #ccc;
    padding: 20px 0;
}

strong {
    font-weight: bold;
}

/* Style pour les messages */
.nom {
    color: #007bff;
}

.email {
    color: #28a745;
}

.message {
    color: #333;
}

.buttons {
    display: flex;
    justify-content: space-around;
}
</style>
