<template>
  <header class="bg-white rounded-lg w-auto shadow-lg">
    <h1 class="text-4xl sm:text-7xl lg:text-9xl font-bold text-green-400 p-2">
      Изучите основы архитектуры персональных компьютеров
    </h1>
    <h2 class="text-2xl sm:text-4xl lg:text-5xl bg-green-400 text-white p-2">
      Лекции и тесты для обучения
    </h2>
  </header>

  <main class="py-7 min-h-[50vh]">
    <div class="w-full flex flex-wrap justify-around gap-8">
      <div v-if="tests.length === 0">
        <svg-icon type="mdi" :path="mdiLoading" class="animate-spin text-gray-500 size-20" />
      </div>
      <div
        v-else
        v-for="(test, index) in tests"
        :key="test.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition w-full sm:w-[70%] md:w-[40%] lg:w-[30%] xl:w-[23%]"
      >
        <router-link :to="{ name: 'CurrentTest', params: { id: test.id } }" class="block">
          <div class="p-4">
            <h2 class="pb-3">Лекция {{ index + 1 }}</h2>
            <h3 class="font-bold text-green-600 text-2xl mb-2">{{ test.title }}</h3>
            <p>{{ test.description }}</p>
          </div>
        </router-link>
      </div>

    </div>
  </main>
</template>
  

<script>
import { mdiLoading } from '@mdi/js'

export default {
    data() {
        return {
            mdiLoading,
            tests: []
        };
    },
    mounted() {
        this.$axios.get('https://api.arch-pc.ru/api/tests')
        .then(response => {
            this.tests = response.data;
        })
        .catch(error => {
            console.error(error);
        });
    }
}
</script>