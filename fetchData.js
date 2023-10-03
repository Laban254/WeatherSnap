const API_KEY = "enter your API"; // Visit openWeather to get your own API key

window.onload = () => {
    let geo;

    const geoSuccess = (position) => {
        geo = position;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geo.coords.latitude}&lon=${geo.coords.longitude}&units=metric&appid=${API_KEY}`)
            .then((data) => data.json())
            .then((jsonData) => {
                if (jsonData.weather && jsonData.weather.length > 0) {
                    fetch(`http://openweathermap.org/img/wn/${jsonData.weather[0].icon}@2x.png`)
                        .then((res) => res.blob())
                        .then((result) => {
                            const sun_rise = new Date(jsonData.sys.sunrise * 1000);
                            const sun_set = new Date(jsonData.sys.sunset * 1000);

                            document.querySelector('.description__text').innerHTML = jsonData.weather[0].description;
                            document.querySelector('.location__text').innerHTML = jsonData.name;
                            document.querySelector('.temperature-humidity__temperature-text').innerHTML = parseFloat(jsonData.main.temp).toFixed(1);
                            document.querySelector('.temperature-humidity__humidity-text').innerHTML = jsonData.main.humidity;
                            document.querySelector('.sun__rise-text').innerHTML = `${sun_rise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                            document.querySelector('.sun__set-text').innerHTML = `${sun_set.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

                            const imageURL = URL.createObjectURL(result);
                            document.querySelector(".description__image").src = imageURL;
                        })
                        .catch((error) => {
                            console.error("Error fetching weather icon:", error);
                        });
                } else {
                    console.error("Weather data not available.");
                }
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
            });
    };

    navigator.geolocation.getCurrentPosition(geoSuccess);
};
