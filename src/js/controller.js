import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';


import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// if (module.hot) {
//    module.hot.accept();
// }

const controlRecipes = async function () {
   try {
      const id = window.location.hash.slice(1);
      if (!id) return;
      recipeView.renderSpinner();
// 0) U p d a t e    r e s u l t s    v i e w   t o   m a r k   s e l e c t e d   s e a r c h   r e s u l t
      resultView.update(model.getSearchResultsPage());

//  1) L o a d i n g   t h e   r e c i p e
      await model.loadRecipe(id);

//  2) R e n d e r
      recipeView.render(model.state.recipe);
     
   } catch (err) {
      recipeView.renderError();
   }
};

const controlSearchResults = async function () {
   try {
      resultView.renderSpinner();

// 1) G e t   t h e   s e a r c h   q u e r y
      const query = searchView.getQuery();
      if (!query) return;

// 2) L o a d   t h e   s e a r c h   r e s u l t s
      await model.loadSearchResults(query);
      console.log(model.state.search.results);

// 3) R e n d e r   t h e   r e s u l t s
      resultView.render(model.getSearchResultsPage());

// 4) R e n d e r   t h e   i n i t i a l   p a g i n a t i o n   b u t t o n s
      paginationView.render(model.state.search);
      }catch (err) {
      console.log(err);
   }
};

const controlPagination = function(goToPage) {
// 1) R e n d e r   n e w   r e s u l t s
      resultView.render(model.getSearchResultsPage(goToPage));
      
// 2) R e n d e r   n e w   p a g i n a t i o n   b u t t o n s
      paginationView.render(model.state.search);
}

const controlServings = function(newServings) {
// U p d a t e   t h e   r e c i p e   s e r v i n g s
      model.updateServings(newServings)
  
// U p d a t e   t h e   r e c i p e   v i e w
      recipeView.update(model.state.recipe);
}

const controlAddBookmark = function () {
// 1) A d d / R e m o v e    B o o k m a r k
 if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
 else model.deleteBookmark(model.state.recipe.id)

// 2) U p d a t e   R e c i p e   V i e w
recipeView.update(model.state.recipe);

// 3) R e n d e r   B o o k m a r k s
bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks= function(){
      bookmarksView.render(model.state.bookmarks)
};

const controlAddRecipe = async function(newRecipe){
   try{
      //  S h o w    l o a d i n g   s p i n n e r 
      addRecipeView.renderSpinner();

      // U p l o a d   t h e   n e w   r e c i p e   d a t a
     await model.uploadRecipe(newRecipe);
     console.log(model.state.recipe);

      //  R e n d e r    r e c i p e
      recipeView.render(model.state.recipe);

      //  S u c c e s s    m e s s a g e   
      addRecipeView.renderMessages();

      // R e n d e r   b o o k m a r k   v i e w
      bookmarksView.render(model.state.bookmarks)

      // C h a n g e   I D   i n   U R L
      window.history.pushState(null, '', `#${model.state.recipe.id}`);
      

      //  C l o s e    f o r m    w i n d o w
      setTimeout(function() {
        addRecipeView.toggleWindow()
      },1 * 1000 );
   }  catch(err) {
      console.error(err)
      addRecipeView.renderError(err.message);
   }
};

const init = function () {
   bookmarksView.addHandlerRender(controlBookmarks);
   recipeView.addHandlerRender(controlRecipes);
   recipeView.addHandleUpdateServings(controlServings);
   recipeView.addHandlerAddBookmark(controlAddBookmark);
   searchView.addHandlerSearch(controlSearchResults);
   paginationView.addHandlerClick(controlPagination);
   addRecipeView._addHanlerUpload(controlAddRecipe);


};

init();
