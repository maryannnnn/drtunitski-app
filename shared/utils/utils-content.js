import truncate from 'truncate-html';
import sanitizeHtml from 'sanitize-html';

export const cleanHtml = (html) => {
    return sanitizeHtml(html, {
        allowedTags: [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'div' , 'img', 'frame', 'span'],
        allowedAttributes: {
            'a': [ 'href' ]
        }
    });
};

export const cleanHtmlFull = (html) => {
    return sanitizeHtml(html, {
        allowedTags: [],
        allowedAttributes: {}
    });
};

export const trimText = (text, maxLength) => {
    if (text?.length <= maxLength) {
        return text;
    }
    return text?.slice(0, maxLength) + '...';
};

export const trimTextFullCleanedHTML = (html, maxLength) => {

    return trimText(cleanHtmlFull(html), maxLength);
}

export const cleanAndTrimHtml = (html, maxLength) => {

    return truncate(cleanHtml(html), maxLength, { ellipsis: '...' });
};

export const normalizeDatetime = (dateStr) => {
    const dateObj = new Date(dateStr);

    if (isNaN(dateObj)) {
        return 'Invalid Date';
    }

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');

    return `${day}-${month}-${year}--${hours}-${minutes}`;
}

