const fruitForm = document.querySelector('#inputSection form');
const fruitList = document.querySelector('#fruitSection ul');
const fruitNutrition = document.querySelector('#nutritionSection p');

let totalCalories = 0;
let totalCarbohydrates = 0;
let totalProteins = 0;
let totalFat = 0;
let totalSugar = 0;

const fetchFruit = fruit => {
    fetch(`https://fruity-api.onrender.com/api/fruits/${fruit}`)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        addFruit(data)})
    .catch(err => console.error(err))
}

const addFruit = fruit => {
    const li = document.createElement('li');
    li.textContent = fruit.name; 
    li.addEventListener("click", removeFruit, { once: true });
    fruitList.appendChild(li);
    totalCalories += fruit.nutritions.calories;
    totalCarbohydrates += fruit.nutritions.carbohydrates;
    totalProteins += fruit.nutritions.protein;
    totalFat += fruit.nutritions.fat;
    totalSugar += fruit.nutritions.sugar;
    
    const nutritionText = `Calories: ${totalCalories.toFixed(2)}<br>Carbohydrates: ${totalCarbohydrates.toFixed(2)}<br>Proteins: ${totalProteins.toFixed(2)}<br>Fat: ${totalFat.toFixed(2)}<br>Sugar: ${totalSugar.toFixed(2)}`;

    // Set the innerHTML of the element to display the text with line breaks
    fruitNutrition.innerHTML = nutritionText;


}

const removeFruit = e => {
    e.target.remove();
}

fruitForm.addEventListener("submit", e => {
    e.preventDefault();
    fetchFruit(e.target.fruitInput.value);
    e.target.fruitInput.value = "";
})

console.log(fruitForm);
