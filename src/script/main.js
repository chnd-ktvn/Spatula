import apiKey from "./api.js";
import DataFromFetch from "./fetch-data.js";
import "./rand-recipes.js";

function main() {
    const buttonSearchR = () => {
        const searchBar = document.querySelector("#search-bar").value;
        const ingParams = `apiKey=${apiKey}&ingredients=${searchBar.trim().toLowerCase().split(",").join(",+")}&number=1`;
            DataFromFetch.searchByIngredients(ingParams)
             .then(showRecipes);
    }
    const buttonRandRecipes = () => {
        DataFromFetch.getRandomRecipes()
        .then(showRandRecipes);
    }
    const showRandRecipes = (recipes) => {
        const randRecipes = document.querySelector("rand-recipes");
        randRecipes.recipes = recipes;
    }
    const showRecipes = (responseJson) => {
        const searchRecipe = document.querySelector("#search-recipe");
        
        searchRecipe.innerHTML = "";
        responseJson.forEach(respon => {
            searchRecipe.innerHTML += `
            <div class="container">
            <div class="col m12 s12">
            <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="https://spoonacular.com/recipeImages/${respon.id}-636x393.jpg">
                </div>
                <div class="card-content">
                    <span class="card-title activator black-text text-lighen-2">${respon.title}<i class="material-icons right button-instructions" id="${respon.id}">more_vert</i></span>
                </div>
                <div class="card-reveal black-text text-lighten-3">
                    <span class="card-title black-text text-lighen-2">Instructions<i class="material-icons right">close</i></span>
                    <div class="servings"></div>
                    <ol class="instructions-ings"></ol>
                    <p class="steps"></>
                    <ol class="instructions-steps"></ol>
                </div>
            </div>
            </div>
            </div>  
            `
        });
        const buttons = document.querySelectorAll(".button-instructions");
        buttons.forEach(button => {
            button.addEventListener("click", event => {
                const idR = event.target.id;

                DataFromFetch.getRecipeInfo(idR)
                .then(responseJson => {
                    showRecipesByIng(responseJson.extendedIngredients, responseJson.readyInMinutes, responseJson.servings)
                });

                DataFromFetch.getAnalyzedInstructions(idR)
                .then(showRecipesByIns);
            });
        });
    };
    const showRecipesByIng = (extendedIngredients, readyInMinutes, servings) => {
        const instructionsIngs = document.querySelector(".instructions-ings");
        const servingsP = document.querySelector(".servings");
        servingsP.innerHTML = "";
        servingsP.innerHTML += `
            <p>Ready in minutes: ${readyInMinutes}</p>
            <p>Servings: ${servings}</p>
            <p>Ingredients:</p>
        `;
        instructionsIngs.innerHTML = "";
        extendedIngredients.forEach(extendedIngredient => {
            instructionsIngs.innerHTML += `
            <li>${extendedIngredient.original}</li>
        `;
        });
    }
    const showRecipesByIns = (steps) => {
        const instructionsSteps = document.querySelector(".instructions-steps");
        const stepsP = document.querySelector(".steps");
        
        stepsP.innerHTML = "";
        stepsP.innerHTML += `
            <p>Steps:</p>
        `;
        instructionsSteps.innerHTML = "";
        steps.forEach(stepi => {
            instructionsSteps.innerHTML += `
            <li>${stepi.step}</li>
        `;
        });
    }
    const buttonRandR = document.querySelector("#getRandR");
    buttonRandR.addEventListener("click", buttonRandRecipes);

    const buttonSearch = document.querySelector("#button-search");
    buttonSearch.addEventListener("click", buttonSearchR);

    const sidenav = document.querySelector(".sidenav");
    M.Sidenav.init(sidenav, {
        draggable: true
    });
    const slider = document.querySelectorAll(".slider");
    M.Slider.init(slider, {
        indicators: false
    });
    const scrollspy = document.querySelectorAll(".scrollspy");
    M.ScrollSpy.init(scrollspy, {
        scrollOffset: 50
    });
};
export default main;