<template>
  <v-main class="grey darken-3">
    <v-container fill-height>
      <v-row align="start">
        <v-col>
          <code-editor desc="finite automata" :initialCode="raw" @code="act" />
        </v-col>
        <v-col>
          <graph :fa="nfa" id="nfa" />
        </v-col>
        <v-col>
          <graph :fa="dfa" id="dfa" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import CodeEditor from "./common/CodeEditor";
import Graph from "./common/Graph";
import raw from "@/core/fa/nfa.json";
import { convert, determine } from "@/core/fa/entry";

export default {
  name: "FiniteAutomata",
  components: {
    graph: Graph,
    "code-editor": CodeEditor,
  },
  data: function () {
    return {
      raw: raw,
    };
  },
  computed: {
    nfa: function () {
      return convert(this.raw);
    },
    dfa: function () {
      return convert(determine(this.raw));
    },
  },
  methods: {
    act: function (code) {
      this.raw = JSON.parse(code);
    },
  },
};
</script>