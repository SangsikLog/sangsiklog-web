<script setup lang="ts">

</script>

<template>
  <div class="pa-4">
    <div class="d-flex align-center justify-space-between mb-3">
      <h6 class="text-subtitle-1">
        알림
        <v-chip color="warning" variant="flat" size="small" class="ml-2 text-white">00</v-chip>
      </h6>
      <a href="#" class="text-decoration-underline text-primary text-subtitle-2">전체 읽음 표시</a>
    </div>
  </div>
  <v-divider></v-divider>
  <perfect-scrollbar style="height: calc(100vh - 300px); max-height: 350px">
    <v-list class="py-0" lines="three">

    </v-list>
  </perfect-scrollbar>
  <v-divider></v-divider>
  <div class="pa-2 text-center">
    <v-btn color="primary" variant="text">전체 보기</v-btn>
  </div>
</template>
