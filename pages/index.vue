<template>
  <div>
    <!-- List -->
    <div>
      <div v-for="law, index of laws" :key="index">
        <h2>
          {{ law.title }}
        </h2>
        <p>
          {{ law.description }}
        </p>
      </div>
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
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      
      this.laws = data.laws;
    },
  },
}
</script>
