import { addOnOptionClickListener } from "./dropdown-menu/events.js";
import { enableSelectedOption } from "./selected-option/utils.js";

export function addOptionsToCSE(ose, cse, newOptions) { 
    if (newOptions.size > 0) {
        const optionsContainer = cse.getElementsByClassName("cse-options-container")[0];
        setNewUniqueOptions(ose, optionsContainer, newOptions);
        if (cse.getElementsByClassName("cse-selected-option")[0].classList.contains("cse-disabled")) {
            enableSelectedOption(ose, cse.getElementsByClassName("cse-selected-option")[0]);
            ose.selectedIndex = 0;
            optionsContainer.getElementsByClassName("cse-option")[0].classList.add("cse-same-option")
        };
    };
};

function setNewUniqueOptions(ose, optionsContainer, newOptions) {
    const uniqueKeys = [];
    if (ose.options.length > 0) {
        for (let i = 0; i < ose.options.length; i++) {
            if (!uniqueKeys.includes(ose.options[i].value)) {
                uniqueKeys.push(ose.options[i].value);
            };
        };
    };
    newOptions.forEach((value, key) => {
        if (!uniqueKeys.includes(key)) {
            uniqueKeys.push(key);
            ose.appendChild(new Option(value, key));
            optionsContainer.appendChild(createNewOption(ose, key, value));
        };
    });
    uniqueKeys.length = 0;
};

function createNewOption(ose, key, value) {
    const option = document.createElement("li");
    option.setAttribute("value", key);
    option.setAttribute("class", "cse-option cse-shown-element");
    option.innerText = value;
    option.tabIndex = 0;
    addOnOptionClickListener(option, ose);
    return option;
};