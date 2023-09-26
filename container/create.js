import { createDropdownMenuContainer } from "../dropdown-menu/create.js";
import { createSelectedOptionContainer } from "../selected-option/create.js";

export function createSelectContainer(ose) {
    const container = document.createElement("div");
    container.setAttribute("class", "cse-container");
    container.appendChild(createSelectedOptionContainer(ose));
    container.appendChild(createDropdownMenuContainer(ose));
    ose.after(container);
    return container;
};