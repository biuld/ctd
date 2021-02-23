<template>
  <v-row>
    <v-col>
      <v-img v-ripple @click="backToHome" :src="avatar" height="30vh" dark />
      <v-list dense>
        <v-list-item-group v-model="selected">
          <v-list-item
            v-for="(name, index) in menus"
            :key="index"
            :to="links[index]"
          >
            <v-list-item-icon>
              <v-icon> mdi-folder </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import avatar from "@/assets/avatar.jpg";

export default {
  props: {
    title: String,
  },
  data: () => ({
    menus: [
      "最左推导和最右推导",
      "Dangling Else",
      "NFA => DFA",
      "消除左递归",
      "算符优先分析器",
      "LL(1)分析",
      "LR(1)分析"
    ],
    links: ["/derivation", "/dangling-else", "/finite-automata"],
    selected: null,
    avatar: avatar,
  }),
  methods: {
    backToHome: function () {
      this.$emit("selectedText", this.title);
    },
  },
  watch: {
    selected: function (val) {
      this.$emit("selectedText", this.menus[val]);
    },
  },
};
</script>

<style scoped>
</style>