"use strict";

// Init Vars Here
let SearchFilter = document.getElementById("SearchFilter");
let locationsList = document.getElementById("locationsList");
let parkTypeList = document.getElementById("parkTypeList");
let extraData = document.getElementById("extraData");

let parkList = document.getElementById("parkList");
// Hide When Not Needed
locationsList.style.display = "none";
parkTypeList.style.display = "none";
extraData.style.display = "none";


window.onload = function init () {
    SearchFilter.onchange = addDropdowns;
    parkTypeList.onchange = searchByParkOnChange;
    locationsList.onchange = searchByLocationOnChange;
}

// This Populates the First Search Filter "Search Parks By ..."
function addDropdowns() {
    locationsList.style.display = "none";
    parkTypeList.style.display = "none";
    extraData.style.display = "none";
    // If search filter's value is ...
    if (SearchFilter.value == "Location") {
        document.getElementById("locationsList").style.display = "block";
        locationDropdown();
    } else if (SearchFilter.value == "Park Type") {
        document.getElementById("parkTypeList").style.display = "block";
        parkTypeDropdown()
    } 
}

// Populates the Select A Location Filter
function locationDropdown() {
    console.log("Adding Search by Location Filter...")
    locationsList.length = 0; // resets location list back to "please select a location"

    extraData.style.display = "none";

    let locationOption = new Option("Select a Location ...", "");
    locationsList.appendChild(locationOption);

    for (let location of locationsArray){
        let option = new Option(location, location);
        locationsList.appendChild(option);
    }
}

// Populate the Park Type Dropdown
function parkTypeDropdown() {
    console.log("Adding Search by Park Type Filter...")
    parkTypeList.length = 0;

    extraData.style.display = "none";

    let parkTypeOption = new Option("Please Select a Park Type ...", "");
    parkTypeList.appendChild(parkTypeOption);

    for (let park of parkTypesArray){
        let parkOption = new Option(park, park);
        parkTypeList.appendChild(parkOption);
    }
}

// Create Card Maker Function
function cardMaker(park){
    let cardLocationContainer = document.getElementById("cardLocationContainer");

    let card = document.createElement("div");
    card.className = "card col-sm-6 col-lg-3 m-4";
    cardLocationContainer.appendChild(card);

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";
    card.appendChild(cardBody);

    let title = document.createElement("h5");
    title.className = "card-title";
    title.innerText = nationalParksArray[park].LocationName;
    cardBody.appendChild(title);

    let address = document.createElement("p");
    address.className = "card-text";
    address.innerText = nationalParksArray[park].Address;
    cardBody.appendChild(address);

    let cityStateZip = document.createElement("p");
    cityStateZip.className = "card-text";
    cityStateZip.innerText = nationalParksArray[park].City + ", " + nationalParksArray[park].State + " " + nationalParksArray[park].ZipCode;
    cardBody.appendChild(cityStateZip);

    if (nationalParksArray[park].Visit != undefined) {
        let buttonSelectLocation = document.createElement("a")
        buttonSelectLocation.className = "btn btn-dark ";
        buttonSelectLocation.innerHTML = "Visit Us"
        buttonSelectLocation.href = nationalParksArray[park].Visit;
        buttonSelectLocation.target = "_blank"
        cardBody.appendChild(buttonSelectLocation);
    }
}

function searchByLocationOnChange() {
    console.log("Location On Change")
    cardLocationContainer.innerHTML = "";
    let selectedLocationOption = document.getElementById("locationsList").value;
    for (let park in nationalParksArray) {
        if (selectedLocationOption == nationalParksArray[park].State) {
            cardMaker(park);
        }
    }
}

function searchByParkOnChange() {
    console.log("Park Type On Change")
    cardLocationContainer.innerHTML = "";
    let selectedParkTypeOption = document.getElementById("parkTypeList").value;
    for (let park in nationalParksArray) {
        if ((nationalParksArray[park].LocationName).indexOf(selectedParkTypeOption) != -1) {
            cardMaker(park);
        }
    }
}