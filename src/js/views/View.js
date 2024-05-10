import icons from 'url:../../img/icons.svg';

export default class View{
    _data;
    /**
     * Render the recieved object to the DOM
     * @param {Object | Object[]} data The data to be renderd
     * @param {boolean} [render=true] If false,create markup string instead of rendering to the DOM
     * @returns {undefined | string} A markup string is returned if render = false
     * @this {Object} View instance 
     * @author Emili Canoska
     * @todo Finish implementation
     */

    render(data, render = true){

      if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        this._data = data;
        const markup =this._generateMarkup();
        
        if(!render) return markup;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    update(data) {
      this._data = data;
      const newMarkup =this._generateMarkup();

      const newDOM = document.createRange().createContextualFragment(newMarkup);
      const newElements = Array.from(newDOM.querySelectorAll('*')) ;
      const curElements = Array.from(this._parentElement.querySelectorAll('*')) ;

      newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

// U p d a t e   T e x t 
        if(!newEl.isEqualNode(curEl) &&  newEl.firstChild?.nodeValue.trim() !== '')
        {
         
          curEl.textContent = newEl.textContent;
        }

// U p d a t e   A t t r i b u t e s
        if(!newEl.isEqualNode(curEl)) {
            Array.from(newEl.attributes).forEach(attr => 
              curEl.setAttribute(attr.name, attr.value)
          );
       };
    });
  }
 _clear (){
    this._parentElement.innerHTML = '';
 }

 renderSpinner = function(){
    const markup = `
    <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
    </div> 
    ` 
    this._parentElement.innerHTML='';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(message = this._errorMessage){
    const markup = 
     `
    <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
     </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessages(message = this._message){
    const markup = 
     `  <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

}