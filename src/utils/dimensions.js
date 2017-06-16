/* Returns the dimensions that some html with a given style would take
 * in the DOM.
 */
export const getDimensions = (html, style, classname) => {
  const el = document.createElement('span');
  const dimensions = {};

  el.style.display = 'inline-block';
  el.style.visibility = 'hidden';
  el.className = classname;
  el.innerHTML = html;

  Object.keys(style).forEach((rule) => {
    el.style[rule] = style[rule];
  });
  document.body.append(el);

  dimensions.width = el.offsetWidth;
  dimensions.height = el.offsetHeight;

  el.remove();
  return dimensions;
};

/* Returns the dimensions of an svg viewport calculated from some
 * given nodes.
 */
export const getViewBox = (nodes) => {
  const Xs = [];
  const Ys = [];

  // TODO - take into account subnodes
  nodes.forEach((node) => {
    Xs.push(node.fx);
    Ys.push(node.fy);
  });

  const min = [
    Math.min(...Xs) - 150,
    Math.min(...Ys) - 150,
  ];

  const max = [
    (Math.max(...Xs) - min[0]) + 150,
    (Math.max(...Ys) - min[1]) + 150,
  ];

  return `${min.join(' ')} ${max.join(' ')}`;
};
