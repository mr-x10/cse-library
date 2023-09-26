import { disableSelectedOption, enableSelectedOption } from "./utils.js";

export function createSelectedOptionContainer(ose) {
    const selectedOption = document.createElement("div");
    selectedOption.setAttribute("class", "cse-selected-option");
    selectedOption.appendChild(createSelectedOptionSpan("Loading.."));
    selectedOption.appendChild(createArrow());
    if (ose.options.length > 0) {
        enableSelectedOption(ose, selectedOption);
    } else {
        disableSelectedOption(selectedOption);
    };
    return selectedOption;
};

export function createSelectedOptionSpan(text) {
    const selectedOptionSpan = document.createElement("span");
    selectedOptionSpan.tabIndex = -1;
    selectedOptionSpan.setAttribute("class", "cse-selected-option-text")
    selectedOptionSpan.innerText = text;
    return selectedOptionSpan;
};

export function createArrow() {
    const arrow = document.createElement("div");
    arrow.setAttribute("class", "cse-arrow");
    return arrow;
};