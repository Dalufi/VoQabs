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