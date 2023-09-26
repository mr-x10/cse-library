import { closeAllDropdownMenus, closeAllOtherDropdownMenus, toggleDropdownMenu } from "../dropdown-menu/utils.js";

export function addOnSelectedOptionContanierClickListener(container) {
    container.addEventListener("click", function(event) {
        event.stopPropagation();
        const dropdownMenu = this.nextSibling;
        const arrow = this.getElementsByClassName("cse-arrow")[0]
        toggleDropdownMenu(dropdownMenu, arrow);
    });
};

export function addOnTypingWithFocusListener(container) {
    container.addEventListener("focus", function() {
        this.addEventListener("keydown", (event) => {
            if (event.key == "Tab") {
                closeAllDropdownMenus();
            } else if (isKeyAllowed(event.key, event.keyCode)) {
                closeAllOtherDropdownMenus(container.nextSibling);
                container.nextSibling.classList.remove("cse-hidden-element");
                container.nextSibling.getElementsByClassName("cse-search-input")[0].focus();
                container.getElementsByClassName("cse-arrow")[0].classList.toggle("cse-rotate");
            };
        });
    });
};

const numpad = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
const numbers = [48, 49, 50, 51, 52, 53, 53, 55, 56, 57];
const englishAlphabet = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90];
const arabicSpecials = [60, 62, 58, 162, 188, 190, 191, 192];

function isKeyAllowed(key, keyCode) {
    let allowedKeys = [];
    if (isRTL(key)) {
        allowedKeys = [...numpad, ...numbers, ...englishAlphabet, ...arabicSpecials];
    } else {
        allowedKeys = [...numpad, ...numbers, ...englishAlphabet];
    }
    return allowedKeys.includes(keyCode);
};

function isRTL(s) {           
    const ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF'+'\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
        rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
        rtlDirCheck = new RegExp('^[^'+ltrChars+']*['+rtlChars+']');
    return rtlDirCheck.test(s);
};

// function closeAllDropdownMenus() {
//     const menus = document.getElementsByClassName("cse-dropdown-menu");
//     for (let i = 0; i < menus.length; i++) {
//         console.log(menus[i]);
//         if (!menus[i].classList.contains("cse-hidden-element")) {
//             menus[i].classList.add("cse-hidden-element");
//         };
//     };
// };

// function isElementShown(element) {
//     return element.classList.contains("cse-shown-element");
// }