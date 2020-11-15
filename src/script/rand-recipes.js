import "./rand-recipe.js";
class RandomRecipes extends HTMLElement {
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: "open"});
    }
    set recipes(recipes){
        this._recipes = recipes;
        this.render();
    }
    render(){
        this.shadow.innerHTML = "";
        this._recipes.forEach(recipe => {
            const randRecipeEl = document.createElement("rand-recipe");
            randRecipeEl.recipe = recipe;
            this.shadow.appendChild(randRecipeEl);
        });
    }
}
customElements.define("rand-recipes", RandomRecipes);