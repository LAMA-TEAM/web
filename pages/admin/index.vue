<template>
    <div class="container">
        <h1 color="primary">Admin</h1>

        <div class="add-law">
            <h2 class="mb-3">Ajouter une loi</h2>
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
                <v-text-field
                    v-model="title"
                    :counter="10"
                    :rules="nameRules"
                    label="Titre"
                    required
                    class="law-input"
                    outlined
                ></v-text-field>
                <v-textarea
                    name="desc"
                    label="Description"
                    value=""
                    required
                    class="law-input"
                    outlined
                ></v-textarea>
                <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="validate"
                >
                    Validate
                </v-btn>
            </v-form>
        </div>

        <div class="spacer"></div>

        <div class="list-law">
            <h2>Liste des lois</h2>
            <div class="laws-container">
                <div v-for="law, index of laws" :key="index">
                    <div class="law-item-admin">
                        <div class="law-content">
                            <h2 class="law-title">
                                📜
                                &nbsp;
                                {{ law.title }}
                            </h2>
                            <p class="law-desc">
                                {{ law.description }}
                            </p>
                            <p>
                                {{ new Date(law.createdAt).toLocaleDateString() }}
                            </p>
                        </div>
                        <div class="law-actions">
                            <v-btn color="primary" depressed to="/admin" class="mx-3" nuxt>Editer</v-btn>
                            <v-btn color="error" depressed to="/admin" class="mx-3" nuxt>Supprimer</v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import isAuthenticated from '~/utils/isAuthenticated'
import isAdmin from '~/utils/isAdmin'

export default {
    data() {
        return {
            laws: []
        }
    },
    async mounted() {
        await isAuthenticated(this.$router);
        await isAdmin(this.$router);
        await this.getLaws();
    },
    methods: {
        async getLaws() {
            const res = await fetch("https://api.lam-api.app-web.ml/law", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
            });

            const data = await res.json();

            this.laws = data.laws;
        },
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