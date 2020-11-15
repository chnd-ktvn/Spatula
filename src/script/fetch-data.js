import apiKey from "./api.js";

class DataFromFetch{
    static searchByIngredients(ingParams){
        return fetch(`https://api.spoonacular.com/recipes/findByIngredients?${ingParams}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            return Promise.resolve(responseJson);
        })
        .catch(error => {
            alert("Sorry, something went wrong. Your request couldn't be done. :(");
        })
    }
    static getRecipeInfo(idR){
        return fetch(`https://api.spoonacular.com/recipes/${idR}/information?apiKey=${apiKey}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            return Promise.resolve(responseJson);
        })
        .catch(error => {
            alert("Sorry, something went wrong. Your request couldn't be done. :(");
        })
    }
    static getAnalyzedInstructions(idR){
        return fetch(`https://api.spoonacular.com/recipes/${idR}/analyzedInstructions?apiKey=${apiKey}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            const[resp] = responseJson;
            return Promise.resolve(resp.steps);
        })
        .catch(error => {
            alert("Sorry, something went wrong. Your request couldn't be done. :(");
        })
    }
    static getRandomRecipes(){
        return fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=3`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            return Promise.resolve(responseJson.recipes);
        })
        .catch(error => {
            alert("Sorry, something went wrong. Your request couldn't be done. :(");
        })
    }
}
export default DataFromFetch;