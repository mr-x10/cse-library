import { addOnSelectedOptionContanierClickListener, addOnTypingWithFocusListener } from "./events.js";

export function enableSelectedOption(ose, selectedOption) {
    selectedOption.tabIndex = 0;
    selectedOption.classList.remove("cse-disabled");
    selectedOption.getElementsByClassName("cse-selected-option-text")[0].innerText = ose.options[ose.selectedIndex].innerText;
    addOnSelectedOptionContanierClickListener(selectedOption);
    addOnTypingWithFocusListener(selectedOption);
};

export function disableSelectedOption(selectedOption) {
    selectedOption.tabIndex = -1;
    selectedOption.classList.add("cse-disabled");
    selectedOption.getElementsByClassName("cse-selected-option-text")[0].innerText = "No options";
    selectedOption.removeEventListener("click", function () {});
    selectedOption.removeEventListener("focus", function () {});
};