/**
 * Adds CSS class to an element.
 *
 * @param {HTMLElement} element
 * @param {String}      className
 */
export const addClass = (element, className) => {
  if (element.classList) {
    element.classList.add(className);
  } else {
    const classes = element.className.split(' ');
    if (classes.indexOf(className) !== -1) {
      classes.push(className);
      element.className = classes.join(' ');
    }
  }
};

/**
 * Removes CSS class from an element.
 *
 * @param {HTMLElement} element
 * @param {String}      className
 */
export const removeClass = (element, className) => {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    const classes = element.className.split(' ');
    const classNameIndex = classes.indexOf(className);
    if (classNameIndex !== -1) {
      classes.splice(classNameIndex, 1);
      element.className = classes.join(' ');
    }
  }
};

/**
 * Capitalizes a string.
 *
 * @param  {String} string
 * @return {String}
 */
export const capitalize = string => string[0].toUpperCase() + string.slice(1);
