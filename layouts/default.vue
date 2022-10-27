<template>
  <v-app>
    <Navbar />
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
  name: "default",
  components: {
    Navbar,
  },
};
</script>
