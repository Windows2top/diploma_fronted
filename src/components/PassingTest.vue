<template>
  <div class="min-h-[80vh]">
    <form v-if="testResult === null" @submit.prevent="submitTest" class="content-block">
      <div v-for="(question, qIndex) in questions" :key="qIndex" class="mb-6">
        <div class="mb-4">
          <p class="text-lg text-gray-600">Вопрос номер {{ qIndex + 1 }}</p>
          <h5 class="text-2xl font-semibold text-green-500">{{ question.title }}</h5>
          <p class="text-gray-700">{{ question.text }}</p>
        </div>

        <div v-for="(answer, aIndex) in question.answers" :key="aIndex" class="flex items-center mb-3">
          <!-- Радиокнопки -->
          <div v-if="question.type === 'one answer'" class="flex items-center">
            <input
              type="radio"
              :name="'question_' + qIndex"
              v-model="selectedRadios[qIndex]"
              :id="'answer_' + qIndex + '_' + aIndex"
              :value="answer.id"
              class="accent-green-400 mr-2"
            >
            <label :for="'answer_' + qIndex + '_' + aIndex" class="text-lg text-gray-800">{{ answer.title }}</label>
          </div>

          <!-- Чекбоксы -->
          <div v-else class="flex items-center">
            <input
              type="checkbox"
              v-model="selectedCheckboxes"
              :id="'answer_' + qIndex + '_' + aIndex"
              :value="answer.id"
              class="accent-green-400 mr-2"
            >
            <label :for="'answer_' + qIndex + '_' + aIndex" class="text-lg text-gray-800">{{ answer.title }}</label>
          </div>
        </div>
        <div class="border-b border-gray-300 my-4"></div>
      </div>

      <div class="flex justify-center">
        <button type="submit" class="main-btn bg-green-400 text-white font-bold">
          Результат
        </button>
      </div>
    </form>

    <p v-if="testResult !== null" class="text-center mt-6 text-xl">
      {{ testResult.message }}. Правильно отвечены {{ testResult.correct_questions }} из {{ testResult.total_questions }} вопросов
    </p>

    <div v-if="testResult !== null" class="text-center mt-6 min-h-[70vh]">
      <router-link to="/" class="text-green-500 font-semibold hover:underline">
        Вернуться на главную
      </router-link>
    </div>
  </div>
</template>
  
  <script>
  export default {
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        questions: [],
        selectedCheckboxes: [],
        selectedRadios: {},
        testResult: null
      };
    },
    mounted() {
      const token = localStorage.getItem('sanctum_token');
      if (!token) {
        this.$router.push('/registration');
      }
  
      this.$axios.get(`https://api.arch-pc.ru/api/tests/${this.id}/questions`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        this.questions = response.data;
      })
      .catch(error => {
        console.error(error);
      });
    },
    methods: {
      submitTest() {

        const selectedAnswers = [
          ...this.selectedCheckboxes,
          ...Object.values(this.selectedRadios)
        ];
  
        const payload = {
          test_id: this.id,
          answers: selectedAnswers
        };
  
        console.log('Отправляем на сервер:', payload);
  
        const token = localStorage.getItem('sanctum_token');
  
        this.$axios.post(`https://api.arch-pc.ru/api/tests/${this.id}/questions`, payload, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          console.log('Успешно отправлено!', response.data);
          this.testResult = response.data;

          // Сброс формы после отправки
          this.selectedCheckboxes = [];
          this.selectedRadios = {};
        })
        .catch(error => {
          console.log(error);
        });
      }
    }
  };
  </script>