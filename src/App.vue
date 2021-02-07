<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <app-drawer @selectedText="setTitle" :title="defaultTitle" />
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>

    <v-main class="brown lighten-5">
      <ll1 />
    </v-main>
  </v-app>
</template>

<script>
import AppDrawer from "./components/AppDrawer";
import LL1 from "./components/LL1";

export default {
  name: "App",
  components: {
    "app-drawer": AppDrawer,
    ll1: LL1,
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