<template>
  <v-main dark>
    <v-container class="pa-5 mt-5">
      <v-row> <div class="text-h4">现有以下文法</div></v-row>
      <v-row>
        <v-col cols="7">
          <v-sheet outlined class="pa-5 grey lighten-3 rounded elevation-1">
            <div v-for="(rule, index) in grammar" :key="index" class="text-h6">
              {{ rule }}
            </div>
          </v-sheet>
        </v-col>
        <v-col>
          <div class="text-subtitle-1">
            这个文法主要识别不包含括号的基本四则运算，乘除的优先级比加减高
          </div>
          <div class="text-subtitle-1">其中</div>
          <div class="text-subtitle-1">VT = { i, +, - *, /}</div>
          <div class="text-subtitle-1">VN = { expr, term, factor }</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4"><op /></v-col>
        <v-col>
          <div class="text-subtitle-1">最左推导：</div>
          <div class="text-subtitle-1">每一步替换最左边的非终结符</div>
          <div class="text-subtitle-1">LL(1) parser使用了最左推导</div>
          <div class="text-subtitle-1">本质上对应着语法树的前序遍历</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4"><lr1 /></v-col>
        <v-col>
          <div class="text-subtitle-1">最右推导：</div>
          <div class="text-subtitle-1">每一步替换最右边的非终结符</div>
          <div class="text-subtitle-1">LR(1) parser使用了最右推导</div>
          <div class="text-subtitle-1">本质上对应着语法树的后序遍历</div></v-col
        >
      </v-row>
      <v-row class="pa-5, ma-5">
        <div class="text-subtitle-1">
          不管是最左还是最右推导，对于无二义性文法，同一个句子总是对应这个同一棵语法树，两种推导的区别只在于树分杈的时机，正如树的两种遍历。
        </div>
        <div class="text-subtitle-1">
          反之，假如一个句子对应着两棵树，则说明这个句子的文法是二义性的，例如，一个只识别加法运算的文法
        </div>
        <div class="text-subtitle-1">
          PS：上面的两颗树不一样是因为使用了不同的文法
        </div>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Op from "./Op";
import LR1 from "./LR1";

export default {
  name: "Derivation",
  components: {
    op: Op,
    lr1: LR1,
  },
  data: function () {
    return {
      grammar: [
        "S' => expr",
        "expr => term | term { +, - } expr",
        "term => factor | factor { *, / } term",
        "factor => i",
      ],
    };
  },
};
</script>

<style scoped>
</style>