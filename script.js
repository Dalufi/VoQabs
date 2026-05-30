async function loadWordOfTheDay() {
    // Load the word of the day from the JSON file
    const response = await fetch('assets/WordOfTheDayList.json');
    const words = await response.json();

    // get today's date
    const today = new Date().toDateString();

    //make hash from date
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
        hash += today.charCodeAt(i);
    }

    // calculate index of word of the day
    const index = hash % words.length;

    //chooose word of the day
    const wordOfTheDay = words[index];

    // display the word of the day
    const span = document.getElementById('wordOfTheDay');

    if (span) {
        span.textContent = wordOfTheDay;
    }
}

//load the word of the day when the page loads
loadWordOfTheDay();

//defines variables for the create list
const CreateListMenu = document.getElementById('Create-List-Menu');
const CreateListStep1 = document.getElementById('Create-List-Step1');
const CreateListStep2 = document.getElementById('Create-List-Step2');
const CreateListStep3 = document.getElementById('Create-List-Step3');
const startButton = document.getElementById('StartButton');
const next1Button = document.getElementById('Next1Button');
const Return1 = document.getElementById('Return1');
const Return2 = document.getElementById('Return2');
const Next2Button = document.getElementById('Next2Button');

//event for Start Button
document.getElementById('CreateListStartButton').addEventListener("click", function() {
    CreateListMenu.classList.add('hidden');
    CreateListStep1.classList.remove('hidden');
});

//sets the current list name to an empty string
let currentListName = "";

//Event for the first return button
Return1.addEventListener("click", function() {
    CreateListMenu.classList.remove('hidden');
    CreateListStep1.classList.add('hidden');
});

//event for the first next button
next1Button.addEventListener("click", function() {
    currentListName = document.getElementById('listName').value;

    //prevents the name to be nothing
    if (currentListName === "") {
        alert("Please enter a name for your list!");
        return;
    }

    CreateListStep1.classList.add('hidden');
    CreateListStep2.classList.remove('hidden');
});

//loads the languages from the JSON file
async function loadLanguages() {
    const response = await fetch('/assets/LanguageSelection.json');
    const languages = await response.json();

    //defines the select
    const language1Select = document.getElementById('language1');
    const language2Select = document.getElementById('language2');

    const placeholder1 = document.createElement("option");
    placeholder1.textContent = "Select a language...";
    placeholder1.value = "";
    placeholder1.disabled = true;
    placeholder1.selected = true;
    language1Select.appendChild(placeholder1);

    const placeholder2 = document.createElement("option");
    placeholder2.textContent = "Select a language...";
    placeholder2.value = "";
    placeholder2.disabled = true;
    placeholder2.selected = true;
    language2Select.appendChild(placeholder2);

    //load the languages when the page loads
    for (let i = 0; i < languages.length; i++) {
    const language = languages[i];
    
         //loads options for the first select
         const option1 = document.createElement("option");
         option1.textContent = language.name;
         option1.value = language.code;
         language1Select.appendChild(option1);

        //loads options for the second select
        const option2 = document.createElement("option");
         option2.textContent = language.name;
        option2.value = language.code;
         language2Select.appendChild(option2);
    }

}

loadLanguages();

//event for the second return button
Return2.addEventListener("click", function() {

    currentListName = "";
    document.getElementById("listName").value = "";

    CreateListStep1.classList.remove('hidden');
    CreateListStep2.classList.add('hidden');

    document.getElementById("language1").value = "";
    document.getElementById("language2").value = "";
});

//defines variables for the current languages as empty
let currentLanguage1 = "";
let currentLanguage2 = "";

//moves to Step 3 when the next button is clicked
Next2Button.addEventListener("click", function() {
    currentLanguage1 = document.getElementById("language1").value;
    currentLanguage2 = document.getElementById("language2").value;

    //prevents the user to not select a language
    if (currentLanguage1 === "" || currentLanguage2 === "") {
        alert("Please select a language for both fields!");
        return;
    }

    //prevents the user to select the same language
    if (currentLanguage1 === currentLanguage2) {
        alert("Please select two different languages!");
        return;
    }

    //moves to Step 3
    CreateListStep2.classList.add('hidden');
    CreateListStep3.classList.remove('hidden');
});

function setupStep3() {

    

}
