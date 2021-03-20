<template>
  <v-main class="grey darken-3">
    <v-container fill-height>
      <v-row align="start">
        <v-col>
          <code-editor
            desc="left recursion elimination"
            :initialCode="raw"
            @code="act"
          />
        </v-col>
        <v-col><notes title="消除左递归前" :text="left" /></v-col>
        <v-col><notes title="消除左递归后" :text="left_free" /></v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { Grammar } from "@/core/common/grammar";
import raw from "@/core/left-recur/grammar.json";
import { eliminate, convert } from "@/core/left-recur/entry";
import CodeEditor from "./common/CodeEditor";
import Notes from "./common/Notes";
import _ from "lodash";

export default {
  name: "LeftRecurion",
  components: {
    "code-editor": CodeEditor,
    notes: Notes,
  },
  data: function () {
    return {
      raw: raw,
    };
  },
  computed: {
    left: function () {
      return convert(this.raw.g);
    },
    left_free: function () {
      let copy = _.cloneDeep(this.raw);
      let gram = new Grammar(copy.T, copy.NT, copy.g);
      eliminate(gram);
      return convert(gram.g);
    },
  },
  methods: {
    act: function (code) {
      this.raw = JSON.parse(code);
    },
  },
};
</script>