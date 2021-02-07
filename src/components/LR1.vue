<template>
  <v-card>
    <v-card-title>LR(1) parser</v-card-title>
    <v-card-text>
      <tree :tokens="tokens" />
    </v-card-text>
    <v-card-actions>
      <v-row>
        <v-col :cols="11"
          ><v-text-field
            label="expr"
            v-model.lazy="input"
            @keyup.enter="content = input"
        /></v-col>
        <v-col><v-btn @click="content = input">OK</v-btn></v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import Tree from "./Tree";
import { parseTree } from "../core/lr1/entry";

export default {
  name: "LR1",
  components: {
    tree: Tree,
  },
  data: function () {
    return {
      input: "",
      content: "1 + 2 * 3 - 4 * 5",
    };
  },
  computed: {
    tokens: function () {
      return parseTree(this.content);
    },
  },
};
</script>