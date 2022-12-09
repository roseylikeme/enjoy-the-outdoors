"use strict"

// Init vars here
let SearchFilter = document.getElementById("SearchFilter");
let locationsList = document.getElementById("locationsList");
let parkTypeList = document.getElementById("parkTypeList");
let parkList = document.getElementById("parkList");
let parksDescription = document.getElementById("parksDescription");
let extraData = document.getElementById("extraData");
// Hide elements
locationsList.style.display = "none";
parkTypeList.style.display = "none";
parkList.style.display = "none";
parksDescription.style.display = "none";
extraData.style.display = "none";

window.onload = function () {
    SearchFilter.onchange = addDropdowns;
    locationsList.onchange = locationsListOnChange;
    parkTypeList.onchange = searchByParkOnChange;
    parkList.onchange = displayResultOnChange;
}
// Populate initial dropdown list
function addDropdowns() {
    locationsList.style.display = "none";
    parkTypeList.style.display = "none";
    parksDescription.style.display = "none";
    parkList.style.display = "none";
    extraData.style.display = "none";

    if (SearchFilter.value == "Location") {
        document.getElementById("locationsList").style.display = "block";
        searchByLocation();
    } else if (SearchFilter.value == "Park Type") {
        document.getElementById("parkTypeList").style.display = "block";
        searchByParkType()
    } else if (SearchFilter.value == "View All National Parks") {
        viewAllParks();
        parkList.style.display = "block";
    }
}

// Search By Park Type Filter
function searchByParkType() {
    console.log("Adding Search by Park Type Filter...")
    parkTypeList.length = 0;

    parksDescription.style.display = "none";
    parkList.style.display = "none"
    extraData.style.display = "none";

    let parkTypeOption = new Option("Please Select a Park Type ...", "");
    parkTypeList.appendChild(parkTypeOption);

    for (let park of parkTypesArray){
        let parkOption = new Option(park, park);
        parkTypeList.appendChild(parkOption);
    }
}

// When a Park Type is Selected...
function searchByParkOnChange() {
    console.log("Park type was selected...")
    parkList.length = 0;

    // Continue Hiding The Element
    parkList.style.display = "none";
    parksDescription.style.display = "none";
    extraData.style.display = "none";

    let parkTypeOption = new Option("Please Select a Park ...", "");
    parkList.appendChild(parkTypeOption);

    for (let park of nationalParksArray) {
        if (park.LocationName.indexOf(parkTypeList.value) != -1 && parkTypeList.value != "") {
            let parkTypeOption = new Option(park.LocationName, park.LocationName);
            parkList.appendChild(parkTypeOption);
            parkList.style.display = "block";
        }
    }
}

let currentState;

// Search By Location Filter
function searchByLocation() {
    console.log("Adding Search by Location Filter...")
    locationsList.length = 0; // resets location list back to "please select a state"

    parksDescription.style.display = "none";
    parkList.style.display = "none"
    extraData.style.display = "none";

    let locationOption = new Option("Select a Location ...", "");
    locationsList.appendChild(locationOption);

    for (let location of locationsArray){
        let option = new Option(location, location);
        locationsList.appendChild(option);
    }
}
// When Location is Selected
function locationsListOnChange() {
    console.log("A Location Was Selected...")
    parkList.length = 0;
    // Hide some stuff
    parksDescription.style.display = "none";
    parkList.style.display = "none"
    extraData.style.display = "none";

    let parkOption = new Option("Please Select a Park Type ...", "");
    parkList.appendChild(parkOption);

    for (let location of nationalParksArray) {
        if (locationsList.value == location.State && locationsList.value != "") {
            let locationOption = new Option(location.LocationName, location.LocationName);
            parkList.appendChild(locationOption);
            parkList.style.display = "block";
        }
    }
    if (parkList.length < 2){
        noParkFound();
    }
}

// Runs if no parks found
function noParkFound(){
    extraData.style.display = "block";
    console.log("Could not find any parks in this state")
    extraData.innerHTML = "Could not find any parks in " + locationsList.value + ".";
}
// View All Parks Option [No Filter]
function viewAllParks() {
    console.log("Inititalized no filter")
    parksDescription.style.display = "none"
    extraData.style.display = "none";
    parkList.length = 0;

    let parkOption = new Option("Please Select a Park ...", ""); // creates a select option for dropdown
    parkList.appendChild(parkOption); // adds "select a park" option to dropdown

    for (let park of nationalParksArray) {
        let parkOptions = new Option(park.LocationName, park.LocationName);
        parkList.appendChild(parkOptions);
        parkList.style.display = "block";
    }
}

// Shows selected park in a container
function displayResultOnChange() {
    console.log("A specific park was selected...")
    let parkList = document.getElementById("parkList");
    let parksDescription = document.getElementById("parksDescription");

    for (let park of nationalParksArray) {
        if (parkList.value == park.LocationName) {
            parksDescription.style.display = "block"
            parksDescription.innerHTML = "<span style='color: Green; font-weight: bold'>Name : </span>" + park.LocationName + "<br/>" + "<span style='color: Green; font-weight: bold'>Address : </span>" + park.Address + "<br/>" + "<span style='color: Green; font-weight: bold'>City : </span>" + park.City + "<br/>" + "<span style='color: Green; font-weight: bold'>State : </span>" + park.State + "<br/>" + "<span style='color: Green; font-weight: bold'>Zip Code : </span>" + park.ZipCode + "<br/>" + "<span style='color: Green; font-weight: bold'>Latitude : </span>" + park.Latitude + "<br/>" + "<span style='color: Green; font-weight: bold'>Longitude : </span>" + park.Longitude + "<br/>";
        }
        // Visit property that contains a URL to a page about the park
        if (park.Visit != undefined && parkList.value == park.LocationName) {
            parksDescription.innerHTML += "<span style='color: Green; font-weight: bold'>Visit : </span> <a href =" + park.Visit + " target = '_blank'>" + park.Visit + "</a>"
        }
    }
}
