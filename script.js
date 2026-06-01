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
const EditMenu = document.getElementById('EditWord');
const Confirmation = document.getElementById('Create-List-Confirmation');
const FinishMenu = document.getElementById('FinishMenu');
let editingList = JSON.parse(localStorage.getItem("editingList")) || null;

const startButton = document.getElementById('CreateListStartButton');
const next1Button = document.getElementById('Next1Button');
const Return1 = document.getElementById('Return1');
const Return2 = document.getElementById('Return2');
const Next2Button = document.getElementById('Next2Button');
const Return3 = document.getElementById('Return3');
const AddWordButton = document.getElementById('AddWord');
const Next3Button = document.getElementById('Next3Button');
const Return4 = document.getElementById('Return4');
const Finish = document.getElementById('FinishButton');

if (startButton && next1Button && Return1 && Return2 && Next2Button && Return3 && AddWordButton && Next3Button && Return4 && Finish) {
//event for Start Button
startButton.addEventListener("click", function() {
    CreateListMenu.classList.add('hidden');
    CreateListStep1.classList.remove('hidden');
});

//sets the current list name to an empty string
let currentListName = "";

//Event for the first return button
Return1.addEventListener("click", function() {

    currentListName = "";
    document.getElementById("listName").value = "";

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

function setupStep3() {

    const input1 = document.getElementById("word1");
    const input2 = document.getElementById("word2");

    const tableheader1 = document.getElementById("language1Header");
    const tableheader2 = document.getElementById("language2Header");
    const Finishtableheader1 = document.getElementById("language1HeaderFinish");
    const Finishtableheader2 = document.getElementById("language2HeaderFinish");

    const editWord1 = document.getElementById("editWord1");
    const editWord2 = document.getElementById("editWord2");

    const select1 = document.getElementById("language1");
    const select2 = document.getElementById("language2");

    const longName1 = select1.options[select1.selectedIndex].text;
    const longName2 = select2.options[select2.selectedIndex].text;

    input1.placeholder = "Word in " + longName1;
    input2.placeholder = "Word in " + longName2;
    tableheader1.textContent = longName1;
    tableheader2.textContent = longName2;
    editWord1.placeholder = "Edit word in " + longName1;
    editWord2.placeholder = "Edit word in " + longName2;
    Finishtableheader1.textContent = longName1;
    Finishtableheader2.textContent = longName2;

}

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
    setupStep3();
});


const word1Input = document.getElementById("word1");
const word2Input = document.getElementById("word2");
const wordTableBody = document.getElementById("wordTable");
let vocabularyList = [];

//event for the third return button
Return3.addEventListener("click", function() {

    const answer = confirm("Are you sure you want to go back? All unsaved progress will be lost.");

    if (!answer) {
        return;
    }

    currentLanguage1 = "";
    currentLanguage2 = "";

    document.getElementById("language1").value = "";
    document.getElementById("language2").value = "";

    CreateListStep2.classList.remove('hidden');
    CreateListStep3.classList.add('hidden');

    //clears the table when going back to step 2
    wordTableBody.innerHTML = "";
    vocabularyList.length = 0;

});

//event for the add word button
AddWordButton.addEventListener("click", function() {

    const word1 = word1Input.value;
    const word2 = word2Input.value;
    const buttonCell = document.createElement("td");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    //prevents the user to add empty words
    if (word1 === "" || word2 === "") {
        alert("Please enter a word in both fields!");
        return;
    }

   const wordEntry = {
        word1: word1,
        word2: word2
    };
    
    vocabularyList.push(wordEntry);

    const row = document.createElement("tr");
    const cell1 = document.createElement("td");
    const cell2 = document.createElement("td");
    buttonCell.appendChild(editButton);
    buttonCell.appendChild(deleteButton);

    cell1.textContent = word1;
    cell2.textContent = word2;

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(buttonCell);
    

    wordTableBody.appendChild(row);

    //clears the input fields after adding a word
    word1Input.value = "";
    word2Input.value = "";

    deleteButton.addEventListener("click", function() {

        const index = vocabularyList.indexOf(wordEntry);

        if (index > -1) {
            vocabularyList.splice(index, 1);
        }

        row.remove();

});

editButton.addEventListener("click", function() {

    let currentEditingRow = null;
   currentEditingRow = row;

   const editWord1 = document.getElementById("editWord1");
   const editWord2 = document.getElementById("editWord2");

   editWord1.value = cell1.textContent;
   editWord2.value = cell2.textContent;

    EditMenu.classList.remove('hidden');

    //event for the save button in the edit menu
    document.getElementById("SaveEdit").onclick = function() {

        const newWord1 = editWord1.value;
        const newWord2 = editWord2.value;

        //prevents the user to save empty words
        if (newWord1 === "" || newWord2 === "") {
           alert("Please enter a word in both fields!");
          return;
     }

     //array update
     wordEntry.word1 = newWord1;
     wordEntry.word2 = newWord2;

     //table update
     currentEditingRow.cells[0].textContent = newWord1;
     currentEditingRow.cells[1].textContent = newWord2;

     EditMenu.classList.add('hidden');
     currentEditingRow = null;

    }

    //event for the cancel button in the edit menu
    document.getElementById("CancelEdit").onclick = function() {

        editWord1.value = "";
        editWord2.value = "";

        EditMenu.classList.add('hidden');
        currentEditingRow = null;
    }

  

});

});

Next3Button.addEventListener("click", function() {

    if (EditMenu.classList.contains('hidden') === false) {
        alert("Please finish editing the word before proceeding!");
        return;
    }

    if (wordTableBody.children.length === 0) {
        alert("Please add at least one word pair to your list before proceeding!");
        return;
    }

    function loadReviewTable() {

        const reviewTableBody = document.getElementById("reviewTable");
        reviewTableBody.innerHTML = "";

        for (let i = 0; i < vocabularyList.length; i++) {

            const row = document.createElement("tr");

            const cell1 = document.createElement("td");
            const cell2 = document.createElement("td");

            cell1.textContent = vocabularyList[i].word1;
            cell2.textContent = vocabularyList[i].word2;

            row.appendChild(cell1);
            row.appendChild(cell2);

            reviewTableBody.appendChild(row);
        }


    }

    loadReviewTable();

    CreateListStep3.classList.add('hidden');
    Confirmation.classList.remove('hidden');

});

Return4.addEventListener("click", function() {

    const reviewTableBody = document.getElementById("reviewTable");
    reviewTableBody.innerHTML = "";

    Confirmation.classList.add('hidden');
    CreateListStep3.classList.remove('hidden');

});

Finish.addEventListener("click", function() {

    let allLists = JSON.parse(localStorage.getItem("allLists")) || [];

    let finalListName = currentListName;
    let counter = 2;

    while (allLists.some(list => list.name === finalListName)) {
        finalListName = currentListName + " (" + counter + ")";
        counter++;
    }

    const CompleteList = {
        name: finalListName,
        language1: currentLanguage1,
        language2: currentLanguage2,
        vocabulary: vocabularyList
    };

    allLists.push(CompleteList);

    localStorage.setItem(
        "allLists", JSON.stringify(allLists)
    )

    FinishMenu.classList.remove('hidden');
    Confirmation.classList.add('hidden');

    if (finalListName !== currentListName) {
        alert("A list with the name '" + currentListName + "' already exists. Your list has been saved as '" + finalListName + "'.");
    }
});

}








