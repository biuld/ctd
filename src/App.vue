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
      <tree />
    </v-main>
  </v-app>
</template>

<script>
import AppDrawer from "./components/AppDrawer";
import Tree from "./components/Tree";

export default {
  name: "App",
  components: {
    "app-drawer": AppDrawer,
    tree: Tree,
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