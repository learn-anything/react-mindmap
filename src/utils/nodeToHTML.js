import { categoryToIMG } from '../parser/emojis';

/*
 * Return the HTML representation of a node.
 * The node is an object that has text, url, and category attributes;
 * all of them optional.
 */
export default (node) => {
  let href = `href="${node.url}"`;

  // If url is not specified remove href attribute,
  // so that the node isn't clickable.
  if (!node.url) {
    href = '';
  }

  return `<a ${href}>${node.text} ${categoryToIMG(node.category)}</a>`;
};
