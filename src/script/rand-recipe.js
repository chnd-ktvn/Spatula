class RandomRecipe extends HTMLElement{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: "open"});
    }
    set recipe(recipe){
        this._recipe = recipe;
        this.render();
    }
    render(){
        this.shadow.innerHTML = `
        <style>
        .rand-recipe{
            box-sizing: border-box;
            box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.5);
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 10px;
            color: white;
            background-color: lightslategrey;
            cursor: pointer;
        }
        .image{
            width: 100%;
            max-height: 300px;
            object-fit: cover;
            object-position: center;
        }
        .info{
            display: none;
        }
        h2, h3{
            font-family: monospace;
        }
        .link{
            color: white;
            font-style: italic;
            text-decoration: none;
        }
        </style>

        <div class="rand-recipe" id="${this._recipe.id}">
            <img class="image"src="${this._recipe.image}">
            <h2>${this._recipe.title}</h2>
            <div class="info">
                <p>Ready in minutes: ${this._recipe.readyInMinutes}</p>
                <p>Servings: ${this._recipe.servings}</p>
                <h3>Ingredients: </h3>
                <p>Read the detailed ingredients on <a href="${this._recipe.sourceUrl}" target="_blank" class="link"><u>${this._recipe.sourceName}</u></a>.</p>
                <h3>Instructions: </h3>
                <p>Read the detailed instructions on <a href="${this._recipe.sourceUrl}" target="_blank" class="link"><u>${this._recipe.sourceName}</u></a>.</p>
            </div>
        </div>
        `;
        this.shadow.querySelector(".rand-recipe")
        .addEventListener("click", () =>{
            const info = this.shadow.querySelector(".info")
            if (info.style.display === "none"){
                info.style.display = "block";
            } else {
                info.style.display = "none";
            }
        })
    }
}
customElements.define("rand-recipe", RandomRecipe)