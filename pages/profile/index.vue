<template>
    <div class="container">
        <h1 color="primary">Profile</h1>
        <p>
           Connecté en tant que <strong>{{ user.lastName }} {{ user.firstName }}</strong> ({{ user.email }})
        </p>
        <v-btn v-if="user.role === 'admin'" color="danger" depressed to="/admin" class="mx-3" nuxt>Admin</v-btn>

        <div class="spacer"></div>

        <div class="list-law">
            <h2>Sessions</h2>
            <p>
                <strong>Nombre de sessions : </strong> {{ tokens?.length }}
            </p>
            <div class="laws-container">
                <div v-for="token, index of tokens" :key="index">
                    <div class="law-item-admin">
                        <div class="law-content">
                            <p class="law-title">
                                <strong v-if="token.token === actualToken">
                                    (Token actif)
                                </strong>
                                <span>
                                {{ token.token.substring(0, 24) + "..." }}
                                </span>
                            </p>
                            <p>
                                {{ token.useLeft }}/50
                            </p>
                        </div>
                        <div class="law-actions">
                            <v-btn @click="refreshToken(token._id)" color="primary" depressed class="mx-3" nuxt>Rafraichir</v-btn>
                            <v-btn @click="destroyToken(token._id)" color="error" depressed class="mx-3" nuxt>Supprimer</v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import isAuthenticated from '~/utils/isAuthenticated'

export default {
    data() {
        return {
            tokens: [],
            user: {},
            actualToken: ""
        }
    },
    async mounted() {
        await isAuthenticated(this.$router);
        this.actualToken = localStorage.getItem("token");
        await this.getUser();
        await this.getTokens();
    },
    methods: {
        async getUser() {
            const user = await fetch('https://api.lam-api.app-web.ml/auth/me', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
            });
            
            const data = await user.json();

            if(!data.success) {
                this.$router.push('/');
            } else {
                this.user = data.user;
            }

        },
        async getTokens() {
            const res = await fetch("https://api.lam-api.app-web.ml/token", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
            });

            const data = await res.json();

            this.tokens = data.tokens;
        },
        async refreshToken(id) {
            const res = await fetch(`https://api.lam-api.app-web.ml/token/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            const data = await res.json();

            if(!data.success) {
                alert(data.message);
            } else {
                await this.getTokens();
            }
        },
        async destroyToken(id) {
            const res = await fetch(`https://api.lam-api.app-web.ml/token/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            const data = await res.json();

            console.log(data);

            if(!data.success) {
                alert(data.message);
            } else {
                await this.getTokens();
            }
        }
    },
}
</script>

<style>
  .law-item-admin {
      margin: 1rem 0 1rem 0;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
  }
  .law-actions {
    display: flex;
    align-self: flex-end;
  }
  .add-law {
    border-radius: 15px;
    padding: 1rem 0;
  }

  .spacer {
    margin: 4rem 0;
  }
</style>