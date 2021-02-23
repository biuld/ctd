<template>
  <v-main class="grey darken-3">
    <v-container fill-height>
      <v-row align="start">
        <v-col>
          <code-editor desc="请输入LR(1)文法" :initialCode="code" @code="act" />
        </v-col>
        <v-col><notes title="LR(1)分析表" :text="table" /></v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Notes from "./common/Notes";
import CodeEditor from "./common/CodeEditor";
import { convertTable } from "@/core/lr1/entry";
import { Generator } from "@/core/lr1/generator";
import { Grammar } from "../core/common/grammar";
import grammar from "@/core/lr1/grammar.json";

export default {
  name: "LR1Gen",
  components: {
    notes: Notes,
    "code-editor": CodeEditor,
  },
  data: function () {
    return {
      grammar: grammar,
    };
  },
  computed: {
    code: function () {
      return JSON.stringify(this.grammar, null, 2);
    },
    gram: function () {
      return new Grammar(this.grammar.T, this.grammar.NT, this.grammar.g);
    },
    generator: function () {
      return new Generator(this.gram);
    },
    table: function () {
      return convertTable(this.generator.parsingTable);
    },
  },
  methods: {
    act: function (code) {
      this.grammar = JSON.parse(code);
    },
  },
};
</script>