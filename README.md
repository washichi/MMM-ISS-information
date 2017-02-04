# MMM-ISS-current-location
Magic Mirror Module to display ISS current location

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
	{
		module: 'MMM-ISS-current-location',
		position: 'top_bar',	// This can be any of the regions.
		header: 'ISS current location'
	}
````
## Installation
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/washichi/MMM-ISS-current-location.git`. A new folder will appear.


## Configuration options
based on the OpenNotify documentation: http://open-notify.org/Open-Notify-API/ISS-Location-Now/

| Option            | Description
| ----------------- | -----------
| `iss-map`         | **REQUIRED** <br><br> Shows an map with the realtime ISS position. <br> **Default value:** `true`
| `iss_people`      | **REQUIRED** <br><br> Shows the number of people in space. <br> **Default value:** `true`
| `iss_pass`        | **REQUIRED** <br><br> Lists upcoming ISS passes above given coördinates. <br><br> **Default value:** `true`
| `latitude`        | **OPTIONAL** <br><br> Latitude, used to display iss_pass. <br> **Default value:** `Amsterdam latitude`
| `longitude`       | **OPTIONAL** <br><br> Latitude, used to display iss_pass. <br> **Default value:** `Amsterdam longitude`
| `amount`          | **OPTIONAL** <br><br>amount of ISS passes that are listed. <br> **Default value:** `5`
| `map_style`       | **OPTIONAL** <br><br>map style. <br> You can create your own style at [mapbox](https://www.mapbox.com/studio/styles)

