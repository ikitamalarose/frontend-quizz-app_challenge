import { getColorClass } from "./utils.js";
import { getTitlesAndIcons, getQuizData } from "../loadData.js";
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

/* menu list start */
function createMenuItem(title, icon) {
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

/* menu list end */

export{
    getFragmentId,
    loadAndCreateMenuItems
}