<template>
    <div class="content-block">
      <h2 class="inline-block text-3xl text-green-500 mb-6">Создание лекции</h2>
      <router-link to="/user" class="float-right inline-block">X</router-link>
      <form @submit.prevent="submitTest">
        <div class="mb-4">
          <label class="block text-lg font-medium text-gray-700">Название лекции:</label>
          <input
            type="text"
            v-model="test.title"
            required
            class="mt-2 p-3 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div class="mb-4">
          <label class="block text-lg font-medium text-gray-700">Краткое описание:</label>
          <input
            type="text"
            v-model="test.description"
            required
            class="mt-2 p-3 border border-gray-300 rounded-md w-full"
          />
        </div>
  
        <div class="mb-4">
          <label class="block text-lg font-medium text-gray-700">Лекция:</label>
          <textarea
            v-model="test.lection"
            class="mt-2 p-3 border border-gray-300 rounded-md w-full"
          ></textarea>
        </div>
  
        <div v-for="(question, qIndex) in test.questions" :key="qIndex" class="question-block mb-6">
          <h3 class="text-xl text-gray-700">Вопрос {{ qIndex + 1 }}</h3>
  
          <div class="mb-4">
            <label class="block text-lg font-medium text-gray-700">Заголовок вопроса:</label>
            <input
              type="text"
              v-model="question.title"
              placeholder="Заголовок вопроса"
              required
              class="mt-2 p-3 border border-gray-300 rounded-md w-full"
            />
          </div>
  
          <div class="mb-4">
            <label class="block text-lg font-medium text-gray-700">Текст вопроса:</label>
            <textarea
              v-model="question.text"
              placeholder="Текст вопроса"
              required
              class="mt-2 p-3 border border-gray-300 rounded-md w-full"
            ></textarea>
          </div>
  
          <div class="mb-4">
            <label class="block text-lg font-medium text-gray-700">Тип ответа:</label>
            <select
              v-model="question.type"
              class="mt-2 p-3 border border-gray-300 rounded-md w-full cursor-pointer"
            >
              <option value="one answer">Один ответ</option>
              <option value="many answers">Несколько ответов</option>
            </select>
          </div>
  
          <div v-for="(answer, aIndex) in question.answers" :key="aIndex" class="mb-4">
            <div class="flex items-center">
              <input
                type="text"
                v-model="answer.title"
                placeholder="Вариант ответа"
                required
                class="mt-2 p-3 border border-gray-300 rounded-md w-full"
              />
  
              <label class="ml-2 text-lg">
                <input
                  type="checkbox"
                  v-if="question.type === 'many answers'"
                  v-model="answer.is_correct"
                  class="accent-green-400 mr-2"
                />
                <input
                  type="radio"
                  v-else
                  :name="'correct-' + qIndex"
                  :checked="answer.is_correct"
                  @change="setSingleCorrect(qIndex, aIndex)"
                  class="accent-green-400 mr-2"
                />
              </label>
            </div>
            <button
              type="button"
              @click="removeAnswer(qIndex, aIndex)"
              class="mt-4 text-red-500 hover:text-red-700 cursor-pointer"
            >
              Удалить ответ
            </button>
          </div>
  
          <button
            type="button"
            @click="addAnswer(qIndex)"
            class="mt-4 text-green-500 hover:text-green-700 cursor-pointer"
          >
            Добавить ответ
          </button>
          <ul v-if="validationErrors[`questions.${qIndex}.answers`]" class="mt-4 text-red-500">
            <li v-for="(err, index) in validationErrors[`questions.${qIndex}.answers`]">{{ err }}</li>
          </ul>
          <button
            type="button"
            @click="removeQuestion(qIndex)"
            class="mt-4 text-red-500 hover:text-red-700 cursor-pointer"
          >
            Удалить вопрос
          </button>
  
          <hr class="my-4" />
        </div>
  
        <button
          type="button"
          @click="addQuestion"
          class="mb-6 text-green-500 hover:text-green-700 cursor-pointer"
        >
          Добавить вопрос
        </button>
  
        <button
          type="submit"
          class="main-btn bg-green-400 text-white"
        >
          Сохранить лекцию
        </button>
      </form>
  
      <ul v-if="validationErrors.questions" class="mt-4 text-red-500">
        <li v-for="(err, index) in validationErrors.questions" :key="index">{{ err }}</li>
      </ul>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
        test: {
            title: '',
            lection: '',
            description: '',
            questions: []
        },
        validationErrors: {}
        }
    },
    methods: {
        addQuestion() {
          this.test.questions.push({
            title: '',
            text: '',
            type: 'one answer',
            answers: [{ title: '', is_correct: false }],
          });
        },
        removeQuestion(index) {
          this.test.questions.splice(index, 1);
        },
        addAnswer(qIndex) {
          this.test.questions[qIndex].answers.push({ title: '', is_correct: false });
        },
        removeAnswer(qIndex, aIndex) {
          this.test.questions[qIndex].answers.splice(aIndex, 1);
        },
        setSingleCorrect(qIndex, aIndex) {
          const answers = this.test.questions[qIndex].answers;
          answers.forEach((ans, i) => {
            ans.is_correct = i === aIndex;
          });
        },
        submitTest() {
          const sanctum_token = localStorage.getItem('sanctum_token');

          this.$axios.post('https://api.arch-pc.ru/api/tests', this.test, {
            headers: {
                'Authorization': `Bearer ${sanctum_token}`
            }
          })
          .then(response => {
            console.log(response);
            this.test = {
                title: '',
                lection: '',
                questions: []
            };
            console.log(this.test);
            this.$router.push('/user').then(() => {
                window.location.reload();
            });
          })
          .catch(error => {
            console.error(error.response.data.errors);
            this.validationErrors = error.response.data.errors;
            console.log(this.validationErrors);
          })
        }
    }
}
</script>

<style scoped>
.question-block {
  border-top: 1px solid #e2e2e2;
  padding-top: 16px;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: 600; /* applied here */
}
</style>