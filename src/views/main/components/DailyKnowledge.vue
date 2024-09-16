<script setup lang="ts">
import {SquarePlusIcon} from "vue-tabler-icons";
</script>

<template>
  <v-card elevation="0" class="bg-primary overflow-hidden bubble-shape bubble-primary-shape">
    <v-card-text>
      <div class="d-flex align-start mb-6">
        <v-btn icon rounded="sm" color="darkprimary" variant="flat">
          <SquarePlusIcon width="25" />
        </v-btn>
      </div>
      <h2 class="text-h1 font-weight-medium">
        금일 <a href="#"><CircleArrowUpRightIcon stroke-width="1.5" width="28" class="text-white" /> </a>
      </h2>
      <span class="text-subtitle-1 text-medium-emphasis text-white">오늘의 상식</span>
    </v-card-text>
  </v-card>
</template>
