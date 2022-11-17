<template>
  <v-app-bar
    app
    class="mainToolbar"
    elevation="2"
    color="primary"
    height="60"
    dense
    dark
  >
    <v-toolbar-title>LAMA-PI</v-toolbar-title>

    <v-spacer></v-spacer>

      <v-btn
        plain
        v-for="item in items"
        :key="item.title"
        :href="item.href"
        class="mr-4"
        >
        {{ item.title }}
      </v-btn>

    <v-spacer></v-spacer>

    <div>
      <v-btn color="danger" depressed to="/profile" class="mx-3" nuxt>Profile</v-btn>
      <v-btn color="white" outlined depressed to="/auth/login" nuxt
        >Se déconnecter</v-btn
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
      items: [{title: "Accueil", href: "/"}],
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
