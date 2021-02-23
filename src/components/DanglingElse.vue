<template>
  <v-main class="grey darken-3">
    <v-container fill-height>
      <v-row no-gutters>
        <v-col>
          <code-editor :desc="desc" :initialCode="code" @code="draw" />
        </v-col>
        <v-col><tree id="dangling-else" :tokens="tokens" /></v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import CodeEditor from "./common/CodeEditor";
import Tree from "./common/Tree";
import { parseTree, initialCode } from "@/core/dangling-else/entry";
import _ from "lodash";

export default {
  name: "DanglingElse",
  components: {
    "code-editor": CodeEditor,
    tree: Tree,
  },
  data: function () {
    return {
      desc: "请输入if-else语句",
      code: initialCode,
    };
  },
  methods: {
    draw: _.debounce(function (code) {
      this.code = code;
    }, 500),
  },
  computed: {
    tokens: function () {
      return parseTree(this.code);
    },
  },
};
</script>

<style scoped>
</style>