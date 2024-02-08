import { servicesGallery } from './api';
import { createMarkup } from './createmarkup';
import Notiflix from 'notiflix';

const elements = {
  form: document.querySelector('.js-search-form'),
  input: document.querySelector('.js-search-form-input'),
  containerGallery: document.querySelector('.js-gallery'),
  loadBtn: document.querySelector('.js-load-more'),
};

elements.form.addEventListener('submit', handlerSearch);
elements.loadBtn.addEventListener('click', handlerLoadMore);

let page = 1;
let counter = 0;

async function handlerSearch(evt) {
  evt.preventDefault();
  elements.containerGallery.innerHTML = '';
  elements.loadBtn.classList.replace('load-more', 'load-more-hidden');

  const { searchQuery } = evt.currentTarget.elements;
  console.log(searchQuery.value);

  if (searchQuery.value === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  page = 1;
  counter = 0;
  console.log(page);

  try {
    const gallery = await servicesGallery(searchQuery.value, page);
    console.log(gallery);

    if (gallery.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    Notiflix.Notify.success(`Hooray! We found ${gallery.totalHits} images.`);

    elements.containerGallery.innerHTML = createMarkup(gallery.hits);

    counter += gallery.hits.length;

    if (counter < gallery.totalHits) {
      elements.loadBtn.classList.replace('load-more-hidden', 'load-more');
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function handlerLoadMore() {
  page += 1;
  console.log(page);

  if (elements.input.value === '') {
    elements.containerGallery.innerHTML = '';
    elements.loadBtn.classList.replace('load-more', 'load-more-hidden');
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  try {
    const gallery = await servicesGallery(elements.input.value, page);
    console.log(gallery);

    if (gallery.hits.length === 0) {
      elements.containerGallery.innerHTML = '';
      elements.loadBtn.classList.replace('load-more', 'load-more-hidden');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    elements.containerGallery.insertAdjacentHTML(
      'beforeend',
      createMarkup(gallery.hits)
    );

    counter += gallery.hits.length;

    if (counter >= gallery.totalHits) {
      elements.loadBtn.classList.replace('load-more', 'load-more-hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.log(error.message);
  }
}
