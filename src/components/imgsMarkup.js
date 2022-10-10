export default function imgsMarkup(images){
    return images
    .map(image => {
        return `
        <div class="photo-card">
            <a href="${image.largeImageURL}" class="card-link">
                <img class="card-image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy"
                width="300" height="210"/>
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    <br>${image.likes}
                </p>
                <p class="info-item">
                    <b>Views</b>
                    <br>${image.views}
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    <br>${image.comments}
                </p>    
                <p class="info-item">
                    <b>Downloads</b>
                    <br>${image.downloads}
                </p>
            </div>
        </div>`
    })
    .join('')
};