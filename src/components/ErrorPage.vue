<template>
  <div class="min-h-[50vh] py-10">
    <div class="content-block text-center">
      <h2 class="flex justify-center items-center text-3xl font-bold text-red-500 mb-6">
        <svg-icon type="mdi" :path="mdiAlertCircleOutline" class="size-9 mr-2" />
        Упс!
      </h2>
      <p class="text-gray-600 text-lg mb-4">
        У вас нет доступа к этой странице.
      </p>
      <router-link to="/" class="main-btn bg-red-500 text-white inline-block">
        Вернуться на главную
      </router-link>
    </div>
  </div>
</template>

<script>
import { mdiAlertCircleOutline } from '@mdi/js'

export default {
  data() {
    return {
      mdiAlertCircleOutline
    }
  }
}
</script>