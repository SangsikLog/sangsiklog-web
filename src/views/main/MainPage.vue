<script setup lang="ts">

import PopularStocks from "@/views/main/DailyContents.vue";
import TotalEarning from "@/views/main/TotalEarning.vue";
import TotalOrder from "@/views/main/TotalOrder.vue";
import TotalIncome from "@/views/main/TotalIncome.vue";
import TotalGrowth from "@/views/main/TotalGrowth.vue";
</script>

<template>
  <v-row>
    <v-col cols="12" md="6">
      <TotalEarning />
    </v-col>
    <v-col cols="12" md="6">
      <TotalIncome />
    </v-col>
    <v-col cols="12" lg="12">
      <PopularStocks />
    </v-col>
    <v-col cols="12" lg="12">
      <TotalGrowth />
    </v-col>
  </v-row>
</template>