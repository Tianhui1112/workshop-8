let snowflakes = []; // Array to store snowflakes
let grassImage; // Variable to store the grass image
let temperature = "Loading..."; // Initial display as loading
let humidity = "Loading...";
let windSpeed = 1; // Initial wind speed (default to 1, affects horizontal drift of snowflakes)
let weatherData; // Variable to store weather data from the API

function preload() {
  // Preload grass image
  grassImage = loadImage("grass.jpg"); // Replace with your grass image file name
}

function setup() {
  createCanvas(800, 600); // Create a canvas with size 800x600
  noStroke(); // Disable stroke

  // Fetch weather data
  let url = "https://api.data.gov.sg/v1/environment/air-temperature";
  loadJSON(url, updateWeatherData);
}

function draw() {
  // Cover the entire canvas with the grass image
  image(grassImage, 0, 0, width, height); // Resize the image to cover the entire canvas

  // Display weather data
  fill(0, 150); // Black background with transparency
  rect(10, 10, 300, 130, 10); // Background for the display box
  fill(255); // White text
  textSize(16);
  textFont("Serif");
  text(`Temperature at Banyan Road: ${temperature}°C`, 20, 40);
  text(`Temperature at Clementi Road: ${humidity}°C`, 20, 60);
  text(`Temperature at Pulau Ubin: ${windSpeed}°C`, 20, 80);
  text(`Temperature at West Coast Highway: ${windSpeed}°C`, 20, 100);

  // Adjust snowflake generation speed based on the weather
  if (frameCount % (5 + floor(windSpeed)) === 0) {
    snowflakes.push(new Snowflake()); // Add a new snowflake to the array
  }

  // Update and display all snowflakes
  for (let i = snowflakes.length - 1; i >= 0; i--) {
    snowflakes[i].update(); // Update snowflake position
    snowflakes[i].show(); // Display snowflake

    // If the snowflake goes off-screen, remove it from the array
    if (snowflakes[i].offScreen()) {
      snowflakes.splice(i, 1); // Remove the snowflake from the array
    }
  }
}

// Snowflake class
class Snowflake {
  constructor() {
    this.x = random(width); // Randomly generate horizontal position
    this.y = random(-50, 0); // Randomly generate initial vertical position (slightly above the canvas)
    this.size = random(2, 8); // Randomly generate snowflake size
    this.speed = random(1, 3); // Randomly generate falling speed
    this.wind = random(-0.5, 0.5) * windSpeed; // Horizontal drifting affected by wind speed
  }

  update() {
    this.y += this.speed; // Snowflake falls
    this.x += this.wind; // Snowflake drifts horizontally
  }

  show() {
    fill(255, 255, 255, 200); // Snowflake color (white with slight transparency)
    ellipse(this.x, this.y, this.size); // Draw the snowflake
  }

  offScreen() {
    return this.y > height; // Check if the snowflake goes off the bottom of the screen
  }
}

// Function to update weather data
function updateWeatherData(data) {
  try {
    weatherData = data.items[0].readings;

    // Get temperature data from different locations
    weatherData.forEach((reading) => {
      if (reading.station_id === "S117") {
        temperature = parseFloat(reading.value).toFixed(1);
      }
      if (reading.station_id === "S50") {
        humidity = parseFloat(reading.value).toFixed(1);
      }
      if (reading.station_id === "S106") {
        windSpeed = parseFloat(reading.value).toFixed(1);
      }
    });

  } catch (error) {
    console.error("Error updating weather data:", error);
  }
}