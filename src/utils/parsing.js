/* eslint-disable import/prefer-default-export */
import { categoryToIMG } from '../parser/emojis';

export const toHTML = (node) => {
  const url = node.url ? `href="${node.url}"` : '';
  return `<a ${url}>${node.text} ${categoryToIMG(node.category)}</a>`;
};
