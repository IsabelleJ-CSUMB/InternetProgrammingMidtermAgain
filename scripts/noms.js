let testString = "apple";
let order = "true";
let sorter = "nutrient%5BPROTEIN%5D";

let foodData;
let foodArray = [];

async function getFood (string, order, sorter) {

    let fetchString = "https://api.noms.sh/v1/foods?page_size=3&sort="
    
    if (order == "false") {
        fetchString = fetchString + "-";
    }

    if (sorter.length > 0) {
        fetchString = fetchString + sorter;
    } else {
        fetchString = fetchString + "name";
    }
    fetchString = fetchString + "&include=brand%2Cimages%2Cnutrients%2Cserving_sizes";

    if (string.length > 0) {
        fetchString = fetchString + "&q=" + string;
    }

    fetchString = fetchString + "&fields%5Bfoods%5D=id%2Cname&fields%5Bbrands%5D=id%2Cname&fields%5Bnutrients%5D=id%2Cname&fields%5Bserving_sizes%5D=descriptor%2Cgrams&fields%5Bimages%5D=type%2Curl";
// fetch('https://api.noms.sh/v1/foods?page_size=3&sort=-name&include=brand%2Cimages%2Cnutrients%2Cserving_sizes&q=apple&fields[foods]=id%2Cname&fields[brands]=id%2Cname&fields[nutrients]=id%2Cname&fields[serving_sizes]=descriptor%2Cgrams&fields[images]=type%2Curl', {
//   headers: {
//     'X-API-Key': 'noms_sk_live_FoTIGZOiCqxB9lF4ahAtBodr25NVAsle3sfwiF'
//   }
//})    //debug
    console.log(fetchString);

//     let foodResult = await fetch('https://api.noms.sh/v1/foods?page_size=3&sort=-name&include=brand%2Cimages%2Cnutrients%2Cserving_sizes&q=apple&fields[foods]=id%2Cname&fields[brands]=id%2Cname&fields[nutrients]=id%2Cname&fields[serving_sizes]=descriptor%2Cgrams&fields[images]=type%2Curl', {
//   headers: {
//     'X-API-Key': 'noms_sk_live_FoTIGZOiCqxB9lF4ahAtBodr25NVAsle3sfwiF'
//   }
// })
    let foodResult = await fetch(fetchString, {
  headers: {
    'X-API-Key': 'noms_sk_live_FoTIGZOiCqxB9lF4ahAtBodr25NVAsle3sfwiF'
  }});
    //debug
    console.log(foodResult);
    foodData = await foodResult.json();
    //debug
    console.log(foodData);

    listFoodData();
    
}

async function listFoodData() {
    let error = false;
    foodarray = [];
    //this loop gets all the joke texts and puts it in the jokeArray, has behvaior fitting 1 and 2 part jokes
    if(foodData.data.length == 0) {
        error = true;
    } else {
        for(let i = 0; i < foodData.data.length; i++) {
        let currentId = foodData.data[i].id;
        let fetchString = "https://api.noms.sh/v1/foods/" + currentId + "?include=brand%2Cnutrients%2Cserving_sizes%2Cimages";
        let foodWait = await fetch(fetchString, {
  headers: {
    'X-API-Key': 'noms_sk_live_FoTIGZOiCqxB9lF4ahAtBodr25NVAsle3sfwiF'
  }});
    let data = await foodWait.json();
    let tempString = "Name: " + data.data.name + "\n" + "Calories: " + data.data.nutrients[3].value + "\n" + "Carbs: " + data.data.nutrients[1].value + "g \n" + "Protein: " + data.data.nutrients[6].value + "g \n" + "Fat: " + data.data.nutrients[9].value + "g \n" + "Sugar: " + data.data.nutrients[10].value + "\n";
    foodArray[i] = tempString
}
    }
    //debug
    console.log(foodArray);
    printFood(error);

}
getFood(testString, order, sorter);

function printFood(error)
{
    let output = document.getElementById("joke-output");
    output.innerHTML = "";

    {
        if (error == true) {
            {
                let foodDiv = document.createElement("p");
                foodDiv.textContent = "Error! No foods for the given parameters found.";
                output.appendChild(foodDiv);

            }
        } else {
            for (let i= 0; i < foodArray.length; i++) 
                {
                    let foodDiv = document.createElement("p");
                    foodDiv.textContent = foodArray[i];
                    output.appendChild(foodDiv);
                }
    }
}
}

        function applyFilters() 
    { 
        {
            let string = document.getElementById("joke-search").value;
            let order = document.getElementById("filter-input").value;

            let selectedNutrient = document.querySelector( 'input[name="nutrient_target"]:checked');

            let sorter;
            if (selectedNutrient) 
                {
                    sorter = selectedNutrient.value;
                }
                else 
                {
                    sorter = "";
                }

            getFood(string, order, sorter);

            
        }
    }

        document.getElementById("joke-search").addEventListener("input", applyFilters);

        let nutrientFilters = document.querySelectorAll('input[name="nutrient_target"]');

        nutrientFilters.forEach(function(radio)
        {
            radio.addEventListener("change", applyFilters);
        })
    

    document.getElementById("reset-button").addEventListener("click", function() 
    {
        document.getElementById("joke-search").value = "";
        document.getElementById("filter-input").value = "true";

        nutrientFilters.forEach(function(radio) {
            radio.checked = false;
        });

        foodArray = [];
        document.getElementById("joke-output").innerHTML = "";
    });

        




