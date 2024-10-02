async function loadData() {
    try {
        const response = await fetch('/data.json');
        if (!response.ok) {
            throw new Error('Oops! Something went wrong.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

function getTitles(data) {
    return data.quizzes.map(quiz => quiz.title);
}


function getNumberOfQuestionsPerTheme(data, title) {
    const quiz = data.quizzes.find(quiz => quiz.title === title);

    return quiz ? quiz.questions.length : 0;
}


function getThemeDetails(data, title) {
    const quiz = data.quizzes.find(quiz => quiz.title === title);

    if (quiz) {
        return {
            title: quiz.title,
            questions: quiz.questions.map(q => ({
                question: q.question,
                answer: q.answer,
                options: q.options
            }))
        };
    } else {
        return null;
    }
}


async function getQuizData() {
    const quizData = await loadData();
    
    if (quizData) {
        return quizData
    } else {
        console.error("No data available");
        return null
    }
}

export { getQuizData, getTitles, getNumberOfQuestionsPerTheme, getThemeDetails }