//script for loading the lists from local storage and displaying them

function loadMyLists() {

    const ListMenu = document.getElementById("ListMenu");
    const container = document.getElementById("ListContainer");
    const ViewMenu = document.getElementById("ViewMenu");
    container.innerHTML = ""

    const allLists = JSON.parse(localStorage.getItem("allLists")) || [];

    if (allLists.length === 0) {
        container.textContent = "You have no lists yet. Create your first list by clicking the 'Create List' button!";
        const createListButton = document.createElement("button");
        createListButton.textContent = "Create List";
        createListButton.onclick = function() {
            window.open('/sub-html/CreateList.html', '_self');
        }
        container.appendChild(createListButton);
        return;
    }

        for (let i = 0; i < allLists.length; i++) {
            const list = allLists[i];

            const div = document.createElement("div");
            div.className = "listItem";
            let pairForm = "";

            if (list.vocabulary.length == 1) {
                pairForm = "pair";
            }
                else {
                    pairForm = "pairs";
            }
            
            const viewButton = document.createElement("button");
            viewButton.textContent = "View";
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";

            div.innerHTML = `
            <h3>${list.name}</h3>
            <p>${list.language1} and ${list.language2}</p>
            <p>${list.vocabulary.length} word ${pairForm}</p>
            `;

            container.appendChild(div);
            div.appendChild(viewButton);
            div.appendChild(deleteButton);

            deleteButton.addEventListener("click", function() {

                const answer = confirm("Are you sure you want to delete '" + list.name + "'? This action cannot be undone.");

                if (!answer) {
                    return;
                }

                allLists.splice(i, 1);
                localStorage.setItem("allLists", JSON.stringify(allLists));
                loadMyLists();

            });

            viewButton.addEventListener("click", function() {

                const viewTitle = document.getElementById("ViewListName");
                const viewTable = document.getElementById("ViewTable");

                console.log(document.getElementById("ViewListName"));
                console.log(document.getElementById("ViewTable"));

                viewTitle.textContent = list.name;
                viewTable.innerHTML = "";

                const backButton = document.getElementById("BackToMyLists");
                backButton.onclick = function() {

                    ViewMenu.classList.add('hidden');
                    ListMenu.classList.remove('hidden');

                    viewTitle.textContent = "";
                    viewTable.innerHTML = "";

                };
                
                for (let j = 0; j < list.vocabulary.length; j++) {

                    const row = document.createElement("tr");
                    const cell1 = document.createElement("td");
                    const cell2 = document.createElement("td");
                    const editButton = document.createElement("button");

                    cell1.textContent = list.vocabulary[j].word1;
                    cell2.textContent = list.vocabulary[j].word2;
                    editButton.textContent = "Edit";

                    row.appendChild(cell1);
                    row.appendChild(cell2);
                    div.appendChild(editButton);
                    viewTable.appendChild(row);

                    editButton.addEventListener("click", function() {

                        localStorage.setItem("editingList", JSON.stringify({
                           index: i,
                           data: list
                        }));
                        window.open('/sub-html/CreateList.html', '_self');
                        
                    });

                }

            

                ViewMenu.classList.remove('hidden');
                ListMenu.classList.add('hidden');

            });

        }
    }

loadMyLists();
