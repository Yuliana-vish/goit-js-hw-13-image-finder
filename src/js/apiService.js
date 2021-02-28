const API_KEY = '20386006-9675b11da888a7538d51ef351';
const BASE_URL = 'https://pixabay.com/api';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchHits() {
    const request = `/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    const response = await fetch(BASE_URL + request);
    const newResponse = await response.json();
    return newResponse.hits;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
