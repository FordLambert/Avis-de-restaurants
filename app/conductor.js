import React from 'react';
import ReactDOM from 'react-dom';

import {RestaurantStore} from './models/restaurant_store';
import {Restaurant} from './models/restaurant';

import {VisualDisplayManager} from './managers/visual_display_manager';
import {JsonManager} from './managers/JSON_manager';

export class Conductor {
	constructor() {
		this.restaurantStore = new(RestaurantStore);

		this.visualDisplayManager = new(VisualDisplayManager);
		this.jsonManager = new(JsonManager);
	}

	initialiseData() {

		this.handleJsonUploads();
		this.jsonManager.importJson('restaurant_list');
		setTimeout(function () {
			this.followingInstructions();
		}.bind(this), 1000);
	}

	handleJsonUploads() {

		let prototypeToUse = Restaurant;
		let storeToUse = this.restaurantStore;
		
		document.addEventListener('upload-complete', function(event, newFile) {
			this.jsonManager.convertAndStoreJson(newFile, prototypeToUse, storeToUse);
		}.bind(this));
		
	}

	followingInstructions() {
		this.visualDisplayManager.displayListInPage(this.restaurantStore.restaurantList);
	}
};