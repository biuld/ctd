<template>
  <v-card>
    <v-card-title>Operator Precedence parser</v-card-title>
    <v-card-text>
      <div class="text-subtitle-2">支持无括号的正整数四则运算</div>
      <tree :tokens="tokens" id="op" />
    </v-card-text>
    <v-card-actions>
      <v-container>
        <v-row>
          <v-col cols="8">
            <v-text-field
              label="expr"
              v-model.lazy="input"
              @keyup.enter="act"
              :rules="[exprCheck]"
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
import Tree from "./Tree";
import { parseTree } from "@/core/op/entry";
import _ from "lodash";

export default {
  name: "Op",
  components: {
    tree: Tree,
  },
  data: function () {
    return {
      input: "",
      content: "1 + 2 * 3 - 4 / 5",
    };
  },
  methods: {
    act: _.debounce(function () {
      this.content = this.input;
    }, 500),
    exprCheck: function (str) {
      return /^\d([+\-*/]\d)*$/.test(str);
    },
  },
  computed: {
    tokens: function () {
      return parseTree(this.content);
    },
  },
};
</script>