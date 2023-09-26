import { createSelectContainer } from "./container/create.js";
import { closeAllDropdownMenus } from "./dropdown-menu/utils.js";

/**
 * @param ose HTMLSelectElement you want to customize
 */
export function customizeSelect(ose) {
    hideOriginalSelect(ose);
    setUniqueOptionsInOriginalSelect(ose);
    addElsewhereClickListener();
    return createSelectContainer(ose);
};

function hideOriginalSelect(ose) {
    ose.style.display = "none";
};

function setUniqueOptionsInOriginalSelect(ose) {
    const uniqueOptions = [];
    for (let i = 0; i < ose.options.length; i++) {
        if (uniqueOptions.includes(ose.options[i].value)) {
            ose.removeChild(ose.options[i]);
        } else {
            uniqueOptions.push(ose.options[i].value);
        };
    };
};

function addElsewhereClickListener() {
    document.addEventListener("click", (event) => {
        closeAllDropdownMenus();
    });
};