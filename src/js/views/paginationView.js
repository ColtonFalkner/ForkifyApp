import View from './View.js'
import icons from 'url:../../img/icons.svg'

class paginationView extends View {
  _parentElement = document.querySelector('.pagination')

  _generateMarkup() {
    const curPage = this._data.page
    const _generateMarkupBtnNext = `
      <button class="btn--inline pagination__btn--next">
       <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`
    const _generateMarkupBtnPrev = `
    <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
    `

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    )
    console.log(numPages)

    //Page 1 and more to go
    if (curPage === 1 && numPages > 1) {
      return _generateMarkupBtnNext
      //   return `
      //   <button class="btn--inline pagination__btn--next">
      //     <span>Page ${curPage + 1}</span>
      //       <svg class="search__icon">
      //         <use href="${icons}#icon-arrow-right"></use>
      //       </svg>
      // </button>
      //   `
    }

    //Last page
    if (curPage === numPages && numPages > 1) {
      return _generateMarkupBtnPrev
    }
    //Interstitial page
    if (curPage < numPages) {
      return _generateMarkupBtnPrev + _generateMarkupBtnNext
    }

    //Page 1 and nothing else
    return ''
  }
}

export default new paginationView()
