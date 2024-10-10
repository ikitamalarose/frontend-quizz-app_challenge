const colorClassMap = {
    "HTML": "menu__item-icon--very-pale-peach",
    "CSS": "menu__item-icon--bright-mint-green",
    "Javascript": "menu__item-icon--bright-blue",
    "Accessibility": "menu__item-icon--purple"
};

function getColorClass(title) {
    return colorClassMap[title] || "menu__item-icon--default";
}

function removeSelectedClass() {
    const allOptions = document.querySelectorAll('.quiz__option');

    allOptions.forEach(option => {
        option.classList.remove('quiz__option--selected');
    });
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

function markAsCorrect(quiz__option) {
    quiz__option.classList.toggle('quiz__option--correct');
    quiz__option.querySelector('.quiz__icon').style.visibility = "visible";

}

function markAsIncorrect(quiz__option) {
    quiz__option.classList.toggle('quiz__option--incorrect');

    quiz__option.querySelector('.quiz__icon').style.visibility = "visible";

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

function clearQuizContent() {
    const quizContent = document.querySelector('.quiz__content');
    if (quizContent) {
        quizContent.innerHTML = '';
    }
}

export {
    getColorClass,
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