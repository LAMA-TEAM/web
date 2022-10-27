<template>
    <div>
        <h1>
            {{ law.title }}
        </h1>
        <p>
            {{ law.description }}
        </p>
        <!-- Vote Yes/No -->
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