export default function imgsMarkup(images){
    return images
    .map(image => {
        return `
        <div class="photo-card">
            <a href="${image.largeImageURL}" class="card-link">
                <img class="card-image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy"
                width="250" height="180"/>
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    ${image.likes}
                </p>
                <p class="info-item">
                    <b>Views</b>
                    ${image.views}
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    ${image.comments}
                </p>    
                <p class="info-item">
                    <b>Downloads</b>
                    ${image.downloads}
                </p>
            </div>
        </div>`
    })
    .join('')
};