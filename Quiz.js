const readline = require('readline');

const questions = [
  {
    question: 'What is the capital of France?',
    answers: ['a) Paris', 'b) London', 'c) Berlin', 'd) Rome'],
    correct: 'a'
  },
  {
    question: 'Which planet is known as the Red Planet?',
    answers: ['a) Earth', 'b) Mars', 'c) Venus', 'd) Jupiter'],
    correct: 'b'
  },
  {
    question: 'Who wrote "To be, or not to be"?',
    answers: ['a) Shakespeare', 'b) Hemingway', 'c) Twain', 'd) Dickens'],
    correct: 'a'
  },
  {
    question: 'What is the largest mammal in the world?',
    answers: ['a) Elephant', 'b) Blue Whale', 'c) Giraffe', 'd) Great White Shark'],
    correct: 'b'
  },
  {
    question: 'What is the chemical symbol for Gold?',
    answers: ['a) Ag', 'b) Au', 'c) Pb', 'd) Fe'],
    correct: 'b'
  },
  {
    question: 'In which year did the Titanic sink?',
    answers: ['a) 1912', 'b) 1905', 'c) 1898', 'd) 1920'],
    correct: 'a'
  },
  {
    question: 'What is the smallest prime number?',
    answers: ['a) 0', 'b) 1', 'c) 2', 'd) 3'],
    correct: 'c'
  },
  {
    question: 'Which gas do plants absorb from the atmosphere?',
    answers: ['a) Oxygen', 'b) Nitrogen', 'c) Carbon Dioxide', 'd) Hydrogen'],
    correct: 'c'
  },
  {
    question: 'What is the main ingredient in guacamole?',
    answers: ['a) Tomato', 'b) Avocado', 'c) Pepper', 'd) Onion'],
    correct: 'b'
  },
  {
    question: 'Who painted the Mona Lisa?',
    answers: ['a) Picasso', 'b) Van Gogh', 'c) Da Vinci', 'd) Monet'],
    correct: 'c'
  },
];

let score = 0;
let currentQuestionIndex = 0;
let quizTime = 100; 
const questionTime = 10; 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Timer functions
const startQuizTimer = () => {
  const quizInterval = setInterval(() => {
    if (quizTime <= 0) {
      clearInterval(quizInterval);
      endQuiz();
    } else {
      console.log(`Time remaining for the quiz: ${quizTime} seconds`);
      quizTime--;
    }
  }, 1000);
};

const askQuestion = () => {
  if (currentQuestionIndex < questions.length && quizTime > 0) {
    const question = questions[currentQuestionIndex];
    console.log(`\n${question.question}`);
    question.answers.forEach(answer => console.log(answer));
    
    let questionTimer = setTimeout(() => {
      console.log('Time is up for this question!');
      currentQuestionIndex++;
      askQuestion();
    }, questionTime * 1000);
    
    rl.question('Your answer (a, b, c, d): ', (answer) => {
      clearTimeout(questionTimer);
      if (answer.toLowerCase() === question.correct) {
        score++;
        console.log('Correct!');
      } else {
        console.log(`Wrong! The correct answer was ${question.correct}.`);
      }
      currentQuestionIndex++;
      askQuestion();
    });
  } else {
    endQuiz();
  }
};

const endQuiz = () => {
  console.log(`\nQuiz finished! Your score: ${score}/${questions.length}`);
  rl.close();
};

const startQuiz = () => {
  startQuizTimer();
  askQuestion();
};

startQuiz();
