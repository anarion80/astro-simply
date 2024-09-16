/**
 * Returns an array of all elements matching the given CSS selector that are
 * descendants of the given parent element.
 *
 * @param {string} selector The CSS selector to match.
 * @param {ParentNode} [parent=document] The parent element to search.
 * @return {HTMLElement[]} An array of matching elements.
 */
export default function getAll<ElementType extends HTMLElement>(
    selector: string,
    parent: ParentNode = document
): ElementType[] {
    return Array.prototype.slice.call(parent.querySelectorAll<ElementType>(selector), 0);
}
