<template>
  <v-main class="grey darken-3">
    <v-container fill-height>
      <v-row align="start">
        <v-col>
          <code-editor
            desc="请输入LR(1)文法"
            :initialCode="grammar"
            @code="act"
          />
        </v-col>
        <v-col><v-data-table :headers="header" :items="table"/></v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import CodeEditor from "./common/CodeEditor";
import { convertTable } from "@/core/lr1/entry";
import { Generator } from "@/core/lr1/generator";
import { Grammar } from "../core/common/grammar";
import grammar from "@/core/lr1/grammar.json";

export default {
  name: "LR1Gen",
  components: {
    "code-editor": CodeEditor,
  },
  data: function () {
    return {
      grammar: grammar,
    };
  },
  computed: {
    gram: function () {
      return new Grammar(this.grammar.T, this.grammar.NT, this.grammar.g);
    },
    generator: function () {
      return new Generator(this.gram);
    },
    table: function () {
      return convertTable(this.generator.parsingTable);
    },
    header: function () {
      return [{ text: "state", value: "state" }].concat(
        this.gram.T.map((i) => {
          return { text: i, value: i };
        })
      );
    },
  },
  methods: {
    act: function (code) {
      this.grammar = JSON.parse(code);
    },
  },
};
</script>