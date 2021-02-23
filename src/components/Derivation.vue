<template>
  <v-main class="grey darken-3">
    <v-container fill-height>
      <v-row>
        <v-col>
          <v-card>
            <v-card-text>
              {{ notes }}
            </v-card-text>
          </v-card>
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

export default {
  name: "Derivation",
  components: {
    op: Op,
    lr1: LR1,
  },
  data: function () {
    return {
      notes: "some notes"
    };
  },
};
</script>

<style scoped>
</style>