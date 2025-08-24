// Copyright Christian Corsica. All Rights Reserved.

import {blogs} from "./config/blogs.js";


let currentBlogIndex = 0;


/**
 * Adds the header for every blog that includes a title and a date.
 * @param blog_index {int} Index to get blog title and date from blogs list.
 */
export function addBlogHeader(blog_index) {
    currentBlogIndex = blog_index;
    const blog = blogs[blog_index];
    const blogPostElement = document.getElementById('blog-post');

    const title = document.createElement('h1');
    title.textContent = blog.title;
    title.style = 'padding-bottom: 1rem';
    blogPostElement.insertAdjacentElement("afterbegin", title);

    const date = document.createElement('p');
    date.className = 'blog-post-date';
    date.textContent = blog.date;
    blogPostElement.insertAdjacentElement("afterbegin", date);

    document.title = blog.title;
}

/**
 * Gets the next blog on the blogs' list wrapped around.
 * @returns {Object} Next blog on the blogs' list. This does not update the currentBlogIndex!
 */
function getNextBlog() {
    if (currentBlogIndex < blogs.length - 1) {
        return { blog: blogs[currentBlogIndex + 1], text: 'Next Post' };
    }
    else {
        return { blog: blogs[0], text: 'First Post' };
    }
}

/**
 * Gets the previous blog on the blogs' list wrapped around.
 * @returns {Object} Previous blog on the blogs' list. This does not update the currentBlogIndex!
 */
function getPreviousBlog() {
    if (currentBlogIndex > 0) {
        return { blog: blogs[currentBlogIndex - 1], text: 'Previous Post'};
    }
    else {
        return { blog: blogs[blogs.length - 1], text: 'Last Post' };
    }
}

/**
 * Generate the HTML to add the footer at the end of the blog for user to pick the previous or next blog.
 */
export function addBlogFooter() {
    const previous = getPreviousBlog();
    const next = getNextBlog();
    const blogPostElement = document.getElementById('blog-post');

    const divider = document.createElement('hr');
    blogPostElement.appendChild(divider);

    const row = document.createElement('div');
    row.className = 'blog-footer-row';
    blogPostElement.appendChild(row);

    const previousLink = document.createElement('a');
    previousLink.href = previous.blog.filename;
    previousLink.title = previous.blog.title;
    previousLink.className = 'blog-footer-previous';
    row.appendChild(previousLink);

    const previousImage = document.createElement('img');
    previousImage.src = previous.blog.thumbnail;
    previousImage.alt = previous.blog.title;
    previousImage.loading = 'lazy';
    previousLink.appendChild(previousImage);

    const previousColumn = document.createElement('div');
    previousColumn.className = 'blog-footer-previous-column';

    const previousText = document.createElement('p');
    previousText.textContent = previous.text;
    previousColumn.appendChild(previousText);

    const previousTitle = document.createElement('h3');
    previousTitle.textContent = previous.blog.title;
    previousColumn.appendChild(previousTitle);

    previousLink.appendChild(previousColumn);

    const nextLink = document.createElement('a');
    nextLink.href = next.blog.filename;
    nextLink.title = next.blog.title;
    nextLink.className = 'blog-footer-next';
    row.appendChild(nextLink);

    const nextColumn = document.createElement('div');
    nextColumn.className = 'blog-footer-next-column';

    const nextText = document.createElement('p');
    nextText.textContent = next.text;
    nextColumn.appendChild(nextText);

    const nextTitle = document.createElement('h3');
    nextTitle.textContent = next.blog.title;
    nextColumn.appendChild(nextTitle);

    nextLink.appendChild(nextColumn);

    const nextImage = document.createElement('img');
    nextImage.src = next.blog.thumbnail;
    nextImage.alt = next.blog.title;
    nextImage.loading = 'lazy';
    nextLink.appendChild(nextImage);
}

/**
 * Gets the first given maxLength characters of the given text. Used to get a shortened preview of the description.
 * Will make sure the last word is not chopped off and removes any punctuation at the end too.
 * Adds an ellipsis at the end.
 * @param text {string} Text to get first given maxLength characters.
 * @param maxLength {int} How many characters to get from given text.
 * @returns {*|string} First maxLength characters of given text.
 */
function getDescription(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }

    let truncated = text.substring(0, maxLength);

    // Find the last space to avoid cutting off mid-word
    let lastSpaceIndex = truncated.lastIndexOf(' ');

    if (lastSpaceIndex === -1) {
        // No spaces found, return the whole truncated string
        return truncated + '...';
    }

    // Get text up to the last complete word
    let result = truncated.substring(0, lastSpaceIndex);

    // Remove trailing punctuation and special characters
    result = result.replace(/[^\w\s]+$/, '');

    return result + '...';
}

/**
 * Generates the HTML that includes the list of blogs.
 * @returns {Promise<void>}
 */
export async function generateBlogGallery() {
    const mainElement = document.getElementById('main');

    for (const blog of blogs.reverse()) {

        const filename = `blog/${blog.filename}`;
        const row = document.createElement('div');
        row.className = 'blog-outer';
        mainElement.appendChild(row);

        const link = document.createElement('a');
        link.href = filename;
        link.title = blog.title;
        link.className = 'blog-row';
        row.appendChild(link);

        const image = document.createElement('div');
        image.className = 'blog-column-image';
        link.appendChild(image);

        const imageElement = document.createElement('img');
        imageElement.src = blog.thumbnail;
        imageElement.alt = blog.title;
        imageElement.loading = 'lazy';
        image.appendChild(imageElement);

        const text = document.createElement('div');
        text.className = 'blog-column-text';
        link.appendChild(text);

        const date = document.createElement('p');
        date.className = 'blog-column-text-date';
        date.textContent = blog.date;
        text.appendChild(date);

        const title = document.createElement('h1');
        title.textContent = blog.title;
        text.appendChild(title);

        const description = document.createElement('p');
        const resp = await fetch(`${filename}.html`);
        const htmlText = await resp.text();
        const firstParagraph = htmlText.split("<p>")[1].split("</p>")[0];
        const cleanedFirstParagraph = firstParagraph.replace(/<[^>]*>(.*?)<\/[^>]*>/gi, '$1');  // removes any HTML tags from the text
        description.className = 'blog-column-text-description';
        description.textContent = getDescription(cleanedFirstParagraph, 150).replaceAll("<br>", "\n").trimStart();
        text.appendChild(description);
    }
}