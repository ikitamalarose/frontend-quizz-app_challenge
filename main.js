import { getQuizData, getTitlesAndIcons } from "./loadData.js";

const contentMenu = document.getElementById('content__menu');


const colorClassMap = {
    "HTML": "menu__item-icon--very-pale-peach",
    "CSS": "menu__item-icon--bright-mint-green",
    "Javascript": "menu__item-icon--bright-blue",
    "Accessibility": "menu__item-icon--purple"
};


async function loadAndCreateMenuItems() {

    const quizData = await getQuizData();
    console.log(quizData)
    try {

        if (quizData) {
            const data = getTitlesAndIcons(quizData);
            data.forEach(quiz => {
                createMenuItem(quiz);
            });

            console.log("Les éléments du menu ont été créés avec succès.");
        } else {
            console.warn("Données ou élément DOM `contentMenu` non disponibles.");
        }
    } catch (error) {
        console.error('Failed to load data menu.js:', error.message);
    }
}

function createMenuItem(quiz) {
    const menuItem = document.createElement('a');

    menuItem.href = `../view/${quiz.title.toLowerCase()}-page.html`;
    menuItem.classList.add('menu__item');

    const menuItemIcon = document.createElement('div');
    const colorClass = getColorClass(quiz.title);
    menuItemIcon.classList.add('menu__item-icon', colorClass);


    const img = document.createElement('img');
    img.src = quiz.icon;
    img.alt = `${quiz.title} icon`;
    img.classList.add('menu__item-icon__img');

    menuItemIcon.appendChild(img);

    const menuItemTitle = document.createElement('p');
    menuItemTitle.classList.add('menu__item-title');
    menuItemTitle.textContent = quiz.title;

    menuItem.appendChild(menuItemIcon);
    menuItem.appendChild(menuItemTitle);


    contentMenu.appendChild(menuItem);

}

function getColorClass(title) {
    return colorClassMap[title] || "menu__item-icon--default";
}

loadAndCreateMenuItems();