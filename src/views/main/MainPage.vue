<script setup lang="ts">

import PopularKnowledge from "@/views/main/components/PopularKnowledge.vue";
import TotalKnowledgeCount from "@/views/main/components/TotalKnowledgeCount.vue";
import DailyKnowledge from "@/views/main/components/DailyKnowledge.vue";
import CategoryKnowledge from "@/views/main/components/CategoryKnowledge.vue";
</script>

<template>
  <v-row>
    <v-col cols="12" md="6">
      <TotalKnowledgeCount />
    </v-col>
    <v-col cols="12" md="6">
      <DailyKnowledge />
    </v-col>
    <v-col cols="12" lg="12">
      <PopularKnowledge />
    </v-col>
    <v-col cols="12" lg="12">
      <CategoryKnowledge />
    </v-col>
  </v-row>
</template>