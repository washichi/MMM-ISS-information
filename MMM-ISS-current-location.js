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
		animationSpeed: 1000,
		header: "ISS current location",
		//opennotify parameters
		apiBase: "http://api.open-notify.org/iss-now.json?"
	},


	// Define required scripts.
	getScripts: function() {
		return ["leaflet.js"];
	},


	// Define styles.
	getStyles: function() {
		return ["leaflet.css"];
	},


	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);
		this.scheduleUpdate(this.config.initialLoadDelay);
		this.latitude = 52.37;
		this.longitude = 4.89;
		this.timestamp = null;
		this.message = null;
		this.updateTimer = null;
	},


	// Override dom generator.
	getDom: function() {
/*
		var table = document.createElement("table");
		table.className = "small";

		var latitudeRow = document.createElement("tr");
		table.appendChild(latitudeRow);
		var latitudeCell = document.createElement("td");
		latitudeCell.className = "latitude";
		latitudeCell.innerHTML = "latitude: " + String(this.latitude);
		latitudeRow.appendChild(latitudeCell);

		var longitudeRow = document.createElement("tr");
		table.appendChild(longitudeRow);
		var longitudeCell = document.createElement("td");
		longitudeCell.className = "longitude";
		longitudeCell.innerHTML = "longitude: " + String(this.longitude);
		longitudeRow.appendChild(longitudeCell);

		var mapRow = document.createElement("tr");
		table.appendChild(mapRow);
		var mapCell = document.createElement("td");
		var mapid = document.createElement("div");
		mapid.innerHTML = map;
		mapCell.appendChild(mapid);
		mapRow.appendChild(mapCell);

*/
		var mapid = document.createElement("div");
		mapid.innerHTML = map;
		mapid.style.height = "500px";
		mapid.style.width = "500px";
		var map = L.map(mapid).setView([51.505, -0.09], 13);
		map.panTo([this.latitude, this.longitude], animate=true);
		L.tileLayer('https://api.mapbox.com/styles/v1/washichi/ciynd8xjd00be2skeb3l96ncs/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2FzaGljaGkiLCJhIjoiY2l5bmN5OWZhMDAyeTJxcXFrbTBvM3ljaSJ9.2D2Nkf_YtxbPPiwCsXG0WA', {
    	maxZoom: 18
		}).addTo(map);

		return mapid;
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
		issRequest.onreadystatechange = function() {
		if (this.readyState === 4) {
			if (this.status === 200) {
				var resp = JSON.parse(this.response);
				self.latitude = resp.iss_position.latitude;
				self.longitude = resp.iss_position.longitude;
				self.timestamp = resp.timestamp;
				self.message = resp.message;
			}
			self.show(self.config.animationSpeed, {lockString:this.identifier});
			self.updateDom();
			self.scheduleUpdate(self.config.retryDelay);
		}
		};
	issRequest.send();
	}		
});
