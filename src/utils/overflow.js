/**
 * Check if an element is overflowed
 * 
 * @param {HTMLElement} element
 * @returns {boolean}
 */
const isOverflow = (element) => {
    const { clientWidth, scrollWidth, clientHeight, scrollHeight } = element;
    return clientWidth < scrollWidth || clientHeight < scrollHeight;
}

export default isOverflow;