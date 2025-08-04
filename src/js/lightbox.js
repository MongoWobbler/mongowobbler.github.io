// Copyright Christian Corsica. All Rights Reserved.


let currentGallery = null;
let currentArtworkIndex = 0;


/**
 * Updates the current artwork shown in the lightbox with the current index.
 */
function updateArtwork(){
    const artwork = currentGallery[currentArtworkIndex];

    const image = document.getElementById('lightbox-image');
    image.src = artwork.link;
    image.alt = artwork.title;

    document.getElementById('lightbox-title').textContent = artwork.title;
    document.getElementById('lightbox-description').textContent = artwork.description;
}

/**
 * Opens the lightbox with the image that pops up based on the given index and gallery.
 * @param {int} index               The index of the artwork in its gallery.
 * @param {Object[]} gallery        List of objects with src, title, and descriptions defined.
 */
export function openLightbox(index, gallery) {
    currentGallery = gallery;
    currentArtworkIndex = index;
    updateArtwork()

    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

/**
 * Closes the lightbox.
 */
export function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

/**
 * Sets the image, title, and description based on the previous index if there is a previous index.
 */
export function previousArtwork() {
    if (currentArtworkIndex > 0) {
        currentArtworkIndex--;
    }
    else {
        currentArtworkIndex = currentGallery.length - 1;
    }

    updateArtwork();
}

/**
 * Sets the image, title, and description based on the next index if there is a next index.
 */
export function nextArtwork() {
    if (currentArtworkIndex < currentGallery.length - 1) {
        currentArtworkIndex++;
    }
    else {
        currentArtworkIndex = 0;
    }

    updateArtwork();
}

/**
 * Generates the HTML for a list of given images which include a link, title, and description.
 * @param gallery {Object[]} List of images to add to the gallery viewer.
 * @param column_count {int} How many columns the gallery should have.
 */
function generateGallery(gallery, column_count=3)
{
    document.querySelector(":root").style.setProperty('--gallery_column_count', column_count);
    const mainElement = document.getElementById('main');
    let row = null;

    gallery.forEach((artwork, index) => {
        if (index % column_count === 0) {
            row = document.createElement('div');
            row.className = 'row';
            mainElement.appendChild(row);
        }

        const artworkElement = document.createElement('div');
        artworkElement.className = 'image-column';
        artworkElement.onclick = () => openLightbox(index, gallery);

        if (index < column_count)
        {
            artworkElement.style = 'padding-top: 1.5rem';
        }

        const imageElement = document.createElement('img');
        imageElement.src = artwork.link;
        imageElement.alt = artwork.title;
        imageElement.loading = 'lazy';
        artworkElement.appendChild(imageElement);

        const titleElement = document.createElement('div');
        titleElement.className = 'image-title';
        titleElement.textContent = artwork.title;
        artworkElement.appendChild(titleElement);

        row.appendChild(artworkElement);

    })
}

/**
 * Adds the events to lightbox so that when lightbox is active, user can use keys to navigate lightbox
 * or click outside lightbox to close
 * @param gallery {Object[]} List of images to add to the gallery viewer.
 * @param column_count {int} How many columns the gallery should have.
 */
export function addLightboxListeners(gallery, column_count=3) {

    document.addEventListener('DOMContentLoaded', function() { generateGallery(gallery, column_count); })

    document.addEventListener('keydown', function(e) {
        if (document.getElementById('lightbox').classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                previousArtwork();
            } else if (e.key === 'ArrowRight') {
                nextArtwork();
            }
        }
    });

    document.getElementById('lightbox').addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
}