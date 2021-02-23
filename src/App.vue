<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <app-drawer @selectedText="setTitle" :title="defaultTitle" />
    </v-navigation-drawer>

    <v-app-bar app color="grey darken-4" dark clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>

    <router-view />
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
    defaultTitle: "Compiling Theory Demonstration",
    title: "Compiling Theory Demonstration",
  }),
  methods: {
    setTitle(val) {
      this.title = val;
    },
  },
};
</script>