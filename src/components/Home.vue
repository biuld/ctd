<template>
  <v-main class="grey darken-3">
    <v-container fill-height>
      <v-row>
        <v-col v-for="(entry, index) in body" :key="index">
          <v-card min-height="80vh" width="35rem">
            <v-card-title>
              {{ entry.title }}
            </v-card-title>

            <v-card-text v-for="(e, index) in entry.text" :key="index">
              <div>
                <strong>{{ e.header }}</strong>
              </div>
              <div v-for="(item, index) in e.content" :key="index">
                {{ item }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data: function () {
    return {
      body: [
        {
          title: "编译原理算法演示系统",
          text: [
            {
              header: "最左推导和最右推导",
              content: [
                "Operator Precedence Parser: 最左推导，递归下降",
                "LR(1) Parser: 最右推导，移进归约",
              ],
            },
            {
              header: "Dangling Else",
              content: [
                "主要展示解决dangling-else问题的一种方法：else跟最近的if配对",
              ],
            },
            {
              header: "NFA => DFA",
              content: ["不确定自动机的确定化： ▶️代表初态，⏹️代表终态"],
            },
            {
              header: "消除左递归",
              content: ["消除文法所有左递归算法展示"],
            },
            { header: "LL(1)分析", content: ["自动计算first集和follow集"] },
            { header: "LR(1)分析", content: ["计算LR(1)分析表"] },
          ],
        },
        {
          title: "Terminology",
          text: [
            {
              header: "Production Rule",
              content: [
                "A -> B == [ 'A', [ 'B' ] ]",
                "A -> ⲉ == [ 'A', [ '' ] ]",
              ],
            },
            {
              header: "Grammar",
              content: [
                "T == terminals",
                "NT == non-terminals",
                "g == production rules",
              ],
            },
            {
              header: "Finite Automaton",
              content: [
                "K == states",
                "t == input symbols",
                "f == transition function",
                "S == start state",
                "Z == accept states",
              ],
            },
          ],
        },
      ],
    };
  },
};
</script>