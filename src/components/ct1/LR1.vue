<template>
  <v-card>
    <v-card-title>LR(1) parser</v-card-title>
    <v-card-text>
      <tree :tokens="tokens" id="lr1" />
    </v-card-text>
    <v-card-actions>
      <v-container>
        <v-row>
          <v-col cols="8">
            <v-text-field
              label="expr"
              v-model.lazy="input"
              @keyup.enter="act"
            />
          </v-col>
          <v-col>
            <v-btn @click="act">OK</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import Tree from "../Tree";
import { parseTree } from "../../core/lr1/entry";
import _ from "lodash";

export default {
  name: "LR1",
  components: {
    tree: Tree,
  },
  data: function () {
    return {
      input: "",
      // TODO fix not correct precedence between plus and minus, 
      // right now it's always right associate 
      content: "1 - 2 * 3 + 4 / 5",
    };
  },
  methods: {
    act: _.debounce(function () {
      this.content = this.input;
    }, 500),
  },
  computed: {
    tokens: function () {
      return parseTree(this.content);
    },
  },
};
</script>