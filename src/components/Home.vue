<template>
  <div>
    <div v-if="!authenticated">
      <h4>
        You are not logged in! Please <a @click="auth.login()">Log In</a> to continue.
      </h4>
      <h4>Get the <a href="https://play.google.com/apps/testing/com.swolebrain.kotlinquiz">Android App</a></h4>
    </div>
    <div v-if="authenticated" class="home-container">
      <!-- New Question -->
      <form class="create-question card" autocomplete="off">
        <h3>Create new Question</h3>
        <div class="form-group">
          <label for="q-text">Select Subject:</label>
          <select v-model="subject">
            <option selected value="kotlin_syntax">Kotlin Syntax</option>
            <option value="android">Android</option>
          </select>
        </div>
        <div class="form-group">
          <label for="q-text">Question Text:</label>
          <input type="text" id="q-text" v-model="newQuestionText" class="form-control" />
        </div>
        <div class="form-group">
          <span class="correct-check">
            <label for="correct0">Correct:</label>
            <input type="radio" name="correct-check" class="form-check-input" v-model="newQuestionAnswerChoices[0].correct" value="true">
          </span>
          <label for="q-ans0">Answer Choice 0:</label>
          <input type="text" id="q-ans0" v-model="newQuestionAnswerChoices[0].answer" class="form-control" />
        </div>
        <div class="form-group">
          <span class="correct-check">
            <label for="correct1">Correct:</label>
            <input type="radio" name="correct-check" class="form-check-input" v-model="newQuestionAnswerChoices[1].correct" value="true">
          </span>
          <label for="q-ans1">Answer Choice 1:</label>
          <input type="text" id="q-ans1" v-model="newQuestionAnswerChoices[1].answer" class="form-control" />
        </div>

        <div class="form-group">
          <span class="correct-check">
            <label for="correct2">Correct:</label>
            <input type="radio" name="correct-check" class="form-check-input" v-model="newQuestionAnswerChoices[2].correct" value="true">
          </span>
          <label for="q-ans2">Answer Choice 2:</label>
          <input type="text" id="q-ans2" v-model="newQuestionAnswerChoices[2].answer" class="form-control" placeholder="leave blank if doesn't apply" />
        </div>
        <div class="form-group">
          <span class="correct-check">
            <label for="correct3">Correct:</label>
            <input type="radio" name="correct-check" class="form-check-input" v-model="newQuestionAnswerChoices[3].correct" value="true">
          </span>
          <label for="q-ans3">Answer Choice 3:</label>
          <input type="text" id="q-ans3" v-model="newQuestionAnswerChoices[3].answer" class="form-control" placeholder="leave blank if doesn't apply" />
        </div>
        <div class="form-group">
          <span class="correct-check">
            <label for="correct4">Correct:</label>
            <input type="radio" name="correct-check" class="form-check-input" v-model="newQuestionAnswerChoices[4].correct" value="true">
          </span>
          <label for="q-ans4">Answer Choice 4:</label>
          <input type="text" id="q-ans4" v-model="newQuestionAnswerChoices[4].answer" class="form-control" placeholder="leave blank if doesn't apply" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary" @click="submitQuestion">Submit!</button>
        </div>
      </form>

      <!-- Existing questions -->
      <transition-group class="existing-questions" tag="div" name="list">
          <question-card
            v-for="question in questions"
            :auth="auth"
            :question="question"
            :key="question._id" />
      </transition-group>
    </div>
  </div>
</template>

<script>
  import {API_URL} from '../globals';
  import QuestionCard from './QuestionCard';

  export default {
    name: 'home',
    props: ['auth', 'authenticated'],
    components: {
      questionCard: QuestionCard
    },
    created () {
      this.fetchData();
    },
    data () {
      return {
        questions: [],
        newQuestionText: '',
        subject: 'kotlin_syntax',
        newQuestionAnswerChoices: [
          {answer: '', correct: false},
          {answer: '', correct: false},
          {answer: '', correct: false},
          {answer: '', correct: false},
          {answer: '', correct: false}
        ]
      }
    },
    methods: {
      fetchData () {
        if (!this.authenticated || !this.auth.isAuthenticated()) return;
        console.log('Fetching data with token', this.auth.getIdToken());
        fetch(API_URL, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + this.auth.getIdToken()
          }
        })
          .then(res => {
            console.log(res);
            res.headers.forEach(function (val, key) {
              console.log(key, '->', val);
            });
            if (res.status !== 200) throw new Error('Error: ' + res.status);
            if (res.headers.get('Content-Type').indexOf('json') !== -1) return res.json();
            return res.text();
          })
          .then(res => {
            console.log(res);
            if (Array.isArray(res)) this.questions = res;
          })
          .catch(err => {
            alert(err.message);
          });
      },
      submitQuestion () {
        if (!this.auth.isAuthenticated()) return;
        event.preventDefault();
        let newQuestion = {
          question: this.newQuestionText,
          answerChoices: this.newQuestionAnswerChoices.filter(
            ({answer, correct}, idx) => answer && answer.trim().length > 0
          ).map(
            ({answer, correct}, idx) => ({
              answer,
              correct: correct === 'true'
            })
          ),
          subject: this.subject,
          adaptive: false,
          questionType: 'mc'};
        fetch(API_URL, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + this.auth.getIdToken()
          },
          method: 'POST',
          body: JSON.stringify(newQuestion)
        })
          .then(res => {
            console.log(res);
            if (res.headers.get('Content-Type').indexOf('json') !== -1) return res.json();
            return res.text();
          })
          .then(res => {
            console.log(res);
            this.fetchData();
          })
          .catch(err => alert(err.message || err));
      }
    }
  }
</script>

<style>
  a {
    cursor: pointer;
  }
  .home-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  .create-question {
    align-self: flex-start;
    flex-basis: 360px;
  }
  .existing-questions {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    flex: 1;
  }
  .form-group{
    position:relative;
  }
  .correct-check {
    display:block;
    position:absolute;
    right: 0;
    top: 0;
  }
  .card {
    padding: 2rem;
    box-shadow: 0 1px 5px #333;
    margin: 2rem;
  }

  .list-enter-active {
    transition: all 1s;
  }
  .list-move {
    transition: transform 1s;
  }
  .list-enter /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(-60px);
  }
</style>

