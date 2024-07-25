import { showNotification } from './js/notifications';
import SearchImageApi from './js/pixabay-api';
import { addImages, resetImages } from './js/render-functions';

const searchForm = document.querySelector('.form-pixabay');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

// default state
const state = {
  searchQuery: '',
  page: 1,
  totalPages: 1,
  per_page: 15,
};

const showLoader = (status = true) => {
  if (status) {
    loader.classList.add('show');
  } else {
    loader.classList.remove('show');
  }
};

const showLoadMoreButton = (status = true) => {
  if (status) {
    loadMoreButton.classList.add('show');
  } else {
    loadMoreButton.classList.remove('show');
  }
};

const search = async (options = { shouldReset: true }) => {
  const searchQuery = state.searchQuery.trim();
  const { page, totalPages, per_page } = state;
  const { shouldReset } = options;

  showLoadMoreButton(false);

  // checking if search query is empty
  if (!searchQuery) {
    showNotification('The search query cannot be empty');
    return;
  }

  try {
    // checking if the gallery should be cleaned before fetching
    if (shouldReset) {
      resetImages();
    }

    showLoader();
    const { hits, totalHits } = await SearchImageApi.search(searchQuery, {
      page,
      per_page,
    });

    // checking for empty response from api
    if (hits.length === 0) {
      showNotification(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }

    state.totalPages = Math.ceil(totalHits / per_page);
    addImages(hits, { shouldScroll: !shouldReset });
    ++state.page;

    // checking if the load more button should be shown
    if (state.totalPages > page) {
      showLoadMoreButton();
    }

    // checking if the end of search results has been reached
    if (state.page > state.totalPages) {
      showNotification(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.log(error);
  } finally {
    showLoader(false);
  }
};

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  state.searchQuery = this.elements.search.value;
  state.page = 1;
  state.totalPages = 1;

  search();
  this.reset();
});

loadMoreButton.addEventListener('click', () => {
  search({ shouldReset: false });
});
