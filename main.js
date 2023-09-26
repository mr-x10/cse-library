import { customizeOSE } from "/customize.js";
import { addOptionsToCSE } from "/add-options.js";

/**
 * @param htmlSelectElement HTMLSelectElement you want to customize.
 */
export function customizeSelect(htmlSelectElement) {
    return customizeOSE(htmlSelectElement);
};

/**
 * @param htmlSelectElement HTMLSelectElement 
 * @param customSelectElement HTMLDivElement 
 * @param newOptions Map<Key, Value> 
 */
export function addOptions(htmlSelectElement, customSelectElement, newOptions) {
    addOptionsToCSE(htmlSelectElement, customSelectElement, newOptions);
};