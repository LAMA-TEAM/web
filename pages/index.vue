<template>
  <div>
    <!-- List -->
    <div>
      <nuxt-link :to="`/law/${law._id}`" v-for="law, index of laws" :key="index">
        <h2>
          {{ law.title }}
        </h2>
        <p>
          {{ law.description }}
        </p>
      </nuxt-link>
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
    },
  },
}
</script>
