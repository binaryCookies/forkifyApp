import View from './View';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

// 304.
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query, please try again ;)';
  _message = '';

  _generateMarkup() {
    // Available from the View superCLass
    // console.log(this._data);
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
