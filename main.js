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
    let filename;

    // Check if the URL contains a ".html", otherwise use the last segment of the path
    if (currentUrl.includes(".html")) {
        filename = currentUrl.substring(
            currentUrl.lastIndexOf("/") + 1,
            currentUrl.lastIndexOf(".html")
        );
    } else {
        // Use the last segment of the path if the URL does not contain .html
        const pathSegments = window.location.pathname.split("/");
        filename = pathSegments[pathSegments.length - 1] || "index"; // "index" is used if the path is empty
    }

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
                createContentQuestion(quiz.questions[0], getNumberOfQuestionsPerTheme(quizzes, theme),quiz);
                break;
            case "css-page":

                theme = "CSS";
                quiz = getThemeDetails(quizzes, theme);
                createContentQuestion(quiz.questions[0], getNumberOfQuestionsPerTheme(quizzes, theme),quiz);

                break;
            case "accessibility-page":

                theme = "Accessibility";
                quiz = getThemeDetails(quizzes, theme);
                createContentQuestion(quiz.questions[0], getNumberOfQuestionsPerTheme(quizzes, theme),quiz);

                break;
            case "javascript-page":

                theme = "JavaScript";
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

            console.log("Menu items have been successfully created.");
        } else {
            console.warn("Data or DOM element `contentMenu` not available.");
        }
    } catch (error) {
        console.error('Failed to load data menu.js:', error.message);
    }
}

loadDataPerPages();

