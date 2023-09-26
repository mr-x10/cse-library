import { addOnSearchInputTypingEventListener, addOnOptionClickListener, addOnDropdownMenuClickListener, addOnTypingWithDropdownMenuShownListener } from "./events.js";

export function createDropdownMenuContainer(ose) {
    const dropdownMenu = document.createElement("div");
    dropdownMenu.setAttribute("class", "cse-dropdown-menu cse-hidden-element");
    dropdownMenu.tabIndex = -1;
    dropdownMenu.appendChild(createSearchInput(ose));
    dropdownMenu.appendChild(createDropdownMenuOptionsContainer(ose));
    dropdownMenu.appendChild(createNoResultParagraph());
    addOnDropdownMenuClickListener(dropdownMenu);
    addOnTypingWithDropdownMenuShownListener(ose, dropdownMenu);
    return dropdownMenu;
};

function createDropdownMenuOptionsContainer(ose) {
    // div to ul
    const optionsContainer = document.createElement("ul");
    optionsContainer.setAttribute("class", "cse-options-container");
    optionsContainer.tabIndex = -1;
    setDropdownMenuOptions(ose, optionsContainer);
    return optionsContainer;
};

function setDropdownMenuOptions(ose, optionsContainer) {
    for (let i = 0; i < ose.options.length; i++) {
        // option to div
        const option = document.createElement("li");
        option.setAttribute("value", ose[i].value);
        option.setAttribute("class", "cse-option cse-shown-element");
        option.innerText = ose.options[i].innerText;
        option.tabIndex = -1;
        if (ose.options[i].value == ose.options[ose.selectedIndex].value) {
            option.classList.add("cse-same-option");
            option.classList.add("cse-active-option");
        };
        addOnOptionClickListener(option, ose);
        optionsContainer.appendChild(option);
    };
};

function createSearchInput(ose) {
    const searchInput = document.createElement("input");
    searchInput.setAttribute("class", "cse-search-input");
    searchInput.type = "search";
    searchInput.tabIndex = -1;
    addOnSearchInputTypingEventListener(ose, searchInput);
    return searchInput;
};

function createNoResultParagraph() {
    const noResultsParagraph = document.createElement("p");
    noResultsParagraph.setAttribute("class", "cse-no-results cse-hidden-element");
    noResultsParagraph.innerText = "No results were found!";
    return noResultsParagraph;
};