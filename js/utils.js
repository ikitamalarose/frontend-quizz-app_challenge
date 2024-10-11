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
    clearQuizContent
}