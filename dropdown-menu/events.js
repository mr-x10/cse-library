import { activateOption, selectOption, toggleDropdownMenu } from "./utils.js";

export function addOnOptionClickListener(option, ose) {
    option.addEventListener("click", function(event) {
        event.stopPropagation();
        selectOption(option, ose);
    });
};

export function addOnDropdownMenuClickListener(dropdownMenu) {
    dropdownMenu.addEventListener("click", function(event) {
        event.stopPropagation();
    });
};

export function addOnTypingWithDropdownMenuShownListener(ose, dropdownMenu) {
    dropdownMenu.addEventListener("keydown", function(event) {
        const searchInput = dropdownMenu.getElementsByClassName("cse-search-input")[0];
        if (event.key === "Tab" || event.key === "ArrowDown") {
            event.preventDefault();
            activateNextOption(dropdownMenu, ose);
        } else if (event.key === "Enter") {
            selectActiveOption(dropdownMenu, ose);
        } else if (event.key === "ArrowUp") { 
            event.preventDefault();
            activatePreviousOption(dropdownMenu, ose);
        } else if (event.key === "Escape") {
            toggleDropdownMenu(dropdownMenu, dropdownMenu.previousSibling.getElementsByClassName("cse-arrow")[0])
        } else if (document.activeElement !== searchInput) {
            searchInput.focus();
        };
    });
};

function activateNextOption(dropdownMenu, ose) {
    const allShownOptions = Array.from(dropdownMenu.getElementsByClassName("cse-option cse-shown-element"));
    const activeOption = dropdownMenu.getElementsByClassName("cse-active-option")[0];
    if (ose.options.length === allShownOptions.length) {
        if (activeOption.nextSibling !== null) {
            activateOption(dropdownMenu, activeOption.nextSibling);
        } else {
            activateOption(dropdownMenu, allShownOptions[0]);
        };
    } else {
        for (let index = 0; index < allShownOptions.length; index++) {
            if (allShownOptions[index].classList.contains("cse-active-option")) {
                if (index !== allShownOptions.length - 1) {
                    activateOption(dropdownMenu, allShownOptions[index + 1]);
                } else {
                    activateOption(dropdownMenu, allShownOptions[0]);
                };
                break;
            };
        };
    };
};

function activatePreviousOption(dropdownMenu, ose) {
    const allShownOptions = Array.from(dropdownMenu.getElementsByClassName("cse-option cse-shown-element"));
    const activeOption = dropdownMenu.getElementsByClassName("cse-active-option")[0];
    if (ose.options.length === allShownOptions.length) {
        if (activeOption.previousSibling !== null) {
            activateOption(dropdownMenu, activeOption.previousSibling);
        } else {
            activateOption(dropdownMenu, allShownOptions[allShownOptions.length - 1]);
        };
    } else {
        for (let index = 0; index < allShownOptions.length; index++) {
            if (allShownOptions[index].classList.contains("cse-active-option")) {
                if (index !== 0) {
                    activateOption(dropdownMenu, allShownOptions[index - 1]);
                } else {
                    activateOption(dropdownMenu, allShownOptions[allShownOptions.length - 1]);
                };
                break;
            };
        };
    };
};

function selectActiveOption(dropdownMenu, ose) {
    const activeOption = dropdownMenu.getElementsByClassName("cse-active-option")[0];
    selectOption(activeOption, ose);
};


// This is for searching..
export function addOnSearchInputTypingEventListener(ose, searchInput) {
    searchInput.addEventListener("input", function(event) {
        searchOptions(this.value, this.parentNode);
    });
};

function searchOptions(inputValue, dropdownMenu) {
    const allOptions = Array.from(dropdownMenu.getElementsByClassName("cse-option"));
    const searchResults = allOptions.filter(option => option.innerText.toLowerCase().match(inputValue.toLowerCase()) != null);
    const noResultsParagraph = dropdownMenu.getElementsByClassName("cse-no-results")[0];
    if (searchResults.length === 0) {
        noResultsParagraph.classList.remove("cse-hidden-element");
    } else {
        noResultsParagraph.classList.add("cse-hidden-element");
    };
    const searchResultsValues = searchResults.map(option => option.getAttribute("value"));
    allOptions.forEach((option) => {
        if (searchResultsValues.includes(option.getAttribute("value"))) {
            option.classList.remove("cse-hidden-element");
            option.classList.add("cse-shown-element");
        } else {
            option.classList.remove("cse-shown-element");
            option.classList.add("cse-hidden-element");
        };
        if (option.getAttribute("value") === searchResultsValues[0]) {
            activateOption(dropdownMenu, option);
        };
    });
};