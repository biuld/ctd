<template>
  <v-card min-width="20rem">
    <v-card-title v-show="title"> {{ title }} </v-card-title>
    <v-card-subtitle v-show="subtitle"> {{ subtitle }} </v-card-subtitle>
    <v-card-text v-show="text">
      <v-list>
        <v-list-item v-for="(item, index) in text" :key="index">
          {{ item }}
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Notes",
  props: {
    title: String,
    subtitle: String,
    text: Array,
  },
};
</script>