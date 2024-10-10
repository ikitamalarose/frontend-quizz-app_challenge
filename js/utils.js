let selectedOptionLabel = null;
let currentlySelectedOption = null;
let answer = null;

let currentQuestionIndex = 0;

let score = 0;

const colorClassMap = {
    "HTML": "menu__item-icon--very-pale-peach",
    "CSS": "menu__item-icon--bright-mint-green",
    "Javascript": "menu__item-icon--bright-blue",
    "Accessibility": "menu__item-icon--purple"
};

let current_data = null;
let questions_lenth = null;
let score_icon = null;

/* menu list start */
function createMenuItem(title, icon) {
    score_icon = icon;
    const contentMenu = document.getElementById('content__menu');
    const menuItem = document.createElement('a');

    menuItem.href = `/view/${title.toLowerCase()}-page.html`;
    menuItem.classList.add('menu__item');

    const menuItemIcon = document.createElement('div');
    const colorClass = getColorClass(title);
    menuItemIcon.classList.add('menu__item-icon', colorClass);


    const img = document.createElement('img');
    img.src = icon;
    img.alt = `${title} icon`;
    img.classList.add('menu__item-icon__img');

    menuItemIcon.appendChild(img);

    const menuItemTitle = document.createElement('p');
    menuItemTitle.classList.add('menu__item-title');
    menuItemTitle.textContent = title;

    menuItem.appendChild(menuItemIcon);
    menuItem.appendChild(menuItemTitle);


    contentMenu.appendChild(menuItem);

}
/* menu list end */

function getColorClass(title) {
    return colorClassMap[title] || "menu__item-icon--default";
}

/* Quiz content start */
function createContentQuestion(quiz, total_question, quizzes) {
    current_data = quizzes;
    questions_lenth = total_question;

    answer = quiz.answer;
    const letters = ['A', 'B', 'C', 'D'];
    const quiz__content = document.getElementById('quiz__content');

    const quiz__question_number = document.createElement('p');
    quiz__question_number.textContent = `Question ${currentQuestionIndex + 1} of ${total_question}`;
    quiz__question_number.classList.add('quiz__question-number');

    const quiz__question = document.createElement('p');
    quiz__question.textContent = `${quiz.question}`;
    quiz__question.classList.add('quiz__question');
    quiz__content.appendChild(quiz__question_number);
    quiz__content.appendChild(quiz__question);

    const quiz__options = document.createElement('div');
    quiz__options.classList.add('quiz__options');
    quiz__content.appendChild(quiz__options);

    let i = 0;
    quiz.options.forEach(element => {

        const quiz__option = document.createElement('div');
        quiz__option.classList.add('quiz__option');
        quiz__options.appendChild(quiz__option);

        quiz__option.addEventListener('click', function () {
            removeSelectedClass();
            handleOptionClick(quiz__option);
        });

        const quiz__input = document.createElement('p');
        quiz__input.textContent = letters[i];
        quiz__input.classList.add('quiz__input');
        quiz__option.appendChild(quiz__input);

        const quiz__label = document.createElement('p');
        quiz__label.classList.add('quiz__label');
        quiz__label.textContent = element;
        quiz__option.appendChild(quiz__label);

        if (answer == element) {
            quiz__option.appendChild(createCorrectIconElement());
        } else {
            quiz__option.appendChild(createIncorrectIconElement());
        }
        i = i + 1;

    });

    const quiz__actions = document.createElement('div');
    quiz__actions.classList.add('quiz__actions');
    quiz__options.appendChild(quiz__actions);


    const quiz__submit = document.createElement('button');
    quiz__submit.textContent = "Submit Answer";
    quiz__submit.classList.add('quiz__submit-button');


    quiz__actions.appendChild(quiz__submit);

    quiz__actions.addEventListener('click', function () {
        isCorrectAnswer(currentlySelectedOption);
        toggleOptionClickability();
    });


}

function removeSelectedClass() {
    const allOptions = document.querySelectorAll('.quiz__option');

    allOptions.forEach(option => {
        option.classList.remove('quiz__option--selected');
    });
}


function handleOptionClick(quiz__option) {
    const selectedOptionLabelText = quiz__option.querySelector('.quiz__label').textContent;

    currentlySelectedOption = quiz__option;
    selectedOptionLabel = selectedOptionLabelText;

    toggleOptionSelection(quiz__option);
}


function toggleOptionSelection(quiz__option) {
    quiz__option.classList.toggle('quiz__option--selected');
}


function createCorrectIconElement() {
    const icon = document.createElement('img');
    icon.src = "/assets/images/icon-correct.svg";
    icon.alt = "correct icon";
    icon.classList.add("quiz__icon", "quiz__icon-correct");

    return icon;
}


