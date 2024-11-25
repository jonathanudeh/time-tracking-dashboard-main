const daily = document.getElementById("daily");
const weekly = document.querySelector(".weekly");
const monthly = document.querySelector(".monthly");
const card = document.getElementById("card-container");

// use this as switch to turn off and on the data to be displayed
let dailyStatus = false;
let weeklyStatus = true;
let monthlyStatus = false;

let url = 'data.json'; // assigning the api to a variable
let data = []; // A shallow copy of our api data

// asynchronous fetch from the api
const fetchData = async () => {
    try {
        const res = await fetch(url); // actual data fetchng from the api
        data = await res.json(); //assigning api data to global variable data
        displayData(); // calling the display data here so that by default data displays on the web 
        
    } catch (err) {
        alert(`An error occured ${err}`) 
    }
}

fetchData(); // calling the fetch function

const displayData = () => {
    card.innerHTML = ""; // clears the displayed data so only data selected can be displayed
    data.forEach(({title, timeframes}, index) => { 
        // only if dailyStatus is true run this logic
        if (dailyStatus) {
            daily.style.opacity = "100%"
            // structuring how the card look like
            card.innerHTML += `
            <div id="card-div" class="${title.split(" ").join("")}">
                <div class="card">
                    <div class="title">${title} <img src="./images/icon-ellipsis.svg" alt="An ellipsis"></div>

                    <div class="current-time">${timeframes.daily.current}hrs<span class="previous-time">Yesterday - ${timeframes.daily.previous}hrs</span></div>
                </div>
            </div>
            `;
        } else {
            daily.style.opacity = "50%"
        }
        

        // only if weeklyStatus is true run this logic
        if (weeklyStatus) {
            weekly.style.opacity = "100%"
            card.innerHTML += `
            <div id="card-div" class="${title.split(" ").join("")}">
                <div class="card">
                    <div class="title">${title} <img src="/images/icon-ellipsis.svg" alt="An ellipsis"></div>

                    <div class="current-time">${timeframes.weekly.current}hrs<span class="previous-time">Last week - ${timeframes.weekly.previous}hrs</span></div>
                </div>
            </div>
            `;
        } else {
            weekly.style.opacity = "50%"
        }

        // only if monthlyStatus is true run this logic
        if (monthlyStatus) {
            monthly.style.opacity = "1"
            card.innerHTML += `
            <div id="card-div" class="${title.split(" ").join("")}">
                <div class="card">
                    <div class="title">${title} <img src="/images/icon-ellipsis.svg" alt="An ellipsis"></div>

                    <div class="current-time">${timeframes.monthly.current}hrs<span class="previous-time">Last month - ${timeframes.monthly.previous}hrs</span></div>
                </div>
            </div>
            `;
        } else {
            monthly.style.opacity = "50%"
        }
        
    })
}

//Event listeners listening for clicks

daily.addEventListener("click", () => {
    dailyStatus = true;
    weeklyStatus = false;
    monthlyStatus = false;
    displayData()
});



weekly.addEventListener("click", () => {
    dailyStatus = false;
    weeklyStatus = true;
    monthlyStatus = false;
    displayData();
})

monthly.addEventListener("click", () => {
    dailyStatus = false;
    weeklyStatus = false;
    monthlyStatus = true;
    displayData();
})

