export const replaceWithLink = (text: string): string => {
  const urlRegex = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g;

  return text.replace(urlRegex, (match, space, url) => {
    const fullUrl = url.startsWith('http') ? url : 'http://' + url;

    const isWrapped = text.includes(`<a href`) || text.includes(`<a href="${url}"`);

    if (!isWrapped) {
      return `<span contentEditable="false"><a href="${fullUrl}" target="_blank" rel="noopener noreferrer">ссылка</a></span>`;
    }

    return match;
  });
};

export const setEndOfContenteditable = (contentEditableElement) => {
  let range, selection;
  if (document.createRange) {
    range = document.createRange();
    range.selectNodeContents(contentEditableElement);
    range.collapse(false);
    selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
};
export const extractUrlsAndText = (html: string): string => {
  // Create a new DOM parser
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Select all <a> elements
  const anchorElements = doc.querySelectorAll('a');

  // Extract the href attributes and join them into a single string
  const urls = Array.from(anchorElements)
    .map((anchor) => anchor.href)
    .join(' ');

  // Extract plain text excluding any HTML tags
  const plainText = doc.body.textContent?.trim().replace('ссылка', '');

  // Combine URLs and plain text into a single string
  return `${urls} ${plainText}`.trim(); // Return combined text
};
