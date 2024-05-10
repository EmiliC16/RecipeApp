import View from './View';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView';

class ResultView  extends View{
    _parentElement=document.querySelector('.results');
    _errorMessage = 'We dont have that recipe :( . Try something else ^-^ ';
    _message = '';
   
_generateMarkup() {
 // console.log(this._data);
  return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new ResultView();