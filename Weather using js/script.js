

const kelvin = 273;
const temperature = document.querySelector(".temp");
const summary = document.querySelector(".summary");
const loc = document.querySelector(".location");
const icon = document.querySelector(".icon");
const searchInput = document.querySelector(".search");
const searchBtn = document.querySelector(".search-btn");

// Fetch by city
searchBtn.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (!city) return;

    const apiKey = "6d055e39ee237af35ca066f35474e9df";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if (data.cod !== 200) {
                alert("City not found");
                return;
            }

            temperature.textContent = Math.floor(data.main.temp - kelvin) + "°C";
            summary.textContent = data.weather[0].description;
            loc.textContent = `${data.name}, ${data.sys.country}`;
            const iconCode = data.weather[0].icon;
            icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="weather icon"/>`;
        })
        .catch((err) => {
            console.error("Error fetching weather:", err);
            alert("Something went wrong.");
        });
});

// Auto-fetch current location weather
window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lon = position.coords.longitude;
            const lat = position.coords.latitude;
            const apiKey = "6d055e39ee237af35ca066f35474e9df";
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    temperature.textContent = Math.floor(data.main.temp - kelvin) + "°C";
                    summary.textContent = data.weather[0].description;
                    loc.textContent = `${data.name}, ${data.sys.country}`;
                    const iconCode = data.weather[0].icon;
                    icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="weather icon"/>`;
                });
        });
    }
});