<template>
  <v-app-bar
    app
    class="mainToolbar"
    elevation="0"
    color="primary"
    height="60"
    dense
  >
    <nuxt-link to="/">
      <v-toolbar-title color="white" >LAMA-PI</v-toolbar-title>
    </nuxt-link>

    <v-spacer></v-spacer>

    <div>
      <v-btn color="white" outlined depressed to="/auth/login" nuxt
        >Se connecter</v-btn
      >
      <v-btn color="white" text depressed to="/auth/register" nuxt
        >S'inscrire</v-btn
      >
    </div>
    <v-dialog v-model="openEditEmail">
      <dialog-edit-email
        v-on:close-dialog="openEditEmail = false"
      ></dialog-edit-email>
    </v-dialog>

    <v-dialog v-model="openEditPassword">
      <dialog-edit-password
        v-on:close-dialog="openEditPassword = false"
      ></dialog-edit-password>
    </v-dialog>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      openEditEmail: false,
      openEditPassword: false,
    };
  },
  computed: {
    email() {
      return this.$auth.user.email;
    },
  },
};
</script>
