const colorClassMap = {
    "HTML": "menu__item-icon--very-pale-peach",
    "CSS": "menu__item-icon--bright-mint-green",
    "JavaScript": "menu__item-icon--bright-blue",
    "Accessibility": "menu__item-icon--purple"
};

const colorClassCard = {
    "HTML": "score-icon--very-pale-peach",
    "CSS": "score-icon--bright-mint-green",
    "JavaScript": "score-icon--bright-blue",
    "Accessibility": "score-icon--purple"
}

function getColorClass(title) {
    return colorClassMap[title] || "menu__item-icon--default";
}

function getColorClassCard(title) {
    return colorClassCard[title] || "score-icon--default";
}

function removeSelectedClass() {
    const allOptions = document.querySelectorAll('.question-option');

    allOptions.forEach(option => {
        option.classList.remove('question-option--selected');
    });
}

function toggleOptionSelection(question_option) {
    question_option.classList.toggle('question-option--selected');
}

function createCorrectIconElement() {
    const question_icon = document.createElement('img');
    question_icon.src = "/assets/images/icon-correct.svg";
    question_icon.alt = "correct icon";
    question_icon.classList.add("question__icon", "question__icon-correct");

    return question_icon;
}

function createIncorrectIconElement() {
    const question_icon = document.createElement('img');
    question_icon.src = "/assets/images/icon-incorrect.svg";
    question_icon.alt = "incorrect icon";
    question_icon.classList.add("question__icon", "question__icon-incorrect");

    return question_icon;
}

function markAsCorrect(question_option) {
    question_option.classList.toggle('question-option--correct');
    question_option.querySelector('.question__icon').style.visibility = "visible";

}

function markAsIncorrect(question_option) {
    question_option.classList.toggle('question-option--incorrect');

    question_option.querySelector('.question__icon').style.visibility = "visible";

}

function updateSubmitButtonText() {
    document.querySelector('.question-submit-button').textContent = "Next Question";
}

function toggleOptionClickability() {
    const allOptions = document.querySelectorAll('.question-option');
    const submitButton = document.querySelector('.question-submit-button');

    if (!submitButton) {
        return;
    }

    const submitButtonText = document.querySelector('.question-submit-button').textContent;

    allOptions.forEach(option => {
        if (submitButtonText === "Next Question") {
            option.style.pointerEvents = "none";
        } else if (submitButtonText === "Submit Answer") {
            option.style.pointerEvents = "auto";
        }
    });
}

function fetchSubmitButtonText() {
    let text = document.querySelector('.question-submit-button').textContent;

    return text;
}

function clearQuizContent() {
    const quizContent = document.querySelector('.quiz__content');
    if (quizContent) {
        quizContent.innerHTML = '';
    }
}

function createWarningMessage() {
    const quiz__content = document.getElementById('quiz__content');

    const warning_container = document.createElement('div');
    warning_container.id = "warning-container";
    warning_container.style.visibility = "hidden";

    const warning_icon = document.createElement('img');
    warning_icon.src = "/assets/images/icon-error.svg";
    warning_icon.alt = "error icon";
    warning_icon.classList.add('warning-icon');

    const warning_message = document.createElement('p');
    warning_message.textContent = "Please select an answer";
    warning_container.classList.add('warning-message');

    warning_container.append(warning_icon, warning_message);

    quiz__content.appendChild(warning_container);

}

function showWarningMessage() {
    const warningContainer = document.getElementById('warning-container');
    if (warningContainer) {
        warningContainer.style.visibility = "visible";
    }
}

function hideWarningMessage() {
    const warningContainer = document.getElementById('warning-container');
    if (warningContainer) {
        warningContainer.style.visibility = "hidden";
    }
}

function initializeProgressBar() {
    const question_header = document.getElementById('question-header');

    const progress_bar_container = document.createElement('div');
    progress_bar_container.id = "progress-bar-container";

    const progress_bar = document.createElement('span');
    progress_bar.id = "progress-bar";

    progress_bar_container.appendChild(progress_bar);
    question_header.appendChild(progress_bar_container);

}

function updateProgressBar(questionIndex) {
    const progress_bar = document.getElementById('progress-bar');
    const percent = {
        1: "20%",
        2: "30%",
        3: "40%",
        4: "50%",
        5: "60%",
        6: "70%",
        7: "80%",
        8: "90%",
        9: "100%"
    };

    progress_bar.style.width = percent[questionIndex];
}


export {
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
    clearQuizContent,
    createWarningMessage,
    showWarningMessage,
    hideWarningMessage,
    initializeProgressBar,
    updateProgressBar
}