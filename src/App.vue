<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <app-drawer @selectedText="setTitle" :title="defaultTitle" />
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title> {{ title }} </v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main class="brown lighten-5"> </v-main>
  </v-app>
</template>

<script>
import AppDrawer from "./components/AppDrawer";

export default {
  name: "App",
  components: {
    "app-drawer": AppDrawer,
  },
  data: () => ({
    drawer: true,
    defaultTitle: "Application",
    title: "Application",
  }),
  methods: {
    setTitle(val) {
      this.title = val;
    },
  },
};
</script>