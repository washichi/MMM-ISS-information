# MMM-ISS-information
Magic Mirror Module to display ISS information based on the Open Notify API

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
	{
		module: 'MMM-ISS-information',
		position: 'bottom_right',	// This can be any of the [regions](https://forum.magicmirror.builders/topic/286/regions)
		header: 'ISS information'
	}
````
## Installation
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/washichi/MMM-ISS-information.git`. A new folder will appear.


## Configuration options
based on the OpenNotify documentation: [http://open-notify.org/Open-Notify-API]

| Option            | Description
| ----------------- | -----------
| `iss-map`         | **REQUIRED** <br><br> Shows an map with the realtime ISS position. <br> **Default value:** `true`
| `iss_people`      | **REQUIRED** <br><br> Shows the number of people in space. <br> **Default value:** `true`
| `iss_pass`        | **REQUIRED** <br><br> Lists upcoming ISS passes above given coördinates. <br><br> **Default value:** `true`
| `latitude`        | **OPTIONAL** <br><br> Latitude, used to display iss_pass. <br> **Default value:** `Amsterdam latitude`
| `longitude`       | **OPTIONAL** <br><br> Latitude, used to display iss_pass. <br> **Default value:** `Amsterdam longitude`
| `amount`          | **OPTIONAL** <br><br>amount of ISS passes that are listed. <br> **Default value:** `5`
| `map_style`       | **OPTIONAL** <br><br>map style. <br> You can create your own style at [mapbox](https://www.mapbox.com/studio/styles) <br> **Default map style:** [preview](https://api.mapbox.com/styles/v1/washichi/ciynd54zw00002spiqbgeyi7y.html?title=true&access_token=pk.eyJ1Ijoid2FzaGljaGkiLCJhIjoiY2l5bmN5OWZhMDAyeTJxcXFrbTBvM3ljaSJ9.2D2Nkf_YtxbPPiwCsXG0WA#1.6/29.811777/41.858478/0)
| `map_height`      | **OPTIONAL** <br><br>Height of the map. <br> **Default value:** `200px`
| `map_width`       | **OPTIONAL** <br><br>Width of the map. <br> **Default value:** `400px`
| `map_zoom`        | **OPTIONAL** <br><br>Zoom level of the map. <br> **Default value:** `1`

