# workshop_8:

You can view the generated effect by visiting the following link:

[View Workshop 8 Effect](  https://tianhui1112.github.io/workshop-8/)


## My Idea


We are using the [API](https://api.data.gov.sg/v1/environment/air-temperature) to display the temperatures of different locations in the snow scene based on Workshop 7 at the University of Auckland.




## Project workflow


1.1: API Request
```javascript
let url = "https://api.data.gov.sg/v1/environment/air-temperature";
loadJSON(url, updateWeatherData);

```

API Request: In the setup() function, loadJSON(url, updateWeatherData) is called to fetch weather data in JSON format from https://api.data.gov.sg/v1/environment/air-temperature. The url is the address we are requesting data from, and updateWeatherData is the callback function used to process the data.

1.2: The callback function for updating weather data   

The updateWeatherData(data) function is where the API response is processed. The data parameter is the JSON data obtained from the API. This data structure contains temperature readings from multiple weather measurement stations.

```javascript
function updateWeatherData(data) {
  try {
    weatherData = data.items[0].readings; 

```

1.3: Parsing the weather data   

weatherData is the temperature data extracted from the JSON returned by the API. Each data item represents a measurement point (such as S117, S50, etc.), and each measurement point has a value attribute representing the temperature.

```javascript
weatherData.forEach((reading) => {
  if (reading.station_id === "S117") {
    temperature = parseFloat(reading.value).toFixed(1); 
  }
  if (reading.station_id === "S50") {
    humidity = parseFloat(reading.value).toFixed(1); 
  }
  if (reading.station_id === "S106") {
    windSpeed = parseFloat(reading.value).toFixed(1); /
  }
});


```

Using forEach to iterate through the data of each measurement point and match the temperature for different locations based on station_id. For example, S117 corresponds to Banyan Road, S50 corresponds to Clementi Road, and S106 corresponds to Pulau Ubin.For each measurement point, parseFloat() is used to convert the temperature string to a floating-point number, and .toFixed(1) is used to keep one decimal place. Finally, the displayed temperature, humidity, and windSpeed variables are updated.
