// Quiz questions data
const quizData = {
    general: [
        {
            question: "What is the capital of France?",
            options: ["London", "Berlin", "Paris", "Madrid"],
            correct: 2,
            explanation: "Paris is the capital and most populous city of France."
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            correct: 1,
            explanation: "Mars is often called the Red Planet due to its reddish appearance caused by iron oxide on its surface."
        },
        {
            question: "What is the largest mammal in the world?",
            options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
            correct: 1,
            explanation: "The Blue Whale is the largest mammal on Earth, reaching up to 100 feet in length."
        },
        {
            question: "Who painted the Mona Lisa?",
            options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            correct: 2,
            explanation: "Leonardo da Vinci painted the Mona Lisa between 1503 and 1506."
        },
        {
            question: "What is the chemical symbol for gold?",
            options: ["Go", "Gd", "Au", "Ag"],
            correct: 2,
            explanation: "Au is the chemical symbol for gold, derived from the Latin word 'aurum'."
        },
        {
            question: "Which country is known as the Land of the Rising Sun?",
            options: ["China", "Thailand", "Japan", "South Korea"],
            correct: 2,
            explanation: "Japan is called the Land of the Rising Sun because from China, the sun appears to rise from the direction of Japan."
        },
        {
            question: "What is the hardest natural substance on Earth?",
            options: ["Gold", "Iron", "Diamond", "Platinum"],
            correct: 2,
            explanation: "Diamond is the hardest known natural material on Earth."
        },
        {
            question: "How many continents are there?",
            options: ["5", "6", "7", "8"],
            correct: 2,
            explanation: "There are 7 continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia."
        },
        {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correct: 3,
            explanation: "The Pacific Ocean is the largest and deepest ocean on Earth."
        },
        {
            question: "Which animal is known as the 'King of the Jungle'?",
            options: ["Tiger", "Lion", "Elephant", "Gorilla"],
            correct: 1,
            explanation: "The lion is traditionally called the 'King of the Jungle', though lions actually live in grasslands and savannas."
        }
    ],
    science: [
        {
            question: "What is the chemical symbol for water?",
            options: ["H2O", "O2", "CO2", "NaCl"],
            correct: 0,
            explanation: "H2O is the chemical formula for water, representing two hydrogen atoms and one oxygen atom."
        },
        {
            question: "Which gas do plants absorb from the atmosphere?",
            options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
            correct: 2,
            explanation: "Plants absorb carbon dioxide during photosynthesis to produce glucose and oxygen."
        },
        {
            question: "What is the speed of light?",
            options: ["299,792 km/s", "150,000 km/s", "1,000,000 km/s", "500,000 km/s"],
            correct: 0,
            explanation: "The speed of light in vacuum is exactly 299,792 kilometers per second."
        },
        {
            question: "Which planet has the most moons?",
            options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
            correct: 1,
            explanation: "Saturn currently has the most moons with over 140 confirmed natural satellites."
        },
        {
            question: "What is the main gas found in the Earth's atmosphere?",
            options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
            correct: 2,
            explanation: "Nitrogen makes up about 78% of the Earth's atmosphere."
        }
    ],
    history: [
        {
            question: "In which year did World War II end?",
            options: ["1944", "1945", "1946", "1947"],
            correct: 1,
            explanation: "World War II ended in 1945 with the surrender of Germany in May and Japan in September."
        },
        {
            question: "Who was the first President of the United States?",
            options: ["Thomas Jefferson", "John Adams", "George Washington", "James Madison"],
            correct: 2,
            explanation: "George Washington served as the first President of the United States from 1789 to 1797."
        },
        {
            question: "Which ancient civilization built the Machu Picchu?",
            options: ["Aztecs", "Mayans", "Incas", "Egyptians"],
            correct: 2,
            explanation: "Machu Picchu was built by the Inca civilization in the 15th century."
        },
        {
            question: "When was the Declaration of Independence signed?",
            options: ["1774", "1775", "1776", "1777"],
            correct: 2,
            explanation: "The Declaration of Independence was signed on July 4, 1776."
        },
        {
            question: "Who discovered America?",
            options: ["Vasco da Gama", "Christopher Columbus", "Ferdinand Magellan", "Marco Polo"],
            correct: 1,
            explanation: "Christopher Columbus reached the Americas in 1492, though Vikings and indigenous peoples were there earlier."
        }
    ]
};

// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');

const startBtn = document.getElementById('start-btn');
const usernameInput = document.getElementById('username');
const categoryOptions = document.querySelectorAll('.category-option');
const totalQuestionsDisplay = document.getElementById('total-questions-display');

// Quiz state variables
let currentCategory = 'general';
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let userAnswers = [];
let userScores = []; // Track scores per question
let quizQuestions = [];
let quizStartTime = 0;
let resultsData = {};
let answerSelected = false; // Track if answer has been selected for current question

// Initialize the application
function init() {
    // Set up event listeners
    startBtn.addEventListener('click', startQuiz);
    
    // Category selection
    categoryOptions.forEach(option => {
        option.addEventListener('click', () => {
            categoryOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            currentCategory = option.getAttribute('data-category');
            updateQuestionCount();
        });
    });
    
    // Set default category and update question count
    document.querySelector('.category-option[data-category="general"]').classList.add('active');
    updateQuestionCount();
}

// Update question count based on category
function updateQuestionCount() {
    const questions = quizData[currentCategory];
    totalQuestionsDisplay.textContent = questions.length;
}

// Start the quiz
function startQuiz() {
    const username = usernameInput.value.trim() || 'Quiz Master';
    
    // Get questions for selected category
    quizQuestions = quizData[currentCategory];
    
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    userAnswers = new Array(quizQuestions.length).fill(null);
    userScores = new Array(quizQuestions.length).fill(0); // Initialize scores array
    quizStartTime = Date.now();
    answerSelected = false;
    
    // Switch to quiz screen
    welcomeScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    // Initialize quiz screen
    initializeQuizScreen(username);
    
    // Start timer and display first question
    startTimer();
    displayQuestion();
}

// Initialize quiz screen elements
function initializeQuizScreen(username) {
    // Set player name
    document.getElementById('player-name').textContent = username;
    
    // Reset score display
    document.getElementById('current-score').textContent = '0';
    
    // Reset timer display
    document.getElementById('time').textContent = '30';
    
    // Get and set up quiz controls
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    // Remove existing event listeners by cloning and replacing
    const newPrevBtn = prevBtn.cloneNode(true);
    const newNextBtn = nextBtn.cloneNode(true);
    const newSubmitBtn = submitBtn.cloneNode(true);
    
    prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
    submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
    
    // Add new event listeners
    newPrevBtn.addEventListener('click', showPreviousQuestion);
    newNextBtn.addEventListener('click', showNextQuestion);
    newSubmitBtn.addEventListener('click', showResults);
}

// Display current question
function displayQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    answerSelected = false; // Reset for new question
    
    // Update question number and text
    document.getElementById('question-number').textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    document.getElementById('question-text').textContent = question.question;
    
    // Update progress bar
    const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    document.getElementById('quiz-progress').style.width = `${progressPercent}%`;
    
    // Clear previous options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    // Create option elements
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        
        // Mark if this option was previously selected
        if (userAnswers[currentQuestionIndex] === index) {
            optionElement.classList.add('selected');
            // If we're revisiting a question, show the feedback
            if (userAnswers[currentQuestionIndex] !== null) {
                showAnswerFeedback(optionElement, index);
            }
        }
        
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = currentQuestionIndex === quizQuestions.length - 1;
    submitBtn.style.display = currentQuestionIndex === quizQuestions.length - 1 ? 'block' : 'none';
    
    // Reset timer for new question
    resetTimer();
}

// Select an option
function selectOption(optionIndex) {
    if (answerSelected) return; // Prevent multiple selections
    
    const options = document.querySelectorAll('.option');
    const selectedOption = options[optionIndex];
    const question = quizQuestions[currentQuestionIndex];
    
    // Remove selected class from all options
    options.forEach(option => option.classList.remove('selected'));
    
    // Add selected class to clicked option
    selectedOption.classList.add('selected');
    
    // Store user's answer
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Show immediate feedback
    showAnswerFeedback(selectedOption, optionIndex);
    
    // Update score
    updateScore(optionIndex, question.correct);
    
    answerSelected = true;
}

