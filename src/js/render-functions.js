import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';

const gallery = document.querySelector('.gallery');

const simpleLightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  className: 'simple-lightbox',
});

const scrollBy = (numberOfRows = 2) => {
  const { height } = gallery.lastElementChild.getBoundingClientRect();
  window.scrollBy({ top: height * numberOfRows, behavior: 'smooth' });
};

const addFooter = ({ views, comments, downloads, likes }) => {
  return `
  <div class="gallery-footer">
    <div class="field"><div class="label">Likes</div><div class="value">${likes}</div></div>
    <div class="field"><div class="label">Views</div><div class="value">${views}</div></div>
    <div class="field"><div class="label">Comments</div><div class="value">${comments}</div></div>
    <div class="field"><div class="label">Downloads</div><div class="value">${downloads}</div></div>
  </div>
  `;
};

export const resetImages = () => {
  gallery.textContent = '';
};

export const addImages = (images, options = { shouldScroll: true }) => {
  const { shouldScroll } = options;

  const adjacentImages = images
    .map(
      ({ webformatURL, largeImageURL, tags, ...props }) =>
        `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img
            class="gallery-image"
            src="${webformatURL}"
            alt="${tags}"
          />
        </a>
        ${addFooter(props)}
      </li>
      `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', adjacentImages);
  simpleLightbox.refresh();

  if (shouldScroll) {
    scrollBy();
  }
};
