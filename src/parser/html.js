// Return text from a node's inner HTML.
const getText = (html) => {
  const res = [];
  // Match text inside a tags. If there's no a tags present match text inside p tags.
  const matchText = /<a[^>]*>([^<]*)<\/a>|<p[^>]*>([^>]*)<\/p>/g;
  let match = matchText.exec(html);

  while (match) {
    res.push(match[1] || match[2]);
    match = matchText.exec(html);
  }

  return res.join(' ');
};

// Return the first URL present on a node's inner HTML.
const getURL = (html) => {
  // Match href inside a tags.
  const matchURL = /<a[^>]*href="([^"]*)"[^>]*>[^<]*<\/a>/;
  const match = matchURL.exec(html);

  return match ? match[1] : '';
};

module.exports = {
  getText,
  getURL,
};
