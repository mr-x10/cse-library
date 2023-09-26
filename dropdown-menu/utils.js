export function closeAllDropdownMenus() {
    const menus = document.getElementsByClassName("cse-dropdown-menu");
    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        if (!menu.classList.contains("cse-hidden-element")) {
            menu.classList.add("cse-hidden-element");
            menu.previousSibling.getElementsByClassName("cse-arrow")[0].classList.toggle("cse-rotate");
        };
    };
};

export function closeAllOtherDropdownMenus(dropdownMenu) {
    const menus = document.getElementsByClassName("cse-dropdown-menu");
    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        if (menu != dropdownMenu) {
            if (!menu.classList.contains("cse-hidden-element")) {
                menu.classList.add("cse-hidden-element");
                menu.previousSibling.getElementsByClassName("cse-arrow")[0].classList.toggle("cse-rotate");
            };
        };
    };
};

export function selectOption(option, ose) {
    const dropdownMenu = option.parentNode.parentNode;
    const arrow = dropdownMenu.previousSibling.getElementsByClassName("cse-arrow")[0];
    if (option.getAttribute("value") === ose.options[ose.selectedIndex].value) {
        toggleDropdownMenu(dropdownMenu, arrow);
    } else {
        const allOptions = Array.from(dropdownMenu.getElementsByClassName("cse-option"));
        ose.selectedIndex = allOptions.findIndex((opt) => opt.getAttribute("value") === option.getAttribute("value"));
        dropdownMenu.previousSibling.getElementsByClassName("cse-selected-option-text")[0].innerText = ose.options[ose.selectedIndex].innerText;
        toggleDropdownMenu(dropdownMenu, arrow);
        option.parentNode.getElementsByClassName("cse-same-option")[0].classList.remove("cse-same-option");
        option.classList.add("cse-same-option");
        activateOption(dropdownMenu, option);
    };
};

export function toggleDropdownMenu(dropdownMenu, arrow) {
    const optionsContainer = dropdownMenu.getElementsByClassName("cse-options-container")[0];
    const hiddenOptions = optionsContainer.querySelectorAll(".cse-hidden-element");
    hiddenOptions.forEach(option => {
        option.classList.remove("cse-hidden-element");
        option.classList.add("cse-shown-element");
    });
    dropdownMenu.getElementsByClassName("cse-search-input")[0].value = "";
    const activeOption = dropdownMenu.getElementsByClassName("cse-active-option")[0];
    if (activeOption !== undefined) {
        activeOption.classList.remove("cse-active-option");
    };
    const sameOption = dropdownMenu.getElementsByClassName("cse-same-option")[0];
    if (sameOption !== undefined) {
        sameOption.classList.add("cse-active-option");
    };

    const noResultsParagraph = dropdownMenu.getElementsByClassName("cse-no-results")[0];
    noResultsParagraph.classList.add("cse-hidden-element");

    dropdownMenu.classList.toggle("cse-hidden-element");
    arrow.classList.toggle("cse-rotate");
    dropdownMenu.getElementsByClassName("cse-search-input")[0].focus();
    closeAllOtherDropdownMenus(dropdownMenu);
    dropdownMenu.getElementsByClassName("cse-same-option")[0].scrollIntoView();
};

export function activateOption(dropdownMenu, option) {
    const optionsContainer = dropdownMenu.getElementsByClassName("cse-options-container")[0];
    const activeOption = optionsContainer.getElementsByClassName("cse-active-option")[0];
    if (activeOption !== undefined) {
        activeOption.classList.remove("cse-active-option");
    };
    option.classList.add("cse-active-option");
    option.scrollIntoView(false);
};