import { Notify } from "notiflix";
import axios from "axios";

const API_KEY = '30333972-0d78ef232504ac5f2ddfcaf13'; 

const params = {
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40
};

export default class NewApiSearch{
    constructor(){
        this.searchQuery = '';
        this.page = 1;
    };
    async fetchImages(){
        try{
            const url = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}`;
            const response = await axios.get(url, {params});
            await this.nextPage();
            return response.data;
        } catch(error){
            Notify.failure(`Oops, something went wrong;(`)
        };
    };
    async nextPage(){
        this.page += 1; 
    };
    async resetPage(){
        this.page = 1;
    };
    get query(){
        return this.searchQuery;
    };
    set query(newQuery){
        this.searchQuery = newQuery;
    };
};