// Show immediate feedback for selected answer
function showAnswerFeedback(selectedOption, selectedIndex) {
    const options = document.querySelectorAll('.option');
    const question = quizQuestions[currentQuestionIndex];
    
    // Show correct answer in green
    options[question.correct].classList.add('correct');
    
    // If wrong answer selected, show it in red
    if (selectedIndex !== question.correct) {
        selectedOption.classList.add('incorrect');
    }
    
    // Disable all options after selection
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
}

// Update score based on answer
function updateScore(selectedIndex, correctIndex) {
    const questionValue = 10;
    
    if (selectedIndex === correctIndex) {
        // Add points only if not already scored for this question
        if (userScores[currentQuestionIndex] === 0) {
            score += questionValue;
            userScores[currentQuestionIndex] = questionValue;
            document.getElementById('current-score').textContent = score;
            
            // Show success message
            showTemporaryMessage('Correct! +10 points', 'success');
        }
    } else {
        // Show error message for wrong answer
        showTemporaryMessage('Incorrect! The right answer is highlighted in green.', 'error');
        
        // Ensure score is not set for wrong answers
        userScores[currentQuestionIndex] = 0;
    }
}

// Show temporary message
function showTemporaryMessage(message, type) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.temp-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageElement = document.createElement('div');
    messageElement.className = `temp-message ${type}`;
    messageElement.textContent = message;
    messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: bold;
        z-index: 1000;
        animation: slideDown 0.3s ease-out;
        background-color: ${type === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${type === 'success' ? '#155724' : '#721c24'};
        border: 2px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
    `;
    
    document.body.appendChild(messageElement);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 3000);
}

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Show previous question
function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

// Show next question
function showNextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
}

// Reset timer for new question
function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    const timeDisplay = document.getElementById('time');
    timeDisplay.textContent = timeLeft;
    timeDisplay.classList.remove('warning');
    startTimer();
}

// Start the quiz timer
function startTimer() {
    const timeDisplay = document.getElementById('time');
    
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        
        // Add warning class when time is running low
        if (timeLeft <= 10) {
            timeDisplay.classList.add('warning');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            // Auto move to next question or submit if last question
            if (currentQuestionIndex < quizQuestions.length - 1) {
                // Mark as unanswered if no answer selected
                if (userAnswers[currentQuestionIndex] === null) {
                    userScores[currentQuestionIndex] = 0;
                    showTemporaryMessage('Time\'s up! Moving to next question.', 'error');
                }
                currentQuestionIndex++;
                displayQuestion();
            } else {
                showResults();
            }
        }
    }, 1000);
}

// Show quiz results
function showResults() {
    clearInterval(timer);
    
    // Calculate time taken
    const timeElapsed = Math.floor((Date.now() - quizStartTime) / 1000);
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    const timeDisplayText = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
    
    // Calculate final score and correct answers
    let correctCount = 0;
    quizQuestions.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            correctCount++;
        }
    });
    
    // Store results data for review screen
    resultsData = {
        score: score,
        correctCount: correctCount,
        totalQuestions: quizQuestions.length,
        timeDisplay: timeDisplayText,
        percentage: (correctCount / quizQuestions.length) * 100
    };
    
    // Create results screen
    createResultsScreen();
    
    // Switch to results screen
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
}

// Create results screen
function createResultsScreen() {
    const percentage = resultsData.percentage;
    let feedbackMessage, feedbackClass;
    
    if (percentage >= 80) {
        feedbackMessage = "Excellent! You're a quiz master!";
        feedbackClass = "excellent";
    } else if (percentage >= 60) {
        feedbackMessage = "Good job! You know your stuff!";
        feedbackClass = "good";
    } else {
        feedbackMessage = "Keep practicing! You'll get better!";
        feedbackClass = "average";
    }
    
    resultsScreen.innerHTML = `
        <div class="results-container">
            <h2>Quiz Results</h2>
            
            <div class="score-card">
                <div class="score-circle">
                    <span id="final-score">${resultsData.score}</span>
                    <div class="score-label">Score</div>
                </div>
                
                <div class="score-details">
                    <div class="detail-item">
                        <span class="detail-label">Correct Answers:</span>
                        <span id="correct-answers">${resultsData.correctCount}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Total Questions:</span>
                        <span id="total-questions">${resultsData.totalQuestions}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Time Taken:</span>
                        <span id="time-taken">${resultsData.timeDisplay}</span>
                    </div>
                </div>
            </div>

            <div class="feedback ${feedbackClass}" id="feedback-message">
                ${feedbackMessage}
            </div>

            <div class="results-controls">
                <button id="review-btn" class="btn btn-secondary">Review Answers</button>
                <button id="restart-btn" class="btn btn-primary">Try Again</button>
            </div>
        </div>
    `;
    
    // Add event listeners to results screen buttons
    document.getElementById('review-btn').addEventListener('click', showReviewScreen);
    document.getElementById('restart-btn').addEventListener('click', restartQuiz);
}

// Show review screen with all questions and answers
function showReviewScreen() {
    const reviewHTML = `
        <div class="review-screen">
            <h2>Quiz Review</h2>
            <div class="review-summary">
                <div class="summary-item">
                    <span class="summary-label">Final Score:</span>
                    <span class="summary-value">${resultsData.score}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Correct Answers:</span>
                    <span class="summary-value">${resultsData.correctCount}/${resultsData.totalQuestions}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Time Taken:</span>
                    <span class="summary-value">${resultsData.timeDisplay}</span>
                </div>
            </div>
            <div class="questions-review" id="questions-review">
                ${generateReviewQuestionsHTML()}
            </div>
            <div class="review-controls">
                <button id="back-to-results" class="btn btn-secondary">Back to Results</button>
                <button id="new-quiz" class="btn btn-primary">New Quiz</button>
            </div>
        </div>
    `;
    
    // Replace results screen content with review
    resultsScreen.innerHTML = reviewHTML;
    
    // Add event listeners for review controls
    document.getElementById('back-to-results').addEventListener('click', () => {
        createResultsScreen();
    });
    
    document.getElementById('new-quiz').addEventListener('click', restartQuiz);
}

// Generate HTML for review questions
function generateReviewQuestionsHTML() {
    let html = '';
    
    quizQuestions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correct;
        const userAnswerText = userAnswer !== null ? question.options[userAnswer] : "Not answered";
        const correctAnswerText = question.options[question.correct];
        const scoreForQuestion = userScores[index] || 0;
        
        html += `
            <div class="review-question ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="question-header">
                    <h3>Question ${index + 1}</h3>
                    <span class="status ${isCorrect ? 'correct' : 'incorrect'}">
                        ${isCorrect ? '✓ Correct +10 points' : '✗ Incorrect +0 points'}
                    </span>
                </div>
                <div class="question-text">${question.question}</div>
                <div class="answer-comparison">
                    <div class="answer-item">
                        <span class="answer-label">Your Answer:</span>
                        <span class="answer-text user-answer">${userAnswerText}</span>
                    </div>
                    ${!isCorrect ? `
                    <div class="answer-item">
                        <span class="answer-label">Correct Answer:</span>
                        <span class="answer-text correct-answer">${correctAnswerText}</span>
                    </div>
                    ` : ''}
                </div>
                <div class="explanation">
                    <strong>Explanation:</strong> ${question.explanation}
                </div>
            </div>
        `;
    });
    
    return html;
}

// Restart the quiz
function restartQuiz() {
    // Reset to welcome screen
    resultsScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
    
    // Clear username input
    usernameInput.value = '';
    
    // Reset category selection
    categoryOptions.forEach(opt => opt.classList.remove('active'));
    document.querySelector('.category-option[data-category="general"]').classList.add('active');
    currentCategory = 'general';
    updateQuestionCount();
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);