//Test inputs
let testTypes = ["Programming"];
let testString = "c";
let testLanguage = "es"

let jokesData;
let jokeArray = [];

//this function should do everything once an event listner is triggered
async function getJokes (language, type, string) {

    let fetchString = "https://v2.jokeapi.dev/joke/"

    //add the types to the query, if all are selected or none, make it add any instead
    if (type.length < 6 && type.length > 0) {
        for(let i = 0; i < type.length; i++) {
            fetchString = fetchString + type[i];
            if (i != type.length-1) {
                fetchString = fetchString + ","
            }
        }
    } else if (type.length == 6 || type.length == 0) {
        fetchString = fetchString + "Any";
    }

    //adds the language flag, this is only added if the language isn't english
    if(language != "eng") {
        fetchString = fetchString + "?lang=" + language;
        fetchString = fetchString + "&blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

    } else {
        fetchString = fetchString + "?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

    }

    //adds the string filter
    if (string.length > 0) {
        fetchString = fetchString + "&contains=" + string;
    }

    fetchString = fetchString + "&amount=10"

    //debug
    console.log(fetchString);

    let jokesResult = await fetch(fetchString);
    //debug
    console.log(jokesResult);
    jokesData = await jokesResult.json();
    //debug
    console.log(jokesData);

    //runs the list method
    listJokeText();

}

getJokes(testLanguage, testTypes, testString);

function listJokeText() {
    let error;
    //this loop gets all the joke texts and puts it in the jokeArray, has behvaior fitting 1 and 2 part jokes
    if(jokesData.error = true) {
        error = true
    } else {
        for(let i = 0; i < jokesData.jokes.length; i++) {

        if (jokesData.jokes[i].type == "single") {
            jokeArray[i] = jokesData.jokes[i].joke;
        } else if (jokesData.jokes[i].type == "twopart") {
            jokeArray[i] = jokesData.jokes[i].setup + "\n" + jokesData.jokes[i].delivery;
        }
    }
    //debug
    console.log("jokes:" + jokeArray);
    }
    //calls print jokes, actually displaying them on the page
    printJokes(error);
}

function printJokes(error) {
    if (error = true) {
        let jokeText = document.createElement("p");
        jokeText.textContent = "Error! No jokes for the given parameters found.";
    } else {
        for (let i = 0; i < jokeArray.length; i++) {
        let jokeText = document.createElement("p");
        jokeText.textContent = jokeArray[i];
        }
    }
    
}

//event lsitener to trigger the getJokes function when search button is clicked
document.getElementById("joke-search-button").addEventListener("click", function()
 {
    let language = document.getElementById("language-input").value;
    let typeElements = document.querySelectorAll(".categories input[type='checkbox']");
    let types = [];
    typeElements.forEach(function(element)
     {
        if (element.checked) 
        {
            types.push(element.value);
        }
    });
    let searchString = document.getElementById("joke-search").value;
    getJokes(language, types, searchString);
});


// loop through results
for (let i=0; i < jokeArray.length; i++) 
{
    let jokeDiv = document.createElement("div");
    jokeDiv.textContent = jokeArray[i];
    document.getElementById("joke-output").appendChild(jokeDiv);

}

