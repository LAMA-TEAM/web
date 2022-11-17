<template>
  <div class="container">
    <!-- List -->
    <h1 class="title-section">Liste des lois</h1>
    <div class="laws-container">
      <Nuxt-link :to="`/law/${law._id}`" v-for="law, index of laws" :key="index" class="link">
        <div class="law-item">
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
      </Nuxt-link>
    </div>
  </div>
</template>

<script>
import isAuthenticated from '~/utils/isAuthenticated'

export default {
  data() {
    return {
      laws: []
    }
  },
  async mounted() {
    await isAuthenticated(this.$router);
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
      console.log(this.laws)
    },
  },
}
</script>

<style>
.title-section {
    margin: .5rem 0 .5rem 0;
  }
  
  .laws-container {
    display: flex;
    flex-direction: column;
    align-items: left;
  }

  .law-item {
    margin: 1rem 0 1rem 0;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .law-desc {
    margin: 1rem 0 1rem 0;
  }

</style>