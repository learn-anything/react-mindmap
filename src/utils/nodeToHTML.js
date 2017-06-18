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

  const emoji = node.category == null  && href !== '' ?  '<img class="mindmap-emoji" title="external source" src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f517.png">' : categoryToIMG(node.category);

  return `<a id="node-${node.index}" ${href}>${node.text} ${emoji}</a>`;
};
