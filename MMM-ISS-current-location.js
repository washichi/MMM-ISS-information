/* global Module */

/* Magic Mirror
 * Module: ISS-current-location
 *
 * Module for the Magic Mirror created by Michael Teeuw http://michaelteeuw.nl
 * by Corne Roozemond http://lookintomylife.com
 * MIT Licensed.
 */

Module.register("MMM-ISS-current-location",{

	// Default module config.
	defaults: {
		initialLoadDelay: 2500, // 2.5 seconds delay
		retryDelay: 2500,
		updateInterval: 10000, // every 10 seconds
		header: "ISS current location",
		//opennotify parameters
		apiBase: "http://api.open-notify.org/iss-now.json?"
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
		this.latitude = null;
		this.longitude = null;
		this.timestamp = null;
		this.message = "default message";
		this.updateTimer = null;
	},


	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		// create a table for each row
		//fill each row with the data

		//wrapper.innerHTML = "this gets displayed";
		wrapper.innerHTML = this.message; // this not
		return wrapper;

	},

	// Override getHeader method.
 	getHeader: function() {
 	return this.config.header;
 	},

	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		var self = this;
		clearTimeout(this.updateTimer);
		this.updateTimer = setTimeout(function() {
			self.updateISS();
		}, nextLoad);
	},

	/* updateWeather(compliments)
	 * Requests new data from openweather.org.
	 * Calls processWeather on succesfull response.
	 */
	updateISS: function() {
		var url = this.config.apiBase;
		var self = this;
		var issRequest = new XMLHttpRequest();
		issRequest.open("GET", url, true);
		this.message = "in updateISS";
		issRequest.onreadystatechange = function() {
		self.message = "request status: "+ to.String(this.status); // not displayed
		if (this.readyState === 4) {
			if (this.status === 200) {
				var resp = JSON.parse(this.response);
				self.latitude = resp.iss_position.latitude;
				self.longitude = resp.iss_position.longitude;
				self.timestamp = resp.timestamp;
				self.message = resp.message;
				self.message = "dit gebeurt niet";
			}
		}
		};
	//this.message = "end of request";
	issRequest.send();
	self.updateDom();
	}		
});
