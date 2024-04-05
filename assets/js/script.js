const city = "San Jose";
const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

fetch(url).then(function (response) {
    return response.json();
}).then(function (data) {
    console.log("--------- First request with geolocation --------")
    console.log(data);

    const lat = data[0].lat;
    const lon = data[0].lon;

    console.log(`${lat}, ${lon}`);

    const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    fetch(url2).then(function (response2) {
        return response2.json();
    }).then(function (data2) {
        console.log("--------- Second request with forecast --------");
        console.log(data2);

        for (let i = 0; i < data2.list.length; i++) {
            console.log(data2.list[i].main.temp);
        }
    })
})