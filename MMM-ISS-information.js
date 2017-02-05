/* global Module */

/* Magic Mirror
 * Module: ISS-current-location
 *
 * Module for the Magic Mirror created by Michael Teeuw http://michaelteeuw.nl
 * by Corne Roozemond http://lookintomylife.com
 * MIT Licensed.
 */

Module.register("MMM-ISS-information",{

	// Default module config.
	defaults: {
		iss_now: true,
		iss_people: true,
		iss_pass: null,
		latitude: 52.37,
		longitude: 4.89,
		amount: 5,
		map_style: 'https://api.mapbox.com/styles/v1/washichi/ciynd8xjd00be2skeb3l96ncs/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2FzaGljaGkiLCJhIjoiY2l5bmN5OWZhMDAyeTJxcXFrbTBvM3ljaSJ9.2D2Nkf_YtxbPPiwCsXG0WA',
		map_height: '150px',
		map_width: '250px',
		map_zoom: 0,

		initialLoadDelay: 2500, // 2.5 seconds delay
		retryDelay: 2500,
		updateInterval: 60000, // every 60 seconds
		animationSpeed: 1000,
		header: "ISS current location",
		//opennotify parameters
		apiNow: "http://api.open-notify.org/iss-now.json?",
		apiPeople: "http://api.open-notify.org/astros.json", 
		apiPass: "http://api.open-notify.org/iss-pass.json?"
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
		this.ISSlatitude = 0;
		this.ISSlongitude = 0;
		this.timestamp = null;
		this.message = null;
		this.updateTimer = null;
		this.number = null;
	},


	// Override dom generator.
	getDom: function() {
	var table = document.createElement("table");
	table.className = "small";

	if(this.config.iss_now)
	{
		var mapid = document.createElement("div");
		mapid.innerHTML = map;
		mapid.style.height = this.config.map_height;
		mapid.style.width = this.config.map_width;
		mapid.style.border = "thin solid #FFFFFF";

		var map = L.map(mapid, {attributionControl: false, zoomControl:false}).setView([0, 0], this.config.map_zoom);
		setTimeout(function() {
    		map.invalidateSize();
		}, 100);

		var ISSIcon = L.icon({
		    iconUrl: this.data.path + 'iss4.png',
		    iconSize: [50, 30]
		    //iconAnchor: [25, 15]
		});
		var iss = L.marker([0, 0], {icon: ISSIcon}).addTo(map);
		iss.setLatLng([this.ISSlatitude, this.ISSlongitude]);
		map.fitWorld();
		//map.panTo([this.ISSlatitude, this.ISSlongitude], animate=true);
		L.tileLayer(this.config.map_style, {
			maxZoom: 15
		}).addTo(map);

		//add to table:
		var mapRow = document.createElement("tr");
		var mapCell = document.createElement("td");
		mapCell.appendChild(mapid);
		mapRow.appendChild(mapCell);
		table.appendChild(mapRow);
	}

	if(this.config.iss_people)
	{
		var peopleRow = document.createElement("tr");
		var textCell = document.createElement("td");
		Log.error("people request, number = " + String(this.number));
		textCell.innerHTML = "amount of people in space:      " + this.number;
		peopleRow.appendChild(textCell);
		table.appendChild(peopleRow);
	}

	return table;
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
		if(this.config.iss_map)
		{
			this.updateISS_now();
		}
		if(this.config.iss_people)
		{
			this.updateISS_people();
		}
		/*
		if(this.config.iss_pass)
		{
			this.updateISS_pass();
		}
		*/
	},

	updateISS_now: function(){
		var url = this.config.apiNow;
		var self = this;
		var issRequest = new XMLHttpRequest();
		issRequest.open("GET", url, true);
		issRequest.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status === 200) {
					var resp = JSON.parse(this.response);
					self.ISSlatitude = resp.iss_position.latitude;
					self.ISSlongitude = resp.iss_position.longitude;
					self.timestamp = resp.timestamp;
					self.message = resp.message;
				}
				self.show(self.config.animationSpeed, {lockString:this.identifier});
				self.updateDom();
				self.scheduleUpdate(self.config.retryDelay);
			}
		};
	issRequest.send();
	},

	updateISS_people: function(){
	var url = this.config.apiPeople;
	var self = this;
	var issRequest = new XMLHttpRequest();
	issRequest.open("GET", url, true);
	issRequest.onreadystatechange = function() {
		if (this.readyState === 4) {
			if (this.status === 200) {
				var resp = JSON.parse(this.response);
				self.number = resp.number;
			}
			self.show(self.config.animationSpeed, {lockString:this.identifier});
			self.updateDom();
			self.scheduleUpdate(self.config.retryDelay);
		}
	};
	issRequest.send();
	},

	updateISS_pass: function(){
	var url = this.config.apiPass + "lat=" + this.config.latitude + "&lon=" + this.config.longitude + "&callback=CALLBACK";
	var self = this;
	var issRequest = new XMLHttpRequest();
	issRequest.open("GET", url, true);
	issRequest.onreadystatechange = function() {
		Log.error("pass request");
		if (this.readyState === 4) {
			if (this.status === 200) {
				/*
				var resp = JSON.parse(this.response);
				self.ISSlatitude = resp.iss_position.latitude;
				self.ISSlongitude = resp.iss_position.longitude;
				self.timestamp = resp.timestamp;
				self.message = resp.message;
				*/
			}
			self.show(self.config.animationSpeed, {lockString:this.identifier});
			self.updateDom();
			self.scheduleUpdate(self.config.retryDelay);
		}
		};
	issRequest.send();
	}		
});
