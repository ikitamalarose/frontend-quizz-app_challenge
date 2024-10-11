import {
    getColorClass,
    getColorClassCard,
    removeSelectedClass,
    toggleOptionSelection,
    createCorrectIconElement,
    createIncorrectIconElement,
    markAsCorrect,
    markAsIncorrect,
    updateSubmitButtonText,
    toggleOptionClickability,
    fetchSubmitButtonText,
    clearQuizContent
} from "./utils.js";


let selectedOptionLabel = null;
let currentlySelectedOption = null;
let answer = null;

let currentQuestionIndex = 0;
let score = 0;

let current_data = null;
let questions_lenth = null;


/* Quiz content start */
function createContentQuestion(quiz, total_question, quizzes) {
    current_data = quizzes;
    questions_lenth = total_question;

    answer = quiz.answer;
    const letters = ['A', 'B', 'C', 'D'];
    const quiz__content = document.getElementById('quiz__content');

    const question_number = document.createElement('p');
    question_number.textContent = `Question ${currentQuestionIndex + 1} of ${total_question}`;
    question_number.classList.add('question-number');

    const question_text = document.createElement('p');
    question_text.textContent = `${quiz.question}`;
    question_text.classList.add('question-text');
    quiz__content.appendChild(question_number);
    quiz__content.appendChild(question_text);

    const question_options_container = document.createElement('div');
    question_options_container.classList.add('question-options-container');
    quiz__content.appendChild(question_options_container);

    let i = 0;
    quiz.options.forEach(element => {

        const question_option = document.createElement('div');
        question_option.classList.add('question-option');
        question_options_container.appendChild(question_option);

        question_option.addEventListener('click', function () {
            removeSelectedClass();
            handleOptionClick(question_option);
        });

        const question_option_letter = document.createElement('p');
        question_option_letter.textContent = letters[i];
        question_option_letter.classList.add('question-option-letter');
        question_option.appendChild(question_option_letter);

        const question_option_text = document.createElement('p');
        question_option_text.classList.add('question-option-text');
        question_option_text.textContent = element;
        question_option.appendChild(question_option_text);

        if (answer == element) {
            question_option.appendChild(createCorrectIconElement());
        } else {
            question_option.appendChild(createIncorrectIconElement());
        }
        i = i + 1;

    });

    const question_actions = document.createElement('div');
    question_actions.classList.add('question-actions');
    question_options_container.appendChild(question_actions);


    const question_submit_button = document.createElement('button');
    question_submit_button.textContent = "Submit Answer";
    question_submit_button.classList.add('question-submit-button');


    question_actions.appendChild(question_submit_button);

    question_actions.addEventListener('click', function () {
        isCorrectAnswer(currentlySelectedOption);
        toggleOptionClickability();
    });
}

function handleOptionClick(question_option) {
    const selectedOptionLabelText = question_option.querySelector('.question-option-text').textContent;

    currentlySelectedOption = question_option;
    selectedOptionLabel = selectedOptionLabelText;

    toggleOptionSelection(question_option);
}

function isCorrectAnswer(question_option) {
    if (currentlySelectedOption != null) {
        const submit_text_content = fetchSubmitButtonText();

        if (submit_text_content == "Submit Answer") {
            updateSubmitButtonText();
            removeSelectedClass();

            if (selectedOptionLabel === answer) {
                markAsCorrect(question_option);
                score++;
            } else {
                markAsIncorrect(question_option);
                revealCorrectAnswer();
            }


        } else {
            loadNextQuestion();
            currentlySelectedOption = null;
        }

    } else {
        return;
    }

}

function revealCorrectAnswer() {
    const allOptions = document.querySelectorAll('.question-option');

    allOptions.forEach(option => {
        let label = option.querySelector('.question-option-text').textContent;

        if (label == answer) {
            option.querySelector('.question__icon').style.visibility = "visible";
        }
    });
}

function loadNextQuestion() {
    clearQuizContent();
    currentQuestionIndex++;

    if (currentQuestionIndex < questions_lenth) {
        const nextQuiz = current_data.questions[currentQuestionIndex];
        createContentQuestion(nextQuiz, questions_lenth, current_data);
    } else {
        clearQuizContent();
        createScoreElement();
    }
}

function createScoreElement() {
    const quiz__content = document.getElementById('quiz__content');

    const score_message = document.createElement('p');
    score_message.textContent = 'Quiz completed';
    score_message.classList.add('score-message');
    quiz__content.appendChild(score_message);

    const score_message_highlight = document.createElement('strong');
    score_message_highlight.textContent = "You scored...";
    score_message_highlight.classList.add('score-message-highlight');
    quiz__content.appendChild(score_message_highlight);


    const score_card = document.createElement('div');
    score_card.classList.add('score-card');

    quiz__content.appendChild(score_card);

    const score_card_header = document.createElement('div');
    score_card_header.classList.add('score-card-header');

    score_card.appendChild(score_card_header);

    const score_icon = document.createElement('div');
    const colorClass = getColorClassCard(current_data.title);
    score_icon.classList.add('score-icon', colorClass);
    score_card_header.appendChild(score_icon);

    const score_icon_img = document.createElement('img');
    score_icon_img.src = current_data.title.toLowerCase() === "javascript"
        ? '/assets/images/icon-js.svg'
        : `/assets/images/icon-${current_data.title.toLowerCase()}.svg`;
    score_icon_img.alt = `${current_data.title} icon`;
    score_icon_img.classList.add('score-icon-img');

    score_icon.appendChild(score_icon_img);

    const score_card_title = document.createElement('p');
    score_card_title.textContent = `${current_data.title}`;
    score_card_title.classList.add('score-card-title');

    score_card_header.appendChild(score_card_title);

    const score_card_content = document.createElement('div');
    score_card_content.classList.add('score-card-content');

    score_card.appendChild(score_card_content);

    const score_value = document.createElement('p');
    score_value.textContent = score;
    score_value.classList.add('score-value');

    score_card_content.appendChild(score_value);

    const score_total = document.createElement('span');
    score_total.textContent = `out of ${questions_lenth}`;
    score_total.classList.add('score-total');

    score_card_content.appendChild(score_total);


    const score_actions = document.createElement('div');
    score_actions.classList.add('score-actions');
    quiz__content.appendChild(score_actions);


    const score_restart_button = document.createElement('button');
    score_restart_button.textContent = "Play Again";
    score_restart_button.classList.add('score-restart-button');


    score_actions.appendChild(score_restart_button);

    score_actions.addEventListener('click', function () {
        reset();
    });
}

function reset() {
    clearQuizContent();
    score = 0;
    window.location.href = '/index.html';
}

export { createContentQuestion }
