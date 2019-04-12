<template>
  <div class="question card">
    <div v-if="!isEditing">{{question.question}}</div>
    <input v-show="isEditing" type="text" v-model="content" ref="questioninput" />
    <ul>
      <li v-for="(answerChoice, choiceIndex) in question.answerChoices" :key="answerChoice._id">
        <span v-if="!isEditing" :class="{ correct: answerChoice.correct}">
          {{answerChoice.answer}}
        </span>
        <input v-if="isEditing" type="text" v-model="options[choiceIndex].answer" :key="answerChoice._id"/>
      </li>
    </ul>
    <transition-group name="icons" class="bottom-row">
      <i class="fas fa-save" v-show="isEditing" @click="save" key="1"></i>
      <i :class="{'fas fa-edit': !isEditing, 'fas fa-ban': isEditing}" @click="toggleEditing" key="3"></i>
    </transition-group>
  </div>
</template>

<script>
  const fireConst = require('../firebase/firebaseConfig.js')

  export default {
    props: ['question'],
    data () {
      // console.log(this.props)
      return {
        isEditing: false,
        content: this.question.question,
        options: this.question.answerChoices
      }
    },
    methods: {
      toggleEditing () {
        if (!this.isEditing) {
          this.$nextTick(() => {
            this.$nextTick(() => this.$refs.questioninput.focus());
          });
        }
        this.isEditing = !this.isEditing
      },
      async save () {
        const patch = {
          question: this.content,
          answerChoices: this.options
        };
        try {
          await fireConst.db.collection(this.question.subject).doc(this.question._id).update(patch)
        } catch (e) {
          console.log('Error: ' + e)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-row{
    display: flex;
    justify-content: flex-end;
  }
  i{
    padding: 1rem;
    font-size: 2.5rem;
  }

  .question{
    display:inline-block;
    width:100%;
    max-width: 450px;
  }
  .correct{
    color: #8CD790;
    font-weight: bold;
  }
  .icons-enter-active, .icons-leave-to{
    transition: all 0.5s;
  }
  .icons-enter, .icons-leave-to{
    opacity: 0;
  }
  input{
    border: none;
    box-shadow: none;
  }
</style>
