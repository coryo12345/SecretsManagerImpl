<template>
  <img alt="Vue logo" src="../assets/logo.png" />
  <h1>Vue Secrets Manager Clone</h1>
  <p>Written in Vue.JS using Supabase as the backend</p>
  <h2>
    Check out the code
    <a
      href="https://github.com/coryo12345/SecretsManagerImpl"
      class="text-primary"
      >here</a
    >
  </h2>
  <div class="d-flex justify-center flex-wrap mt-10">
    <v-card class="ma-2" to="/secrets">
      <v-card-title>
        <span class="mx-auto text-background"> Secrets </span>
      </v-card-title>
    </v-card>
    <v-card class="ma-2" to="/account">
      <v-card-title>
        <span class="mx-auto text-background"> Account </span>
      </v-card-title>
    </v-card>
  </div>
</template>

<style scoped lang="scss">
a {
  text-decoration: none;
}

a:visited {
  color: inherit;
}

.v-card {
  width: 20em;
  min-height: 10em;
  box-sizing: border-box;

  .v-card-title {
    height: 100%;
    text-align: center;
  }
}
</style>
