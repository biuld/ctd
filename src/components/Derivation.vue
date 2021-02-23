<template>
  <v-main class="grey darken-3">
    <v-container fill-height>
      <v-row align="start">
        <v-col>
          <notes :text="text" />
        </v-col>
        <v-col><op /></v-col>
        <v-col><lr1 /></v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Op from "./common/Op";
import LR1 from "./common/LR1";
import Notes from "./common/Notes";

export default {
  name: "Derivation",
  components: {
    op: Op,
    lr1: LR1,
    notes: Notes,
  },
  data: function () {
    return {
      text: [
        "最左推导：每一步替换最左边的非终结符，可类比树的前序遍历",
        "最右推导：每一步替换最右边的非终结符，可类比树的后序遍历",
        "两种推导最终产生的树是一样的，区别只是在于树节点出现的时间"
      ],
    };
  },
};
</script>