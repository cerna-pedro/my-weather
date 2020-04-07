"use strict";

var inner = document.querySelector('.inner');
var city = document.querySelector('.city');
var image = document.querySelector('.image');
var temp = document.querySelector('.temp');
var convert = document.querySelector('.convert');
var condition = document.querySelector('.condition');

async function showLocation(position) {
  try {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var response = await fetch("https://fcc-weather-api.glitch.me/api/current?lon=".concat(longitude, "&lat=").concat(latitude)).then(function (stuff) {
      return stuff.json(stuff);
    });
    city.innerHTML = "".concat(response.name, ", ").concat(response.sys.country);
    temp.innerHTML = "".concat((response.main.temp * (9 / 5) + 32).toFixed(1), " \xB0F");
    condition.innerHTML = response.weather[0].main;
  } catch (error) {
    inner.innerHTML = '<h2>Refresh the Page</h2>';
  }
}

var celsius = false;

var convertTemp = function convertTemp() {
  if (!celsius) {
    temp.innerHTML = "".concat(((parseFloat(temp.innerHTML) - 32) * (5 / 9)).toFixed(1), " \xB0C");
    convert.innerHTML = 'Show in Fahrenheit';
  }

  if (celsius) {
    temp.innerHTML = "".concat((parseFloat(temp.innerHTML) * (9 / 5) + 32).toFixed(1), " \xB0F");
    convert.innerHTML = 'Show in Celsius';
  }

  celsius = !celsius;
};

convert.addEventListener('click', convertTemp);

var getLocation = function getLocation() {
  navigator.geolocation.getCurrentPosition(showLocation, errorHandler);
};

var errorHandler = function errorHandler() {
  inner.innerHTML = 'You have to allow location services for this to work.';
};

window.addEventListener('DOMContentLoaded', getLocation);