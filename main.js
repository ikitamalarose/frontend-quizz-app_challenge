import {
    getQuizData,
    getTitlesAndIcons,
    getNumberOfQuestionsPerTheme,
    getThemeDetails
} from "./loadData.js";

import {
    createMenuItem,
    createContentQuestion
} from "./js/utils.js";


function getFragmentId() {
    const currentUrl = window.location.href;

    const filename = currentUrl.substring(
        currentUrl.lastIndexOf("/") + 1,
        currentUrl.lastIndexOf(".html")
    );

    return filename;
}    

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
                /* console.log(quiz.questions[0].question) */
                /* console.table(getThemeDetails(quizzes, theme)); */
                createContentQuestion(quiz.questions[0], getNumberOfQuestionsPerTheme(quizzes, theme),quiz);
                break;
            case "css-page":

                theme = "CSS";
                quiz = getThemeDetails(quizzes, theme);
                createContentQuestion(quiz.questions[0], getNumberOfQuestionsPerTheme(quizzes, theme),quiz);

                break;
            case "accessibility-page":

                theme = "JavaScript";
                quiz = getThemeDetails(quizzes, theme);
                createContentQuestion(quiz.questions[0], getNumberOfQuestionsPerTheme(quizzes, theme),quiz);

                break;
            case "javascript-page":

                theme = "Accessibility";
                quiz = getThemeDetails(quizzes, theme);
                createContentQuestion(quiz.questions[0], getNumberOfQuestionsPerTheme(quizzes, theme),quiz);

                break;
            default:
                break;
        }

    }

    } catch (error) {
        console.error('Failed to load data:', error.message);
    }
}

async function loadAndCreateMenuItems() {

    const quizzes = await getQuizData();
    try {

        if (quizzes) {
            const data = getTitlesAndIcons(quizzes);
            data.forEach(quiz => {
                createMenuItem(quiz.title, quiz.icon);
            });

            console.log("Les éléments du menu ont été créés avec succès.");
        } else {
            console.warn("Données ou élément DOM `contentMenu` non disponibles.");
        }
    } catch (error) {
        console.error('Failed to load data menu.js:', error.message);
    }
}

loadDataPerPages();

