<template>
  <v-main class="grey darken-3">
    <v-container fill-height>
      <v-row align="start">
        <v-col>
          <code-editor
            desc="请输入LL(1)文法"
            :initialCode="code"
            @code="act"
          />
        </v-col>
        <v-col><notes title="first集" :text="firstSet" /></v-col>
        <v-col><notes title="follow集" :text="followSet" /></v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Notes from "./common/Notes";
import CodeEditor from "./common/CodeEditor";
import { convert } from "@/core/ll1/entry";
import { Generator } from "@/core/ll1/generator";
import { Grammar } from "../core/common/grammar";
import grammar from "@/core/ll1/grammar.json";

export default {
  name: "LL1Gen",
  components: {
    "code-editor": CodeEditor,
    notes: Notes,
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
    firstSet: function () {
      return convert(this.generator.firstSet);
    },
    followSet: function () {
      return convert(this.generator.followSet);
    },
  },
  methods: {
    act: function (code) {
      this.grammar = JSON.parse(code);
    },
  },
};
</script>