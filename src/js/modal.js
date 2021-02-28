import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function onOpenModal({ target: { dataset } }) {
  basicLightbox
    .create(`<img width="" height="" src="${dataset.source}">`)
    .show();
}
export { onOpenModal };
