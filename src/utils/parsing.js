/* eslint-disable import/prefer-default-export */
import { categoryToIMG } from '../parser/emojis';

export const toHTML = node => (
  `<a href="${node.url}">${node.text} ${categoryToIMG(node.category)}</a>`
);
