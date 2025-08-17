// Copyright Christian Corsica. All Rights Reserved.


import {media} from "./constants.js";


/**
 * Generates the HTML for a list of given videos which include a video-link to embed, title, and description.
 * @param videos {Object[]} List of Objects that must define title, description, link, and type.
 */
export function generateVideos(videos)
{
    const mainElement = document.getElementById('main');

    const videosElement = document.createElement('div');
    videosElement.className = 'videos';
    mainElement.appendChild(videosElement);

    for (const video of videos) {
        const rowElement = document.createElement('div');
        rowElement.className = 'row';
        videosElement.appendChild(rowElement);

        const videoElement = document.createElement('div');
        videoElement.className = 'video';
        rowElement.appendChild(videoElement);

        const videoIframe = document.createElement('iframe');
        videoIframe.src = video.link;
        videoIframe.title = video.title;
        videoIframe.loading = "lazy";

        switch (video.type) {
            case media.youtube:
                videoIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; " +
                    "gyroscope; picture-in-picture; web-share";
                videoIframe.referrerpolicy = "strict-origin-when-cross-origin";
                videoIframe.allowfullscreen = true;
                break;
            case media.vimeo:
                videoIframe.allow = "autoplay; fullscreen; picture-in-picture; clipboard-write; " +
                    "encrypted-media; web-share"
                break;
            default:
                console.log("Unknown video type!");}

        videoElement.appendChild(videoIframe);

        const videoDescription = document.createElement('div');
        videoDescription.className = 'video-description';
        rowElement.appendChild(videoDescription);

        const videoDescriptionText = document.createElement('p');
        videoDescriptionText.textContent = video.description;
        videoDescription.appendChild(videoDescriptionText);

        if (video.hasOwnProperty("script")) {
            const videoScript = document.createElement('a');
            videoScript.href = video.script;
            videoScript.textContent = "\n" + video.script;
            videoDescription.appendChild(videoScript);
        }
    }
}