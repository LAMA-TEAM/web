<template>
    <div class="container">
        <h1 class="title-section">
            {{ law.title }}
        </h1>
        <p>
            <i>{{ new Date(law.createdAt).toLocaleDateString() }}</i>
        </p>
        <p>
            {{ law.description }}
        </p>
        
        <div class="vote-footer">
            <div>
                <!-- Vote Yes/No -->
                <h3 class="mb-3">Voter pour la loi</h3>
                <div v-if="!law.voted">
                    <v-btn
                        color="success"
                        @click="vote(law._id, 1)"
                        :disabled="law.voted"
                    >Oui</v-btn>
                    <v-btn
                        color="error"
                        @click="vote(law._id, 0)"
                        :disabled="law.voted"
                    >Non</v-btn>
                </div>
            </div>
            <div>
                Nombres de votes : ...
            </div>
        </div>
    </div>
</template>

<script>
import isAuthenticated from '~/utils/isAuthenticated'

export default {
    data() {
        return {
            law: {}
        }
    },
    async mounted() {
        await isAuthenticated(this.$router);
        await this.getLaw();
    },
    methods: {
        async getLaw() {
            const res = await fetch("https://api.lam-api.app-web.ml/law/" + this.$route.params.id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
            });

            const data = await res.json();

            this.law = data.law;
            this.law.voted = data.voted;
        },
        async vote(id, vote) {
            const res = await fetch("https://api.lam-api.app-web.ml/vote/" + this.$route.params.id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    law: id,
                    vote: vote
                })
            });

            console.log(await res.json());

            if (res.status === 201) {
                await this.getLaw();
            }
        }
    }
}
</script>

<style>
.vote-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
</style>