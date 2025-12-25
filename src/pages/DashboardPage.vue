<script setup lang="ts">

import SideBar from "@/components/SideBar.vue";
import TopBar from "@/components/TopBar.vue";
import TaskCard from "@/components/TaskCard.vue";

</script>

<template>
  <div class="flex h-screen">
    <SideBar />
    <div class="flex-1 flex flex-col">
      <TopBar />
      <div class="flex-1 overflow-auto p-4 bg-gray-100">
        <TaskCard />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

