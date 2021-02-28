import './styles.css';
import ApiService from './js/apiService';
import imageList from './template/imgList.hbs';
import { onOpenModal } from './js/modal';
import refs from './js/refs';
import debounce from 'lodash.debounce';
import showNotification from './js/notification';

const hitsApiService = new ApiService();

refs.input.addEventListener('input', debounce(onSearch, 500));
refs.galleryList.addEventListener('click', onOpenModal);

function onSearch(e) {
  e.preventDefault();

  hitsApiService.query = e.target.value.trim();

  if (hitsApiService.query === '') {
    showNotification();
  }

  hitsApiService.resetPage();
  clearHits();

  hitsApiService.fetchHits().then(hits => {
    addHitsMarkup(hits);
    hitsApiService.incrementPage();
  });
}

function addHitsMarkup(data) {
  refs.galleryList.insertAdjacentHTML('beforeend', imageList(data));
}

function clearHits() {
  refs.galleryList.innerHTML = '';
}

function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && hitsApiService.query !== '') {
      hitsApiService.fetchHits().then(addHitsMarkup);
    }
  });
}

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '100px',
});

observer.observe(refs.scroll);
