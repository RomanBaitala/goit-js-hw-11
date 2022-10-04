import {Notify} from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import imgsMarkup from "./components/imgsMarkup";
import NewApiSearch from "./components/fetchImages";

let lightboxOptions = new SimpleLightbox('.gallery a', {
    scrollZoom: false,
    captionsData: 'alt',
    captionDelay: 250,
});

const newApiSearch = new NewApiSearch();
const formRef = document.querySelector('.search-form');
const galleryRef = document.querySelector('.gallery');
const loadBtnRef = document.querySelector('.load-more');

loadBtnRef.style.display = 'none'
loadBtnRef.addEventListener('click', onBtnLoad)
formRef.addEventListener('submit', onSubmit);

let totalHits = 0;

async function onSubmit(evt){
    evt.preventDefault();
    clearMarkup();
    if (evt.currentTarget.elements.searchQuery.value === '') {
        Notify.failure('Pleae write your query');
        return;
    }
    const searchString = evt.currentTarget.elements.searchQuery.value.trim();
    if (!searchString) {
        return
    }
    newApiSearch.query = searchString;
    newApiSearch.resetPage()
    const images = await newApiSearch.fetchImages()
    if (images.hits.length === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return
    };
    totalHits = images.totalHits;
    Notify.success(`Hooray! We found ${totalHits} images.`);
    totalHits -= images.hits.length
    const markup = imgsMarkup(images.hits)
    pushMarkup(markup)
    toglleBtnLoad()
    lightboxOptions.refresh();
    
};

async function onBtnLoad(){
    const images = await newApiSearch.fetchImages()
    totalHits -= images.hits.length
    const markup = imgsMarkup(images.hits)
    pushMarkup(markup)
    if (totalHits === 0 || totalHits < 0) {
        Notify.failure("We're sorry, but you've reached the end of search results.")
    }
    toglleBtnLoad(totalHits)
    lightboxOptions.refresh();
}


function clearMarkup(){
    galleryRef.innerHTML = '';
};

function pushMarkup(markup){
    galleryRef.insertAdjacentHTML('beforeend', markup);
};

function toglleBtnLoad(hitsValue){
    if (hitsValue === 0 || hitsValue < 0) {
        loadBtnRef.style.display = 'none'
    } else{
        loadBtnRef.style.display = 'block'
    }
}