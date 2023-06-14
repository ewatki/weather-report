const state = {
    temp: 70,
    tempDisplay: null
}

const refreshUI = () => {
    state.tempDisplay.textContent = state.temp;
}

// Handle City Input & Display
let city = document.getElementById('city')
let cityTextBox = document.getElementById('textbox')

cityTextBox.oninput = (event) => {
    city.textContent = event.target.value;
};

// Handle See RealTime Temperature
const findCityLocation = () => {
    console.log('working')
    axios.get('http://localhost:5000/location', {
        params: {
            q: city.textContent
        }
    })
    .then(response => {
        axios.get('http://localhost:5000/weather', {
            params: {
                lat: response.data[0].lat,
                lon: response.data[0].lon
            }
        }).then(response => {
            state.tempDisplay.textContent = Math.floor((response.data.main.temp - 273.15) * 9/5 + 32)
            state.temp = state.tempDisplay.textContent
        })
    })
    .catch((error) => {
        console.log(error);
    })
}

// Handle Temp Arrows
let decreaseDegree = () => {
    --state.temp;
    console.log(state.temp)
    changeColor();
    refreshUI();
}
let increaseDegree = () => {
    ++state.temp;
    console.log(state.temp)
    changeColor();
    refreshUI();
}

const changeColor = () => {
    if (state.tempDisplay.textContent >= 80) 
    {   
        state.tempDisplay.style.color = 'red';
        changeLandscape("🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂")
    } else if (state.tempDisplay.textContent >= 70) {
        state.tempDisplay.style.color = 'orange';
        changeLandscape("🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷")
    } else if (state.tempDisplay.textContent >= 60) 
    {
        state.tempDisplay.style.color = 'gold';
        changeLandscape("🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃")
    } else if (state.tempDisplay.textContent >= 50) {
        state.tempDisplay.style.color = 'green';
        changeLandscape("🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲")
    } else {
        state.tempDisplay.style.color = 'teal';
    }
}

const changeLandscape = (garden) => {
    document.getElementById('landscape').textContent = garden;
}

const changeSky = (event) => {
    console.log(event.target.value);
    const sky = document.getElementById('sky')
    const sky_backdrop = document.querySelector('.weather-garden')
    if (event.target.value == 'sunny') {
        sky.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️'
        sky_backdrop.style.backgroundColor = 'lightyellow'
    } else if (event.target.value == 'cloudy') {
        sky.textContent = '☁️☁️ ☁️ ☁️ ☁️ 🌤 ☁️ ☁️☁️'
        sky_backdrop.style.backgroundColor = 'lightgray'        
    } else if ( event.target.value == 'rainy') {
        sky.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧'
        sky_backdrop.style.backgroundColor = 'navy'
    } else {
        sky.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨'
        sky_backdrop.style.backgroundColor = 'whitesmoke'
    }
}

const loadControls = () => {
    state.tempDisplay = document.getElementById('degrees');    
}

const registerEvents = () => {
    document.querySelector('.fa-chevron-left').addEventListener('click', decreaseDegree);
    document.querySelector('.fa-chevron-right').addEventListener('click', increaseDegree);
    document.getElementById('realtime-temp').addEventListener('click', findCityLocation);
    document.querySelector('.select-sky').addEventListener('change', changeSky);
}

const onLoaded = () => {
    // steps to carry out when the page has loaded
    loadControls();
    registerEvents();
    refreshUI();
};

onLoaded();

