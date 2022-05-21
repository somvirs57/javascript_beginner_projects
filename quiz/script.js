const quiz = [
  {
    id: 1,
    ques: 'Who invented the Light Bulb?',
    ans: 'Thomas Alva Edison',
    options: [
      'Thomas Alva Edison',
      'Michael Faraday',
      'Ben Franklin',
      'Isaac Newton',
    ],
  },
  {
    id: 2,
    ques: 'Who successfully built and flew the world’s first Aeroplane?',
    ans: 'The Wright Brothers',
    options: [
      'Alexander Graham Bell',
      'Bishop Milton Wright',
      'The Wright Brothers',
      'Georgy Langemak',
    ],
  },
  {
    id: 3,
    ques: 'The largest 4 digit number is?',
    ans: '9999',
    options: ['0000', '1000', '1111', '9999'],
  },
  {
    id: 4,
    ques: 'Who are the founders of Google?',
    ans: 'Larry Page and Sergey Brin',
    options: [
      'Larry Page',
      'Larry Page and Sergey Brin',
      'Sergey Brin',
      'Steve Jobs',
    ],
  },
  {
    id: 5,
    ques: 'Which is the longest river on Earth?',
    ans: 'Nile river',
    options: ['River Ganga', 'Amazon River', 'Angel Falls', 'Nile river'],
  },
];

class Quiz {
  constructor() {
    this.quiz = quiz;

    // Quiz Starting info
    this.quizStartText = document.querySelector('.game-start-container');
    this.quizStartBtn = document.querySelector('.quiz-start-btn');

    // Quiz components
    this.curQues = document.querySelector('.cur-question');
    this.totalQues = document.querySelector('.total-question');
    this.quizCard = document.querySelector('.quiz-card');
    this.quesText = document.querySelector('.question');
    this.options = document.querySelectorAll('.option-label');
    this.optText1 = document.getElementById('opt1');
    this.optText2 = document.getElementById('opt2');
    this.optText3 = document.getElementById('opt3');
    this.optText4 = document.getElementById('opt4');
    this.optTexts = [
      this.optText1,
      this.optText2,
      this.optText3,
      this.optText4,
    ];
    this.opt1 = document.getElementById('op_a');
    this.opt2 = document.getElementById('op_b');
    this.opt3 = document.getElementById('op_c');
    this.opt4 = document.getElementById('op_d');
    this.optionLabels = [this.opt1, this.opt2, this.opt3, this.opt4];
    this.progressBar = document.querySelector('.progress-bar');

    // actions
    this.nextBtn = document.querySelector('.next-btn');
    this.submitBtn = document.querySelector('.submit-btn');

    // helpers
    this.quesCounter = 0;
    this.progressStep = 100 / this.quiz.length;
    this.progress = this.progressStep;
    this.quizScore = 0;

    // quiz result
    this.gameOverScreen = document.querySelector('.game-over-container');
    this.quizResultScore = document.querySelector('.quiz-result-score');
    this.quizResultTotal = document.querySelector('.quiz-result-total');
    this.retakeBtn = document.querySelector('.retake-btn');

    this.quizStartBtn.addEventListener('click', this.startQuiz.bind(this));
  }
  /* process */
  // start the quiz
  // add question to the screen, populate options and ready the options
  // select relevant option by clicking or typing appropriate letters (A, B, C, D)
  // capture answer, check for answer and go to next question
  // repeat for all questions
  // show result and retake option on final screen
  // retake will get the app to initial state

  startQuiz() {
    this.quizStartText.classList.add('hidden');

    this.quizCard.classList.remove('hidden');
    this.addQuestion(this.quiz[this.quesCounter], this.quiz.length);
    this.progressBar.style.width = `${this.progress}%`;

    // used for retake option but better to add hidden class on these buttons
    this.submitBtn.classList.add('hidden');
    this.nextBtn.classList.remove('hidden');
  }
  addQuestion(ques, totalQues) {
    this.quesText.textContent = ques.ques; //put ques, question no., total questions and options
    this.curQues.textContent = ques.id;
    this.totalQues.textContent = totalQues;
    for (let i = 0; i < ques.options.length; i++) {
      this.optTexts[i].textContent = ques.options[i];
    }
    this.quesCounter++; // increase counter for next question
  }
  readyOptions() {
    this.optionLabels.forEach(op => {
      op.addEventListener('click', e => {
        if (op.classList.contains('option-active-label')) {
          op.classList.remove('option-active-label');
        } else {
          op.classList.add('option-active-label');
          this.optionLabels.forEach(otherOp => {
            if (otherOp.id !== op.id) {
              otherOp.classList.remove('option-active-label');
            }
          });
        }
      });
    });
  }
  keyOptions() {
    document.addEventListener('keydown', e => {
      const keyCheck =
        e.key === 'a' ||
        e.key === 'A' ||
        e.key === 'b' ||
        e.key === 'B' ||
        e.key === 'c' ||
        e.key === 'C' ||
        e.key === 'd' ||
        e.key === 'D';
      if (keyCheck) {
        this.selectOption(e.key);
      } else if (e.key === 'Enter') {
        if (!this.nextBtn.classList.contains('hidden')) {
          this.nextBtn.click();
        } else if (
          this.nextBtn.classList.contains('hidden') &&
          !this.submitBtn.classList.contains('hidden')
        ) {
          this.submitBtn.click();
        }
      }
    });
  }
  selectOption(opt) {
    const checkId = `op_${opt.toLowerCase()}`;
    this.options.forEach(op => {
      if (checkId === op.id) {
        op.classList.add('option-active-label');
      } else {
        op.classList.remove('option-active-label');
      }
    });
  }
  captureAnswer() {
    const selectedLabel = document.getElementsByClassName(
      'option-active-label'
    )[0];
    if (selectedLabel) {
      const selectedAnswer = selectedLabel.children[0].innerText; //
      if (selectedAnswer == this.quiz[this.quesCounter - 1].ans) {
        this.quizScore++;
      }
    }
    console.log(selectedLabel, this.quizScore);
  }
  nextQuestion() {
    if (this.quesCounter < this.quiz.length - 1) {
      this.addQuestion(this.quiz[this.quesCounter], this.quiz.length);
    } else {
      this.addQuestion(this.quiz[this.quesCounter], this.quiz.length);
      this.nextBtn.classList.add('hidden'); // remove next button after all questions
      this.submitBtn.classList.remove('hidden');
    }
    this.progress += this.progressStep;
    this.progressBar.style.width = `${this.progress}%`;
  }
  endQuiz() {
    this.quizCard.classList.add('hidden');
    this.gameOverScreen.classList.remove('hidden');
    this.quizResultScore.innerText = this.quizScore;
    this.quizResultTotal.innerText = this.quiz.length;
  }
  resetQuiz() {
    this.gameOverScreen.classList.add('hidden');
    this.quizStartText.classList.remove('hidden');
    this.quesCounter = 0;
    this.progressStep = 100 / this.quiz.length;
    this.progress = this.progressStep;
    this.quizScore = 0;
  }

  displayQuiz() {
    this.readyOptions();
    this.keyOptions();
    this.nextBtn.addEventListener('click', () => {
      this.captureAnswer();
      this.nextQuestion();
    });
    this.submitBtn.addEventListener('click', () => {
      this.captureAnswer();
      this.endQuiz();
    });
    this.retakeBtn.addEventListener('click', () => {
      this.resetQuiz();
    });
  }
}

const sample = new Quiz();
sample.displayQuiz();
