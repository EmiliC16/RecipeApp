import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView  extends View{

    _parentElement=document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline');
            if(!btn) return;

            const goToPage = +btn.dataset.goto;
           
            handler(goToPage);
        })

    }
    _generateMarkup() {
        const currentPage=this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        console.log(numPages);
        
// P a g e  1  a n d   t h e r e   a r e   o t h e r   p a g e s 
        if(currentPage === 1 && numPages > 1){
            return `
              <button data-goto=" ${currentPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                  <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                  </svg>
              </button>
            `;
        }
// L a s t   p a g e
        if(currentPage === numPages && numPages > 1){
            return `
            <button data-goto=" ${currentPage -1 }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
            <span>Page ${currentPage - 1}</span>
            </button>
      `;
        }
        
 // O t h e r   p a g e
        if(currentPage < numPages){
            return `
            <button data-goto=" ${currentPage - 1} " class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
            <span>Page ${currentPage - 1}</span>
            </button>
            <button button data-goto=" ${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
          </button>
       
      `;
        }
// P a g e   1   a n d   t h e r e   a r e   N O   o t h e r   p a g e s 
        return '';
    }
}

export default new PaginationView();