import {
    getQuizData,
    getNumberOfQuestionsPerTheme,
    getThemeDetails
} from "./loadData.js";

import { createContentQuestion } from "./js/quizz.js";

import { loadAndCreateMenuItems, getFragmentId } from "./js/menu.js";

import { toggleButtonStyle } from "./js/theme-toggle.js";


async function loadDataPerPages() {

    const quizzes = await getQuizData();

    try {

        if (quizzes) {
            let filename = getFragmentId();
            let theme = null;
            let quiz = null;

            switch (filename) {
                case "index":
                    loadAndCreateMenuItems();
                    break;
                case "html-page":

                    theme = "HTML";
                    quiz = getThemeDetails(quizzes, theme);
                    createContentQuestion(quiz.questions[0], getNumberOfQuestionsPerTheme(quizzes, theme), quiz);
                    break;
                case "css-page":

                    theme = "CSS";
                    quiz = getThemeDetails(quizzes, theme);
                    createContentQuestion(quiz.questions[0], getNumberOfQuestionsPerTheme(quizzes, theme), quiz);

                    break;
                case "accessibility-page":

                    theme = "Accessibility";
                    quiz = getThemeDetails(quizzes, theme);
                    createContentQuestion(quiz.questions[0], getNumberOfQuestionsPerTheme(quizzes, theme), quiz);

                    break;
                case "javascript-page":

                    theme = "JavaScript";
                    quiz = getThemeDetails(quizzes, theme);
                    createContentQuestion(quiz.questions[0], getNumberOfQuestionsPerTheme(quizzes, theme), quiz);

                    break;
                default:
                    break;
            }

        }

    } catch (error) {
        console.error('Failed to load data:', error.message);
    }
}
toggleButtonStyle();
loadDataPerPages();

