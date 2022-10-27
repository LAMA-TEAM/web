<template>
  <v-app>
    <v-row>
      <v-col xl="6" lg="6" md="6" sm="12" xs="12" class="py-0">
        <v-container
          class="d-flex flex-row justify-center align-center fill-height pa-0"
          fluid
        >
          <v-card class="m-vcard-login rounded-lg" width="550px" elevation="4">
            <v-card-title class="pb-0 pt-8 text-center font-weight-bold">
              Se connecter
            </v-card-title>

            <v-form
              class="m-vform-login"
              method="post"
              @submit.prevent="submit"
              ref="form"
            >
              <v-card-text>
                <!-- column genre -->
                <v-text-field
                  v-model="email"
                  label="Email"
                  type="email"
                  outlined
                  :rules="rules"
                ></v-text-field>
                <!-- column respons -->
                <v-text-field
                  v-model="password"
                  label="Mot de passe"
                  outlined
                  :rules="rules_password"
                ></v-text-field>
              </v-card-text>
              <v-card-actions class="px-7 pb-7">
                <v-row
                  class="d-flex flex-row align-center justify-center full-width"
                >
                  <v-btn type="submit" block color="primary" depressed large
                    >Se connecter</v-btn
                  ></v-row
                >
              </v-card-actions>
              <!-- Error -->
                <v-card-actions class="px-7 pb-7">
                  <v-row
                    class="d-flex flex-row align-center justify-center full-width"
                  >
                    <v-alert
                      v-if="error"
                      type="error"
                      class="text-center"
                      elevation="2"
                      >{{ error }}</v-alert
                    >
                  </v-row>
                </v-card-actions>
              <div class="px-5 pb-5">
                <p class="body-1 text-center text--secondary pa-2 mb-1">
                  Vous n'avez pas de compte ?
                </p>
                <v-btn
                  to="/auth/register"
                  block
                  color="primary"
                  depressed
                  large
                  outlined
                  >S'inscrire</v-btn
                >
              </div>
            </v-form>
          </v-card>
        </v-container>
      </v-col>
      <v-col
        cols="6"
        xl="6"
        lg="6"
        md="6"
        sm="7"
        class="py-0"
        v-if="$vuetify.breakpoint.mdAndUp"
      >
        <v-container class="fill-height pa-0" fluid>
          <v-img
            height="100%"
            lazy-src="https://images.unsplash.com/photo-1589182337358-2cb63099350c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            src="https://images.unsplash.com/photo-1589182337358-2cb63099350c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          ></v-img>
        </v-container>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
      rules: [(v) => !!v || "Champ requis."],
      rules_password: [
        (v) => !!v || "Champ requis.",
        (v) =>
          v.length >= 6 ||
          "Le mot de passe doit être composé de 6 caractères minimun !",
      ],
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        const res = await fetch("https://api.lam-api.app-web.ml/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        const data = await res.json();

        if (res.status === 200) {
          localStorage.setItem("token", data.token);

          this.$router.push("/");
        } else {
          this.error = data.message;
        }
      }
    },
  },
};
</script>
