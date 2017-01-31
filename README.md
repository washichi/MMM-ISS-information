# MMM-ISS-current-location
Magic Mirror Module to display ISS current location

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
	{
		module: 'MMM-ISS-current-location',
		position: 'top_bar',	// This can be any of the regions.
		header: 'ISS current location'
		config: {
			// The config property is optional.
			// See 'Configuration options' for more information.
		}
	}
````
## Installation
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/washichi/MMM-ISS-current-location.git`. A new folder will appear.


## Configuration options
as described in the OpenNotify documentation: http://open-notify.org/Open-Notify-API/ISS-Location-Now/
The following properties can be configured:

| Option            | Description
| ----------------- | -----------
| `to do`           | to do