function createIncorrectIconElement() {
    const icon = document.createElement('img');
    icon.src = "/assets/images/icon-incorrect.svg";
    icon.alt = "incorrect icon";
    icon.classList.add("quiz__icon", "quiz__icon-incorrect");

    return icon;
}


function isCorrectAnswer(quiz__option) {
    const submit_text_content = fetchSubmitButtonText();
    if (submit_text_content == "Submit Answer") {
        updateSubmitButtonText();
        removeSelectedClass();

        if (selectedOptionLabel === answer) {
            markAsCorrect(quiz__option);
            score++;
        } else {
            markAsIncorrect(quiz__option);
            revealCorrectAnswer();
        }

    } else {

        loadNextQuestion();
    }

}


function markAsCorrect(quiz__option) {
    quiz__option.classList.toggle('quiz__option--correct');
    quiz__option.querySelector('.quiz__icon').style.visibility = "visible";

}


function markAsIncorrect(quiz__option) {
    quiz__option.classList.toggle('quiz__option--incorrect');

    quiz__option.querySelector('.quiz__icon').style.visibility = "visible";

}


function revealCorrectAnswer() {
    const allOptions = document.querySelectorAll('.quiz__option');

    allOptions.forEach(option => {
        let label = option.querySelector('.quiz__label').textContent;

        if (label == answer) {
            option.querySelector('.quiz__icon').style.visibility = "visible";
        }
    });
}


function updateSubmitButtonText() {
    document.querySelector('.quiz__submit-button').textContent = "Next Question";
}


function toggleOptionClickability() {
    const allOptions = document.querySelectorAll('.quiz__option');
    const submitButtonText = document.querySelector('.quiz__submit-button').textContent;

    allOptions.forEach(option => {
        if (submitButtonText === "Next Question") {
            option.style.pointerEvents = "none"; 
        } else if (submitButtonText === "Submit Answer") {
            option.style.pointerEvents = "auto";
        }
    });
}


function fetchSubmitButtonText() {
    let text = document.querySelector('.quiz__submit-button').textContent;

    return text;
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

function clearQuizContent() {
    const quizContent = document.querySelector('.quiz__content');
    if (quizContent) {
        quizContent.innerHTML = '';
    }
}


function createScoreElement() {
    const quiz__content = document.getElementById('quiz__content');

    const quiz__message = document.createElement('p');
    quiz__message.textContent = 'Quiz completed';
    quiz__message.classList.add('quiz__message');
    quiz__content.appendChild(quiz__message);

    const quiz__message_span = document.createElement('strong');
    quiz__message_span.textContent = "You scored...";
    quiz__message_span.classList.add('quiz__message_span');
    quiz__content.appendChild(quiz__message_span);


    const card = document.createElement('div');
    card.classList.add('card');

    quiz__content.appendChild(card);

    const card_header = document.createElement('div');
    card_header.classList.add('card_header');

    card.appendChild(card_header);

    const contentIcon = document.createElement('div');
    const colorClass = getColorClass(current_data.title);
    contentIcon.classList.add('menu__item-icon', colorClass);
    card_header.appendChild(contentIcon);

    const contentIcon_img = document.createElement('img');
    contentIcon_img.src = `/assets/images/icon-${current_data.title.toLowerCase()}.svg`;
    contentIcon_img.alt = `${current_data.title} icon`;
    contentIcon_img.classList.add('menu__item-icon__img');

    contentIcon.appendChild(contentIcon_img);

    const card__title = document.createElement('p');
    card__title.textContent = `${current_data.title}`;
    card__title.classList.add('card__title');

    card_header.appendChild(card__title);

    const card__content = document.createElement('div');
    card__content.classList.add('card__content');

    card.appendChild(card__content);

    const card__score = document.createElement('p');
    card__score.textContent = score;
    card__score.classList.add('card__score');

    card__content.appendChild(card__score);

    const card__score_span = document.createElement('span');
    card__score_span.textContent = `out of ${questions_lenth}`;
    card__score_span.classList.add('card__score_span');

    card__content.appendChild(card__score_span);


    const quiz__actions = document.createElement('div');
    quiz__actions.classList.add('quiz__actions');
    quiz__content.appendChild(quiz__actions);


    const quiz__submit = document.createElement('button');
    quiz__submit.textContent = "Play Again";
    quiz__submit.classList.add('quiz__submit-button');


    quiz__actions.appendChild(quiz__submit);

    quiz__actions.addEventListener('click', function () {
        reset();
    });
}

function reset(){
    clearQuizContent();
    score = 0;
    window.location.href = '/index.html';
}

export { createMenuItem, createContentQuestion, loadNextQuestion }