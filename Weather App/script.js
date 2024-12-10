const apiKey = "54ff5dd8bd9c72f28678efe840c1926b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const city = document.getElementsByClassName("city")[0];
const temp = document.getElementsByClassName("temp")[0];
const humidity = document.getElementsByClassName("humidity")[0];
const wind = document.getElementsByClassName("wind")[0];

const error = document.getElementsByClassName("error")[0];
const weatherIcon = document.getElementsByClassName("weatherIcon")[0];
const weather = document.getElementsByClassName("weather")[0];

const card = document.querySelector('.card');
const container = document.querySelector('.card-container');

async function checkWeather(){

    const cityName = document.getElementById("place").value;

    const response = await fetch(apiUrl+ cityName +`&appid=${apiKey}`);
    var data = await response.json();
        
    if(response.status == 404){
        error.style.display = "block";
        weather.style.display = "none";
    }
    else{
        changeImage(data);
        city.innerHTML = data.name;
        temp.innerHTML = Math.round(data.main.temp) + "° C";
        humidity.innerHTML = data.main.humidity + " %";
        wind.innerHTML = data.wind.speed +" km/hr";

        addCardMovement();
        weather.style.display = "block";
        error.style.display = "none";
    }
}

function changeImage(data){
    const condition = data.weather[0].main;
    const iconMap = {
        Clouds: "images/clouds.svg",
        Clear: "images/clear.svg",
        Rain: "images/rain.svg",
        Drizzle: "images/drizzle.svg",
        Mist: "images/mist.svg",
        Snow: "images/snow.svg",
    };

    const defaultImage = "images/default.svg";

    weatherIcon.src = iconMap[condition] || defaultImage;
}

const searchBox = document.getElementById("place");
searchBox.addEventListener("keypress", (event)=> {
    if(event.key == "Enter"){
        checkWeather();
    }
});


function addCardMovement() {
    let rotationX = 0;
    let rotationY = 0;
    let translateY = 0;

    let isRotating = false;
    let isCardClicked = false; 

    let lastTouchX = 0, lastTouchY = 0;

    container.addEventListener('touchstart', (event) => {
        // Only handle touch events if the card was clicked
        if (isCardClicked) {
            lastTouchX = event.touches[0].clientX;
            lastTouchY = event.touches[0].clientY;
            event.preventDefault();  
        }
    });

    container.addEventListener('touchmove', touchMoveHandler, { passive: false });

    card.addEventListener('click', () => {
        if (!isRotating) {
            isCardClicked = true; 
            container.addEventListener('mousemove', mouseMoveHandler);
            isRotating = true;  
        }
    });

    //Touch End
    container.addEventListener('touchend', () => {
        rotationX = 0;
        rotationY = 0;
        translateY = 0;
        if (isRotating) {
            updateTransform(rotationX, rotationY, translateY);
            isRotating = false;
            isCardClicked = false;
        }
    });

    // Reset When Clicking Outside the Card
    document.addEventListener('click', (event) => {
        if (!card.contains(event.target)) {  
            rotationX = 0;
            rotationY = 0;
            translateY = 0;
            updateTransform(rotationX, rotationY, translateY); 

            // Disable movement when clicking outside the card
            if (isRotating) {
                container.removeEventListener('mousemove', mouseMoveHandler);
                container.removeEventListener('touchmove', touchMoveHandler);
                isRotating = false;
                isCardClicked = false; 
            }
        }
    });

    // Mouse movement handler
    function mouseMoveHandler(event) {
        const positionX = event.movementX;
        const positionY = event.movementY;

        rotationX = Math.max(-30, Math.min(30, rotationX - positionY * 0.2));
        rotationY = Math.max(-30, Math.min(30, rotationY + positionX * 0.2));
        translateY = Math.max(-50, Math.min(50, translateY + positionY * 0.1));

        updateTransform(rotationX, rotationY, translateY);
    }
   
    // Touch movement handler
    function touchMoveHandler(event) {
        const touch = event.touches[0];
        const positionX = touch.clientX - lastTouchX;  
        const positionY = touch.clientY - lastTouchY; 

        rotationX = Math.max(-30, Math.min(30, rotationX - positionY * 0.2));
        rotationY = Math.max(-30, Math.min(30, rotationY + positionX * 0.2));
        translateY = Math.max(-50, Math.min(50, translateY + positionY * 0.1));

        updateTransform(rotationX, rotationY, translateY);

        // Update last touch positions
        lastTouchX = touch.clientX;
        lastTouchY = touch.clientY;

        event.preventDefault();  
    }

    // Helper to update transform
    function updateTransform(rotationX, rotationY, translateY) {
        card.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg) translateY(${translateY}px)`;
    }
}
