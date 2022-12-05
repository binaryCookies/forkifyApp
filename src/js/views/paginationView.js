// VIDEO 299. Implementing Pagination - Part 2

import View from './View';
import icons from 'url:../../img/icons.svg';
import { RES_PER_PAGE } from '../config';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // select closest button to e.target (parent element)
      const btn = e.target.closest('.btn--inline');
      console.log(btn);

      if (!btn) return;

      const gotoPage = +btn.dataset.goto;
      //   console.log(gotoPage); // pass into handler
      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / RES_PER_PAGE);
    console.log(numPages, currentPage);

    // Page 1, and there ARE other pages
    if (currentPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    }

    // Last  page (current page === to numPages)
    if (currentPage === numPages && numPages > 1) {
      return `
          <button data-goto="${
            currentPage - 1
          }" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${currentPage - 1}</span>
          </button>
        `;
    }

    // Other Page
    if (currentPage < numPages) {
      return ` 
       <button data-goto="${
         currentPage - 1
       }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>          
       </button>

       <button data-goto="${
         currentPage + 1
       }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
       </button>
    `;
    }

    // Page 1, and ther are NO other pages
    return '';
  }

  // TODO challenge to refactor
  _generateMarkupButton(num) {}
}

export default new PaginationView();
