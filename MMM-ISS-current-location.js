
 /* global Module */

/* Magic Mirror
 * Module: opennotifyISS
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

Module.register("ISS-current-location",{

	// Default module config.
	defaults: {
		initialLoadDelay: 0, // 0 seconds delay
		retryDelay: 2500,

		//opennotify parameters
		apiBase: "http://api.open-notify.org/iss-now.json?",
	},

/*
	// Define required scripts.
	getScripts: function() {
		return ["moment.js", "moment-timezone.js"];
	},
	// Define styles.
	getStyles: function() {
		return ["clock_styles.css"];
	},
*/

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);
		this.scheduleUpdate(this.config.initialLoadDelay);
		this.lat = null;
		this.lon = null;
		this.timestamp = null;
		this.message = null;
	},


	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		// create a table for each row
		//fill each row with the pass data
		wrapper.innerHTML = this.message;
		return wrapper;
	},

	/* scheduleUpdate()
	 * Schedule next update.
	 *
	 * argument delay number - Milliseconds before next update. If empty, this.config.updateInterval is used.
	 */
	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}

		setTimeout(function() {
			this.updateISS();
		}, nextLoad);
	},

	/* updateWeather(compliments)
	 * Requests new data from openweather.org.
	 * Calls processWeather on succesfull response.
	 */
	updateISS: function() {
		var url = this.apiBase;
		var opennotifyRequest = new XMLHttpRequest();
		opennotifyRequest.open("GET", url, true);
		opennotifyRequest.onreadystatechange = function() {
			this.lat = opennotifyRequest.iss_position.latitude;
			this.lon = opennotifyRequest.iss_position.longitude;
			this.timestamp = opennotifyRequest.timestamp;
			this.message = opennotifyRequest.message;
			this.updateDom();
		};
	opennotifyRequest.send();
	}		
});
