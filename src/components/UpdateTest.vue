<template>
    <div class="max-w-6xl mx-auto bg-white p-6 mb-5 rounded-lg shadow-md">
      <h2 class="text-3xl font-semibold text-green-500 mb-6">Обновление теста</h2>
      <form @submit.prevent="submitTest">
        <div class="mb-4">
          <label class="block text-lg font-medium text-gray-700">Название теста:</label>
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
            rows="6"
            class="mt-2 p-3 border border-gray-300 rounded-md w-full"
          ></textarea>
        </div>
  
        <div v-for="(question, qIndex) in test.questions" :key="qIndex" class="question-block mb-6">
          <h3 class="text-xl font-semibold text-gray-700">Вопрос {{ qIndex + 1 }}</h3>
  
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
              class="mt-2 p-3 border border-gray-300 rounded-md w-full"
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
                  true-value="1"
                  false-value="0"
                />
                <!-- Реши проблему нажатй -->
                <input
                  type="radio"
                  v-else
                  :name="'correct-' + qIndex"
                  :checked="answer.is_correct"
                  @change="setSingleCorrect(qIndex, aIndex)"
                />
              </label>
            </div>
            <button
              type="button"
              @click="removeAnswer(qIndex, aIndex)"
              class="mt-2 text-red-500 hover:text-red-700 font-semibold"
            >
              Удалить ответ
            </button>
          </div>
  
          <button
            type="button"
            @click="addAnswer(qIndex)"
            class="mt-4 text-green-500 hover:text-green-700 font-semibold"
          >
            Добавить ответ
          </button>
          <button
            type="button"
            @click="removeQuestion(qIndex)"
            class="mt-4 text-red-500 hover:text-red-700 font-semibold"
          >
            Удалить вопрос
          </button>
  
          <hr class="my-4" />
        </div>
  
        <button
          type="button"
          @click="addQuestion"
          class="mb-6 text-green-500 hover:text-green-700 font-semibold"
        >
          Добавить вопрос
        </button>
  
        <button
          type="submit"
          class="bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Изменить лекцию
        </button>
        <p v-if="message" class="text-green-500 font-semibold text-lg mt-4">{{ message }}</p>
      </form>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
        test: {
            title: '',
            description: '',
            lection: '',
            questions: []
        },
        message: null
        }
    },
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    mounted() {
        const sanctum_token = localStorage.getItem('sanctum_token');

        this.$axios.get(`/api/tests/${this.id}/edit`,
            {
                headers: {
                    'Authorization': `Bearer ${sanctum_token}`
                }
            }
        )
        .then(response => {
            this.test = response.data;
            console.log(this.test);
        })
        .catch(error => {
            console.error(error);
        });
        console.log(this.test);

    },
    methods: {
        addQuestion() {
        this.test.questions.push({
            title: '',
            text: '',
            type: 'one answer',
            answers: [{ title: '', is_correct: false }]
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

            this.$axios.patch(`/api/tests/${this.id}`, this.test, {
                headers: {
                    'Authorization': `Bearer ${sanctum_token}`
                }
            })
            .then(response => {
                console.log(response);
                this.message = response.data.message;
                console.log(this.test);
            })
            .catch(error => {
                console.log(error);
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
  font-weight: 600; /* font-semibold applied here */
}
</style>