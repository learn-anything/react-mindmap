/* eslint no-bitwise:off */

/* Make a GET request to the specified url and call callback with JSON
 * response when done.
 */
export const getJSON = (url, done) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE
        && typeof done === 'function') {
      done(JSON.parse(xhr.responseText));
    }
  };

  xhr.send();
};

// Match style attributes in an HTML string.
export const matchStyle = /style="([^"]*)"|style='([^']*)'/g;

// Return an emoji as a GitHub image.
export const emojiTemplate = unicode =>
  `<img class="mindmap-emoji" src="https://assets-cdn.github.com/images/icons/emoji/unicode/${unicode}.png">`;

/* Convert all emojis in an HTML string to GitHub images.
 * The bitwise magic is explained at:
 *    http://crocodillon.com/blog/parsing-emoji-unicode-in-javascript
 */
export const parseEmojis = html =>
  html.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, (match) => {
    // Keep the first 10 bits.
    const lead = match.charCodeAt(0) & 0x3FF;
    const trail = match.charCodeAt(1) & 0x3FF;

    // 0x[lead][trail]
    const unicode = ((lead << 10) + trail).toString(16);

    return emojiTemplate(`1${unicode}`);
  });

/* Returns the dimensions that some html with a given style would take
 * in the DOM.
 */
export const htmlDimensions = (html, style, classname) => {
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
