const STORE = [
    {
      question :'Who of the following were not in Led Zepplin',
      answers: [ 'Jimmy Page','John Entwhistle','John Pauljones','John Bonham'],
      correct: 1,
  
    },
    {
      question: 'Who was the first singer of Pink Floyd?',
      answers:['Roger Waters','Syd Barret', 'David Gilmour','Rick Wright'],
      correct: 1,
  
    },
    {
      question: 'Who is famous for burning his guitar?',
      answers: ['Jimi Hendrix','Pete Townshend','Jimmy Page','Keith Richards'],
      correct: 0,
      },
      {
      question:'What Jimi Hendrix song says \"Scuse me while I kiss the sky?\"',
      answers:['Foxy Lady','The Wind Cries Mary','Purple Haze','Castles Made of Sand'],
      correct:2,
      },
    {
      question:'What do Keith Moon and John Bonham NOT have in common?',
      answers:['They are drummers','They\'re great singers','They died before all other members of their bands', 'They\'re British'],
      correct: 1,
    },
    {
      question:'What was the name of Led Zeppelin\'s second album?',
      answers:['Houses of the Holy','Whole Lotta Love','Led Zeppelin II','Heartbreaker'],
      correct: 2,
    },
    {
      question:'Who\'s guitar looks like a black and white bullseye?',
      answers:['Jimmy Page','Slash','Zakk Wylde','Tony Iommi'],
      correct:2,
    },
    {
      question:'Which member of Pink Floyd died in 2008?',
      answers:['Roger Waters','Rick Wright','Nick Mason','David Gilmour'],
      correct: 1
    },
    {
      question:'How did Freddie Mercury die?',
      answers:['AIDS','Cancer','Drug Overdose','Alcohol Poisoning'],
      correct: 0
    },
    {
      question:'What was the real name of the Beatles\' drummer?',
      answers:['Richard Starr','Rick Starrsky','Ringo Starr','Richard Stareky'],
      correct: 1
    }
  ]
  
  let questionNumber = 0;
  let testScore= 0;
  
  
  // handleStartButton
  function handleStartQuiz() {
    $('.quiz-container').on('click','.startButton', function(e){
      $('quiz-container').html(renderQuestion())
      $('.quiz-info').css('display','block');
    })
  }
  
  
  // startTheQuiz
  // changes the HTML from the intro screen to the question container
  
  
  
  // generateHTMLQuestion - would include the question answer options
  function generateHTMLQuestion(){
    if (questionNumber < STORE.length) {
      return `<div class="question-${questionNumber}" id=${questionNumber}>
      <h2>${STORE[questionNumber].question}</h2>
      <form class="quiz-form">
        <fieldset>
          <label class="answer-option">
            <input type="radio" value="${STORE[questionNumber].answers[0]}" id=0 name="answer" required>
            <span>${STORE[questionNumber].answers[0]}</span>
          </label>
          <label class="answer-option">
            <input type="radio" value="${STORE[questionNumber].answers[1]}" id=1 name="answer" required>
            <span>${STORE[questionNumber].answers[1]}</span>
          </label>
          <label class="answer-option">
            <input type="radio" value="${STORE[questionNumber].answers[2]}" id=2 name="answer" required>
            <span>${STORE[questionNumber].answers[2]}</span>
          </label>
          <label class="answer-option">
            <input type="radio" value="${STORE[questionNumber].answers[3]}" id=3 name="answer" required>
            <span>${STORE[questionNumber].answers[3]}</span>
          </label>
          <button type="submit" class="submit-button">Submit</button>
        </fieldset>
      </form>
      </div>`;
    }else{
      handleFinalQuizResults();
      handleQuizRestart();
    }
  } 
  
  // renderQuestion
  function renderQuestion(){
    $('.quiz-container').html(generateHTMLQuestion());
  }
  
  
  //handleAnswerSubmitButton
  function handleAnswerSubmitButton(){
    $('.quiz-container').on('submit','.quiz-form',function(e){
      e.preventDefault();
      // target the select element - target the option selected - capture the id
      const answerId = $(this).find('input[name=answer]:checked').attr('id');
      console.log(answerId);
      // compare that id with the correct answer
      const correctAnswer = STORE[questionNumber].correct;
      if (answerId == correctAnswer){
        generateCorrectAnswerFeedback();
      } else {
        generateIncorrectAnswerFeedback()
      }
      
    })
  }
  //generateAnswerFeedback correct and incorrect response functions
  function generateCorrectAnswerFeedback(){
    $('.quiz-container').html(correctTemplate())
    updateTestScore();
  }
  
  function correctTemplate(){
   return '<p><b>You Rock!!</b></p><button type=button class="nextButton">Next</button></div>'
  }
  function generateIncorrectAnswerFeedback(){
  $('.quiz-container').html(incorrectTemplate())
  }
  
  function incorrectTemplate(){
    const questionObject = STORE[questionNumber];
    const position = questionObject.correct;
    const correctAnswersArray = questionObject.answers;
    return `<p><b>Thats not right</b></p><p>The right answer was: ${correctAnswersArray[position]}</p><button type=button class="nextButton">Next</button></div>`
  }
  
  function nextQuestionNumber(){
   questionNumber++;
  }
  
  function renderNextQuestion(){
    $('.quiz-container').on('click', '.nextButton', function(e){
      console.log('next clicked')
      nextQuestionNumber();
      renderQuestion();
      renderUpdatedQuizInfo();
    })
  }
  
  function renderUpdatedQuizInfo() {
    renderUpdatedQuestionNumber()
    renderUpdatedScore()
  }
  
  function renderUpdatedQuestionNumber(){
    console.log(questionNumber);
    if (questionNumber < 10) {
      $('.current-question').text(`Question: ${questionNumber+1}/10`)
    }
  }
  
  function renderUpdatedScore(){
  $('.current-score').text(`Score: ${testScore}/10`)
  }
  
  //updateTestScore
  function updateTestScore(){
    testScore++;
  }
  
  //handleFinalQuizResults
  function handleFinalQuizResults(){
    if(testScore >= 8){
      $('.quiz-container').html(`<div class='correctFeedback'><h3>ROCK ON!!</h3><p>You scored ${testScore} points</p><p>You know your Rock and Roll!</p><button class="restartButton">Restart Quiz</button></div> `)
    }else if(testScore <8 && testScore >= 5){
      $('.quiz-container').html(`<div class= 'correctFeedback'><h3>Good work</h3><p>You scored ${testScore} points</p><p>You're pretty good but could be better</p><button class="restartButton">Restart Quiz</button></div> `)
    }else{
      $('.quiz-container').html(`<div class= 'correctFeedback'><h3>Sorry you don't rock</h3><p>You scored ${testScore} points</p><p>Dust off those old records and brush up on your rock knowledge</p><button class="restartButton">Restart Quiz</button></div> `)
    }
  }
  
  //handleQuizRestart
  function handleQuizRestart(){
    $('.quiz-container').on('click', '.restartButton', function(e){
      console.log('here');
      console.log('quiz restart', questionNumber)
      questionNumber = 0;
      testScore = 0;
      console.log('quiz restart', questionNumber)
      renderUpdatedQuizInfo()
      $('quiz-container').html(renderQuestion())
      $('.quiz-info').css('display','block');
    })
  }
  
  function bindEventListeners() {
    handleStartQuiz()
    handleAnswerSubmitButton()
    renderNextQuestion()
  }
  
  $(bindEventListeners())
  
  
  
  
  
