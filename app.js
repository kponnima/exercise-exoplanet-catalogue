/*
 *  Main proram file which performs the necessary functions.
 *
 */
'use strict';
// declare the required third party libraries used on top of the file
const request = require('request');
const assert = require('assert');

// declare the external data url outside the main program, so that it can be added as a config variable for different environments(qa, production)
const dataSetURL = 'https://gist.githubusercontent.com/joelbirchler/66cf8045fcbb6515557347c05d789b4a/raw/9a196385b44d4288431eef74896c0512bad3defe/exoplanets';
/*
 * Method that fetches the data set from the external url.
 * Here we are using `request` third party to make external https call from Nodejs environment that returns response.
 * {Arguments}
 * url : the external url from where the data needs to be fetched.
 * returns the resolved promise data with response object and response body.
 */
async function fetchData(url) {
	if (url) {
		return new Promise((resolve, reject) => {
			request({ url, json: true }, (error, response, body) => { // pass the url and type as json, to fetch the required data
				if (error) return reject(error); // reject the promise created with error response if any

				return resolve({ response, body }); // resolve the promise created with response and body
			})
		});
	}
	return null;
}
/*
 * Method that displays the required data -information about the number of orphan planets.
 * Here we are using Javascript object forEach method to iterate over the given array of objects and prints the count of objects matching TypeFlag=3.
 * {Arguments}
 * exoPlanetData : the data containing exoPlanet information [as array of objects].
 * prints the count of objects matching TypeFlag=3.
 */
function displayNoStarData(exoPlanetData) {
	let count_orphan_planet = 0; // Initialize the variable to store the count of matching objects
	if (exoPlanetData && exoPlanetData.length > 0) {
		Object.keys(exoPlanetData).forEach(key => { //Iterate over the array of objects
			if (exoPlanetData[key].TypeFlag && exoPlanetData[key].TypeFlag === 3) { // check for undefined or null values and matching orphan planet (no star) criteria
				count_orphan_planet++; // increment the counter if the matching object is found
			}
		});

		console.log('The number of orphan planets (no star): ', count_orphan_planet); // Display the count of orphan planets (no star)
	}
	return count_orphan_planet;
}
/*
 * Method that displays the required data -information about the hottest star.
 * Here we are using Javascript array map and filter methods to iterate over the given array of objects and fetch the maximum value for HostStarTempK.
 * Then we use the index returned to return the name of PlanetIdentifier with maximum HostStarTempK.
 * {Arguments}
 * exoPlanetData : the data containing exoPlanet information [as array of objects].
 * prints the name of the matching PlanetIdentifier.
 */
function displayHottestStarData(exoPlanetData) {
	if (exoPlanetData && exoPlanetData.length > 0) {
		// Iterate over the array and return the maximum value with matching node i.e. HostStarTempK
		var max = Math.max.apply(null, Object.keys(exoPlanetData).map(function (x) { return exoPlanetData[x].HostStarTempK }));
		// Iterate over the array and filter the key with matching condition i.e. HostStarTempK with maximum value
		const requiredArrayIndex = (Object.keys(exoPlanetData).filter(function (x) { return exoPlanetData[x].HostStarTempK == max; })[0]);

		console.log('The name (planet identifier) of the planet orbiting the hottest star: ', exoPlanetData[requiredArrayIndex].PlanetIdentifier);
		return exoPlanetData[requiredArrayIndex].PlanetIdentifier; //return the PlanetIdentifier name of matching index
	}
	return "";
}
/*
 * Method that displays the required data - timeline information about the matching planets discovered.
 * Here we are using Javascript array Set, map and filter methods to -
 * 1. Fetch the unique values of DiscoveryYear present in the data set i.e. 2012, 2013, 2017...
 * 2. Sort & Iterate over the given array of DiscoveryYear, while fetching the count of matching objects with RadiusJpt in exoPlanetData.
 * 3. Then we push the data requested to new array and return the array to display requested information.
 * {Arguments}
 * exoPlanetData : the data containing exoPlanet information [as array of objects].
 * prints the timeline information about the matching planets discovered.
 */
async function displayTimelineData(exoPlanetData) {
	let timelineData = []; //return the timeline data captured as an Array

	if (exoPlanetData && exoPlanetData.length > 0) {
		// Javascript array Set to create new array with matching unique filtered objects
		let unique = [...new Set(exoPlanetData.filter(function (val) {
			if (val.DiscoveryYear === "") {
				return false; // skip
			}
			return true;
		}).map(item => item.DiscoveryYear))];

		// sort based on the year of discovery year for timeline display
		unique.sort();

		console.log('--------------------------TIMELINE Data--------------------------');
		unique.forEach(obj => {
			var small_planet_count = exoPlanetData.filter((object) => (object.DiscoveryYear === obj && object.RadiusJpt !== "" && object.RadiusJpt < 1)).length;
			var medium_planet_count = exoPlanetData.filter((object) => (object.DiscoveryYear === obj && object.RadiusJpt >= 1 && object.RadiusJpt < 2)).length;
			var large_planet_count = exoPlanetData.filter((object) => (object.DiscoveryYear === obj && object.RadiusJpt >= 2)).length;
			console.log(`In ${(obj)} we discovered ${(small_planet_count)} small planets, ${(medium_planet_count)} medium planets and ${(large_planet_count)} large planets`);
			timelineData.push(obj, small_planet_count, medium_planet_count, large_planet_count);
		});
		console.log('-----------------------------------------------------------------');
	}
	return timelineData;
}

// main function
async function main() {
	try {
		let { response, body } = await fetchData(dataSetURL);
		if (response && response.statusCode !== 200) { // if response is not returned or status code does not match - log error
			console.error('Error occurred while fetching exoplanet data set...');
		} else {
			assert.equal(response.statusCode, 200);
			console.error('Successfully fetched the exoplanet data set...');
			displayNoStarData(body);
			displayHottestStarData(body);
			displayTimelineData(body);
		}
	} catch (err) {
		console.error('Error occurred while fetching exoplanet data set...');
	}
}

// start program execution
main();

// export the private functions created, so that they are accessible to the unit tests.
module.exports = {
	app: main,
	fetchData: fetchData,
	displayNoStarData: displayNoStarData,
	displayHottestStarData: displayHottestStarData,
	displayTimelineData: displayTimelineData
}